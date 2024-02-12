# Consuming EUI

## Installation

To install the Elastic UI Framework into an existing project, use the `yarn` CLI (`npm` is not supported).

```bash
yarn add @elastic/eui
```

Note that EUI has [several `peerDependencies` requirements](../../package.json) that will also need to be installed if starting with a blank project.

```bash
yarn add @elastic/eui @elastic/datemath @emotion/react @emotion/css moment prop-types
```

## Requirements and dependencies

EUI expects that you polyfill ES2015 features, e.g. [`babel-polyfill`](https://babeljs.io/docs/usage/polyfill/). Without an ES2015 polyfill your app might throw errors on certain browsers.

EUI also has `moment` and `@elastic/datemath` as dependencies itself. These are already loaded in most Elastic repos, but make sure to install them if you are starting from scratch.

## What's available

EUI publishes React UI components, JavaScript helpers called services, and utilities for writing Jest tests. Please refer to the [Elastic UI Framework website](https://elastic.github.io/eui) for comprehensive info on what's available.

EUI is published through [NPM](https://www.npmjs.com/package/@elastic/eui) as a dependency. We also provide a starter projects for:
- [GatsbyJS](https://github.com/elastic/gatsby-eui-starter)
- [NextJS](https://github.com/elastic/next-eui-starter)

### Components

You can import React components from the top-level EUI module.

```js
import {
  EuiButton,
  EuiCallOut,
  EuiPanel,
} from '@elastic/eui';
```

### Test

Test utilities are published from the `lib/test` directory.

```js
import { findTestSubject } from '@elastic/eui/lib/test'; // Enzyme
import { findByTestSubject, render, screen } from '@elastic/eui/lib/test/rtl'; // React Testing Library
```

### Theming

As of April 2022 EUI is in the process of [migrating to Emotion JS for the CSS and theming layer](https://github.com/elastic/eui/issues/3912). While EUI is in the process of this conversion, we require that both the EuiProvider and the compiled CSS (or raw Sass) files be imported during this transition.

```jsx
import React from 'react';
import '@elastic/eui/dist/eui_theme_light.css';

import { EuiProvider, EuiText } from '@elastic/eui';

const MyApp = () => (
  <EuiProvider colorMode="light">
    <EuiText><p>Hello World!</p></EuiText>
  </EuiProvider>
);

export default MyApp;
```

#### The recommended method to consume theming variables using Emotion

Using EUI's theme layer with Emotion is [documented in our docs](https://elastic.github.io/eui/#/theming/theme-provider) and should cover the majority of your theming needs.

```jsx
import { useEuiTheme } from '@elastic/eui';
import { css } from '@emotion/react';

export default () => {
  const { euiTheme } = useEuiTheme();
  const styles = css`
    color: ${euiTheme.colors.primary};
    border: ${euiTheme.border.thin};
    padding: ${euiTheme.size.s};
  `;
  return (
    <div css={styles} />
  );
};
```
#### A not-recommended, legacy method to consume theming variables from Sass

Until the conversion is complete, the components you consume may still contain soon-to-be-removed Sass styling. EUI's distribution also provides both a light and dark JSON token file that exposes these Sass variables (through an automatic process derived from the Sass) to make tokens from the individual Sass components available to consume if you need them. As components continue to convert to Emotion, these Sass-to-JS tokens in these files will degrade, eventually disappearing altogether. We therefore recommend not relying on the JSON dist of these tokens, and instead using the above recommended Emotion approach.

The following is provided as an example of the soon-to-be-deprecated Sass theme variables, to aid consumers in converting legacy usage.

```jsx
import * as euiVars from '@elastic/eui/dist/eui_theme_light.json';

const styles = {
  color: euiVars.euiColorPrimary,
  border: euiVars.euiBorderThin
  padding: euiVars.euiPanelPaddingModifiers.paddingSmall
};

export default () => (
  <div style={styles} />
)
```

### "Module build failed" or "Module parse failed: Unexpected token" error

If you get an error when importing a React component, you might need to configure Webpack's `resolve.mainFields` to `['webpack', 'browser', 'main']` to import the components from `lib` instead of `src`. See the [Webpack docs](https://webpack.js.org/configuration/resolve/#resolve-mainfields) for more info.

### Failing icon imports

To reduce EUI's impact to application bundle sizes, the icons are dynamically imported on-demand. This is problematic for some bundlers and/or deployments, so a method exists to preload specific icons an application needs.

```js
import { appendIconComponentCache } from '@elastic/eui/es/components/icon/icon';

import { icon as EuiIconArrowDown } from '@elastic/eui/es/components/icon/assets/arrow_down';
import { icon as EuiIconArrowLeft } from '@elastic/eui/es/components/icon/assets/arrow_left';

// One or more icons are passed in as an object of iconKey (string): IconComponent
appendIconComponentCache({
  arrowDown: EuiIconArrowDown,
  arrowLeft: EuiIconArrowLeft,
});
```

## Using the `test-env` build

EUI provides a separate babel-transformed and partially mocked commonjs build for testing environments in consuming projects. The output is identical to that of `lib/`, but has transformed async functions and dynamic import statements, and also applies some useful mocks. This build mainly targets Kibana's Jest environment, but may be helpful for testing environments in other projects.

### Mapping to the `test-env` directory

In Kibana's Jest configuration, the `moduleNameMapper` option is used to resolve standard EUI import statements with `test-env` aliases.

```js
moduleNameMapper: {
  '@elastic/eui$': '<rootDir>/node_modules/@elastic/eui/test-env'
}
```

This eliminates the need to polyfill or transform the EUI build for an environment that otherwise has no need for such processing.

### Mocked component files

Besides babel transforms, the test environment build consumes mocked component files of the type `src/**/[name].testenv.*`. During the build, files of the type `src/**/[name].*` will be replaced by those with the `testenv` namespace. The purpose of this mocking is to further mitigate the impacts of time- and import-dependent rendering, and simplify environment output such as test snapshots. Information on creating mock component files can be found with [testing documentation](../contributing-to-eui/testing/unit-testing.md#writing-mock-component-files).

## Using the `optimize` build (Beta)

The `optimize` output directory is an opt-in intermediate step as we work towards dedicated, formal build output for development and production environments.

When compiling with webpack, use the `resolve.alias` configuration to target the desired directory:

```json
resolve: {
  alias: {
    '@elastic/eui$': '@elastic/eui/optimize/lib'
  }
}
```

Designated "Beta" as included babel plugins may change and the output directory is likely to be renamed.

### Notable differences

* Absence of `propTypes`
  * Significant bundle size decrease
  * Likely not suitable for development environments
* Runtime transforms
  * Slight bundle size decrease
  * Requires `@babel/runtime` be a consumer dependency
