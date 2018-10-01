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
    return types.callExpression(
      types.memberExpression(
        types.identifier('PropTypes'),
        types.identifier('arrayOf')
      ),
      [
        types.callExpression(
          types.memberExpression(
            types.identifier('PropTypes'),
            types.identifier('oneOfType')
          ),
          [
            types.arrayExpression(
              typeParameters.params.map(node => getPropTypesForNode(node, false, state))
            )
          ]
        )
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
    return getPropTypesForNode(identifierDefinition, false, state);
  } else {
    return {};
  }
}

function resolvePropertyToPropType(property, state) {
  const { key, value, optional } = property;

  if (key.type !== 'Identifier') {
    debugger;
    throw new Error(`Could not resolve property with type ${key.type} to prop type`);
  }

  return { [key.name]: getPropTypesForNode(value, optional, state) };
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
      propType =  node.types.reduce(
        (propTypes, node) => Object.assign(propTypes, getPropTypesForNode(node, false, state)),
        {}
      );
      break;

    case 'ObjectTypeAnnotation':
      propType = types.callExpression(
        types.memberExpression(
          types.identifier('PropTypes'),
          types.identifier('shape')
        ),
        [
          types.objectExpression(
            node.properties.map(property => types.objectProperty(
              types.identifier(property.key.name),
              getPropTypesForNode(property.value, property.optional, state)
            ))
          )
        ]
      );
      break;

    case 'UnionTypeAnnotation':
      const callExpression = types.callExpression(
        types.memberExpression(
          types.identifier('PropTypes'),
          types.identifier('oneOf'),
        ),
        [
          types.arrayExpression(
            node.types.map(node => getPropTypesForNode(node, false, state))
          )
        ]
      );

      propType = callExpression;
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
        // node.properties.reduce(
        //   (propsObj, property) => {
        //     propsObj[property.key.name] = property.value;
        //     return propsObj;
        //   },
        //   {}
        // )
      );
  }
  return node;
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

      VariableDeclarator: function visitVariableDeclarator(path, state) {
        const variableDeclarator = path.node;
        const { id } = variableDeclarator;
        const idTypeAnnotation = id.typeAnnotation;

        if (idTypeAnnotation) {
          if (idTypeAnnotation.typeAnnotation.id.type === 'QualifiedTypeIdentifier') {
            const { qualification, id } = idTypeAnnotation.typeAnnotation.id;

            if (qualification.name === 'React') {
              if (id.name === 'SFC') {
                // @TODO what about multiple params in idTypeAnnotation.typeAnnotation.typeParameters`
                const propTypes = getPropTypesNodeFromAST(
                  // `getPropTypesForNode` returns a PropTypes.shape representing the top-level object, we need to
                  // reach into the shape call expression and use the object literal directly
                  getPropTypesForNode(idTypeAnnotation.typeAnnotation.typeParameters.params[0], false, state),
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
                    COMPONENT_NAME: types.identifier(variableDeclarator.id.name),
                    // PROP_TYPES: mapDefsToPropTypes(types, propTypes),
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

                // babel-plugin-react-docgen passes `this.file.code` to react-docgen
                // instead of using the modified AST; to expose our changes to react-docgen
                // they need to be rendered to a string
                this.file.code = this.file.generate().code;
              } else {
                debugger;
                throw new Error(`Cannot process annotation id React.${id.name}`);
              }
            }
          } else {
            debugger;
            throw new Error('Cannot process annotation type of', idTypeAnnotation.typeAnnotation.id.type);
          }
        }
      },
    },
  };
};
