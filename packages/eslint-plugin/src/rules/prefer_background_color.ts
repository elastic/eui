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
  | 'preferBackgroundColor'
  | 'preferBackgroundColorSpecific'
  | 'preferBackgroundColorSpecificDeclaredVariable';

const backgroundPropertyNames = ['background'];

const backgroundDeclarationRegex = RegExp(
  String.raw`^(${backgroundPropertyNames.join('|')})$`
);

// Regex to find background declarations in CSS strings
// Matches background property but not background-color, background-image, etc.
const cssBackgroundRegex = /\bbackground\s*:/gi;

const checkPropertyUsesBackground = (property: string) => {
  if (!property) return false;
  const normalizedProperty = property.trim();
  
  // Check for exact 'background' match (camelCase or kebab-case)
  return normalizedProperty === 'background';
};

const raiseReportIfPropertyUsesBackground = (
  context: RuleContext<MessageIds, []>,
  propertyNode: TSESTree.Property,
  messageToReport: ReportDescriptor<MessageIds>
) => {
  let didReport = false;
  const propertyName = getPropertyName(propertyNode);

  if (!propertyName || !checkPropertyUsesBackground(propertyName)) {
    return didReport;
  }

  // Report the usage of 'background' property
  didReport = true;
  context.report({
    ...messageToReport,
    loc: propertyNode.loc,
  });

  return didReport;
};

/**
 * @description Handle properties in an object expression
 */
