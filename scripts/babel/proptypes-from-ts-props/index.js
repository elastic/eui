/* eslint-disable new-cap */

const fs = require('fs');
const path = require('path');
const babelTemplate = require('babel-template');

function resolveArrayToPropTypes(node, state) {
  const types = state.get('types');

  const { typeParameters } = node;

  if (typeParameters == null) {
    // Array without any type information
    return buildPropTypePrimitiveExpression(types, 'array');
  } else {
    // Array with typed elements
    // PropTypes.array
    // PropTypes.arrayOf()
    // Array type only has one type argument
    const { params: [arrayType] } = typeParameters;
    return types.callExpression(
      types.memberExpression(
        types.identifier('PropTypes'),
        types.identifier('arrayOf')
      ),
      [
        getPropTypesForNode(arrayType, false, state)
      ]
    );
  }
}

function resolveIdentifierToPropTypes(node, state) {
  const typeDefinitions = state.get('typeDefinitions');
  const types = state.get('types');
  const identifier = node.typeName;

  // resolve React.* identifiers
  if (identifier.type === 'QualifiedTypeIdentifier' && identifier.qualification.name === 'React') {
    return resolveIdentifierToPropTypes(identifier, state);
  }

  // React Component
  switch (identifier.name) {
    // PropTypes.element
    case 'Component':
    case 'ReactElement':
    case 'ComponentClass':
    case 'SFC':
      return types.memberExpression(
        types.identifier('PropTypes'),
        types.identifier('element')
      );

    // PropTypes.node
    case 'ReactNode':
      return types.memberExpression(
        types.identifier('PropTypes'),
        types.identifier('node')
      );
  }

  if (identifier.name === 'Array') return resolveArrayToPropTypes(node, state);

  const identifierDefinition = typeDefinitions[identifier.name];

  if (identifierDefinition) {
    return getPropTypesForNode(identifierDefinition, true, state);
  } else {
    return null;
  }
}

const buildPropTypes = babelTemplate('COMPONENT_NAME.propTypes = PROP_TYPES');

function buildPropTypePrimitiveExpression(types, typeName) {
  return types.memberExpression(
    types.identifier('PropTypes'),
    types.identifier(typeName)
  );
}

