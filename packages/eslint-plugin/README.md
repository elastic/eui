# `@elastic/eslint-plugin-eui`

This package contains an eslint plugin that enforces some default rules for using EUI.

## Setup

1. Install `@elastic/eslint-plugin-eui` as a dev dependency.
2. Extend `plugin:@elastic/eui/recommended` in your ESLint config.

## Rules

### `@elastic/eui/href-or-on-click`

`<EuiButton />` should either be a button or a link, for a11y purposes. When given an `href` the button behaves as a link, otherwise an `onClick` handler is expected and it will behave as a button.

In some cases it makes sense to disable this rule locally, such as when <kbd>cmd</kbd> + click should open the link in a new tab, but a standard click should use the `history.pushState()` API to change the URL without triggering a full page load.

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

### `@elastic/eui/prefer-css-attributes-for-eui-components`

This rule warns about the use of `style` attribute and encourages to replace it with `css` attribute. Using the `css` attribute ensures better integration with Emotion's styling capabilities.

#### Example

The following code:

```jsx
<EuiCode style={{ color: '#dd4040' }}>This is a test</EuiCode>
```

will raise an ESLint report and suggest replacing the `style` attribute with `css`:

```jsx
<EuiCode css={{ color: '#dd4040' }}>This is a test</EuiCode>
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