const handleObjectProperties = (
  context: RuleContext<MessageIds, []>,
  propertyParentNode: TSESTree.JSXAttribute,
  property: TSESTree.ObjectLiteralElement,
  reportMessage: ReportDescriptor<MessageIds>
) => {
  if (property.type === 'Property') {
    raiseReportIfPropertyUsesBackground(context, property, reportMessage);
  } else if (property.type === 'SpreadElement') {
    const spreadElementIdentifierName = (
      property.argument as TSESTree.Identifier
    ).name;

    const spreadElementDeclaration = context.sourceCode
      .getScope(
        (propertyParentNode!.value as TSESTree.JSXExpressionContainer)
          .expression!
      )
      .references.find(
        (ref: { identifier: { name: string } }) =>
          ref.identifier.name === spreadElementIdentifierName
      )?.resolved;

    if (!spreadElementDeclaration) {
      return;
    }

    reportMessage = {
      loc: propertyParentNode.loc,
      messageId: 'preferBackgroundColorSpecificDeclaredVariable',
      data: {
        // @ts-expect-error the key name is always present else this code will not execute
        property: String(property.argument.name),
        variableName: spreadElementIdentifierName,
        line: String(property.loc.start.line),
      },
    };

    const spreadElementDeclarationNode =
      'init' in spreadElementDeclaration.defs[0].node
        ? spreadElementDeclaration.defs[0].node.init
        : undefined;

    // evaluate only statically defined declarations
    if (spreadElementDeclarationNode?.type === 'ObjectExpression') {
      (
        spreadElementDeclarationNode as TSESTree.ObjectExpression
      ).properties.forEach((spreadProperty) => {
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

export const PreferBackgroundColor = ESLintUtils.RuleCreator.withoutDocs({
  create(context) {
    return {
      // Handle template tagged CSS strings
      TaggedTemplateExpression(node) {
        if (
          node.tag.type !== 'Identifier' ||
          (node.tag.type === 'Identifier' && node.tag.name !== 'css')
        ) {
          return;
        }

        for (let i = 0; i < node.quasi.quasis.length; i++) {
          const declarationTemplateNode = node.quasi.quasis[i];

          if (cssBackgroundRegex.test(declarationTemplateNode.value.raw)) {
            const cssText = declarationTemplateNode.value.raw
              .replace(/[\{\}\n\r]/g, ' ')
              .trim();

            cssText.split(';').forEach((declaration) => {
              const [property] = declaration.split(':');
              if (
                property &&
                checkPropertyUsesBackground(property.trim())
              ) {
                context.report({
                  node: declarationTemplateNode,
                  messageId: 'preferBackgroundColor',
                });
              }
            });
          }
        }
      },
      JSXAttribute(node: TSESTree.JSXAttribute) {
        if (!(node.name.name === 'style' || node.name.name === 'css')) {
          return;
        }

        /**
         * Handle style variables
         * @example
         * const codeStyle = { background: '#dd4040' };
         * <EuiCode style={codeStyle}>This is an example</EuiCode>
         */
        if (
          node.value?.type === 'JSXExpressionContainer' &&
          node.value.expression.type === 'Identifier'
        ) {
          const styleVariableName = node.value.expression.name;
          const nodeScope = context.sourceCode.getScope(node.value.expression);

          const variableDeclarationMatches = nodeScope.references.find(
            (ref) => ref.identifier.name === styleVariableName
          )?.resolved;

          let variableInitializationNode;

          if (
            (variableInitializationNode =
              variableDeclarationMatches?.defs?.[0]?.node &&
              'init' in variableDeclarationMatches.defs[0].node &&
              variableDeclarationMatches.defs[0].node.init)
          ) {
            if (variableInitializationNode.type === 'ObjectExpression') {
              variableInitializationNode.properties.forEach((property) => {
                handleObjectProperties(context, node, property, {
                  loc: property.loc,
                  messageId: 'preferBackgroundColorSpecificDeclaredVariable',
                  data: {
                    property:
                      property.type === 'SpreadElement'
                        ? String(
                            (property.argument as TSESTree.Identifier).name
                          )
                        : String((property.key as TSESTree.Identifier).name),
                    variableName: styleVariableName,
                    line: String(property.loc.start.line),
                  },
                });
              });
            } else if (
              variableInitializationNode.type === 'CallExpression' &&
              (variableInitializationNode.callee as TSESTree.Identifier)
                .name === 'css'
            ) {
              const cssFunctionArgument =
                variableInitializationNode.arguments[0];

              if (cssFunctionArgument.type === 'ObjectExpression') {
                cssFunctionArgument.properties.forEach((property) => {
                  handleObjectProperties(context, node, property, {
                    loc: node.loc,
                    messageId: 'preferBackgroundColorSpecificDeclaredVariable',
                    data: {
                      property:
                        property.type === 'SpreadElement'
                          ? String(
                              (property.argument as TSESTree.Identifier).name
                            )
                          : String((property.key as TSESTree.Identifier).name),
                      variableName: styleVariableName,
                      line: String(property.loc.start.line),
                    },
                  });
                });
              }
            }
          }

          return;
        }

        /**
         * Handle inline style objects
         * @example
         * <EuiCode style={{ background: '#dd4040' }}>This is an example</EuiCode>
         */
        if (
          node.value?.type === 'JSXExpressionContainer' &&
          node.value.expression.type === 'ObjectExpression'
        ) {
          const declarationPropertiesNode = node.value.expression.properties;

          declarationPropertiesNode?.forEach((property) => {
            handleObjectProperties(context, node, property, {
              loc: property.loc,
              messageId: 'preferBackgroundColorSpecific',
              data: {
                property:
                  property.type === 'SpreadElement'
                    ? // @ts-expect-error the key name is always present else this code will not execute
                      String(property.argument.name)
                    : // @ts-expect-error the key name is always present else this code will not execute
                      String(property.key.name),
              },
            });
          });

          return;
        }

        if (
          node.name.name === 'css' &&
          node.value?.type === 'JSXExpressionContainer'
        ) {
          /**
           * Handle CSS template literals
           * @example
           * <EuiCode css={`background: #dd4040`}>This is an example</EuiCode>
           */
          if (node.value.expression.type === 'TemplateLiteral') {
            for (let i = 0; i < node.value.expression.quasis.length; i++) {
              const declarationTemplateNode = node.value.expression.quasis[i];

              if (cssBackgroundRegex.test(declarationTemplateNode.value.raw)) {
                const cssText = declarationTemplateNode.value.raw
                  .replace(/(\{|\}|\\n)/g, '')
                  .trim();

                cssText.split(';').forEach((declaration) => {
                  const [property] = declaration.split(':');
                  if (
                    property &&
                    checkPropertyUsesBackground(property.trim())
                  ) {
                    context.report({
                      node: declarationTemplateNode,
                      messageId: 'preferBackgroundColor',
                    });
                  }
                });
              }
            }
          }

          /**
           * Handle CSS functions
           * @example
           * <EuiCode css={() => ({ background: '#dd4040' })}>This is an example</EuiCode>
           */
          if (
            node.value.expression.type === 'FunctionExpression' ||
            node.value.expression.type === 'ArrowFunctionExpression'
          ) {
            let declarationPropertiesNode: TSESTree.Property[] = [];

            if (node.value.expression.body.type === 'ObjectExpression') {
              declarationPropertiesNode = node.value.expression.body
                .properties as TSESTree.Property[];
            }

            if (node.value.expression.body.type === 'BlockStatement') {
              const functionReturnStatementNode =
                node.value.expression.body.body?.find((_node) => {
                  return _node.type === 'ReturnStatement';
                });

              if (!functionReturnStatementNode) {
                return;
              }

              declarationPropertiesNode = (
                (functionReturnStatementNode as TSESTree.ReturnStatement)
                  .argument as TSESTree.ObjectExpression
              )?.properties.filter(
                (property): property is TSESTree.Property =>
                  property.type === 'Property'
              );
            }

            if (!declarationPropertiesNode.length) {
              return;
            }

            declarationPropertiesNode.forEach((property) => {
              handleObjectProperties(context, node, property, {
                loc: property.loc,
                messageId: 'preferBackgroundColorSpecific',
                data: {
                  // @ts-expect-error the key name is always present else this code will not execute
                  property: property.key.name,
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
        'Prefer using background-color instead of the background shorthand property for setting colors',
    },
    messages: {
      preferBackgroundColorSpecificDeclaredVariable:
        'Prefer using "background-color" instead of "{{property}}" for setting colors in declared variable {{variableName}} on line {{line}}',
      preferBackgroundColorSpecific:
        'Prefer using "background-color" instead of "{{property}}" for setting colors',
      preferBackgroundColor:
        'Prefer using "background-color" instead of "background" for setting colors',
    },
    schema: [],
  },
  defaultOptions: [],
});
