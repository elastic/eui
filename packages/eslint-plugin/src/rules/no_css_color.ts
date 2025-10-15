/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { CSSStyleDeclaration } from 'cssstyle';
import { TSESTree, ESLintUtils } from '@typescript-eslint/utils';

import { resolveMemberExpressionRoot } from '../utils/resolve_member_expression_root';
import {
  ReportDescriptor,
  RuleContext,
} from '@typescript-eslint/utils/ts-eslint';

type MessageIds =
  | 'noCssColor'
  | 'noCssColorSpecific'
  | 'noCSSColorSpecificDeclaredVariable';

/**
 * @description List of superset css properties that can apply color to html box element elements and text nodes, leveraging the
 * css style package allows us to directly singly check for these properties even if the actual declaration was written using the shorthand form
 */
const propertiesSupportingCssColor = ['color', 'background', 'border'];

/**
 * @description Builds off the existing color definition to match css declarations that can apply color to
 * html elements and text nodes for string declarations
 */
const htmlElementColorDeclarationRegex = RegExp(
  String.raw`(${propertiesSupportingCssColor.join('|')})`
);

const checkPropertySpecifiesInvalidCSSColor = ([property, value]: string[]) => {
  if (!property || !value) return false;

  const style = new CSSStyleDeclaration();

  // @ts-expect-error the types for this packages specifies an index signature of number, alongside other valid CSS properties
  style[property.trim()] = typeof value === 'string' ? value.trim() : value;

  const anchor = propertiesSupportingCssColor.find((resolvedProperty) =>
    property.includes(resolvedProperty)
  );

  if (!anchor) return false;

  // build the resolved color property to check if the value is a string after parsing the style declaration
  const resolvedColorProperty = anchor === 'color' ? 'color' : anchor + 'Color';

  // @ts-expect-error the types for this packages specifics an index signature of number, alongside other valid CSS properties
  const colorValue = style[resolvedColorProperty];

  if (!colorValue) return false;

  // Allow CSS keywords that are valid and should not trigger warnings
  const allowedCssKeywords = [
    'currentcolor',
    'transparent',
    'inherit',
    'initial',
    'unset',
    'revert',
    'revert-layer'
  ];

  const normalizedColorValue = colorValue.toLowerCase().trim();
  if (allowedCssKeywords.includes(normalizedColorValue)) {
    return false;
  }

  return true;
};

/**
 * @description method to inspect values of interest found on an object
 */
