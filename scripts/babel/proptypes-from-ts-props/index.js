/* eslint-disable new-cap */
const babelTemplate = require('babel-template');

function resolveArrayToPropTypes(node, optional, state) {
  const { dynamicData: { types } } = state;

  const { typeParameters } = node;

  if (typeParameters == null) {
    // Array without any type information
    return buildPropTypePrimitiveExpression(types, 'array', optional);
  } else {
    // Array with typed elements
    const arrayPropType = types.callExpression(
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

    if (optional) {
      return arrayPropType;
    } else {
      return types.memberExpression(
        arrayPropType,
        types.identifier('isRequired'),
      );
    }
  }
}

function resolveIdentifierToPropTypes(node, optional, state) {
  const { dynamicData: { typeDefinitions } } = state;
  const identifier = node.id;

  if (identifier.name === 'Array') return resolveArrayToPropTypes(node, optional, state);

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

function buildPropTypePrimitiveExpression(types, typeName, optional) {
  if (optional) {
    return types.memberExpression(
      types.identifier('PropTypes'),
      types.identifier(typeName)
    );
  } else {
    return types.memberExpression(
      types.memberExpression(
        types.identifier('PropTypes'),
        types.identifier(typeName)
      ),
      types.identifier('isRequired'),
    );
  }
}

function getPropTypesForNode(node, optional, state) {
  const { dynamicData: { types } } = state;

  switch(node.type) {
    case 'GenericTypeAnnotation':
      return resolveIdentifierToPropTypes(node, optional, state);

    case 'IntersectionTypeAnnotation':
      return node.types.reduce(
        (propTypes, node) => Object.assign(propTypes, getPropTypesForNode(node, false, state)),
        {}
      );

    case 'ObjectTypeAnnotation':
      return node.properties.reduce(
        (propTypes, property) => Object.assign(propTypes, resolvePropertyToPropType(property, state)),
        {}
      );

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

      if (optional) {
        return callExpression;
      } else {
        return types.memberExpression(
          callExpression,
          types.identifier('isRequired')
        );
      }

    case 'StringTypeAnnotation':
      return buildPropTypePrimitiveExpression(types, 'string', optional);

    case 'NumberTypeAnnotation':
      return buildPropTypePrimitiveExpression(types, 'number', optional);

    case 'BooleanTypeAnnotation':
      return buildPropTypePrimitiveExpression(types, 'bool', optional);

    case 'FunctionTypeAnnotation':
      return buildPropTypePrimitiveExpression(types, 'func', optional);

    case 'StringLiteralTypeAnnotation':
      return types.stringLiteral(node.value);

    case 'NumericLiteralTypeAnnotation':
      return types.numericLiteral(node.value);

    case 'BooleanLiteralTypeAnnotation':
      return types.booleanLiteral(node.value);

    default:
      debugger;
      throw new Error(`Could not generate prop types for node type ${node.type}`);
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

function mapDefsToPropTypes(types, defs) {
  return types.objectExpression(
    Object.keys(defs).map(propName => {
      const propDef = defs[propName];
      return types.objectProperty(
        types.identifier(propName),
        propDef
        // types.memberExpression(
        //   types.identifier('PropTypes'),
        //   types.identifier('string')
        // )
      );
    })
  );
}

function getVariableBinding(path, variableName) {
  while (path) {
    if (path.scope.bindings[variableName]) return path.scope.bindings[variableName];
    path = path.parentPath;
  }
  return null;
}

module.exports = function PropTypesFromTsProps({ types }) {
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
                const propTypes = getPropTypesForNode(idTypeAnnotation.typeAnnotation.typeParameters.params[0], false, state);
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
                    PROP_TYPES: mapDefsToPropTypes(types, propTypes),
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
