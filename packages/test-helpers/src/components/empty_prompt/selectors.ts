/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

/**
 * Stable selectors for
 * {@link https://eui.elastic.co/docs/components/display/empty-prompt/|EuiEmptyPrompt}.
 * `*_SELECTOR` values are CSS.
 */
export const EuiEmptyPromptSelectors = {
  /** The panel carrying the consumer's `data-test-subj`. */
  ROOT_SELECTOR: '.euiEmptyPrompt',

  /** The block holding the icon and the content, everything but the footer. */
  MAIN_SELECTOR: '.euiEmptyPrompt__main',

  /** The icon wrapper, rendered only with `icon` or `iconType`. */
  ICON_SELECTOR: '.euiEmptyPrompt__icon',

  /** The block holding the title, the body and the actions. */
  CONTENT_SELECTOR: '.euiEmptyPrompt__content',

  /** The title, a direct child of the content, rendered only with `title`. */
  TITLE_SELECTOR: '.euiEmptyPrompt__content > .euiTitle',

  /** The body text, a direct child of the content, rendered only with `body`. */
  BODY_SELECTOR: '.euiEmptyPrompt__content > .euiText',

  /** The wrapper around the actions, rendered only when `actions` is an array. */
  ACTIONS_SELECTOR: '.euiEmptyPrompt__actions',

  /** The footer, rendered only with `footer`. */
  FOOTER_SELECTOR: '.euiEmptyPrompt__footer',
};
