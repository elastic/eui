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

// Regex to find "background:" declarations in CSS strings.
// Matches the standalone background property but not background-color, background-image, etc.
// Note: intentionally not using the `g` flag to avoid stateful `lastIndex` issues with `.test()`.
const cssBackgroundRegex = /\bbackground\s*:/i;

const checkPropertyUsesBackground = (property: string): boolean => {
  if (!property) return false;
  return property.trim() === 'background';
};

const raiseReportIfPropertyUsesBackground = (
  context: RuleContext<MessageIds, []>,
  propertyNode: TSESTree.Property,
  messageToReport: ReportDescriptor<MessageIds>
): boolean => {
  const propertyName = getPropertyName(propertyNode);

  if (!propertyName || !checkPropertyUsesBackground(propertyName)) {
    return false;
  }

  context.report({
    ...messageToReport,
    loc: propertyNode.loc,
  });

  return true;
};

/**
 * @description Safely get a display name for a property node (for error messages).
 * Uses type guards instead of type assertions.
 */
const getPropertyDisplayName = (
  property: TSESTree.ObjectLiteralElement
): string => {
  if (property.type === 'Property') {
    if (property.key.type === 'Identifier') {
      return property.key.name;
    }
    if (property.key.type === 'Literal') {
      return String(property.key.value);
    }
  } else if (
    property.type === 'SpreadElement' &&
    property.argument.type === 'Identifier'
  ) {
    return property.argument.name;
  }
  return 'unknown';
};

/**
 * @description Safely resolve the initializer node from a variable declaration.
 * Returns undefined if the definition is not a VariableDeclarator or has no init.
 */
const resolveVariableInit = (
  resolved: { defs: Array<{ node: TSESTree.Node }> }
): TSESTree.Expression | undefined => {
  const firstDef = resolved.defs[0];
  if (!firstDef) return undefined;

  const defNode = firstDef.node;
  if (defNode.type === 'VariableDeclarator' && defNode.init) {
    return defNode.init;
  }
  return undefined;
};

/**
 * @description Handle properties in an object expression.
 * Inspects Property nodes for `background` usage and recursively
 * resolves SpreadElement nodes when the argument is an Identifier.
 */
const handleObjectProperties = (
  context: RuleContext<MessageIds, []>,
  propertyParentNode: TSESTree.JSXAttribute,
  property: TSESTree.ObjectLiteralElement,
  reportMessage: ReportDescriptor<MessageIds>
) => {
  if (property.type === 'Property') {
    raiseReportIfPropertyUsesBackground(context, property, reportMessage);
    return;
  }

  if (property.type !== 'SpreadElement') return;

  // Only handle Identifier spread arguments (e.g., ...baseStyle).
  // Skip MemberExpression (e.g., ...obj.nested) and CallExpression
  // (e.g., ...getStyles()) since we can't statically resolve them.
  if (property.argument.type !== 'Identifier') return;

  const spreadIdentifierName = property.argument.name;

  // Safely access the parent's value expression
  if (
    !propertyParentNode.value ||
    propertyParentNode.value.type !== 'JSXExpressionContainer' ||
    propertyParentNode.value.expression.type === 'JSXEmptyExpression'
  ) {
    return;
  }

  const expression = propertyParentNode.value.expression;

  const spreadDeclaration = context.sourceCode
    .getScope(expression)
    .references.find(
      (ref) => ref.identifier.name === spreadIdentifierName
    )?.resolved;

  if (!spreadDeclaration) return;

  const initNode = resolveVariableInit(spreadDeclaration);

  if (!initNode || initNode.type !== 'ObjectExpression') return;

  const updatedReportMessage: ReportDescriptor<MessageIds> = {
    loc: propertyParentNode.loc,
    messageId: 'preferBackgroundColorSpecificDeclaredVariable',
    data: {
      property: spreadIdentifierName,
      variableName: spreadIdentifierName,
      line: String(property.loc.start.line),
    },
  };

  initNode.properties.forEach((spreadProperty) => {
    handleObjectProperties(
      context,
      propertyParentNode,
      spreadProperty,
      updatedReportMessage
    );
  });
};

/**
 * @description Check template literal quasis for `background:` property usage in CSS strings.
 */
const checkTemplateLiteralForBackground = (
  context: RuleContext<MessageIds, []>,
  quasis: TSESTree.TemplateElement[]
) => {
  for (const quasi of quasis) {
    if (cssBackgroundRegex.test(quasi.value.raw)) {
      const cssText = quasi.value.raw
        .replace(/[\{\}\n\r]/g, ' ')
        .trim();

      cssText.split(';').forEach((declaration) => {
        const [property] = declaration.split(':');
        if (property && checkPropertyUsesBackground(property.trim())) {
          context.report({
            node: quasi,
            messageId: 'preferBackgroundColor',
          });
        }
      });
    }
  }
};

