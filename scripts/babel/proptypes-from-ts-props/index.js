/* eslint-disable new-cap */

const fs = require('fs');
const path = require('path');
const babelTemplate = require('babel-template');
const babelCore = require('@babel/core');

// react-docgen does not understand typescript annotations
function stripTypeScript(filename, ast) {
  return babelCore.transform(
    babelCore.transformFromAst(ast).code,
    {
      filename: filename,
      babelrc: false,
      presets: ['@babel/typescript'],
      plugins: ['@babel/plugin-syntax-dynamic-import'],
    }
  ).code;
}

// .ts file could import types from a .tsx file, so force nested imports to parse JSX
function forceTSXParsing(opts) {
  return {
    ...opts,
    plugins: opts.plugins.map(plugin => {
      if (plugin.key.indexOf(`@babel${path.sep}preset-typescript`) !== -1) {
        plugin.options.isTSX = true;
        plugin.options.allExtensions = true;
      }
      return plugin;
    }),
  };
}

// determine is a node is a TS*, or if it is a proptype that came from one
function isTSType(node) {
  if (node == null) return false;

  if (node.isAlreadyResolved) {
    return node.isTSType;
  }

  return node.type.startsWith('TS');
}

/**
 * Converts an Array<X> type to PropTypes.arrayOf(X)
 * @param node
 * @param state
 * @returns AST node representing matching proptypes
 */
