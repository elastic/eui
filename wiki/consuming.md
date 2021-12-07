# Consuming EUI

## Installation

To install the Elastic UI Framework into an existing project, use the `yarn` CLI (`npm` is not supported).

```bash
yarn add @elastic/eui
```

Note that EUI has [several `peerDependencies` requirements](package.json) that will also need to be installed if starting with a blank project.

```bash
yarn add @elastic/eui @elastic/datemath @emotion/react moment prop-types
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
import { findTestSubject } from '@elastic/eui/lib/test';
```

### Reusing the variables in JavaScript

The Sass variables are also made available for consumption as json files. This enables reuse of values in css-in-js systems like [Emotion](https://emotion.sh/). As the following example shows, it can also make the downstream components theme-aware without much extra effort:

```jsx
import React from 'react';
import { css } from '@emotion/react';
import * as euiVars from '@elastic/eui/dist/eui_theme_light.json';

const styles = css`
  color: ${euiVars.euiColorPrimary};
  border: ${euiVars.euiBorderThin};
`;

export default () => (
  <div css={styles} />
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

Besides babel transforms, the test environment build consumes mocked component files of the type `src/**/[name].testenv.*`. During the build, files of the type `src/**/[name].*` will be replaced by those with the `testenv` namespace. The purpose of this mocking is to further mitigate the impacts of time- and import-dependent rendering, and simplify environment output such as test snapshots. Information on creating mock component files can be found with [testing documentation](testing.md).