function getPropTypesForNode(node, optional, state) {
  const types = state.get('types');

  if (node.isAlreadyResolved === true) return node;

  let propType;
  switch(node.type) {
    case 'TSTypeReference':
      propType = resolveIdentifierToPropTypes(node, state);
      break;

    case 'TSTypeAnnotation':
      propType = getPropTypesForNode(node.typeAnnotation, true, state);
      break;

    case 'IntersectionTypeAnnotation':
      const mergedProperties = node.types.reduce(
        (mergedProperties, node) => {
          const nodePropTypes = getPropTypesForNode(node, true, state);

          // if this propType is PropTypes.any there is nothing to do here
          if (
            types.isMemberExpression(nodePropTypes) &&
            nodePropTypes.object.name === 'PropTypes' &&
            nodePropTypes.property.name === 'any'
          ) {
            return mergedProperties;
          }

          // validate that this resulted in a shape
          if (
            !types.isCallExpression(nodePropTypes) ||
            !types.isMemberExpression(nodePropTypes.callee) ||
            nodePropTypes.callee.object.name !== 'PropTypes' ||
            nodePropTypes.callee.property.name !== 'shape'
          ) {
            debugger;
            throw new Error('Cannot process an encountered type intersection');
          }

          const typeProperties = nodePropTypes.arguments[0].properties; // properties on the ObjectExpression passed to PropTypes.shape()
          for (let i = 0; i < typeProperties.length; i++) {
            const typeProperty = typeProperties[i];
            const leadingComments = [
              ...(typeProperty.leadingComments || []),
              ...((mergedProperties[typeProperty.key.name] ? mergedProperties[typeProperty.key.name].leadingComments : null) || []),
            ];
            mergedProperties[typeProperty.key.name] = typeProperty.value;
            mergedProperties[typeProperty.key.name].leadingComments = leadingComments;
          }

          return mergedProperties;
        },
        {}
      );

      const propertyKeys = Object.keys(mergedProperties);
      if (propertyKeys.length > 0) {
        // At least one type/interface was resolved to proptypes
        propType = types.callExpression(
          types.memberExpression(
            types.identifier('PropTypes'),
            types.identifier('shape')
          ),
          [
            types.objectExpression(propertyKeys.map(
              propKey => {
                const objectProperty = types.objectProperty(
                  types.identifier(propKey),
                  mergedProperties[propKey]
                );

                objectProperty.leadingComments = mergedProperties[propKey].leadingComments;
                mergedProperties[propKey].leadingComments = null;

                return objectProperty;
              }
            ))
          ]
        );
      } else {
        // None of the types were resolveable, return with PropTypes.any
        propType = types.memberExpression(
          types.identifier('PropTypes'),
          types.identifier('any')
        );
      }
      break;

    case 'TSInterfaceBody':
      propType = types.callExpression(
        types.memberExpression(
          types.identifier('PropTypes'),
          types.identifier('shape')
        ),
        [
          types.objectExpression(
            node.body.map(property => {
              const objectProperty = types.objectProperty(
                types.identifier(property.key.name || `"${property.key.value}"`),
                getPropTypesForNode(property.typeAnnotation, property.optional, state)
              );
              if (property.leadingComments != null) {
                objectProperty.leadingComments = property.leadingComments.map(({ type, value }) => ({ type, value }));
              }
              return objectProperty;
            })
          )
        ]
      );
      break;

    case 'UnionTypeAnnotation':
      const tsUnionTypes = node.types.map(node => getPropTypesForNode(node, false, state))

      // `tsUnionTypes` could be:
      // 1. all non-literal values (string | number)
      // 2. all literal values ("foo" | "bar")
      // 3. a mix of value types ("foo" | number)
      // this reduce finds any literal values and groups them into a oneOf node

      const reducedUnionTypes = tsUnionTypes.reduce(
        (foundTypes, tsUnionType) => {
          if (types.isLiteral(tsUnionType)) {
            if (foundTypes.oneOfPropType == null) {
              foundTypes.oneOfPropType = types.arrayExpression([]);
              foundTypes.unionTypes.push(
                types.callExpression(
                  types.memberExpression(
                    types.identifier('PropTypes'),
                    types.identifier('oneOf')
                  ),
                  [foundTypes.oneOfPropType]
                )
              );
            }

            // this is a literal value, move to the oneOfPropType argument
            foundTypes.oneOfPropType.elements.push(tsUnionType);
          } else {
            // this is a non-literal type
            foundTypes.unionTypes.push(tsUnionType);
          }

          return foundTypes;
        },
        {
          unionTypes: [],
          oneOfPropType: null,
        }
      );

      if (reducedUnionTypes.unionTypes.length === 1 && reducedUnionTypes.oneOfPropType != null) {
        // the only proptype is a `oneOf`, use only that
        propType = reducedUnionTypes.unionTypes[0];
      } else {
        propType = types.callExpression(
          types.memberExpression(
            types.identifier('PropTypes'),
            types.identifier('oneOfType'),
          ),
          [
            types.arrayExpression(
              reducedUnionTypes.unionTypes
            )
          ]
        );
      }
      break;

    case 'TSStringKeyword':
      propType =  buildPropTypePrimitiveExpression(types, 'string');
      break;

    case 'TSNumberKeyword':
      propType =  buildPropTypePrimitiveExpression(types, 'number');
      break;

    case 'TSBooleanKeyword':
      propType =  buildPropTypePrimitiveExpression(types, 'bool');
      break;

    case 'TSFunctionType':
      propType =  buildPropTypePrimitiveExpression(types, 'func');
      break;

    case 'StringLiteralTypeAnnotation':
      propType =  types.stringLiteral(node.value);
      optional = true; // cannot call `.isRequired` on a string literal
      break;

    case 'NumericLiteralTypeAnnotation':
      propType =  types.numericLiteral(node.value);
      optional = true; // cannot call `.isRequired` on a number literal
      break;

    case 'BooleanLiteralTypeAnnotation':
      propType =  types.booleanLiteral(node.value);
      optional = true; // cannot call `.isRequired` on a boolean literal
      break;

    default:
      debugger;
      throw new Error(`Could not generate prop types for node type ${node.type}`);
  }

  if (propType == null) {
    propType = types.memberExpression(
      types.identifier('PropTypes'),
      types.identifier('any')
    );
  }

  if (optional) {
    return propType;
  } else {
    return types.memberExpression(
      propType,
      types.identifier('isRequired')
    );
  }
}

