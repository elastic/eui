/*
 * Licensed to Elasticsearch B.V. under one or more contributor
 * license agreements. See the NOTICE file distributed with
 * this work for additional information regarding copyright
 * ownership. Elasticsearch B.V. licenses this file to you under
 * the Apache License, Version 2.0 (the "License"); you may
 * not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

/* eslint-disable @typescript-eslint/no-var-requires */

const ts = require('typescript');
const { SyntaxKind } = require('typescript');
const glob = require('glob');

const files = glob.sync('src/**/*.{ts,tsx}', { absolute: true });

/**
 * To support extended interfaces and types from tsx files too.
 */
const options = {
  jsx: ts.JsxEmit.React,
  strict: true,
};

const program = ts.createProgram(files, options);

module.exports = function(fileSource) {
  const docsInfo = [];
  const source = program.getSourceFile(this.resourcePath);
  if (!source) return;
  const checker = program.getTypeChecker();

  // Get all the interfaces in the file
  const interfaces = source
    .getChildAt(0)
    .getChildren()
    .filter(child => child.kind === SyntaxKind.InterfaceDeclaration);

  // Get all the types in the file
  const types = source
    .getChildAt(0)
    .getChildren()
    .filter(child => child.kind === SyntaxKind.TypeAliasDeclaration);

  if (interfaces.length > 0) {
    interfaces.map(interface => {
      const displayName = interface.name.escapedText;
      /**
       * Get extended if interfaces extended props from a different interface.
       * All the extended interfaces are available in the heritageClauses property.
       */
      const props = getExtendedProps(interface.heritageClauses, checker);
      interface.members.map(member => {
        if (member.name) {
          let generatedType = {};
          const propType = checker.getTypeAtLocation(member.type);
          generatedType.name = checker.typeToString(propType);
          /**
           * If the type value is an enum or a type, the values are available in  the types property
           * If the number of types length is > 6 we could avoid expanding the type. Since it creates
           * doesnt looks good in the props table
           */
          if (
            propType.types &&
            propType.types.length < 6 &&
            propType.types.every(type => type.isStringLiteral())
          ) {
            generatedType = {
              name: 'enum',
              raw: generatedType.name,
              value: propType.types.map(type => ({
                value: type.isStringLiteral()
                  ? `"${type.value}"`
                  : this.checker.typeToString(type),
              })),
            };
          }
          const description = member.jsDoc ? member.jsDoc[0].comment : '';
          const propName = member.name.escapedText
            ? member.name.escapedText
            : member.name.text;
          props[propName] = setPropInfo(
            generatedType,
            propName,
            !member.questionToken,
            description
          );
        }
      });
      docsInfo.push(generateDocInfo(displayName, props));
    });
  }

  if (types.length > 0) {
    types.map(member => {
      const displayName = member.name.escapedText;
      const props = {};
      const generatedTypes = [];
      if (member.type && member.type.types) {
        member.type.types.map(member => {
          const type = checker.getTypeAtLocation(member);
          const stringType = checker.typeToString(type);
          generatedTypes.push(stringType);
        });
      }
      props[displayName] = {
        name: displayName,
        type: {
          name: generatedTypes.toString(),
        },
      };
      docsInfo.push(generateDocInfo(displayName, props));
    });
  }
  /**
   * Append all the types and interfaces to the file as objects.
   */
  const logger = this.getLogger('props-loader');
  try {
    const result = generatePropsCodeBlock({
      filename: this.resourcePath,
      fileSource,
      docsInfo,
    });
    logger.info(result);
    return result;
    // eslint-disable-next-line no-empty
  } catch (e) {
    logger.info(e);
  }
  return fileSource;
};

/**
 *
 * Returns doc info in the required structure
 * @param {*} displayName
 * @param {*} props
 */
const generateDocInfo = (displayName, props) => ({
  displayName,
  props,
});

/**
 *
 * Recursively search for all the interfaces for extended interfaces. Returns all
 * the extended props.
 * @param {*} interfaces
 * @param {*} checker
 */
const getExtendedProps = (interfaces, checker) => {
  let extendedProps = {};

  // base case for recursion
  if (!interfaces) return {};
  interfaces.map(interface => {
    const exportedInterface = checker.getTypeAtLocation(interface.types[0]);
    if (exportedInterface.symbol) {
      const heritageClauses =
        exportedInterface.symbol.declarations[0].heritageClauses;
      extendedProps = {
        ...getPropsFromInterface(exportedInterface.symbol, checker),
        ...getExtendedProps(heritageClauses, checker),
      };
    }
  });
  return extendedProps;
};

