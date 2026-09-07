/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

/**
 * Stable selectors for
 * {@link https://eui.elastic.co/docs/components/forms/filter-group/|EuiFilterButton}.
 * `*_SELECTOR` values are CSS, `*_CLASS` values are class names to check for
 * membership (e.g. via `toHaveClass`).
 */
export const EuiFilterButtonSelectors = {
  /** Root element (the button itself carries the consumer's `data-test-subj`). */
  ROOT_SELECTOR: '.euiFilterButton',

  /** The notification badge, present only when `numFilters` or `numActiveFilters` is set. */
  NOTIFICATION_SELECTOR: '.euiFilterButton__notification',

  /** Set when `hasActiveFilters` is true. */
  HAS_ACTIVE_FILTERS_CLASS: 'euiFilterButton-hasActiveFilters',

  /** Set when `isSelected` is true (e.g. a popover-toggle button while its popover is open). */
  IS_SELECTED_CLASS: 'euiFilterButton-isSelected',
};
