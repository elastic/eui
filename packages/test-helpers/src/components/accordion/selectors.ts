/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

/**
 * Stable selectors for
 * {@link https://eui.elastic.co/docs/components/containers/accordion/|EuiAccordion}.
 * `*_SELECTOR` values are CSS, scoped to direct children (`>`) so a nested
 * accordion inside `content` never matches these instead of this instance's
 * own elements.
 */
export const EuiAccordionSelectors = {
  /** Root element carrying the consumer's `data-test-subj`. */
  ROOT_SELECTOR: '.euiAccordion',

  /** The trigger button. `aria-expanded` on it reflects open state synchronously. */
  TRIGGER_SELECTOR: '> .euiAccordion__triggerWrapper > .euiAccordion__button',

  /** The children wrapper. `height: 0` and `opacity: 0` while closed, so Playwright treats its contents as not visible. */
  CONTENT_SELECTOR: '> .euiAccordion__childWrapper',
};
