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
  INTERACTIVE_EUI_COMPONENTS,
  INTERACTIVE_HTML_ELEMENTS,
} from './constants';
import { getElementName } from './get_element_name';
import { hasMeaningfulAttr } from './has_meaningful_attr';

const CONDITIONALLY_INTERACTIVE = new Set(
  CONDITIONALLY_INTERACTIVE_EUI_COMPONENTS
);

/** Elements that are focusable regardless of the props they receive. */
const ALWAYS_INTERACTIVE = new Set([
  ...INTERACTIVE_HTML_ELEMENTS,
  ...INTERACTIVE_EUI_COMPONENTS.filter(
    (name) => !CONDITIONALLY_INTERACTIVE.has(name)
  ),
]);

/** Props that make an element respond to user input. */
const INTERACTIVITY_PROPS = ['onClick', 'href'];

/**
 * Whether a JSX element has a prop that makes it respond to user input
 * (`onClick` or `href`) with a statically non-empty value.
 */
export function hasInteractivityProp(
  openingElement: TSESTree.JSXOpeningElement
): boolean {
  return INTERACTIVITY_PROPS.some((prop) =>
    hasMeaningfulAttr(openingElement, prop)
  );
}

/**
 * Whether a JSX element renders a focusable control.
 *
 * Native interactive HTML elements and unconditionally interactive EUI
 * components always qualify. `EuiBadge`, `EuiBetaBadge` and `EuiCard` only
 * qualify when given `onClick` or `href`; without those props they render as
 * plain display markup.
 */
export function isInteractiveElement(element: TSESTree.JSXElement): boolean {
  const name = getElementName(element.openingElement);

  if (!name) return false;
  if (ALWAYS_INTERACTIVE.has(name)) return true;

  return (
    CONDITIONALLY_INTERACTIVE.has(name) &&
    hasInteractivityProp(element.openingElement)
  );
}
