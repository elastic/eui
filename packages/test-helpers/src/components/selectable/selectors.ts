/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

/**
 * Stable selectors for
 * {@link https://eui.elastic.co/docs/components/forms/selection/selectable/|EuiSelectable}.
 * `*_SELECTOR` values are CSS.
 */
export const EuiSelectableSelectors = {
  /** Root element (the `.euiSelectable` container carrying the consumer's `data-test-subj`). */
  ROOT_SELECTOR: '.euiSelectable',

  /** The search box, present only when the selectable is `searchable`. */
  SEARCH_SELECTOR: '.euiSelectableSearch',
};
