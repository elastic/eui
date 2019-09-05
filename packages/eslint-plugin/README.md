# `@elastic/eslint-plugin-eui`

This package contains an eslint plugin that enforces some default rules for using EUI.

## Setup

1. install `@elastic/eslint-plugin-eui` as a dev dependency
2. extend `plugin:@elastic/eui/recommended` in your eslint config

## Rules

### `@elastic/eui/href-or-on-click`

`<EuiButton />` should either be a button or a link, for a11y purposes. When given an `href` the button behaves as a link, otherwise an `onClick` handler is expected and it will behave as a button.

In some cases it makes sense to disable this rule locally, such as when <kbd>cmd</kbd>+click should open the link in a new tab, but a standard click should use the `history.pushState()` API to change the URL without triggering a full page load.

## Publishing

This package is published separately from the rest of EUI, as required by eslint. The code is not transpiled, so make sure to use `require()` statements rather than `import`, and once the code is updated run:

1. `npm version patch|minor|major`
2. commit version bump
3. `npm publish` in this directory 
4. push the version bump upstream
