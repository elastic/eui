/* eslint-disable new-cap */
const babelTemplate = require('babel-template');

function resolveArrayToPropTypes(node, state) {
  const { dynamicData: { types } } = state;

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
  const { dynamicData: { typeDefinitions } } = state;
  const identifier = node.id;

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
  const { dynamicData: { types } } = state;

  let propType;
  switch(node.type) {
    case 'GenericTypeAnnotation':
      propType = resolveIdentifierToPropTypes(node, state);
      break;

    case 'IntersectionTypeAnnotation':
      const mergedProperties = node.types.reduce(
        (mergedProperties, node) => {
          const nodePropTypes = getPropTypesForNode(node, true, state);

          // validate that this resulted in a shape
          if (!types.isCallExpression(nodePropTypes) ||
            !types.isMemberExpression(nodePropTypes.callee) ||
            nodePropTypes.callee.object.name !== 'PropTypes' ||
            nodePropTypes.callee.property.name !== 'shape'
          ) {
            throw new Error('Cannot process an encountered type intersection');
          }

          const typeProperties = nodePropTypes.arguments[0].properties; // properties on the ObjectExpression passed to PropTypes.shape()
          for (let i = 0; i < typeProperties.length; i++) {
            const typeProperty = typeProperties[i];
            mergedProperties[typeProperty.key.name] = typeProperty.value;
          }

          return mergedProperties;
        },
        {}
      );

      propType = types.callExpression(
        types.memberExpression(
          types.identifier('PropTypes'),
          types.identifier('shape')
        ),
        [
          types.objectExpression(Object.keys(mergedProperties).map(
            propKey => types.objectProperty(
              types.identifier(propKey),
              mergedProperties[propKey]
            )
          ))
        ]
      );

      // propType = node.types.reduce(
      //   (propTypes, node) => Object.assign(propTypes, getPropTypesForNode(node, false, state)),
      //
      // );
      break;

    case 'ObjectTypeAnnotation':
      propType = types.callExpression(
        types.memberExpression(
          types.identifier('PropTypes'),
          types.identifier('shape')
        ),
        [
          types.objectExpression(
            node.properties.map(property => {
              const objectProperty = types.objectProperty(
                types.identifier(property.key.name),
                getPropTypesForNode(property.value, property.optional, state)
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

    case 'StringTypeAnnotation':
      propType =  buildPropTypePrimitiveExpression(types, 'string');
      break;

    case 'NumberTypeAnnotation':
      propType =  buildPropTypePrimitiveExpression(types, 'number');
      break;

    case 'BooleanTypeAnnotation':
      propType =  buildPropTypePrimitiveExpression(types, 'bool');
      break;

    case 'FunctionTypeAnnotation':
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
  InterfaceDeclaration: node => {
    const { id, body } = node;

    if (id.type !== 'Identifier') {
      debugger;
      throw new Error(`InterfaceDeclaration typeDefinitionExtract could not understand id type ${id.type}`);
    }

    return { name: id.name, definition: body };

  },

  TypeAlias: node => {
    const { id, right } = node;

    if (id.type !== 'Identifier') {
      debugger;
      throw new Error(`TypeAlias typeDefinitionExtract could not understand id type ${id.type}`);
    }

    return { name: id.name, definition: right };
  },

  ExportNamedDeclaration: node => extractTypeDefinition(node.declaration),
};
function extractTypeDefinition(node) {
  if (node == null) {
    // TODO when does this happen
    debugger;
    return null;
  }
  return typeDefinitionExtractors.hasOwnProperty(node.type) ? typeDefinitionExtractors[node.type](node) : null;
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
  const { dynamicData: { types } } = state;

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
      Program: function visitProgram(path, state) {
        const { dynamicData } = state;
        const typeDefinitions = dynamicData.typeDefinitions = {};
        dynamicData.types = types;

        // collect named TS type definitions for later reference
        for (let i = 0; i < path.node.body.length; i++) {
          const bodyNode = path.node.body[i];

          const typeDefinition = extractTypeDefinition(bodyNode);

          if (typeDefinition) {
            typeDefinitions[typeDefinition.name] = typeDefinition.definition;
          }
        }
      },

      ClassDeclaration: function visitClassDeclaration(path, state) {
        const { dynamicData: { types } } = state;

        if (path.node.superClass != null) {
          let isReactComponent = false;

          if (types.isMemberExpression(path.node.superClass)) {
            const objectName = path.node.superClass.object.name;
            const propertyName = path.node.superClass.property.name;
            if (objectName === 'React' && (propertyName === 'Component' || propertyName === 'PureComponent')) {
              isReactComponent = true;
            }
          } else if (types.isIdentifier(path.node.superClass)) {
            const identifierName = path.node.superClass.name;
            if (identifierName === 'Component' || identifierName === 'PureComponent') {
              if (isVariableFromReact(types, path, identifierName)) {
                isReactComponent = true;
              }
            }
          }

          if (isReactComponent) {
            processComponentDeclaration(path.node.superTypeParameters.params[0], path, state);

            // babel-plugin-react-docgen passes `this.file.code` to react-docgen
            // instead of using the modified AST; to expose our changes to react-docgen
            // they need to be rendered to a string
            this.file.code = this.file.generate().code;
          }
        }
      },

      VariableDeclarator: function visitVariableDeclarator(path, state) {
        const variableDeclarator = path.node;
        const { id } = variableDeclarator;
        const idTypeAnnotation = id.typeAnnotation;

        if (idTypeAnnotation) {
          let fileCodeNeedsUpdating = false;

          if (idTypeAnnotation.typeAnnotation.id.type === 'QualifiedTypeIdentifier') {
            const { qualification, id } = idTypeAnnotation.typeAnnotation.id;

            if (qualification.name === 'React') {
              if (id.name === 'SFC') {
                processComponentDeclaration(idTypeAnnotation.typeAnnotation.typeParameters.params[0], path, state);
                fileCodeNeedsUpdating = true;
              } else {
                debugger;
                throw new Error(`Cannot process annotation id React.${id.name}`);
              }
            }
          } else if (idTypeAnnotation.typeAnnotation.id.type === 'Identifier') {
            if (idTypeAnnotation.typeAnnotation.id.name === 'SFC') {
              if (isVariableFromReact(types, path, 'SFC')) {
                processComponentDeclaration(idTypeAnnotation.typeAnnotation.typeParameters.params[0], path, state);
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
            this.file.code = this.file.generate().code;
          }
        }
      },
    },
  };
};