const raiseReportIfPropertyHasInvalidCssColor = (
  context: RuleContext<MessageIds, []>,
  propertyNode: TSESTree.Property,
  messageToReport: ReportDescriptor<MessageIds>
) => {
  let didReport = false;

  if (
    propertyNode.key.type === 'Identifier' &&
    !htmlElementColorDeclarationRegex.test(propertyNode.key.name)
  ) {
    return didReport;
  }

  if (propertyNode.value.type === 'Literal') {
    if (
      (didReport = checkPropertySpecifiesInvalidCSSColor([
        // @ts-expect-error the key name is present in this scenario
        propertyNode.key.name,
        propertyNode.value.value,
      ]))
    ) {
      context.report(messageToReport);
    }
  } else if (propertyNode.value.type === 'Identifier') {
    const identifierDeclaration = context.sourceCode
      .getScope(propertyNode)
      .variables.find(
        (variable: { name: string }) =>
          variable.name === (propertyNode.value as TSESTree.Identifier).name!
      );

    const identifierDeclarationInit = (
      identifierDeclaration?.defs[0].node as TSESTree.VariableDeclarator
    )?.init;

    if (
      identifierDeclarationInit?.type === 'Literal' &&
      checkPropertySpecifiesInvalidCSSColor([
        // @ts-expect-error the key name is present in this scenario
        propertyNode.key.name,
        identifierDeclarationInit.value as string,
      ])
    ) {
      context.report({
        loc: propertyNode.value.loc,
        messageId: 'noCSSColorSpecificDeclaredVariable',
        data: {
          // @ts-expect-error the key name is always present else this code will not execute
          property: String(propertyNode.key.name),
          line: String(propertyNode.value.loc.start.line),
          variableName: propertyNode.value.name,
        },
      });

      didReport = true;
    }
  } else if (propertyNode.value.type === 'MemberExpression') {
    // @ts-expect-error we ignore the case where this node could be a private identifier
    const MemberExpressionLeafName = propertyNode.value.property.name;
    const memberExpressionRootName = resolveMemberExpressionRoot(
      propertyNode.value
    ).name;

    const expressionRootDeclaration = context.sourceCode
      .getScope(propertyNode)
      .variables.find(
        (variable: { name: string }) =>
          variable.name === memberExpressionRootName
      );

    const expressionRootDeclarationInit = (
      expressionRootDeclaration?.defs[0].node as TSESTree.VariableDeclarator
    )?.init;

    if (expressionRootDeclarationInit?.type === 'ObjectExpression') {
      (
        expressionRootDeclarationInit as TSESTree.ObjectExpression
      ).properties.forEach((property) => {
        // This is a naive approach expecting the value to be at depth 1, we should actually be traversing the object to the same depth as the expression
        if (
          property.type === 'Property' &&
          property.key.type === 'Identifier' &&
          property.key?.name === MemberExpressionLeafName
        ) {
          raiseReportIfPropertyHasInvalidCssColor(context, property, {
            loc: propertyNode.value.loc,
            messageId: 'noCSSColorSpecificDeclaredVariable',
            data: {
              // @ts-expect-error the key name is always present else this code will not execute
              property: String(propertyNode.key.name),
              line: String(propertyNode.value.loc.start.line),
              variableName: memberExpressionRootName,
            },
          });
        }
      });
    } else if (expressionRootDeclarationInit?.type === 'CallExpression') {
      // TODO: if this object was returned from invoking a function the best we can do is probably validate that the method invoked is one that returns an euitheme object
    }
  }

  return didReport;
};

/**
 *
 * @description style object declaration have a depth of 1, this function handles the properties of the object
 */
