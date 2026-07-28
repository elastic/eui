/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { type TSESTree, type TSESLint, ESLintUtils } from '@typescript-eslint/utils';
import { hasSpread } from '../utils/has_spread';
import { flatMap } from '../utils/flat_map';
import { getElementName } from '../utils/get_element_name';
import { collectJsxChildren } from '../utils/collect_jsx_children';
import { findAttrValue } from '../utils/get_attr_value';

const BUTTON_GROUP = 'EuiButtonGroup';
const VALID_BUTTONS = new Set(['EuiButton', 'EuiButtonEmpty', 'EuiButtonIcon']);
const VALID_WRAPPERS = new Set(['EuiToolTip', 'EuiPopover', 'EuiCopy']);

function joinSet(set: Set<string>): string {
  const items: string[] = [];
  set.forEach((v) => items.push(v));
  return items.join(', ');
}

const VALID_BUTTONS_LIST = joinSet(VALID_BUTTONS);
const VALID_WRAPPERS_LIST = joinSet(VALID_WRAPPERS);

function isCustomComponent(name: string): boolean {
  return name[0] === name[0].toUpperCase() && !name.startsWith('Eui');
}

function reportInvalidWrapperChildren<
  TContext extends TSESLint.RuleContext<string, unknown[]>
>(
  wrapper: TSESTree.JSXElement,
  wrapperName: string,
  context: TContext
): void {
  const children = flatMap(wrapper.children, (c) =>
    collectJsxChildren(c, context.sourceCode)
  );
  for (const wc of children) {
    if (hasSpread(wc.openingElement.attributes)) continue;
    const wcName = getElementName(wc.openingElement);
    if (wcName === null || VALID_BUTTONS.has(wcName)) continue;
    context.report({
      node: wc.openingElement,
      messageId: isCustomComponent(wcName)
        ? 'invalidUnresolvableWrapperChild'
        : 'invalidWrapperChild',
      data: { name: wcName, wrapper: wrapperName },
    });
  }
}

/* Rule */

export const ButtonGroupNoInvalidChildren = ESLintUtils.RuleCreator.withoutDocs(
  {
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

          // Only validate when the variant is "default" (or absent — the default).
          // Rules for "segmented" and "selection" are added in later chunks.
          // Dynamic variant values (variables) are conservatively skipped.
          const variant = findAttrValue(
            context,
            openingElement.attributes,
            'variant'
          );
          if (variant !== undefined && variant !== 'default') return;

          const children = flatMap(node.children, (c) =>
            collectJsxChildren(c, context.sourceCode)
          );
          if (children.length === 0) return;

          for (const child of children) {
            const name = getElementName(child.openingElement);
            if (name === null) continue;

            if (VALID_BUTTONS.has(name)) continue;

            if (VALID_WRAPPERS.has(name)) {
              if (name === 'EuiToolTip') {
                // Validate JSX children (expanding fragments/conditionals).
                reportInvalidWrapperChildren(child, name, context);
              } else if (name === 'EuiPopover') {
                // The trigger is the `button` prop, not JSX children (panel
                // content). The prop value may be a JSXExpressionContainer or
                // a bare JSX element; collectJsxChildren handles both.
                // EuiToolTip wrapping the trigger button is also supported.
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

                  for (const te of triggerElements) {
                    if (hasSpread(te.openingElement.attributes)) continue;

                    const teName = getElementName(te.openingElement);

                    if (teName === null || VALID_BUTTONS.has(teName)) continue;

                    if (teName === 'EuiToolTip') {
                      // EuiToolTip wrapping the trigger — validate its children.
                      const tooltipChildren = flatMap(te.children, (c) =>
                        collectJsxChildren(c, context.sourceCode)
                      );

                      for (const ttc of tooltipChildren) {
                        if (hasSpread(ttc.openingElement.attributes)) continue;

                        const ttcName = getElementName(ttc.openingElement);

                        if (ttcName === null || VALID_BUTTONS.has(ttcName))
                          continue;

                        context.report({
                          node: ttc.openingElement,
                          messageId: 'invalidPopoverButton',
                          data: { name: ttcName },
                        });
                      }
                      continue;
                    }
                    context.report({
                      node: te.openingElement,
                      messageId: 'invalidPopoverButton',
                      data: { name: teName },
                    });
                  }
                }
              } else if (name === 'EuiCopy') {
                // Children is a render prop: {(copy) => <EuiButton />}
                // ArrowFunctionExpression with expression body is expanded by
                // collectJsxChildren, so validation works the same as EuiToolTip.
                reportInvalidWrapperChildren(child, name, context);
              }
              continue;
            }

            // For elements that aren't known valid buttons or wrappers, a spread
            // prevents static classification; skip conservatively.
            if (hasSpread(child.openingElement.attributes)) continue;

            context.report({
              node: child.openingElement,
              messageId: isCustomComponent(name)
                ? 'invalidUnresolvableChild'
                : 'invalidChild',
              data: { name },
            });
          }
        },
      };
    },
    meta: {
      type: 'problem',
      docs: {
        description: `Enforce that EuiButtonGroup children are ${VALID_BUTTONS_LIST}, or a supported wrapper (${VALID_WRAPPERS_LIST})`,
      },
      schema: [],
      messages: {
        invalidChild: [
          `{{ name }} is not a valid child of EuiButtonGroup.`,
          `Allowed children: ${VALID_BUTTONS_LIST}.`,
          `Allowed wrappers: ${VALID_WRAPPERS_LIST}.`,
        ].join(' '),
        invalidUnresolvableChild: [
          `{{ name }} cannot be verified as a valid child of EuiButtonGroup.`,
          `Allowed children: ${VALID_BUTTONS_LIST}.`,
          `Allowed wrappers: ${VALID_WRAPPERS_LIST}.`,
          `If {{ name }} is a shared button wrapper component only containing`,
          `valid button children, suppress this rule inline with a comment`,
          `explaining why it's valid.`,
          `// eslint-disable-next-line @elastic/eui/button-group-no-invalid-children -- SaveButton only wraps EuiButton`,
        ].join(' '),
        invalidPopoverButton: [
          `{{ name }} is not a valid trigger button for EuiPopover in EuiButtonGroup.`,
          `The \`button\` prop must be ${VALID_BUTTONS_LIST}.`,
        ].join(' '),
        invalidWrapperChild: [
          `{{ name }} inside {{ wrapper }} is not a valid button for EuiButtonGroup.`,
          `The wrapper must contain ${VALID_BUTTONS_LIST}.`,
        ].join(' '),
        invalidUnresolvableWrapperChild: [
          `{{ name }} inside {{ wrapper }} cannot be verified as a valid button for EuiButtonGroup.`,
          `The wrapper must contain ${VALID_BUTTONS_LIST}.`,
          `If {{ name }} is a shared button wrapper component, suppress this rule inline`,
          `with a comment explaining why it renders valid button children:`,
          `// eslint-disable-next-line @elastic/eui/button-group-no-invalid-children -- SaveButton wraps EuiButton`,
        ].join(' '),
      },
    },
    defaultOptions: [],
  }
);
