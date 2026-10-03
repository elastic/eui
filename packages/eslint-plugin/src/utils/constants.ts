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
  'EuiBadge',
  'EuiBasicTable',
  'EuiBetaBadge',
  'EuiBreadcrumbs',
  'EuiButton',
  'EuiButtonEmpty',
  'EuiButtonGroup',
  'EuiButtonIcon',
  'EuiCard',
  'EuiCheckableCard',
  'EuiCheckbox',
  'EuiColorPicker',
  'EuiComboBox',
  'EuiContextMenuItem',
  'EuiDatePicker',
  'EuiDualRange',
  'EuiFacetButton',
  'EuiFieldNumber',
  'EuiFieldPassword',
  'EuiFieldSearch',
  'EuiFieldText',
  'EuiFilterButton',
  'EuiFilterSelectItem',
  'EuiFilterSelectable',
  'EuiHeaderLink',
  'EuiHeaderLogo',
  'EuiHeaderSectionItemButton',
  'EuiInMemoryTable',
  'EuiKeyPadMenuItem',
  'EuiLink',
  'EuiListGroupItem',
  'EuiPagination',
  'EuiPinnableListGroup',
  'EuiRadio',
  'EuiRange',
  'EuiSelect',
  'EuiSelectable',
  'EuiSideNav',
  'EuiStepHorizontal',
  'EuiSuperDatePicker',
  'EuiSuperSelect',
  'EuiSwitch',
  'EuiTab',
  'EuiTextArea',
  'EuiTreeView'
];

/**
 * EUI components that render a focusable element only when given one of the
 * listed props. Without them they render plain, non-focusable markup — a
 * `<span>`, `<div>`, or `<li>` — so rules that need an unconditionally
 * interactive element must check the props rather than the name alone.
 *
 * - `EuiBadge` / `EuiBetaBadge` render a `<span>` unless clickable.
 * - `EuiCard` renders a plain panel; `selectable` also makes it clickable by
 *   rendering an `EuiCardSelect` button.
 * - `EuiContextMenuItem` renders a `<div>` unless it has an action, and is a
 *   `<button>` when given `toolTipContent`.
 * - `EuiHeaderLogo` renders an `<a>` without an `href` attribute, which is not
 *   focusable.
 * - `EuiListGroupItem` renders an `<li>` unless it has an action.
 */
export const CONDITIONALLY_INTERACTIVE_EUI_COMPONENTS: Record<string, string[]> =
  {
    EuiBadge: ['iconOnClick', 'onClick', 'href'],
    EuiBetaBadge: ['tooltipContent', 'onClick', 'href'],
    EuiCard: ['onClick', 'href', 'selectable'],
    EuiContextMenuItem: ['onClick', 'href', 'toolTipContent'],
    EuiHeaderLogo: ['href'],
    EuiListGroupItem: ['onClick', 'href'],
  };

/**
 * Native HTML elements that are focusable only when given one of the listed
 * attributes. An `<a>` without `href` is not a link and is not focusable.
 */
export const CONDITIONALLY_INTERACTIVE_HTML_ELEMENTS: Record<string, string[]> =
  {
    a: ['href'],
  };

/**
 * Conditional interactive props whose presence alone is enough to make the
 * rendered element focusable, even when the statically-known value is `""`.
 *
 * Native anchors and `EuiHeaderLogo` both forward `href=""` to the DOM, which
 * still creates a focusable same-document link.
 */
export const PRESENCE_INTERACTIVE_PROPS: Record<string, string[]> = {
  a: ['href'],
  EuiHeaderLogo: ['href'],
};

export const HTML_TEXT_ELEMENTS = new Set([
  'p',
  'span',
  'strong',
  'em',
  'b',
  'i',
  'small',
  'code',
]);

export const EUI_TEXT_COMPONENTS = new Set([
  'EuiText',
  'EuiTextColor',
  'EuiTextAlign',
  'EuiCode',
  'EuiMark',
  'EuiHighlight',
]);

export const HTML_ACTION_ELEMENTS = new Set(['button', 'a']);

/** Native HTML elements that are focusable and respond to user input. */
export const INTERACTIVE_HTML_ELEMENTS = [
  'a',
  'button',
  'input',
  'select',
  'textarea',
];

/**
 * Transparent layout wrappers inside `EuiCallOut` children that the rule should
 * traverse rather than treat as opaque custom components.
 */
export const CALLOUT_LAYOUT_CONTAINERS = new Set([
  'Fragment',
  'EuiFlexGroup',
  'EuiFlexGrid',
  'EuiFlexItem',
  'div',
]);

/**
 * Third-party i18n components that render plain text and are common in EUI consumers
 * (e.g. `FormattedMessage` from react-intl used extensively in Kibana).
 * Rules treat these the same as `HTML_TEXT_ELEMENTS` / `EUI_TEXT_COMPONENTS`.
 */
export const I18N_TEXT_COMPONENTS = new Set(['FormattedMessage']);

/**
 * EUI components that render their content **inside** a single focusable
 * `<button>` or `<a>`.
 *
 * Nesting another interactive element in their content produces invalid HTML
 * (e.g. `<button>` inside `<button>`) and leaves the inner control unreachable
 * or ambiguous for keyboard and screen-reader users.
 *
 * This is deliberately narrower than `INTERACTIVE_EUI_COMPONENTS`, which also
 * contains composite components (`EuiBasicTable`, `EuiSelectable`, `EuiSideNav`,
 * …) whose entire purpose is to host controls.
 */
export const LEAF_INTERACTIVE_EUI_COMPONENTS = [
  'EuiButton',
  'EuiButtonEmpty',
  'EuiButtonIcon',
  'EuiContextMenuItem',
  'EuiFacetButton',
  'EuiFilterButton',
  'EuiHeaderLink',
  'EuiHeaderSectionItemButton',
  'EuiKeyPadMenuItem',
  'EuiLink',
  'EuiListGroupItem',
  'EuiStepHorizontal',
  'EuiTab',
];
