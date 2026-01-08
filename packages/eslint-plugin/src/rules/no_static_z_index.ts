/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { TSESTree, ESLintUtils } from '@typescript-eslint/utils';
import {
  ReportDescriptor,
  RuleContext,
} from '@typescript-eslint/utils/ts-eslint';
import { getPropertyName } from '../utils/get_property_name';

type MessageIds =
  | 'noStaticZIndex'
  | 'noStaticZIndexSpecific'
  | 'noStaticZIndexSpecificDeclaredVariable';

const propertiesCheckingZIndex = ['zIndex', 'z-index'];

const zIndexDeclarationRegex = RegExp(
  String.raw`(${propertiesCheckingZIndex.join('|')})`
);

// Regex to find z-index declarations in CSS strings
// Matches:
// 1. z-index property name (case insensitive)
// 2. colon
// 3. value (captured group 1) until semicolon, closing brace, or !important
const cssZIndexRegex = /z-index\s*:\s*([^;!}]+)/gi;

const checkPropertySpecifiesInvalidZIndex = (
  property: string,
  value: unknown
) => {
  if (!property || value === undefined || value === null) return false;

  const normalizedProperty = property.trim();
  const isZIndex = propertiesCheckingZIndex.includes(normalizedProperty);

  if (!isZIndex) return false;

  return isInvalidZIndexValue(value);
};

const isInvalidZIndexValue = (value: unknown): boolean => {
  const allowedCssKeywords = [
    'auto',
    'inherit',
    'initial',
    'unset',
    'revert',
    'revert-layer',
  ];

  const stringValue = String(value).trim().toLowerCase();

  if (allowedCssKeywords.includes(stringValue)) {
    return false;
  }

  // Check if it's a number (positive, negative, or zero)
  // This regex allows integers. z-index only accepts integers.
  if (/^-?\d+$/.test(stringValue)) {
    return true;
  }

  return false;
};

const raiseReportIfPropertyHasInvalidZIndex = (
  context: RuleContext<MessageIds, []>,
  propertyNode: TSESTree.Property,
  messageToReport: ReportDescriptor<MessageIds>
) => {
  let didReport = false;
  const propertyName = getPropertyName(propertyNode);

  if (!propertyName || !zIndexDeclarationRegex.test(propertyName)) {
    return didReport;
  }

  const visitNode = (node: TSESTree.Node) => {
    // Handle Literal values: zIndex: 10, 'z-index': '10'
    if (node.type === 'Literal') {
      if (checkPropertySpecifiesInvalidZIndex(propertyName, node.value)) {
        didReport = true;
        context.report({
          ...messageToReport,
          loc: node.loc,
        });
      }
    }
    // Handle Identifier values: zIndex: someVar
    else if (node.type === 'Identifier') {
      const identifierName = node.name;
      const identifierDeclaration = context.sourceCode
        .getScope(node)
        .variables.find((variable) => variable.name === identifierName);

      const identifierDeclarationInit =
        identifierDeclaration?.defs[0]?.node.type === 'VariableDeclarator'
          ? identifierDeclaration.defs[0].node.init
          : undefined;

      if (
        identifierDeclarationInit?.type === 'Literal' &&
        checkPropertySpecifiesInvalidZIndex(
          propertyName,
          identifierDeclarationInit.value
        )
      ) {
        didReport = true;
        context.report({
          loc: node.loc,
          messageId: 'noStaticZIndexSpecificDeclaredVariable',
          data: {
            property: propertyName,
            line: String(node.loc.start.line),
            variableName: node.name,
          },
        });
      }
    } else if (node.type === 'ConditionalExpression') {
      visitNode(node.consequent);
      visitNode(node.alternate);
    } else if (node.type === 'LogicalExpression') {
      visitNode(node.left);
      visitNode(node.right);
    } else if (node.type === 'TSAsExpression') {
      visitNode(node.expression);
    } else if (node.type === 'UnaryExpression') {
      if (node.operator === '-') {
        if (
          node.argument.type === 'Literal' &&
          typeof node.argument.value === 'number'
        ) {
          if (
            checkPropertySpecifiesInvalidZIndex(
              propertyName,
              -node.argument.value
            )
          ) {
            didReport = true;
            context.report({
              ...messageToReport,
              loc: node.loc,
            });
          }
        } else {
          visitNode(node.argument);
        }
      }
    }
  };

  if (propertyNode.value) {
    visitNode(propertyNode.value);
  }

  return didReport;
};