const typeDefinitionExtractors = {
  ImportDeclaration: (node, extractionOptions) => {
    const { fs, sourceFilename, parse, state } = extractionOptions;
    const importPath = node.source.value;
    const isPathRelative = /\.{1,2}\//.test(importPath);

    if (isPathRelative) {
      // only process relative imports for typescript definitions

      // find the variable names being imported
      const importedTypeNames = node.specifiers.map(specifier => {
        switch (specifier.type) {
          case 'ImportSpecifier':
            return specifier.imported.name;

          default:
            throw new Error(`Unable to process import specifier type ${specifier.type}`);
        }
      });

      let resolvedPath = path.resolve(path.dirname(sourceFilename), importPath);
      if (fs.existsSync(resolvedPath)) {
        const isDirectory = fs.statSync(resolvedPath).isDirectory();
        if (isDirectory) {
          resolvedPath = `${resolvedPath}/index.ts`;
          if (!fs.existsSync(resolvedPath)) {
            // no index file to resolve to
            return [];
          }
        }
      } else if (fs.existsSync(`${resolvedPath}.ts`)) {
        resolvedPath += '.ts';
      } else if (fs.existsSync(`${resolvedPath}.tsx`)) {
        resolvedPath += '.tsx';
      } else if (!fs.existsSync(resolvedPath)) {
        // could not resolve this file, skip out
        return [];
      }
      const ast = parse(fs.readFileSync(resolvedPath).toString());

      const definitions = [];
      for (let i = 0; i < ast.program.body.length; i++) {
        const bodyNode = ast.program.body[i];
        Array.prototype.push.apply(definitions, extractTypeDefinition(bodyNode, extractionOptions) || []);
      }

      // override typeDefinitions so variable scope doesn't bleed between files
      throw new Error('dynamicData no longer exists');
      const localState = {
        ...state,
        dynamicData: {
          ...state.dynamicData,
          typeDefinitions: definitions.reduce(
            (typeDefinitions, definition) => {
              if (definition) {
                typeDefinitions[definition.name] = definition.definition;
              }

              return typeDefinitions;
            },
            {}
          )
        },
      };

      // for each importedTypeName, fully resolve the type information
      const importedDefinitions = definitions.reduce(
        (importedDefinitions, { name, definition }) => {
          if (importedTypeNames.includes(name)) {
            // this type declaration imported by the parent script
            const propTypes = getPropTypesForNode(definition, true, localState);
            propTypes.isAlreadyResolved = true; // when getPropTypesForNode is called on this node later, tell it to skip processing
            importedDefinitions.push({ name, definition: propTypes });
          }

          return importedDefinitions;
        },
        []
      );

      return importedDefinitions;
    }

    return [];
  },

  // InterfaceDeclaration: node => {
  //   const { id, body } = node;
  //
  //   if (id.type !== 'Identifier') {
  //     debugger;
  //     throw new Error(`InterfaceDeclaration typeDefinitionExtract could not understand id type ${id.type}`);
  //   }
  //
  //   return [{ name: id.name, definition: body }];
  // },
  //
  // TypeAlias: node => {
  //   const { id, right } = node;
  //
  //   if (id.type !== 'Identifier') {
  //     debugger;
  //     throw new Error(`TypeAlias typeDefinitionExtract could not understand id type ${id.type}`);
  //   }
  //
  //   return [{ name: id.name, definition: right }];
  // },

  TSInterfaceDeclaration: node => {
    const { id, body } = node;

    if (id.type !== 'Identifier') {
      debugger;
      throw new Error(`TSInterfaceDeclaration typeDefinitionExtract could not understand id type ${id.type}`);
    }

    return [{ name: id.name, definition: body }];
  },

  ExportNamedDeclaration: node => extractTypeDefinition(node.declaration),
};
function extractTypeDefinition(node, opts) {
  if (node == null) {
    // TODO when does this happen
    debugger;
    return null;
  }
  return typeDefinitionExtractors.hasOwnProperty(node.type) ? typeDefinitionExtractors[node.type](node, opts) : null;
}