export const PreferBackgroundColor = ESLintUtils.RuleCreator.withoutDocs({
  create(context) {
    return {
      // Handle tagged template CSS strings: css`background: red`
      TaggedTemplateExpression(node) {
        if (node.tag.type !== 'Identifier' || node.tag.name !== 'css') {
          return;
        }
        checkTemplateLiteralForBackground(context, node.quasi.quasis);
      },

      JSXAttribute(node: TSESTree.JSXAttribute) {
        if (node.name.name !== 'style' && node.name.name !== 'css') {
          return;
        }

        if (
          !node.value ||
          node.value.type !== 'JSXExpressionContainer' ||
          node.value.expression.type === 'JSXEmptyExpression'
        ) {
          return;
        }

        const expression = node.value.expression;

        /**
         * Handle variable references
         * @example
         * const codeStyle = { background: '#dd4040' };
         * <EuiCode style={codeStyle}>This is an example</EuiCode>
         */
        if (expression.type === 'Identifier') {
          const styleVariableName = expression.name;
          const nodeScope = context.sourceCode.getScope(expression);

          const resolved = nodeScope.references.find(
            (ref) => ref.identifier.name === styleVariableName
          )?.resolved;

          if (!resolved) return;

          const initNode = resolveVariableInit(resolved);
          if (!initNode) return;

          if (initNode.type === 'ObjectExpression') {
            initNode.properties.forEach((property) => {
              handleObjectProperties(context, node, property, {
                loc: property.loc,
                messageId: 'preferBackgroundColorSpecificDeclaredVariable',
                data: {
                  property: getPropertyDisplayName(property),
                  variableName: styleVariableName,
                  line: String(property.loc.start.line),
                },
              });
            });
          } else if (
            initNode.type === 'CallExpression' &&
            initNode.callee.type === 'Identifier' &&
            initNode.callee.name === 'css' &&
            initNode.arguments[0]?.type === 'ObjectExpression'
          ) {
            initNode.arguments[0].properties.forEach((property) => {
              handleObjectProperties(context, node, property, {
                loc: node.loc,
                messageId: 'preferBackgroundColorSpecificDeclaredVariable',
                data: {
                  property: getPropertyDisplayName(property),
                  variableName: styleVariableName,
                  line: String(property.loc.start.line),
                },
              });
            });
          }

          return;
        }

        /**
         * Handle inline style objects
         * @example
         * <EuiCode style={{ background: '#dd4040' }}>This is an example</EuiCode>
         */
        if (expression.type === 'ObjectExpression') {
          expression.properties.forEach((property) => {
            handleObjectProperties(context, node, property, {
              loc: property.loc,
              messageId: 'preferBackgroundColorSpecific',
              data: {
                property: getPropertyDisplayName(property),
              },
            });
          });

          return;
        }

        // Remaining handlers are specific to css prop only
        if (node.name.name !== 'css') return;

        /**
         * Handle CSS template literals
         * @example
         * <EuiCode css={`background: #dd4040`}>This is an example</EuiCode>
         */
        if (expression.type === 'TemplateLiteral') {
          checkTemplateLiteralForBackground(context, expression.quasis);
        }

        /**
         * Handle CSS functions
         * @example
         * <EuiCode css={() => ({ background: '#dd4040' })}>This is an example</EuiCode>
         */
        if (
          expression.type === 'ArrowFunctionExpression' ||
          expression.type === 'FunctionExpression'
        ) {
          let properties: TSESTree.Property[] = [];

          // Arrow function with expression body: () => ({ ... })
          if (expression.body.type === 'ObjectExpression') {
            properties = expression.body.properties.filter(
              (p): p is TSESTree.Property => p.type === 'Property'
            );
          }

          // Function with block body: () => { return { ... } }
          if (expression.body.type === 'BlockStatement') {
            const returnStatement = expression.body.body.find(
              (stmt): stmt is TSESTree.ReturnStatement =>
                stmt.type === 'ReturnStatement'
            );

            // Guard against empty returns (return;) or non-object returns
            if (
              !returnStatement ||
              !returnStatement.argument ||
              returnStatement.argument.type !== 'ObjectExpression'
            ) {
              return;
            }

            properties = returnStatement.argument.properties.filter(
              (p): p is TSESTree.Property => p.type === 'Property'
            );
          }

          if (properties.length === 0) return;

          properties.forEach((property) => {
            handleObjectProperties(context, node, property, {
              loc: property.loc,
              messageId: 'preferBackgroundColorSpecific',
              data: {
                property: getPropertyDisplayName(property),
              },
            });
          });
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