function resolveArrayToPropTypes(node, state) {
  const types = state.get('types');

  const { typeParameters } = node;

  if (typeParameters == null) {
    // Array without any type information
    // PropTypes.array
    return buildPropTypePrimitiveExpression(types, 'array');
  } else {
    // Array with typed elements
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

/**
 * Converts an X[] type to PropTypes.arrayOf(X)
 * @param node
 * @param state
 * @returns AST node representing matching proptypes
 */
function resolveArrayTypeToPropTypes(node, state) {
  const types = state.get('types');

  const { elementType } = node;

  if (elementType == null) {
    // Array without any type information
    // PropTypes.array
    return buildPropTypePrimitiveExpression(types, 'array');
  } else {
    // Array with typed elements
    // PropTypes.arrayOf()
    // Array type only has one type argument
    return types.callExpression(
      types.memberExpression(
        types.identifier('PropTypes'),
        types.identifier('arrayOf')
      ),
      [
        getPropTypesForNode(elementType, false, state)
      ]
    );
  }
}

/**
 * Resolves the node's identifier to its proptypes.
 * Responsible for resolving
 *    - React.* (SFC, ReactNode, etc)
 *    - Arrays
 *    - MouseEventHandler is interpretted as functions
 *    - ExclusiveUnion custom type
 *    - defined types/interfaces (found during initial program body parsing)
 * Returns `null` for unresolvable types
 * @param node
 * @param state
 * @returns AST | null
 */
function resolveIdentifierToPropTypes(node, state) {
  const typeDefinitions = state.get('typeDefinitions');
  const types = state.get('types');

  let identifier;
  switch (node.type) {
    case 'TSTypeReference':
      identifier = node.typeName;
      break;

    case 'Identifier':
      identifier = node;
      break;
  }

  // resolve React.* identifiers
  if (identifier.type === 'TSQualifiedName' && identifier.left.name === 'React') {
    return resolveIdentifierToPropTypes(identifier.right, state);
  }

  // React Component
  switch (identifier.name) {
    // PropTypes.element
    case 'Component':
    case 'ReactElement':
    case 'ComponentClass':
    case 'SFC':
    case 'StatelessComponent':
      return types.memberExpression(
        types.identifier('PropTypes'),
        types.identifier('element')
      );

    // PropTypes.node
    case 'ReactChild':
    case 'ReactNode':
      return types.memberExpression(
        types.identifier('PropTypes'),
        types.identifier('node')
      );
  }

  if (identifier.name === 'Array') return resolveArrayToPropTypes(node, state);
  if (identifier.name === 'MouseEventHandler') return buildPropTypePrimitiveExpression(types, 'func');
  if (identifier.name === 'Function') return buildPropTypePrimitiveExpression(types, 'func');
  if (identifier.name === 'ExclusiveUnion') {
    // We use ExclusiveUnion at the top level to exclusively discriminate between types
    // propTypes itself must be an object so merge the union sets together as an intersection

    // Any types that are optional or non-existant on one side must be optional after the union
    const aPropType = getPropTypesForNode(node.typeParameters.params[0], true, state);
    const bPropType = getPropTypesForNode(node.typeParameters.params[1], true, state);

    const propsOnA = types.isCallExpression(aPropType) ? aPropType.arguments[0].properties : [];
    const propsOnB = types.isCallExpression(bPropType) ? bPropType.arguments[0].properties : [];

    // optional props is any prop that is optional or non-existant on one side
    const optionalProps = new Set();
    for (let i = 0; i < propsOnA.length; i++) {
      const property = propsOnA[i];
      const propertyName = property.key.name;
      const isOptional = !isPropTypeRequired(types, property.value);
      const existsOnB = propsOnB.find(property => property.key.name === propertyName) != null;
      if (isOptional || !existsOnB) {
        optionalProps.add(propertyName);
      }
    }
    for (let i = 0; i < propsOnB.length; i++) {
      const property = propsOnB[i];
      const propertyName = property.key.name;
      const isOptional = !isPropTypeRequired(types, property.value);
      const existsOnA = propsOnA.find(property => property.key.name === propertyName) != null;
      if (isOptional || !existsOnA) {
        optionalProps.add(propertyName);
      }
    }

    const propTypes = getPropTypesForNode(
      {
        type: 'TSIntersectionType',
        types: node.typeParameters.params,
      },
      true,
      state
    );

    if (types.isCallExpression(propTypes)) {
      // apply the optionals
      const properties = propTypes.arguments[0].properties;
      for (let i = 0; i < properties.length; i++) {
        const property = properties[i];
        if (optionalProps.has(property.key.name)) {
          property.value = makePropTypeOptional(types, property.value);
        }
      }
    }

    return propTypes;
  }

  // Lookup this identifier from types/interfaces defined in code
  const identifierDefinition = typeDefinitions[identifier.name];

  if (identifierDefinition) {
    return getPropTypesForNode(identifierDefinition, true, state);
  } else {
    return null;
  }
}

/**
 * Small DRY abstraction to return the AST of PropTypes.${typeName}
 * @param types
 * @param typeName
 * @returns AST
 */
function buildPropTypePrimitiveExpression(types, typeName) {
  return types.memberExpression(
    types.identifier('PropTypes'),
    types.identifier(typeName)
  );
}

function isPropTypeRequired(types, propType) {
  return types.isMemberExpression(propType) &&
    types.isIdentifier(propType.property) &&
    propType.property.name === 'isRequired';
}

function makePropTypeRequired(types, propType) {
  // can't make literals required no matter how hard we try
  if (types.isLiteral(propType) === true) return propType;

  return types.memberExpression(
    propType,
    types.identifier('isRequired')
  );
}

function makePropTypeOptional(types, propType) {
  if (isPropTypeRequired(types, propType)) {
    // strip the .isRequired member expression
    return propType.object;
  }
  return propType;
}

function areExpressionsIdentical(a, b) {
  const aCode = babelCore.transformFromAst(babelCore.types.program([
    babelCore.types.expressionStatement(
      babelCore.types.removeComments(babelCore.types.cloneDeep(a))
    )
  ])).code;
  const bCode = babelCore.transformFromAst(babelCore.types.program([
    babelCore.types.expressionStatement(
      babelCore.types.removeComments(babelCore.types.cloneDeep(b))
    )
  ])).code;
  return aCode === bCode;
}

/**
 * Converts any literal node (StringLiteral, etc) into a PropTypes.oneOF([ literalNode ])
 * so it can be used in any proptype expression
 */
function convertLiteralToOneOf(types, literalNode) {
  return types.callExpression(
    types.memberExpression(
      types.identifier('PropTypes'),
      types.identifier('oneOf')
    ),
    [
      types.arrayExpression([ literalNode ])
    ]
  );
}

/**
 * Heavy lifter to generate the proptype AST for a node. Initially called by `processComponentDeclaration`,
 * its return value is set as the component's `propTypes` value. This function calls itself recursively to translate
 * the whole type/interface AST into prop types.
 * @param node
 * @param optional
 * @param state
 * @returns AST | null
 */
function getPropTypesForNode(node, optional, state) {
  const types = state.get('types');

  if (node.isAlreadyResolved === true) return node;

  let propType;
  switch(node.type) {
    // a type value by identifier
    case 'TSTypeReference':
      propType = resolveIdentifierToPropTypes(node, state);
      break;

    // a type annotation on a node
    // Array<Foo>
    //       ^^^ Foo
    case 'TSTypeAnnotation':
      propType = getPropTypesForNode(node.typeAnnotation, true, state);
      break;

    // translates intersections (Foo & Bar & Baz) to a shape with the types' members (Foo, Bar, Baz) merged together
    case 'TSIntersectionType':
      const usableNodes = node.types.filter(node => {
        const nodePropTypes = getPropTypesForNode(node, true, state);

        if (
          types.isMemberExpression(nodePropTypes) &&
          nodePropTypes.object.name === 'PropTypes' &&
          nodePropTypes.property.name === 'any'
        ) {
          return false;
        }

        // validate that this resulted in a shape, otherwise we don't know how to extract/merge the values
        if (
          !types.isCallExpression(nodePropTypes) ||
          !types.isMemberExpression(nodePropTypes.callee) ||
          nodePropTypes.callee.object.name !== 'PropTypes' ||
          nodePropTypes.callee.property.name !== 'shape'
        ) {
          return false;
        }

        return true;
      });

      // merge the resolved proptypes for each intersection member into one object, mergedProperties
      const mergedProperties = usableNodes.reduce(
        (mergedProperties, node) => {
          const nodePropTypes = getPropTypesForNode(node, true, state);

          // iterate over this type's members, adding them (and their comments) to `mergedProperties`
          const typeProperties = nodePropTypes.arguments[0].properties; // properties on the ObjectExpression passed to PropTypes.shape()
          for (let i = 0; i < typeProperties.length; i++) {
            const typeProperty = typeProperties[i];
            // this member may be duplicated between two shapes, e.g. Foo = { buzz: string } & Bar = { buzz: string }
            // either or both may have leading comments and we want to forward all comments to the generated prop type
            const leadingComments = [
              ...(typeProperty.leadingComments || []),
              ...((mergedProperties[typeProperty.key.name] ? mergedProperties[typeProperty.key.name].leadingComments : null) || []),
            ];

            let propTypeValue = typeProperty.value;
            if (types.isLiteral(propTypeValue)) {
              // can't use a literal straight, wrap it with PropTypes.oneOf([ the_literal ])
              propTypeValue = convertLiteralToOneOf(types, propTypeValue);
            }

            // if this property has already been found, the only action is to potentially change it to optional
            if (mergedProperties.hasOwnProperty(typeProperty.key.name)) {
              const existing = mergedProperties[typeProperty.key.name];
              if (!areExpressionsIdentical(existing, typeProperty.value)) {
                mergedProperties[typeProperty.key.name] = types.callExpression(
                  types.memberExpression(
                    types.identifier('PropTypes'),
                    types.identifier('oneOfType'),
                  ),
                  [
                    types.arrayExpression(
                      [existing, propTypeValue]
                    )
                  ]
                );

                if (isPropTypeRequired(types, existing) && isPropTypeRequired(types, typeProperty.value)) {
                  mergedProperties[typeProperty.key.name] = makePropTypeRequired(types, mergedProperties[typeProperty.key.name]);
                }
              }
            } else {
              // property hasn't been seen yet, add it
              mergedProperties[typeProperty.key.name] = propTypeValue;
            }

            mergedProperties[typeProperty.key.name].leadingComments = leadingComments;
          }

          return mergedProperties;
        },
        {}
      );

      const propertyKeys = Object.keys(mergedProperties);
      // if there is one or more members on `mergedProperties` then use PropTypes.shape,
      // otherwise none of the types were resolvable and fallback to PropTypes.any
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

    // translate an interface definition into a PropTypes.shape
    case 'TSInterfaceBody':
      propType = types.callExpression(
        types.memberExpression(
          types.identifier('PropTypes'),
          types.identifier('shape')
        ),
        [
          types.objectExpression(
            node.body
              // This helps filter out index signatures from interfaces,
              // which don't translate to prop types.
              .filter(property => property.key != null)
              .map(property => {
                const propertyPropType = property.type === 'TSMethodSignature'
                  ? getPropTypesForNode({ type: 'TSFunctionType' }, property.optional, state)
                  : getPropTypesForNode(property.typeAnnotation, property.optional, state);

                const objectProperty = types.objectProperty(
                  types.identifier(property.key.name || `"${property.key.value}"`),
                  propertyPropType
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

    // resolve a type operator (keyword) that operates on a value
    // currently only supporting `keyof typeof [object variable]`
    case 'TSTypeOperator':
      if (node.operator === 'keyof' && node.typeAnnotation.type === 'TSTypeQuery') {
        const typeDefinitions = state.get('typeDefinitions');
        const typeDefinition = typeDefinitions[node.typeAnnotation.exprName.name];
        if (typeDefinition != null) {
          propType = getPropTypesForNode(typeDefinition, true, state);
        }
      }
      break;

    // invoked only by `keyof typeof` TSTypeOperator, safe to form PropTypes.oneOf(Object.keys(variable))
    case 'ObjectExpression':
      propType = types.callExpression(
        types.memberExpression(
          types.identifier('PropTypes'),
          types.identifier('oneOf')
        ),
        [
          types.arrayExpression(
            node.properties.map(property => types.stringLiteral(property.key.name || property.key.name || property.key.value))
          )
        ]
      );
      break;

    // translate a type definition into a PropTypes.shape
    case 'TSTypeLiteral':
      propType = types.callExpression(
        types.memberExpression(
          types.identifier('PropTypes'),
          types.identifier('shape')
        ),
        [
          types.objectExpression(
            node.members.map(property => {
              // skip TS index signatures
              if (types.isTSIndexSignature(property)) return null;

              const propertyPropType = property.type === 'TSMethodSignature'
                ? getPropTypesForNode({ type: 'TSFunctionType' }, property.optional, state)
                : getPropTypesForNode(property.typeAnnotation, property.optional, state);

              const objectProperty = types.objectProperty(
                types.identifier(property.key.name || `"${property.key.value}"`),
                propertyPropType
              );
              if (property.leadingComments != null) {
                objectProperty.leadingComments = property.leadingComments.map(({ type, value }) => ({ type, value }));
              }
              return objectProperty;
            }).filter(x => x != null)
          )
        ]
      );
      break;

    // translate a union (Foo | Bar | Baz) into PropTypes.oneOf or PropTypes.oneOfType, depending on
    // the kind of members in the union (no literal values, all literals, or mixed)
    // literal values are extracted into a `oneOf`, if all members are literals this oneOf is used
    // otherwise `oneOfType` is used - if there are any literal values it contains the literals' `oneOf`
    case 'TSUnionType':
      const tsUnionTypes = node.types.map(node => getPropTypesForNode(node, false, state));

      // `tsUnionTypes` could be:
      // 1. all non-literal values (string | number)
      // 2. all literal values ("foo" | "bar")
      // 3. a mix of value types ("foo" | number)
      // this reduce finds any literal values and groups them into a oneOf node

      const reducedUnionTypes = tsUnionTypes.reduce(
        (foundTypes, tsUnionType) => {
          if (types.isLiteral(tsUnionType) || (types.isIdentifier(tsUnionType) && tsUnionType.name === 'undefined')) {
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

      // if there is only one member on the reduced union types, _and_a oneOf proptype was created,
      // then that oneOf proptype is the one member on union types, and can be be extracted out
      // e.g.
      //    PropTypes.oneOf([PropTypes.oneOf(['red', 'blue'])])
      //    ->
      //    PropTypes.oneOf(['red', 'blue'])
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

    // translate enum to PropTypes.oneOf
    case 'TSEnumDeclaration':
      const memberTypes = node.members.map(member => getPropTypesForNode(member, true, state));
      propType = types.callExpression(
        types.memberExpression(
          types.identifier('PropTypes'),
          types.identifier('oneOf'),
        ),
        [
          types.arrayExpression(
            memberTypes
          )
        ]
      );
      break;

    // translate an interface to PropTypes
    case 'TSInterfaceDeclaration':
      const { body, extends: extensions } = node;

      // if the interface doesn't extend anything use just the interface body
      if (extensions == null) {
        propType = getPropTypesForNode(body, true, state);
      } else {
        // fake a TSIntersectionType to merge everything together
        propType = getPropTypesForNode(
          {
            type: 'TSIntersectionType',
            types: [
              body,
              ...extensions
            ]
          },
          true,
          state
        );
      }
      break;

    // simple pass-through wrapper
    case 'TSExpressionWithTypeArguments':
      propType = resolveIdentifierToPropTypes(node.expression, state);
      break;

    // an enum member is a simple wrapper around a type definition
    case 'TSEnumMember':
      propType = getPropTypesForNode(node.initializer, optional, state);
      break;

    // translate `string` to `PropTypes.string`
    case 'TSStringKeyword':
      propType = buildPropTypePrimitiveExpression(types, 'string');
      break;

    // translate `number` to `PropTypes.number`
    case 'TSNumberKeyword':
      propType = buildPropTypePrimitiveExpression(types, 'number');
      break;

    // translate `boolean` to `PropTypes.bool`
    case 'TSBooleanKeyword':
      propType = buildPropTypePrimitiveExpression(types, 'bool');
      break;

    // translate any function type to `PropTypes.func`
    case 'TSFunctionType':
      propType = buildPropTypePrimitiveExpression(types, 'func');
      break;

    // translate an array type, e.g. Foo[]
    case 'TSArrayType':
      propType = resolveArrayTypeToPropTypes(node, state);
      break;

    // parenthesized type is a small wrapper around another type definition
    // e.g. (() => void)[]
    //      ^^^^^^^^^^^^ wrapping the TSFunctionType `() => void`
    case 'TSParenthesizedType':
      propType = getPropTypesForNode(node.typeAnnotation, optional, state);
      optional = true; // handling `optional` has been delegated to the above call
      break;

    // literal type wraps a literal value
    case 'TSLiteralType':
      propType = getPropTypesForNode(node.literal, true, state);
      optional = true; // cannot call `.isRequired` on a literal
      break;

    case 'StringLiteral':
      propType =  types.stringLiteral(node.value);
      optional = true; // cannot call `.isRequired` on a string literal
      break;

    case 'NumericLiteral':
      propType =  types.numericLiteral(node.value);
      optional = true; // cannot call `.isRequired` on a number literal
      break;

    case 'BooleanLiteral':
      propType =  types.booleanLiteral(node.value);
      optional = true; // cannot call `.isRequired` on a boolean literal
      break;

    case 'TSNullKeyword':
      propType =  types.nullLiteral();
      optional = true; // cannot call `.isRequired` on a null literal
      break;

    case 'TSUndefinedKeyword':
      propType =  types.identifier('undefined');
      optional = true; // cannot call `.isRequired` on an undefined literal
      break;

    // very helpful debugging code
    // default:
    //   debugger;
    //   throw new Error(`Could not generate prop types for node type ${node.type}`);
  }

  // if the node was unable to be translated to a prop type, fallback to PropTypes.any
  if (propType == null) {
    propType = types.memberExpression(
      types.identifier('PropTypes'),
      types.identifier('any')
    );
  }

  if (!optional) {
    propType = makePropTypeRequired(types, propType);
  }

  if (isTSType(node)) {
    propType.isTSType = true;
  }

  return propType;
}

// typeDefinitionExtractors is a mapping of [ast_node_type: func] which is used to find type definitions
// these definitions come from four sources:
//   - import statements
//   - interface declaration
//   - type declaration
//   - enum declaration
const typeDefinitionExtractors = {
  /**
   * Looks at the named imports from _relative files_ (nothing from node_modues)
   * The imported source is then loaded & parsed, in the same way recursively resolving that files' typescript definitions
   * After parsing, the imported definitions are extracted, pre-resolved, and marked with `isAlreadyResolved = true`
   * @param node
   * @param extractionOptions
   * @returns Array
   */
  ImportDeclaration: (node, extractionOptions) => {
    const { fs, sourceFilename, parse, state } = extractionOptions;
    const importPath = node.source.value;
    const isPathRelative = /^\.{1,2}\//.test(importPath);

    // only process relative imports for typescript definitions (avoid node_modules)
    if (isPathRelative) {

      // find the variable names being imported
      const importedTypeNames = node.specifiers.map(specifier => {
        switch (specifier.type) {
          case 'ImportSpecifier':
            return specifier.imported.name;
          case 'ExportSpecifier':
            return specifier.local.name;

          // default:
          //   throw new Error(`Unable to process import specifier type ${specifier.type}`);
        }
      });

      // find the file pointed to by `importPath`
      let resolvedPath = path.resolve(path.dirname(sourceFilename), importPath);
      if (fs.existsSync(resolvedPath)) {
        // imported path exists, it might be a directory or a file
        const isDirectory = fs.statSync(resolvedPath).isDirectory();
        if (isDirectory) {
          // imported path is a directory, try resolving to the /index.ts
          resolvedPath = `${resolvedPath}${path.sep}index.ts`;
          if (!fs.existsSync(resolvedPath)) {
            // no index file to resolve to, return with no found type definitions
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

      // load & parse the imported file
      const ast = parse(fs.readFileSync(resolvedPath).toString());

      // extract any type definitions in the imported file
      const definitions = [];
      const subExtractionOptions = {
        ...extractionOptions,
        sourceFilename: resolvedPath,
      };
      for (let i = 0; i < ast.program.body.length; i++) {
        const bodyNode = ast.program.body[i];
        Array.prototype.push.apply(definitions, extractTypeDefinition(bodyNode, subExtractionOptions) || []);
      }

      // temporarily override typeDefinitions so variable scope doesn't bleed between files
      const _typeDefinitions = state.get('typeDefinitions');
      state.set(
        'typeDefinitions',
        definitions.reduce(
          (typeDefinitions, definition) => {
            if (definition) {
              typeDefinitions[definition.name] = definition.definition;
            }

            return typeDefinitions;
          },
          {}
        )
      );

      // for each importedTypeName, fully resolve the type information
      const importedDefinitions = definitions.reduce(
        (importedDefinitions, { name, definition }) => {
          if (importedTypeNames.includes(name)) {
            // this type declaration is imported by the parent script
            const propTypes = getPropTypesForNode(definition, true, state);
            propTypes.isAlreadyResolved = true; // when getPropTypesForNode is called on this node later, tell it to skip processing
            importedDefinitions.push({ name, definition: propTypes });
          }

          return importedDefinitions;
        },
        []
      );

      // reset typeDefinitions and continue processing the original file
      state.set('typeDefinitions', _typeDefinitions);

      return importedDefinitions;
    }

    return [];
  },

  /**
   * Associates this interfaces's identifier name with its definition
   * @param node
   * @returns Array
   */
  TSInterfaceDeclaration: node => {
    const { id } = node;

    if (id.type !== 'Identifier') {
      throw new Error(`TSInterfaceDeclaration typeDefinitionExtract could not understand id type ${id.type}`);
    }

    return [{ name: id.name, definition: node }];
  },

  /**
   * Associates this type's identifier name with its definition
   * @param node
   * @returns Array
   */
  TSTypeAliasDeclaration: node => {
    const { id, typeAnnotation } = node;

    if (id.type !== 'Identifier') {
      throw new Error(`TSTypeAliasDeclaraction typeDefinitionExtract could not understand id type ${id.type}`);
    }

    return [{ name: id.name, definition: typeAnnotation }];
  },

  /**
   * Associates this enum's identifier name with its definition
   * @param node
   * @returns Array
   */
  TSEnumDeclaration: node => {
    const { id } = node;

    if (id.type !== 'Identifier') {
      throw new Error(`TSEnumDeclaration typeDefinitionExtract could not understand id type ${id.type}`);
    }

    return [{ name: id.name, definition: node }];
  },

  /**
   * Tracks variable declarations as object definitions are used by `keyof typeof [object variable]
   * @param node
   * @returns Array
   */
  VariableDeclaration: node => {
    return node.declarations.reduce(
      (declarations, declaration) => {
        if (declaration.init.type === 'ObjectExpression') {
          declarations.push({ name: declaration.id.name, definition: declaration.init });
        }
        return declarations;
      },
      []
    );
  },

  ExportNamedDeclaration: (node, extractionOptions) => {
    const types = extractionOptions.state.get('types');
    if (types.isStringLiteral(node.source)) {
      // export { variable } from './location'
      // for our needs, this node type overlaps an ImportDeclaration
      return typeDefinitionExtractors.ImportDeclaration(node, extractionOptions);
    }
    return extractTypeDefinition(node.declaration);
  },
};
function extractTypeDefinition(node, opts) {
  if (node == null) {
    return null;
  }
  return typeDefinitionExtractors.hasOwnProperty(node.type) ? typeDefinitionExtractors[node.type](node, opts) : null;
}

/**
 * given the node path, walks up the path's scope looking for the variable binding `variableName`
 * @param path
 * @param variableName
 * @returns nodePath | null
 */
function getVariableBinding(path, variableName) {
  while (path) {
    if (path.scope.bindings[variableName]) return path.scope.bindings[variableName];
    path = path.parentPath;
  }
  return null;
}

/**
 * Takes an AST of PropTypes.* and walks down until an ObjectExpression is found.
 * Required as a component's `propTypes` definition itself is an object (ObjectExpression)
 * and the AST node passed here is an actual PropType call itself; without this method the result would be
 * FooComponent.propTypes = PropTypes.shape({ ... });
 * which getPropTypesNodeFromAST converts to
 * FooComponent.propTypes = { ... };
 * @param node
 * @param types
 * @returns {*}
 */
function getPropTypesNodeFromAST(node, types) {
  switch (node.type) {
    case 'MemberExpression':
      return getPropTypesNodeFromAST(node.object, types);

    case 'CallExpression':
      return getPropTypesNodeFromAST(node.arguments[0], types);
  }
  return node;
}

// Used to generate AST for assigning component's propTypes
const buildPropTypes = babelTemplate('COMPONENT_NAME.propTypes = PROP_TYPES');

/**
 * Called with a type definition and a React component node path, `processComponentDeclaration` translates that definiton
 * to an AST of PropType.* calls and attaches those prop types to the component.
 * @param typeDefinition
 * @param path
 * @param state
 */
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
    let targetNode;
    // find the first statement in the program and import PropTypes there
    targetNode = path;
    while (targetNode.parentPath.parentPath != null) {
      targetNode = targetNode.parentPath;
    }
    while (targetNode.getPrevSibling().node != null) {
      targetNode = targetNode.getPrevSibling();
    }

    targetNode.insertAfter(
      types.importDeclaration(
        [types.importDefaultSpecifier(types.identifier('PropTypes'))],
        types.stringLiteral('prop-types')
      )
    );
  }
}

module.exports = function propTypesFromTypeScript({ types }) {
  return {
    visitor: {
      /**
       * Visit the program path to setup the processing initial state.
       * @param programPath
       * @param state
       */
      Program: {
        enter: function visitProgram(programPath, state) {
          // only process typescript files
          if (path.extname(state.file.opts.filename) !== '.ts' && path.extname(state.file.opts.filename) !== '.tsx') return;

          // Extract any of the imported variables from 'react' (SFC, ReactNode, etc)
          // we do this here instead of resolving when the imported values are used
          // as the babel typescript preset strips type-only imports before babel visits their usages
          const importsFromReact = new Set();
          programPath.traverse(
            {
              ImportDeclaration: ({ node }) => {
                if (node.source.value === 'react') {
                  node.specifiers.forEach(specifier => {
                    if (specifier.type === 'ImportSpecifier') {
                      importsFromReact.add(specifier.local.name);
                    }
                  });
                }
              }
            },
            state
          );
          state.set('importsFromReact', importsFromReact);

          const { opts = {} } = state;
          const typeDefinitions = {};
          state.set('typeDefinitions', typeDefinitions);
          state.set('types', types);

          // extraction options are used to further resolve types imported from other files
          const extractionOptions = {
            state,
            sourceFilename: path.resolve(process.cwd(), this.file.opts.filename),
            fs: opts.fs || fs,
            parse: code => babelCore.parse(code, forceTSXParsing(state.file.opts)),
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
        exit: function exitProgram(programPath, state) {
          // only process typescript files
          if (path.extname(state.file.opts.filename) !== '.ts' && path.extname(state.file.opts.filename) !== '.tsx') return;

          const types = state.get('types');
          const typeDefinitions = state.get('typeDefinitions');

          // remove any exported identifiers that are TS types or interfaces
          // this prevents TS-only identifiers from leaking into ES code
          programPath.traverse({
            ExportNamedDeclaration: (path) => {
              const specifiers = path.get('specifiers');
              const source = path.get('source');
              specifiers.forEach(specifierPath => {
                if (types.isExportSpecifier(specifierPath)) {
                  const { node: { local } } = specifierPath;
                  if (types.isIdentifier(local)) {
                    const { name } = local;
                    if (typeDefinitions.hasOwnProperty(name)) {
                      // this is a locally-known value
                      const def = typeDefinitions[name];
                      if (isTSType(def)) {
                        specifierPath.remove();
                      }
                    } else if (types.isStringLiteral(source)) {
                      const libraryName = source.get('value').node;
                      const isRelativeSource = libraryName.startsWith('.');
                      if (isRelativeSource === false) {
                        // comes from a 3rd-party library
                        // best way to reliably check if this is
                        // a type or value is to require the
                        // library and check its exports
                        const library = require(libraryName);
                        if (library.hasOwnProperty(name) === false) {
                          specifierPath.remove();
                        }
                      }
                    }
                  }
                }
              });
            }
          });
        }
      },

      /**
       * Visit class declarations and check to see if it extends React.Component
       * If so process the definition and add generate the component's propTypes.
       * @param nodePath
       * @param state
       */
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
              if (state.get('importsFromReact').has(identifierName)) {
                isReactComponent = true;
              }
            }
          }

          if (isReactComponent && nodePath.node.superTypeParameters != null) {
            processComponentDeclaration(nodePath.node.superTypeParameters.params[0], nodePath, state);

            // babel-plugin-react-docgen passes `this.file.code` to react-docgen
            // instead of using the modified AST; to expose our changes to react-docgen
            // they need to be rendered to a string
            this.file.code = stripTypeScript(this.file.opts.filename, this.file.ast);
          }
        }
      },

      /**
       * Visit class declarations and check to see if it they are annotated as an SFC
       * If so process the definition and add generate the component's propTypes.
       * @param nodePath
       * @param state
       */
      VariableDeclarator: function visitVariableDeclarator(nodePath, state) {
        // only process typescript files
        if (path.extname(state.file.opts.filename) !== '.ts' && path.extname(state.file.opts.filename) !== '.tsx') return;

        const resolveVariableDeclarator = variableDeclarator => {
          const { id } = variableDeclarator;
          const idTypeAnnotation = id.typeAnnotation;

          if (idTypeAnnotation) {
            let fileCodeNeedsUpdating = false;

            if (idTypeAnnotation.typeAnnotation.type === 'TSTypeReference') {
              if (idTypeAnnotation.typeAnnotation.typeName.type === 'TSQualifiedName') {
                const { left, right } = idTypeAnnotation.typeAnnotation.typeName;

                if (left.name === 'React') {
                  const rightName = right.name;
                  if (rightName === 'SFC' || rightName === 'FunctionComponent') {
                    processComponentDeclaration(idTypeAnnotation.typeAnnotation.typeParameters.params[0], nodePath, state);
                    fileCodeNeedsUpdating = true;
                  } else {
                    // throw new Error(`Cannot process annotation id React.${right.name}`);
                  }
                }
              } else if (idTypeAnnotation.typeAnnotation.typeName.type === 'Identifier') {
                const typeName = idTypeAnnotation.typeAnnotation.typeName.name;
                if (typeName === 'SFC' || typeName === 'FunctionComponent') {
                  if (state.get('importsFromReact').has(typeName)) {
                    // Declarations like `const Foo: FunctionComponent`
                    // don't have type parameters. It's a valid declaration
                    // because the generic argument has a default of empty
                    // props.
                    if (idTypeAnnotation.typeAnnotation.typeParameters) {
                      processComponentDeclaration(idTypeAnnotation.typeAnnotation.typeParameters.params[0], nodePath, state);
                      fileCodeNeedsUpdating = true;
                    }
                  }
                } else {
                  // reprocess this variable declaration but use the identifier lookup
                  const nextTypeDefinition = state.get('typeDefinitions')[typeName];
                  const types = state.get('types');
                  if (nextTypeDefinition && types.isTSType(nextTypeDefinition)) {
                    const newId = types.cloneDeep(id);
                    newId.typeAnnotation = types.TSTypeAnnotation(nextTypeDefinition);
                    const newNode = types.VariableDeclarator(
                      newId,
                      variableDeclarator.init
                    );
                    resolveVariableDeclarator(newNode);
                  }
                }
              } else {
                throw new Error('Cannot process annotation type of', idTypeAnnotation.typeAnnotation.id.type);
              }
            }

            if (fileCodeNeedsUpdating) {
              // babel-plugin-react-docgen passes `this.file.code` to react-docgen
              // instead of using the modified AST; to expose our changes to react-docgen
              // they need to be rendered to a string
              this.file.code = stripTypeScript(this.file.opts.filename, this.file.ast);
            }
          }
        };

        // kick off the recursive search for a React component in this node
        resolveVariableDeclarator(nodePath.node);
      },
    },
  };
};
