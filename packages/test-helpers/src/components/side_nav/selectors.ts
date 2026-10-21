/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

/**
 * Stable selectors for
 * {@link https://eui.elastic.co/docs/components/navigation/side-nav/|EuiSideNav}.
 * `*_SELECTOR` values are CSS.
 */
export const EuiSideNavSelectors = {
  /** The `<nav>` root carrying the consumer's `data-test-subj`. */
  ROOT_SELECTOR: '.euiSideNav',

  /** An item wrapper at any depth. Closed branches are not rendered at all. */
  ITEM_SELECTOR: '.euiSideNavItem',

  /** The clickable part of an item, an `<a>`, `<button>` or `<div>` depending on its props. */
  ITEM_BUTTON_SELECTOR: '.euiSideNavItemButton',

  /** The item button of the selected item. */
  SELECTED_ITEM_BUTTON_SELECTOR: '.euiSideNavItemButton-isSelected',

  /** The item button of an expanded accordion item. */
  OPEN_ITEM_BUTTON_SELECTOR: '.euiSideNavItemButton-isOpen',

  /** The text label inside an item button. */
  ITEM_LABEL_SELECTOR: '.euiSideNavItemButton__label',

  /** The container of an item's child items, rendered only while open. */
  CHILD_ITEMS_SELECTOR: '.euiSideNavItem__items',
};