/**
 *
 * In case of extended interfaces the type info can be obtained from valueDeclaration
 * of interface
 * @param {*} interface
 * @param {*} checker
 */
const getPropsFromInterface = (interface, checker) => {
  const props = {};
  interface.members.forEach(value => {
    if (value.valueDeclaration) {
      const declaration = value.valueDeclaration;
      const type = checker.getTypeAtLocation(declaration.type);
      const stringType = checker.typeToString(type);
      const description = declaration.jsDoc ? declaration.jsDoc[0].comment : '';
      const propName = declaration.name.escapedText
        ? declaration.name.escapedText
        : declaration.name.text;
      props[propName] = setPropInfo(
        { name: stringType },
        propName,
        !declaration.questionToken,
        description
      );
    }
  });
  return props;
};

/**
 *
 * Returns data in required structure for the props table
 * @param {*} type
 * @param {*} name
 * @param {*} required
 * @param {*} description
 */
const setPropInfo = (type, name, required, description) => ({
  name,
  type,
  required,
  description,
});

const generatePropsCodeBlock = options => {
  const sourceFile = ts.createSourceFile(
    options.filename,
    options.fileSource,
    ts.ScriptTarget.ESNext
  );

  const codeBlocks = options.docsInfo
    .map(d => createDocObject(d, options))
    .filter(source => source !== null);

  const printer = ts.createPrinter({ newLine: ts.NewLineKind.LineFeed });
  const printNode = sourceNode =>
    printer.printNode(ts.EmitHint.Unspecified, sourceNode, sourceFile);

  if (codeBlocks.length > 0) {
    const result = codeBlocks.reduce(
      (acc, node) => acc + printNode(node),
      options.fileSource
    );
    return result;
  }
  return options.fileSource;
};

const createDocObject = (d, options) => {
  return ts.createVariableStatement(
    [ts.createToken(ts.SyntaxKind.ExportKeyword)],
    ts.createVariableDeclarationList([
      ts.createVariableDeclaration(
        ts.createIdentifier(d.displayName),
        undefined,
        ts.createObjectLiteral([
          ts.createPropertyAssignment(
            '__docgenInfo',
            generateTypesDocgenInfo(d, options)
          ),
        ])
      ),
    ])
  );
};
const generateTypesDocgenInfo = d => {
  return ts.createObjectLiteral([
    ts.createPropertyAssignment(
      ts.createLiteral('displayName'),
      ts.createLiteral(d.displayName)
    ),
    ts.createPropertyAssignment(
      ts.createLiteral('props'),
      ts.createObjectLiteral(
        Object.entries(d.props).map(([propName, prop]) =>
          createPropDefinition(propName, prop)
        )
      )
    ),
  ]);
};

const createPropDefinition = (propName, prop) => {
  const setValue = typeValue =>
    Array.isArray(typeValue) &&
    typeValue.every(value => typeof value.value === 'string')
      ? ts.createPropertyAssignment(
          ts.createLiteral('value'),
          ts.createArrayLiteral(
            typeValue.map(value =>
              ts.createObjectLiteral([
                ts.createPropertyAssignment(
                  ts.createLiteral('value'),
                  ts.createLiteral(value.value || '')
                ),
              ])
            )
          )
        )
      : undefined;
  const setType = (typeName, typeValue) => {
    const objectFields = [
      ts.createPropertyAssignment(
        ts.createLiteral('name'),
        ts.createLiteral(typeName)
      ),
    ];
    const valueField = setValue(typeValue);

    if (valueField) {
      objectFields.push(valueField);
    }

    return ts.createPropertyAssignment(
      ts.createLiteral('type'),
      ts.createObjectLiteral(objectFields)
    );
  };
  return ts.createPropertyAssignment(
    ts.createLiteral(propName),
    ts.createObjectLiteral([
      ts.createPropertyAssignment(
        ts.createLiteral('description'),
        // or operator is used otherwise it will throw an error as cannot read emitNode of undefined
        ts.createLiteral(prop.description || '')
      ),
      ts.createPropertyAssignment(
        ts.createLiteral('name'),
        ts.createLiteral(prop.name || '')
      ),
      ts.createPropertyAssignment(
        ts.createLiteral('required'),
        prop.required ? ts.createTrue() : ts.createFalse()
      ),
      setType(prop.type.name, prop.type.value),
    ])
  );
};
