/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import {
  type TSESTree,
  type TSESLint,
  ESLintUtils,
} from '@typescript-eslint/utils';
import { hasSpread } from '../utils/has_spread';
import { flatMap } from '../utils/flat_map';
import { getElementName } from '../utils/get_element_name';
import { findAttrValue } from '../utils/get_attr_value';
import { hasMeaningfulAttr } from '../utils/has_meaningful_attr';
import { collectJsxChildren } from '../utils/collect_jsx_children';
import {
  BUTTON_GROUP,
  SELECTION_VALID_BUTTONS,
  VALID_WRAPPERS,
} from '../utils/button_group_constants';

function checkButtonForId<
  TContext extends TSESLint.RuleContext<string, unknown[]>,
>(element: TSESTree.JSXElement, context: TContext): void {
  const name = getElementName(element.openingElement);
  if (name === null || !SELECTION_VALID_BUTTONS.has(name)) return;

  const { attributes } = element.openingElement;
  if (hasMeaningfulAttr(element.openingElement, 'id')) return;
  if (hasSpread(attributes)) return;

  context.report({
    node: element.openingElement,
    messageId: 'missingId',
    data: { name },
  });
}

export const ButtonGroupSelectionRequireId =
  ESLintUtils.RuleCreator.withoutDocs({
    create(context) {
      return {
        JSXElement(node) {
          const { openingElement } = node;

          if (
            openingElement.name.type !== 'JSXIdentifier' ||
            openingElement.name.name !== BUTTON_GROUP
          ) {
            return;
          }

          // Only validate variant="selection". Dynamic or other variants are skipped.
          const variant = findAttrValue(
            context,
            openingElement.attributes,
            'variant'
          );
          if (variant !== 'selection') return;

          const children = flatMap(node.children, (c) =>
            collectJsxChildren(c, context.sourceCode)
          );
          if (children.length === 0) return;

          for (const child of children) {
            const name = getElementName(child.openingElement);
            if (name === null) continue;

            if (SELECTION_VALID_BUTTONS.has(name)) {
              checkButtonForId(child, context);
              continue;
            }

            if (VALID_WRAPPERS.has(name)) {
              if (name === 'EuiToolTip') {
                const wrapperChildren = flatMap(child.children, (c) =>
                  collectJsxChildren(c, context.sourceCode)
                );
                for (const wrapperChild of wrapperChildren) {
                  checkButtonForId(wrapperChild, context);
                }
              } else if (name === 'EuiPopover') {
                const buttonProp = child.openingElement.attributes.find(
                  (attr): attr is TSESTree.JSXAttribute =>
                    attr.type === 'JSXAttribute' &&
                    attr.name.type === 'JSXIdentifier' &&
                    attr.name.name === 'button'
                );

                if (buttonProp?.value != null) {
                  const triggerElements = collectJsxChildren(
                    buttonProp.value as TSESTree.Node,
                    context.sourceCode
                  );

                  for (const triggerElement of triggerElements) {
                    const triggerName = getElementName(
                      triggerElement.openingElement
                    );
                    if (triggerName === null) continue;

                    if (SELECTION_VALID_BUTTONS.has(triggerName)) {
                      checkButtonForId(triggerElement, context);
                      continue;
                    }

                    if (triggerName === 'EuiToolTip') {
                      // EuiToolTip wrapping the popover trigger — check its children.
                      const tooltipChildren = flatMap(
                        triggerElement.children,
                        (c) => collectJsxChildren(c, context.sourceCode)
                      );
                      for (const tooltipChild of tooltipChildren) {
                        checkButtonForId(tooltipChild, context);
                      }
                    }
                  }
                }
              } else if (name === 'EuiCopy') {
                // Children is a render prop; walkJsxChildren expands it.
                const wrapperChildren = flatMap(child.children, (c) =>
                  collectJsxChildren(c, context.sourceCode)
                );
                for (const wrapperChild of wrapperChildren) {
                  checkButtonForId(wrapperChild, context);
                }
              }
              continue;
            }

            // Non-button, non-wrapper children are skipped — the other rule handles those.
          }
        },
      };
    },
    meta: {
      type: 'problem',
      docs: {
        description:
          'Enforce that EuiButtonGroup children have an id prop when variant="selection"',
      },
      schema: [],
      messages: {
        missingId: [
          `{{ name }} inside EuiButtonGroup with variant="selection" is missing a required id prop.`,
          `Each button must have a unique id so the group can track selection state.`,
        ].join(' '),
      },
    },
    defaultOptions: [],
  });