const handleObjectProperties = (
  context: RuleContext<MessageIds, []>,
  propertyParentNode: TSESTree.JSXAttribute,
  property: TSESTree.ObjectLiteralElement,
  reportMessage: ReportDescriptor<MessageIds>
) => {
  if (property.type === 'Property') {
    raiseReportIfPropertyHasInvalidCssColor(context, property, reportMessage);
  } else if (property.type === 'SpreadElement') {
    const spreadElementIdentifierName = (
      property.argument as TSESTree.Identifier
    ).name;

    const spreadElementDeclaration = context.sourceCode
      .getScope((propertyParentNode!.value as TSESTree.JSXExpressionContainer).expression!)
      .references.find(
        (ref: { identifier: { name: string } }) =>
          ref.identifier.name === spreadElementIdentifierName
      )?.resolved;

    if (!spreadElementDeclaration) {
      return;
    }

    reportMessage = {
      loc: propertyParentNode.loc,
      messageId: 'noCSSColorSpecificDeclaredVariable',
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

    // evaluate only statically defined declarations, other possibilities like callExpressions in this context complicate things
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

export const NoCssColor = ESLintUtils.RuleCreator.withoutDocs({
  create(context) {
    return {
      // accounts for instances where declarations are created using the template tagged css function
      TaggedTemplateExpression(node) {
        if (
          node.tag.type !== 'Identifier' ||
          (node.tag.type === 'Identifier' && node.tag.name !== 'css')
        ) {
          return;
        }

        for (let i = 0; i < node.quasi.quasis.length; i++) {
          const declarationTemplateNode = node.quasi.quasis[i];

          if (
            htmlElementColorDeclarationRegex.test(
              declarationTemplateNode.value.raw
            )
          ) {
            const cssText = declarationTemplateNode.value.raw
              .replace(/(\{|\}|\\n)/g, '')
              .trim();

            cssText.split(';').forEach((declaration) => {
              if (
                declaration.length > 0 &&
                checkPropertySpecifiesInvalidCSSColor(declaration.split(':'))
              ) {
                context.report({
                  node: declarationTemplateNode,
                  messageId: 'noCssColor',
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
         * @description Accounts for instances where a variable is used to define a style object
         *
         * @example
         * const codeStyle = { color: '#dd4040' };
         * <EuiCode style={codeStyle}>This is an example</EuiCode>
         *
         * @example
         * const codeStyle = { color: '#dd4040' };
         * <EuiCode css={codeStyle}>This is an example</EuiCode>
         *
         * @example
         * const codeStyle = css({ color: '#dd4040' });
         * <EuiCode css={codeStyle}>This is an example</EuiCode>
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
                  messageId: 'noCSSColorSpecificDeclaredVariable',
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
                    messageId: 'noCSSColorSpecificDeclaredVariable',
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
         *
         * @description Accounts for instances where a style object is inlined in the JSX attribute
         *
         * @example
         * <EuiCode style={{ color: '#dd4040' }}>This is an example</EuiCode>
         *
         * @example
         * <EuiCode css={{ color: '#dd4040' }}>This is an example</EuiCode>
         *
         * @example
         * const styleRules = { color: '#dd4040' };
         * <EuiCode style={{ color: styleRules.color }}>This is an example</EuiCode>
         *
         * @example
         * const styleRules = { color: '#dd4040' };
         * <EuiCode css={{ color: styleRules.color }}>This is an example</EuiCode>
         */
        if (
          node.value?.type === 'JSXExpressionContainer' &&
          node.value.expression.type === 'ObjectExpression'
        ) {
          const declarationPropertiesNode = node.value.expression.properties;

          declarationPropertiesNode?.forEach((property) => {
            handleObjectProperties(context, node, property, {
              loc: property.loc,
              messageId: 'noCssColorSpecific',
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
           * @example
           * <EuiCode css={`{ color: '#dd4040' }`}>This is an example</EuiCode>
           */
          if (node.value.expression.type === 'TemplateLiteral') {
            for (let i = 0; i < node.value.expression.quasis.length; i++) {
              const declarationTemplateNode = node.value.expression.quasis[i];

              if (
                htmlElementColorDeclarationRegex.test(
                  declarationTemplateNode.value.raw
                )
              ) {
                const cssText = declarationTemplateNode.value.raw
                  .replace(/(\{|\}|\\n)/g, '')
                  .trim();

                cssText.split(';').forEach((declaration) => {
                  if (
                    declaration.length > 0 &&
                    checkPropertySpecifiesInvalidCSSColor(
                      declaration.split(':')
                    )
                  ) {
                    context.report({
                      node: declarationTemplateNode,
                      messageId: 'noCssColor',
                    });
                  }
                });
              }
            }
          }

          /**
           * @example
           * <EuiCode css={() => ({ color: '#dd4040' })}>This is an example</EuiCode>
           */
          if (
            node.value.expression.type === 'FunctionExpression' ||
            node.value.expression.type === 'ArrowFunctionExpression'
          ) {
            let declarationPropertiesNode: TSESTree.Property[] = [];

            if (node.value.expression.body.type === 'ObjectExpression') {
              declarationPropertiesNode = node.value.expression.body.properties as TSESTree.Property[];
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
                messageId: 'noCssColorSpecific',
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
        'Use color definitions from eui theme as opposed to CSS color values',
    },
    messages: {
      noCSSColorSpecificDeclaredVariable:
        'Avoid using a literal CSS color value for "{{property}}", use an EUI theme color instead in declared variable {{variableName}} on line {{line}}',
      noCssColorSpecific:
        'Avoid using a literal CSS color value for "{{property}}", use an EUI theme color instead',
      noCssColor:
        'Avoid using a literal CSS color value, use an EUI theme color instead',
    },
    schema: [],
  },
  defaultOptions: [],
});
