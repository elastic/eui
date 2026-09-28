/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import type { TSESTree } from '@typescript-eslint/utils';
import {
  CONDITIONALLY_INTERACTIVE_EUI_COMPONENTS,
  CONDITIONALLY_INTERACTIVE_HTML_ELEMENTS,
  INTERACTIVE_EUI_COMPONENTS,
  INTERACTIVE_HTML_ELEMENTS,
  PRESENCE_INTERACTIVE_PROPS,
} from './constants';
import { getElementName } from './get_element_name';
import { hasMeaningfulAttr } from './has_meaningful_attr';

/** Elements focusable only when given one of the listed props. */
const CONDITIONALLY_INTERACTIVE: Record<string, string[]> = {
  ...CONDITIONALLY_INTERACTIVE_HTML_ELEMENTS,
  ...CONDITIONALLY_INTERACTIVE_EUI_COMPONENTS,
};

/** Elements that are focusable regardless of the props they receive. */
const ALWAYS_INTERACTIVE = new Set(
  [...INTERACTIVE_HTML_ELEMENTS, ...INTERACTIVE_EUI_COMPONENTS].filter(
    (name) => !CONDITIONALLY_INTERACTIVE[name]
  )
);

/** Props that make an element respond to user input. */
const INTERACTIVITY_PROPS = ['onClick', 'href'];

/**
 * Whether any of `propNames` is present on the element with a statically
 * non-empty value. Dynamic values (`prop={maybe}`) count as present, since
 * their runtime value is unknown.
 */
export function hasAnyProp(
  openingElement: TSESTree.JSXOpeningElement,
  propNames: string[],
  presenceOnlyProps = new Set<string>()
): boolean {
  return propNames.some((prop) => {
      const attr = openingElement.attributes.find(
        (attr): attr is TSESTree.JSXAttribute =>
          attr.type === 'JSXAttribute' &&
          attr.name.type === 'JSXIdentifier' &&
          attr.name.name === prop
      );
      if (!attr) return false;
      return (
        hasMeaningfulAttr(openingElement, prop) ||
        (attr.value?.type === 'Literal' && attr.value.value === '') ||
        (attr.value?.type === 'JSXExpressionContainer' &&
          attr.value.expression.type === 'Literal' &&
          attr.value.expression.value === '')
      );

    return hasMeaningfulAttr(openingElement, prop);
  });
}

/**
 * Whether an element has a prop that makes it respond to user input
 * (`onClick` or `href`).
 */
export function hasInteractivityProp(
  openingElement: TSESTree.JSXOpeningElement
): boolean {
  return hasAnyProp(openingElement, INTERACTIVITY_PROPS);
}

/**
 * Whether a JSX element renders a focusable control.
 *
 * Native interactive HTML elements and unconditionally interactive EUI
 * components always qualify. Everything in
 * `CONDITIONALLY_INTERACTIVE_EUI_COMPONENTS` and
 * `CONDITIONALLY_INTERACTIVE_HTML_ELEMENTS` — `EuiBadge`, `EuiListGroupItem`,
 * a bare `<a>`, … — qualifies only when given a prop that makes it focusable.
 */
export function isInteractiveElement(element: TSESTree.JSXElement): boolean {
  const name = getElementName(element.openingElement);

  if (!name) return false;

  const conditionalProps = CONDITIONALLY_INTERACTIVE[name];

  if (conditionalProps) {
    return hasAnyProp(
      element.openingElement,
      conditionalProps,
      new Set(PRESENCE_INTERACTIVE_PROPS[name] ?? [])
    );
  }

  return ALWAYS_INTERACTIVE.has(name);
}