function getVariableBinding(path, variableName) {
  while (path) {
    if (path.scope.bindings[variableName]) return path.scope.bindings[variableName];
    path = path.parentPath;
  }
  return null;
}

function getPropTypesNodeFromAST(node, types) {
  switch (node.type) {
    case 'MemberExpression':
      return getPropTypesNodeFromAST(node.object, types);

    case 'CallExpression':
      return getPropTypesNodeFromAST(node.arguments[0], types);

    case 'ObjectExpression':
      return types.objectExpression(
        node.properties
      );
  }
  return node;
}

function processComponentDeclaration(typeDefinition, path, state) {
  const types = state.get('types');

  const propTypesAST = getPropTypesForNode(typeDefinition, false, state);

  // if the resulting proptype is PropTypes.any don't bother setting the proptypes
  if (types.isMemberExpression(propTypesAST.object) && propTypesAST.object.property.name === 'any') return;

  const propTypes = getPropTypesNodeFromAST(
    // `getPropTypesForNode` returns a PropTypes.shape representing the top-level object, we need to
    // reach into the shape call expression and use the object literal directly
    propTypesAST,
    types
  );

  const ancestry = path.getAncestry();

  // find the ancestor who lives in the nearest block
  let blockChildAncestor = ancestry[0];
  for (let i = 1; i < ancestry.length; i++) {
    const ancestor = ancestry[i];
    if (ancestor.isBlockParent()) {
      // stop here, we want to insert the propTypes assignment into this block,
      // immediately after the already found `blockChildAncestor`
      break;
    }
    blockChildAncestor = ancestor;
  }

  blockChildAncestor.insertAfter([
    buildPropTypes({
      COMPONENT_NAME: types.identifier(path.node.id.name),
      PROP_TYPES: propTypes,
    })
  ]);

  // import PropTypes library if it isn't already
  const proptypesBinding = getVariableBinding(path, 'PropTypes');
  if (proptypesBinding == null) {
    const reactBinding = getVariableBinding(path, 'React');
    if (reactBinding == null) {
      throw new Error('Cannot import PropTypes module, no React namespace import found');
    }
    const reactImportDeclaration = reactBinding.path.getAncestry()[1];
    reactImportDeclaration.insertAfter(
      types.importDeclaration(
        [types.importDefaultSpecifier(types.identifier('PropTypes'))],
        types.stringLiteral('prop-types')
      )
    );
  }
}

function isVariableFromReact(types, path, variableName) {
  const identifierBinding = getVariableBinding(path, variableName);
  return types.isImportDeclaration(identifierBinding.path.parent) && identifierBinding.path.parent.source.value === 'react';
}

