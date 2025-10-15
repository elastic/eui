/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

/**
 * A list of standard HTML tags that are considered **non-interactive** elements.
 *
 * These tags generally do not provide any built-in user interaction
 * (such as click, input, or focus behavior) and are typically used for
 * layout, structure, or content presentation rather than direct
 * interactivity.
 *
 * This constant can be useful when:
 * - Determining whether an element should be treated as interactive.
 * - Enforcing accessibility rules (e.g., ensuring interactive behavior is only applied to proper elements).
 * - Filtering DOM nodes when processing or analyzing HTML structures.
 */
export const NON_INTERACTIVE_HTML_TAGS = [
  'div',
  'span',
  'p',
  'article',
  'aside',
  'blockquote',
  'br',
  'caption',
  'code',
  'dd',
  'dl',
  'dt',
  'figcaption',
  'figure',
  'h1',
  'h2',
  'h3',
  'h4',
  'h5',
  'h6',
  'hr',
  'img',
  'li',
  'main',
  'nav',
  'ol',
  'pre',
  'section',
  'small',
  'strong',
  'sub',
  'sup',
  'table',
  'tbody',
  'td',
  'tfoot',
  'th',
  'thead',
  'tr',
  'ul'
];

/**
 * A list of Elastic UI (EUI) React components that are considered **interactive**.
 *
 * These components are designed to be focusable and respond to user actions
 * such as clicks, keyboard events, or other interactions. Use this constant
 * when you need to determine if a given EUI component is inherently interactive,
 * for example, when enforcing accessibility rules or filtering components
 * for focus management.
 *
 * This list should be kept up to date with EUI's interactive component offerings.
 */
export const INTERACTIVE_EUI_COMPONENTS = [
  'EuiLink',
  'EuiButton',
  'EuiButtonEmpty',
  'EuiButtonIcon',
  'EuiFacetButton',
  'EuiHeaderLink',
  'EuiHeaderSectionItemButton',
  'EuiHeaderLogo',
  'EuiListGroupItem',
  'EuiPinnableListGroup',
  'EuiSideNav',
  'EuiBreadcrumbs',
  'EuiTab',
  'EuiContextMenuItem',
  'EuiKeyPadMenuItem',
  'EuiPagination',
  'EuiTreeView',
  'EuiStepHorizontal',
  'EuiCard',
  'EuiCheckableCard',
  'EuiBasicTable',
  'EuiInMemoryTable',
  'EuiFilterButton',
  'EuiFilterSelectItem',
  'EuiFilterSelectable',
  'EuiBadge',
  'EuiBetaBadge',
  'EuiSelectable',
  'EuiComboBox',
  'EuiSuperSelect',
  'EuiSelect',
  'EuiCheckbox',
  'EuiRadio',
  'EuiSwitch',
  'EuiButtonGroup',
  'EuiRange',
  'EuiDualRange',
  'EuiColorPicker',
  'EuiDatePicker',
  'EuiSuperDatePicker'
];
