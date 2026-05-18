# `@elastic/eslint-plugin-eui`

This package contains an eslint plugin that enforces some default rules for using EUI.

## Setup

1. Install `@elastic/eslint-plugin-eui` as a dev dependency.
2. Extend `plugin:@elastic/eui/recommended` in your ESLint config.

## Rules

### `@elastic/eui/href-or-on-click`

`<EuiButton />` should either be a button or a link, for a11y purposes. When given an `href` the button behaves as a link, otherwise an `onClick` handler is expected and it will behave as a button.

### `@elastic/eui/href-or-on-click`

`<EuiButton />` should either be a button or a link, for a11y purposes. When given an `href` the button behaves as a link, otherwise an `onClick` handler is expected and it will behave as a button.

In some cases it makes sense to disable this rule locally, such as when <kbd>cmd</kbd> + click should open the link in a new tab, but a standard click should use the `history.pushState()` API to change the URL without triggering a full page load.

**Exception**: `EuiLink` has to be provided with both `onClick` and `href` so that it renders as an anchor and support Ctrl/Cmd+Click to open in a new tab, and other standard link interactions. See `@elastic/eui/require-href-for-link`.

### `@elastic/eui/no-restricted-eui-imports`

At times, we deprecate features that may need more highlighting and/or that are not possible to annotate with JSDoc `@deprecated`, e.g. JSON token imports: `@elastic/eui/dist/eui_theme_*.json` (for context: https://github.com/elastic/kibana/issues/199715#json-tokens).

We don't use `no-restricted-imports` because ESLint doesn't allow multiple error levels at once and it may conflict with the consumer's existing ESLint configuration for that rule. We need to assure that our rule will produce a warning (as a recommendation).

All deprecations still must follow our [deprecation process](../../wiki/eui-team-processes/deprecations.md).

### `@elastic/eui/no-css-color`

This rule warns engineers to not use literal css color in the codebase, particularly for CSS properties that apply color to either the html element or text nodes, but rather urge users to defer to using the color tokens provided by EUI.

This rule kicks in on the following JSXAttributes; `style`, `className` and `css` and supports various approaches to providing styling declarations.

#### Example

The following code:

```tsx
// Filename: /x-pack/plugins/observability_solution/observability/public/my_component.tsx

import React from 'react';
import { EuiText } from '@elastic/eui';

function MyComponent() {
    return (
        <EuiText style={{ color: 'red' }}>You know, for search</EuiText>
    )
}
```

```tsx
// Filename: /x-pack/plugins/observability_solution/observability/public/my_component.tsx

import React from 'react';
import { EuiText } from '@elastic/eui';

function MyComponent() {

    const style = {
        color: 'red'
    }

    return (
        <EuiText style={{ color: style.color }}>You know, for search</EuiText>
    )
}
```

```tsx
// Filename: /x-pack/plugins/observability_solution/observability/public/my_component.tsx

import React from 'react';
import { EuiText } from '@elastic/eui';

function MyComponent() {
    const colorValue = '#dd4040';

    return (
        <EuiText style={{ color: colorValue }}>You know, for search</EuiText>
    )
}
```

will all raise an eslint report with an appropriate message of severity that matches the configuration of the rule, further more all the examples above
will also match for when the attribute in question is `css`. The `css` attribute will also raise a report the following cases below;

```tsx
// Filename: /x-pack/plugins/observability_solution/observability/public/my_component.tsx

import React from 'react';
import { css } from '@emotion/css';
import { EuiText } from '@elastic/eui';

function MyComponent() {
    return (
        <EuiText css={css`color: '#dd4040' `}>You know, for search</EuiText>
    )
}
```

```tsx
// Filename: /x-pack/plugins/observability_solution/observability/public/my_component.tsx

import React from 'react';
import { EuiText } from '@elastic/eui';

function MyComponent() {
    return (
        <EuiText css={() => ({ color: '#dd4040' })}>You know, for search</EuiText>
    )
}
```

A special case is also covered for the `className` attribute, where the rule will also raise a report for the following case below;


```tsx
// Filename: /x-pack/plugins/observability_solution/observability/public/my_component.tsx

import React from 'react';
import { css } from '@emotion/css';
import { EuiText } from '@elastic/eui';

function MyComponent() {
    return (
        <EuiText className={css`color: '#dd4040'`}>You know, for search</EuiText>
    )
}
```
It's worth pointing out that although the examples provided are specific to EUI components, this rule applies to all JSX elements.

### `@elastic/eui/require-aria-label-for-modals`

Ensure that EUI modal components (`EuiModal`, `EuiFlyout`, `EuiFlyoutResizable` ,`EuiConfirmModal`, `EuiPopover`, `EuiWrappingPopover`) have either an `aria-label` or `aria-labelledby` prop for accessibility. This helps screen reader users understand the purpose and content of modal dialogs.

### `@elastic/eui/consistent-is-invalid-props`

Ensure that form control components within `EuiFormRow` components have matching `isInvalid` prop values. This maintains consistent validation state between parent form rows and their child form controls, leading to a more predictable and accessible user experience.

### `@elastic/eui/sr-output-disabled-tooltip`

Ensure `disableScreenReaderOutput` is set when `EuiToolTip` content matches `EuiButtonIcon` "aria-label".

### `@elastic/eui/prefer-eui-icon-tip`

Ensure `EuiIconTip` is used rather than `<EuiToolTip><EuiIcon/></EuiToolTip>`, as it provides better accessibility and improved support for assistive technologies.

### `@elastic/eui/no-unnamed-radio-group`

Ensure that all radio input components (`EuiRadio`, `EuiRadioGroup`) have a `name` attribute. The `name` attribute is required for radio inputs to be grouped correctly, allowing users to select only one option from a set. Without a `name`, radios may not behave as expected and can cause accessibility issues for assistive technologies.

### `@elastic/eui/callout-announce-on-mount`

Ensure that `EuiCallOut` components rendered conditionally have the `announceOnMount` prop for better accessibility. When callouts appear dynamically (e.g., after user interactions, form validation errors, or status changes), screen readers may not announce their content to users. The `announceOnMount` prop ensures these messages are properly announced to users with assistive technologies.

### `@elastic/eui/no-unnamed-interactive-element`

Ensure that appropriate aria-attributes are set for `EuiBetaBadge`, `EuiButtonIcon`, `EuiComboBox`, `EuiSelect`, `EuiSelectWithWidth`,`EuiSuperSelect`,`EuiPagination`, `EuiTreeView`, `EuiBreadcrumbs`. Without this rule, screen reader users lose context, keyboard navigation can be confusing.

### `@elastic/eui/tooltip-focusable-anchor`

Ensure `EuiTooltip` components are anchored to elements that can receive keyboard focus, making them accessible to all users. When using non-interactive elements (like `span`or `EuiText`) as tooltip anchors, they must include `tabIndex={0}` to be keyboard-focusable. For better accessibility, prefer using semantic interactive components (like `EuiButton` or `EuiLink`) which are focusable by default.

### `@elastic/eui/accessible-interactive-element`

Ensure interactive EUI components (like e.g. `EuiLink`, `EuiButton`, `EuiRadio`) remain accessible by prohibiting `tabIndex={-1}`, which removes them from keyboard navigation.

### `@elastic/eui/require-table-caption`

Ensure `EuiInMemoryTable`, `EuiBasicTable` have a `tableCaption` property for accessibility.

### `@elastic/eui/badge-accessibility-rules`

Ensure the `EuiBadge` includes appropriate accessibility attributes.

- `iconOnClick` and `onClick` must not reference the same callback. The rule autofixes by removing `iconOnClick`.
- `iconOnClickAriaLabel` is only valid when `iconOnClick` is present. The rule autofixes by removing `iconOnClickAriaLabel`.
- `onClickAriaLabel` is only valid when `onClick` is present. The rule autofixes by removing `onClickAriaLabel`.

### `@elastic/eui/require-href-for-link`

Ensure `EuiLink` components that have an `onClick` handler also include an `href` prop. Without `href`, the component does not render as a true link, which means users cannot Ctrl/Cmd+Click to open in a new tab or use other standard link interactions. The rule bails out when spread attributes are present, since `href` may be provided via the spread.

### `@elastic/eui/icon-accessibility-rules`

Ensure the `EuiIcon` includes appropriate accessibility attributes.
 
- `EuiIcon` has an accessible name via `title`, `aria-label`, or `aria-labelledby`; otherwise mark it decorative with `aria-hidden={true}`
- Do not combine `tabIndex` with `aria-hidden`

### `@elastic/eui/tooltip-button-icon-wrap`

Ensure `EuiButtonIcon` is wrapped with `EuiToolTip` for sighted users.

Browser-native tooltips (the `title` prop) are unstyled, have no delay control, and are not keyboard-accessible. Every icon button should have a visible tooltip so that sighted users who do not rely on screen readers can understand its purpose.

The rule reports two situations:

- **`title` prop is present** - remove it and use `<EuiToolTip content={…}>` instead. The rule auto-fixes by removing `title` and wrapping the button with `EuiToolTip` (or only removing `title` when the button is already wrapped).
- **No `EuiToolTip` wrapper** - the button icon has no visible tooltip. The rule auto-fixes by wrapping the button with `<EuiToolTip content={ariaLabel}>` when `aria-label` is a static string or expression.

Buttons with spread props (`{...props}`) are intentionally skipped when no `title` prop is explicitly present because their final prop set cannot be statically determined.

#### Examples

```tsx
// ✗ Bad - browser tooltip, not keyboard-accessible
<EuiButtonIcon title="Edit item" aria-label="Edit item" iconType="pencil" />

// ✓ Fixed automatically
<EuiToolTip content="Edit item">
  <EuiButtonIcon aria-label="Edit item" iconType="pencil" />
</EuiToolTip>
```

```tsx
// ✗ Bad - no tooltip for sighted users
<EuiButtonIcon aria-label="Delete" iconType="trash" />

// ✓ Fixed automatically
<EuiToolTip content="Delete">
  <EuiButtonIcon aria-label="Delete" iconType="trash" />
</EuiToolTip>
```

### `@elastic/eui/tooltip-no-interactive-content`

Disallow interactive elements inside `EuiToolTip` and `EuiIconTip` `content` and `title` props.

Tooltip content is rendered in a portal with `role="tooltip"`. It is shown only on hover or focus of the trigger element and is not itself reachable by keyboard. Placing interactive elements (links, buttons, inputs, etc.) inside tooltip content makes them inaccessible to keyboard and screen-reader users. Use `EuiPopover` for content that requires interaction.

The rule checks both the `content` and `title` props of `EuiToolTip` and `EuiIconTip` for the following elements: `a`, `button`, `input`, `select`, `textarea`, `EuiLink`, `EuiButton`, `EuiButtonEmpty`, `EuiButtonIcon`, and other interactive EUI components.

Variable content (e.g. `content={tooltipContent}`) cannot be statically analyzed and is intentionally skipped.

#### Examples

```tsx
// ✗ Bad - link inside tooltip is not keyboard-reachable
<EuiToolTip content={<EuiLink href="/docs">Learn more</EuiLink>}>
  <EuiButton>Hover me</EuiButton>
</EuiToolTip>

// ✓ Use `EuiPopover` for interactive content
<EuiPopover button={<EuiButton>Click me</EuiButton>} ...>
  <EuiLink href="/docs">Learn more</EuiLink>
</EuiPopover>
```

```tsx
// ✗ Bad - button inside `EuiIconTip` content
<EuiIconTip content={<EuiButton>Click</EuiButton>} type="info" />

// ✓ Use plain text or non-interactive JSX
<EuiIconTip content="Informational text" type="info" />
```

### `@elastic/eui/prefer-tooltip-trigger-focus-test-utility`

Flags `fireEvent.focus()` inside `it`/`test` blocks that also query for a tooltip element (`getByRole('tooltip')`, `queryByRole('tooltip')`, `findByRole('tooltip')` or any selector containing `euiToolTip`). Plain `fireEvent.focus` does not simulate `:focus-visible` in jsdom and will not trigger `EuiToolTip`, so tooltip focus tests will silently pass without actually showing the tooltip.

Use `focusEuiToolTipTrigger` from EUI's RTL test utilities instead, which correctly mocks `:focus-visible` before firing the focus event:

```tsx
import { focusEuiToolTipTrigger } from '@elastic/eui/test/rtl';

it('shows tooltip on focus', async () => {
  const { getByRole } = render(<MyComponent />);
  const cleanup = focusEuiToolTipTrigger(getByRole('button'));
  expect(getByRole('tooltip')).toBeInTheDocument();
  cleanup();
});
```


## Testing

### Running unit tests

Run unit tests using the following command:

```bash
yarn test
```

Unit tests are written using `RuleTester` from `@typescript-eslint/rule-tester`.

### Against an existing package

To test the local changes to the plugin, you must:

1. Install `yalc` globally if you haven't already: `npm install -g yalc`.
2. Open a terminal and navigate to this folder: `cd packages/eslint-plugin`
3. Build the package: `yarn build`
4. Run `yalc publish` in the plugin's directory to publish it locally.
5. In your project's directory, run `yalc add @elastic/eslint-plugin-eui` to link the locally published package.
6. Install dependencies: `yarn` (if you're a Kibana contributor, run `yarn kbn bootstrap --no-validate`).
7. After making further changes to the plugin, repeat the steps from 3.

## Publishing

Refer to the [wiki](../../wiki/eui-team-processes/releasing-versions.md) for instructions on how to release this package.