const handleObjectProperties = (
  context: RuleContext<MessageIds, []>,
  propertyParentNode: TSESTree.JSXAttribute | TSESTree.Node,
  property: TSESTree.ObjectLiteralElement,
  reportMessage: ReportDescriptor<MessageIds>
) => {
  if (property.type === 'Property') {
    if (property.value.type === 'ObjectExpression') {
      property.value.properties.forEach((nestedProperty) => {
        const nestedReportMessage = {
          ...reportMessage,
          loc: nestedProperty.loc,
        };

        if (nestedReportMessage.data) {
          const newData: Record<string, unknown> = {
            ...nestedReportMessage.data,
            property: getPropertyName(nestedProperty) || 'unknown',
          };

          if ('line' in newData) {
            newData.line = String(nestedProperty.loc.start.line);
          }

          nestedReportMessage.data = newData;
        }

        handleObjectProperties(
          context,
          propertyParentNode,
          nestedProperty,
          nestedReportMessage
        );
      });
    } else {
      raiseReportIfPropertyHasInvalidZIndex(context, property, reportMessage);
    }
  } else if (property.type === 'SpreadElement') {
    if (property.argument.type !== 'Identifier') {
      return;
    }
    const spreadElementIdentifierName = property.argument.name;

    let scopeNode: TSESTree.Node = propertyParentNode;
    if (
      propertyParentNode.type === 'JSXAttribute' &&
      propertyParentNode.value?.type === 'JSXExpressionContainer'
    ) {
      scopeNode = propertyParentNode.value.expression;
    }

    const spreadElementDeclaration = context.sourceCode
      .getScope(scopeNode)
      .references.find(
        (ref) => ref.identifier.name === spreadElementIdentifierName
      )?.resolved;

    if (!spreadElementDeclaration) {
      return;
    }

    const propertyName = getPropertyName(property) || 'spread';

    reportMessage = {
      loc: propertyParentNode.loc,
      messageId: 'noStaticZIndexSpecificDeclaredVariable',
      data: {
        property: propertyName,
        variableName: spreadElementIdentifierName,
        line: String(property.loc.start.line),
      },
    };

    const spreadElementDeclarationNode =
      spreadElementDeclaration.defs[0]?.node.type === 'VariableDeclarator'
        ? spreadElementDeclaration.defs[0].node.init
        : undefined;

    if (spreadElementDeclarationNode?.type === 'ObjectExpression') {
      spreadElementDeclarationNode.properties.forEach((spreadProperty) => {
        handleObjectProperties(
          context,
          propertyParentNode,
          spreadProperty,
          reportMessage
        );
      });
    }
  }
};

