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
const template = require('@babel/template');
const ts = require('typescript');
const glob = require('glob');
const util = require('util');
const { SyntaxKind } = require('typescript');

const files = glob.sync('src/**/*.{ts,tsx}', { absolute: true });

const options = {
  jsx: ts.JsxEmit.React,
  strict: true,
};

const program = ts.createProgram(files, options);

module.exports = function() {
  return {
    visitor: {
      Program(path, state) {
        const docsInfo = [];
        const { filename } = state.file.opts;
        const source = program.getSourceFile(filename);
        if (!source) return;
        const checker = program.getTypeChecker();
        const interfaces = source
          .getChildAt(0)
          .getChildren()
          .filter(child => child.kind === SyntaxKind.InterfaceDeclaration);

        const types = source
          .getChildAt(0)
          .getChildren()
          .filter(child => child.kind === SyntaxKind.TypeAliasDeclaration);

        if (interfaces.length > 0) {
          interfaces.map(interface => {
            const displayName = interface.name.escapedText;
            const props = getExtendedProps(interface.heritageClauses, checker);
            interface.members.map(member => {
              if (member.name) {
                const type = checker.getTypeAtLocation(member.type);
                const stringType = checker.typeToString(type);
                const description = member.jsDoc ? member.jsDoc[0].comment : '';
                const propName = member.name.escapedText
                  ? member.name.escapedText
                  : member.name.text;
                props[propName] = setPropInfo(
                  stringType,
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

        docsInfo.map(interface => {
          const exportName = interface.displayName;
          const interfaceData = {
            name: exportName,
            __docgenInfo: interface,
          };
          path.node.body.push(
            template.default.ast(
              `export const ${exportName} = ${util.inspect(interfaceData, {
                showHidden: false,
                depth: null,
              })}`
            )
          );
        });
      },
    },
  };
};

const generateDocInfo = (displayName, props) => ({
  displayName,
  props,
});

// Recursively search for all exported props
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
        stringType,
        propName,
        !declaration.questionToken,
        description
      );
    }
  });
  return props;
};

const setPropInfo = (type, name, required, description) => ({
  name,
  type,
  required,
  description,
  type: {
    name: type,
  },
});
