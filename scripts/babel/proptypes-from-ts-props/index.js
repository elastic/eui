/* eslint-disable new-cap */
const babelTemplate = require('babel-template');

function resolveIdentifierToPropTypes(identifier, state) {
  const { dynamicData: { typeDefinitions } } = state;

  const identifierDefinition = typeDefinitions[identifier.name];

  if (identifierDefinition) {
    return getPropTypesForNode(identifierDefinition, state);
  } else {
    return {};
  }
}

function resolvePropertyToPropType(property, state) {
  const { key, value } = property;

  if (key.type !== 'Identifier') {
    debugger;
    throw new Error(`Could not resolve property with type ${key.type} to prop type`);
  }

  return { [key.name]: getPropTypesForNode(value, state) };
}

function getPropTypesForNode(node, state) {
  const { dynamicData: { types }} = state;

  switch(node.type) {
    case 'GenericTypeAnnotation':
      return resolveIdentifierToPropTypes(node.id, state);

    case 'IntersectionTypeAnnotation':
      return node.types.reduce(
        (propTypes, node) => Object.assign(propTypes, getPropTypesForNode(node, state)),
        {}
      );

    case 'ObjectTypeAnnotation':
      return node.properties.reduce(
        (propTypes, property) => Object.assign(propTypes, resolvePropertyToPropType(property, state)),
        {}
      );

    case 'UnionTypeAnnotation':
      return node.types.map(node => getPropTypesForNode(node, state));

    case 'StringTypeAnnotation':
      return types.memberExpression(
        types.identifier('PropTypes'),
        types.identifier('string')
      );

    case 'StringLiteralTypeAnnotation':
      return types.stringLiteral(node.value);

    default:
      debugger;
      throw new Error(`Could not generate prop types for node type ${node.type}`);
  }
}

const typeDefinitionExtractors = {
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
  return typeDefinitionExtractors.hasOwnProperty(node.type) ? typeDefinitionExtractors[node.type](node) : null;
}

const buildPropTypes = babelTemplate('COMPONENT_NAME.propTypes = PROP_TYPES');

// function mapDefToPropType(types, def) {
//   console.log(types);
//   debugger;
//   if (typeof def === 'string') {
//     // the decision has already been made
//     return buildAnything({ CODE: def });
//   }
//
//   debugger;
//   throw new Error('Unable to generate propType for definition', def);
// }

function mapDefsToPropTypes(types, defs) {
  return types.objectExpression(
    Object.keys(defs).map(propName => {
      const propDef = defs[propName];
      return types.objectProperty(
        types.identifier(propName),
        propDef
        // mapDefToPropType(types, propDef)
      );
    })
  );
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
                const propTypes = getPropTypesForNode(idTypeAnnotation.typeAnnotation.typeParameters.params[0], state);
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