const checkTemplateLiteralForZIndex = (
  context: RuleContext<MessageIds, []>,
  node: TSESTree.TemplateLiteral
) => {
  for (let i = 0; i < node.quasis.length; i++) {
    const declarationTemplateNode = node.quasis[i];
    const rawValue = declarationTemplateNode.value.raw;
    // Strip comments
    const valueWithoutComments = rawValue.replace(/\/\*[\s\S]*?\*\//g, '');

    let match;
    // reset regex state
    cssZIndexRegex.lastIndex = 0;

    while ((match = cssZIndexRegex.exec(valueWithoutComments)) !== null) {
      const value = match[1].trim();
      if (isInvalidZIndexValue(value)) {
        context.report({
          node: declarationTemplateNode,
          messageId: 'noStaticZIndex',
        });
      }
    }
  }
};

export const NoStaticZIndex = ESLintUtils.RuleCreator.withoutDocs({
  create(context) {
    return {
      TaggedTemplateExpression(node) {
        if (
          node.tag.type !== 'Identifier' ||
          (node.tag.type === 'Identifier' && node.tag.name !== 'css')
        ) {
          return;
        }

        checkTemplateLiteralForZIndex(context, node.quasi);
      },
      JSXAttribute(node: TSESTree.JSXAttribute) {
        if (!(node.name.name === 'style' || node.name.name === 'css')) {
          return;
        }

        if (!node.value || node.value.type !== 'JSXExpressionContainer') {
          return;
        }

        const expression = node.value.expression;

        // Handle identifier expression: style={someStyle}
        if (expression.type === 'Identifier') {
          const styleVariableName = expression.name;
          const nodeScope = context.sourceCode.getScope(expression);

          const variableDeclarationMatches = nodeScope.references.find(
            (ref) => ref.identifier.name === styleVariableName
          )?.resolved;

          let variableInitializationNode;

          if (
            variableDeclarationMatches?.defs[0]?.node.type ===
              'VariableDeclarator' &&
            variableDeclarationMatches.defs[0].node.init
          ) {
            variableInitializationNode =
              variableDeclarationMatches.defs[0].node.init;

            if (variableInitializationNode.type === 'ObjectExpression') {
              variableInitializationNode.properties.forEach((property) => {
                handleObjectProperties(context, node, property, {
                  loc: property.loc,
                  messageId: 'noStaticZIndexSpecificDeclaredVariable',
                  data: {
                    property: getPropertyName(property) || 'unknown',
                    variableName: styleVariableName,
                    line: String(property.loc.start.line),
                  },
                });
              });
            } else if (
              variableInitializationNode.type === 'CallExpression' &&
              variableInitializationNode.callee.type === 'Identifier' &&
              variableInitializationNode.callee.name === 'css'
            ) {
              variableInitializationNode.arguments.forEach((argument) => {
                if (argument.type === 'ObjectExpression') {
                  argument.properties.forEach((property) => {
                    handleObjectProperties(context, node, property, {
                      loc: property.loc,
                      messageId: 'noStaticZIndexSpecificDeclaredVariable',
                      data: {
                        property: getPropertyName(property) || 'unknown',
                        variableName: styleVariableName,
                        line: String(property.loc.start.line),
                      },
                    });
                  });
                }
              });
            }
          }
          return;
        }

        // Handle inline object: style={{ zIndex: 10 }}
        if (expression.type === 'ObjectExpression') {
          const declarationPropertiesNode = expression.properties;

          declarationPropertiesNode?.forEach((property) => {
            handleObjectProperties(context, node, property, {
              loc: property.loc,
              messageId: 'noStaticZIndexSpecific',
              data: {
                property: getPropertyName(property) || 'unknown',
              },
            });
          });

          return;
        }

        // Handle inline CallExpression: css={css({ zIndex: 10 })}
        if (
          expression.type === 'CallExpression' &&
          expression.callee.type === 'Identifier' &&
          expression.callee.name === 'css'
        ) {
          expression.arguments.forEach((argument) => {
            if (argument.type === 'ObjectExpression') {
              argument.properties.forEach((property) => {
                handleObjectProperties(context, node, property, {
                  loc: node.loc,
                  messageId: 'noStaticZIndexSpecific',
                  data: {
                    property: getPropertyName(property) || 'unknown',
                  },
                });
              });
            }
          });
          return;
        }

        // Handle inline ArrayExpression: css={[...]}
        if (expression.type === 'ArrayExpression') {
          expression.elements.forEach((element) => {
            if (!element) return;

            if (element.type === 'ObjectExpression') {
              element.properties.forEach((property) => {
                handleObjectProperties(context, node, property, {
                  loc: property.loc,
                  messageId: 'noStaticZIndexSpecific',
                  data: {
                    property: getPropertyName(property) || 'unknown',
                  },
                });
              });
            } else if (
              element.type === 'CallExpression' &&
              element.callee.type === 'Identifier' &&
              element.callee.name === 'css'
            ) {
              element.arguments.forEach((argument) => {
                if (argument.type === 'ObjectExpression') {
                  argument.properties.forEach((property) => {
                    handleObjectProperties(context, node, property, {
                      loc: property.loc,
                      messageId: 'noStaticZIndexSpecific',
                      data: {
                        property: getPropertyName(property) || 'unknown',
                      },
                    });
                  });
                }
              });
            }
          });
        }

        // Handle css prop with template literal or function
        if (node.name.name === 'css') {
          // css={`...`}
          if (expression.type === 'TemplateLiteral') {
            checkTemplateLiteralForZIndex(context, expression);
            return;
          }

          // css={() => ({ ... })} or css={function() { return { ... } }}
          if (
            expression.type === 'FunctionExpression' ||
            expression.type === 'ArrowFunctionExpression'
          ) {
            let declarationPropertiesNode: TSESTree.ObjectLiteralElement[] = [];

            if (expression.body.type === 'ObjectExpression') {
              declarationPropertiesNode = expression.body.properties;
            }

            if (expression.body.type === 'BlockStatement') {
              const functionReturnStatementNode = expression.body.body?.find(
                (_node) => {
                  return _node.type === 'ReturnStatement';
                }
              );

              if (
                functionReturnStatementNode?.type === 'ReturnStatement' &&
                functionReturnStatementNode.argument?.type ===
                  'ObjectExpression'
              ) {
                declarationPropertiesNode =
                  functionReturnStatementNode.argument.properties.filter(
                    (property): property is TSESTree.Property =>
                      property.type === 'Property'
                  );
              }
            }

            if (!declarationPropertiesNode.length) {
              return;
            }

            declarationPropertiesNode.forEach((property) => {
              handleObjectProperties(context, node, property, {
                loc: property.loc,
                messageId: 'noStaticZIndexSpecific',
                data: {
                  property: getPropertyName(property) || 'unknown',
                },
              });
            });

            return;
          }
        }
      },
    };
  },
  meta: {
    type: 'suggestion',
    docs: {
      description:
        'Use `z-index` definitions from `euiTheme` as opposed to static values',
    },
    messages: {
      noStaticZIndexSpecificDeclaredVariable:
        'Avoid using a literal z-index value for "{{property}}", use an EUI theme z-index level instead in declared variable {{variableName}} on line {{line}}',
      noStaticZIndexSpecific:
        'Avoid using a literal z-index value for "{{property}}", use an EUI theme z-index level instead',
      noStaticZIndex:
        'Avoid using a literal z-index value, use an EUI theme z-index level instead',
    },
    schema: [],
  },
  defaultOptions: [],
});
