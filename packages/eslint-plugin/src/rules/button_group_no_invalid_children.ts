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
import { collectJsxChildren } from '../utils/collect_jsx_children';
import {
  BUTTON_GROUP,
  VALID_BUTTONS,
  SEGMENTED_VALID_BUTTONS,
  SELECTION_VALID_BUTTONS,
  VALID_WRAPPERS,
} from '../utils/button_group_constants';

const VALID_WRAPPERS_LIST = Array.from(VALID_WRAPPERS).join(', ');

function isCustomComponent(name: string): boolean {
  return name[0] === name[0].toUpperCase();
}

function reportInvalidWrapperChildren<
  TContext extends TSESLint.RuleContext<string, unknown[]>,
>(
  wrapper: TSESTree.JSXElement,
  wrapperName: string,
  context: TContext,
  validButtons: Set<string>,
  allowed: string,
  seenButtonTypes?: Set<string>
): void {
  const children = flatMap(wrapper.children, (c) =>
    collectJsxChildren(c, context.sourceCode)
  );
  for (const wrapperChild of children) {
    if (hasSpread(wrapperChild.openingElement.attributes)) continue;

    const wrapperChildName = getElementName(wrapperChild.openingElement);

    if (wrapperChildName === null) continue;

    if (validButtons.has(wrapperChildName)) {
      seenButtonTypes?.add(wrapperChildName);
      continue;
    }
    context.report({
      node: wrapperChild.openingElement,
      messageId: isCustomComponent(wrapperChildName) && !VALID_BUTTONS.has(wrapperChildName)
        ? 'invalidUnresolvableWrapperChild'
        : 'invalidWrapperChild',
      data: { name: wrapperChildName, wrapper: wrapperName, allowed },
    });
  }
}

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

          // Validate "default", "segmented", and "selection" variants.
          // Dynamic variant values (variables) are conservatively skipped.
          const variant = findAttrValue(
            context,
            openingElement.attributes,
            'variant'
          );
          if (
            variant !== undefined &&
            variant !== 'default' &&
            variant !== 'segmented' &&
            variant !== 'selection'
          )
            return;

          const isSegmented = variant === 'segmented';
          const isSelection = variant === 'selection';
          const validButtons =
            isSegmented || isSelection
              ? SEGMENTED_VALID_BUTTONS
              : VALID_BUTTONS;
          const allowed = Array.from(validButtons).join(', ');

          const children = flatMap(node.children, (c) =>
            collectJsxChildren(c, context.sourceCode)
          );
          if (children.length === 0) return;

          // Collect seen button types for the segmented/selection mixed-type check.
          // Populated during the main loop to avoid a second traversal.
          const seenButtonTypes =
            isSegmented || isSelection ? new Set<string>() : null;

          for (const child of children) {
            const name = getElementName(child.openingElement);
            if (name === null) continue;

            if (validButtons.has(name)) {
              seenButtonTypes?.add(name);
              continue;
            }

            if (VALID_WRAPPERS.has(name)) {
              if (name === 'EuiToolTip') {
                // Validate JSX children (expanding fragments/conditionals).
                // Also collects button types for the segmented mixed-type check.
                reportInvalidWrapperChildren(
                  child,
                  name,
                  context,
                  validButtons,
                  allowed,
                  seenButtonTypes ?? undefined
                );
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

                  for (const triggerElement of triggerElements) {
                    if (hasSpread(triggerElement.openingElement.attributes))
                      continue;

                    const triggerElementName = getElementName(
                      triggerElement.openingElement
                    );

                    if (triggerElementName === null) continue;

                    if (validButtons.has(triggerElementName)) {
                      seenButtonTypes?.add(triggerElementName);
                      continue;
                    }

                    if (triggerElementName === 'EuiToolTip') {
                      // EuiToolTip wrapping the trigger — validate its children.
                      const tooltipChildren = flatMap(
                        triggerElement.children,
                        (c) => collectJsxChildren(c, context.sourceCode)
                      );

                      for (const tooltipChild of tooltipChildren) {
                        if (hasSpread(tooltipChild.openingElement.attributes))
                          continue;

                        const tooltipChildName = getElementName(
                          tooltipChild.openingElement
                        );

                        if (tooltipChildName === null) continue;

                        if (validButtons.has(tooltipChildName)) {
                          seenButtonTypes?.add(tooltipChildName);
                          continue;
                        }

                        context.report({
                          node: tooltipChild.openingElement,
                          messageId: isCustomComponent(tooltipChildName) && !VALID_BUTTONS.has(tooltipChildName)
                            ? 'invalidUnresolvablePopoverButton'
                            : 'invalidPopoverButton',
                          data: { name: tooltipChildName, allowed },
                        });
                      }
                      continue;
                    }
                    context.report({
                      node: triggerElement.openingElement,
                      messageId: isCustomComponent(triggerElementName) && !VALID_BUTTONS.has(triggerElementName)
                        ? 'invalidUnresolvablePopoverButton'
                        : 'invalidPopoverButton',
                      data: { name: triggerElementName, allowed },
                    });
                  }
                }
              } else if (name === 'EuiCopy') {
                // Children is a render prop: {(copy) => <EuiButton />}
                // ArrowFunctionExpression with expression body is expanded by
                // collectJsxChildren, so validation works the same as EuiToolTip.
                // Also collects button types for the segmented mixed-type check.
                reportInvalidWrapperChildren(
                  child,
                  name,
                  context,
                  validButtons,
                  allowed,
                  seenButtonTypes ?? undefined
                );
              }
              continue;
            }

            // For elements that aren't known valid buttons or wrappers, a spread
            // prevents static classification; skip conservatively.
            if (hasSpread(child.openingElement.attributes)) continue;

            context.report({
              node: child.openingElement,
              messageId: isCustomComponent(name) && !VALID_BUTTONS.has(name)
                ? 'invalidUnresolvableChild'
                : 'invalidChild',
              data: { name, allowed },
            });
          }

          // For segmented/selection, all children must be the same button type —
          // either all EuiButton or all EuiButtonIcon. Types are collected during
          // the main loop above, including from EuiToolTip, EuiPopover, and EuiCopy.
          if (
            seenButtonTypes?.has('EuiButton') &&
            seenButtonTypes.has('EuiButtonIcon')
          ) {
            context.report({
              node: openingElement,
              messageId: 'invalidMixedTypes',
              data: { variant: isSelection ? 'selection' : 'segmented' },
            });
          }
        },
      };
    },
    meta: {
      type: 'problem',
      docs: {
        description: `Enforce that EuiButtonGroup children are valid button components, or a supported wrapper (${VALID_WRAPPERS_LIST})`,
      },
      schema: [],
      messages: {
        invalidChild: [
          `{{ name }} is not a valid child of EuiButtonGroup.`,
          `Allowed children: {{ allowed }}.`,
          `Allowed wrappers: ${VALID_WRAPPERS_LIST}.`,
        ].join(' '),
        invalidUnresolvableChild: [
          `{{ name }} cannot be verified as a valid child of EuiButtonGroup.`,
          `Allowed children: {{ allowed }}.`,
          `Allowed wrappers: ${VALID_WRAPPERS_LIST}.`,
          `If {{ name }} is a shared button wrapper component only containing`,
          `valid button children, suppress this rule inline with a comment`,
          `explaining why it's valid.`,
          `// eslint-disable-next-line @elastic/eui/button-group-no-invalid-children -- SaveButton only wraps EuiButton`,
        ].join(' '),
        invalidPopoverButton: [
          `{{ name }} is not a valid trigger button for EuiPopover in EuiButtonGroup.`,
          `The \`button\` prop must be {{ allowed }}.`,
        ].join(' '),
        invalidUnresolvablePopoverButton: [
          `{{ name }} cannot be verified as a valid trigger button for EuiPopover in EuiButtonGroup.`,
          `The \`button\` prop must be {{ allowed }}.`,
          `If {{ name }} is a shared button wrapper component only containing`,
          `valid button children, suppress this rule inline with a comment`,
          `explaining why it's valid.`,
          `// eslint-disable-next-line @elastic/eui/button-group-no-invalid-children -- SaveButton only wraps EuiButton`,
        ].join(' '),
        invalidWrapperChild: [
          `{{ name }} inside {{ wrapper }} is not a valid button for EuiButtonGroup.`,
          `The wrapper must contain {{ allowed }}.`,
        ].join(' '),
        invalidUnresolvableWrapperChild: [
          `{{ name }} inside {{ wrapper }} cannot be verified as a valid button for EuiButtonGroup.`,
          `The wrapper must contain {{ allowed }}.`,
          `If {{ name }} is a shared button wrapper component, suppress this rule inline`,
          `with a comment explaining why it renders valid button children:`,
          `// eslint-disable-next-line @elastic/eui/button-group-no-invalid-children -- SaveButton wraps EuiButton`,
        ].join(' '),
        invalidMixedTypes: [
          `EuiButtonGroup with variant="{{ variant }}" must use a single button type throughout.`,
          `Use either all EuiButton or all EuiButtonIcon children — not both.`,
        ].join(' '),
      },
    },
    defaultOptions: [],
  }
);