module.exports = function propTypesFromTypeScript({ types }) {
  return {
    visitor: {
      Program: function visitProgram(programPath, state) {
        // only process typescript files
        if (path.extname(state.file.opts.filename) !== '.ts' && path.extname(state.file.opts.filename) !== '.tsx') return;

        const { opts = {} } = state;
        const typeDefinitions = {};
        state.set('typeDefinitions', typeDefinitions);
        state.set('types', types);

        const extractionOptions = {
          state,
          sourceFilename: path.resolve(process.cwd(), this.file.opts.filename),
          fs: opts.fs || fs,
          parse: (code) => state.file.parse(code),
        };

        // collect named TS type definitions for later reference
        for (let i = 0; i < programPath.node.body.length; i++) {
          const bodyNode = programPath.node.body[i];

          const extractedDefinitions = extractTypeDefinition(bodyNode, extractionOptions) || [];

          for (let i = 0; i < extractedDefinitions.length; i++) {
            const typeDefinition = extractedDefinitions[i];
            if (typeDefinition) {
              typeDefinitions[typeDefinition.name] = typeDefinition.definition;
            }
          }
        }
      },

      ClassDeclaration: function visitClassDeclaration(nodePath, state) {
        // only process typescript files
        if (path.extname(state.file.opts.filename) !== '.ts' && path.extname(state.file.opts.filename) !== '.tsx') return;

        const types = state.get('types');

        if (nodePath.node.superClass != null) {
          let isReactComponent = false;

          if (types.isMemberExpression(nodePath.node.superClass)) {
            const objectName = nodePath.node.superClass.object.name;
            const propertyName = nodePath.node.superClass.property.name;
            if (objectName === 'React' && (propertyName === 'Component' || propertyName === 'PureComponent')) {
              isReactComponent = true;
            }
          } else if (types.isIdentifier(nodePath.node.superClass)) {
            const identifierName = nodePath.node.superClass.name;
            if (identifierName === 'Component' || identifierName === 'PureComponent') {
              if (isVariableFromReact(types, nodePath, identifierName)) {
                isReactComponent = true;
              }
            }
          }

          if (isReactComponent && nodePath.node.superTypeParameters != null) {
            processComponentDeclaration(nodePath.node.superTypeParameters.params[0], nodePath, state);

            // babel-plugin-react-docgen passes `this.file.code` to react-docgen
            // instead of using the modified AST; to expose our changes to react-docgen
            // they need to be rendered to a string
            this.file.code = this.file.generate().code;
          }
        }
      },

      VariableDeclarator: function visitVariableDeclarator(nodePath, state) {
        // only process typescript files
        if (path.extname(state.file.opts.filename) !== '.ts' && path.extname(state.file.opts.filename) !== '.tsx') return;

        const variableDeclarator = nodePath.node;
        const { id } = variableDeclarator;
        const idTypeAnnotation = id.typeAnnotation;

        if (idTypeAnnotation) {
          let fileCodeNeedsUpdating = false;

          if (idTypeAnnotation.typeAnnotation.typeName.type === 'TSQualifiedName') {
            const { left, right } = idTypeAnnotation.typeAnnotation.typeName;

            if (left.name === 'React') {
              if (right.name === 'SFC') {
                processComponentDeclaration(idTypeAnnotation.typeAnnotation.typeParameters.params[0], nodePath, state);
                fileCodeNeedsUpdating = true;
              } else {
                debugger;
                throw new Error(`Cannot process annotation id React.${right.name}`);
              }
            }
          } else if (idTypeAnnotation.typeAnnotation.typeName.type === 'Identifier') {
            if (idTypeAnnotation.typeAnnotation.typeName.name === 'SFC') {
              if (isVariableFromReact(types, nodePath, 'SFC')) {
                processComponentDeclaration(idTypeAnnotation.typeAnnotation.typeParameters.params[0], nodePath, state);
                fileCodeNeedsUpdating = true;
              }
            }
          } else {
            debugger;
            throw new Error('Cannot process annotation type of', idTypeAnnotation.typeAnnotation.id.type);
          }

          if (fileCodeNeedsUpdating) {
            // babel-plugin-react-docgen passes `this.file.code` to react-docgen
            // instead of using the modified AST; to expose our changes to react-docgen
            // they need to be rendered to a string
            // @TODO: do this
            // this.file.code = this.file.generate().code;
          }
        }
      },
    },
  };
};
