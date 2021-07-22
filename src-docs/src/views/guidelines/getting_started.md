## Installation

To install the Elastic UI Framework into an existing project, use the `yarn` CLI (`npm` is not supported).

```
yarn add @elastic/eui
```

Note that EUI has [several `peerDependencies` requirements](https://github.com/elastic/eui/package.json) that will also need to be installed if starting with a blank project. You can read more about other ways to [consume EUI](https://github.com/elastic/eui/blob/master/wiki/consuming.md).

```js
yarn add @elastic/eui @elastic/datemath moment prop-types
```


## Running Locally

### Node

We depend upon the version of node defined in [.nvmrc](https://github.com/elastic/eui/.nvmrc).

You will probably want to install a node version manager. [nvm](https://github.com/creationix/nvm) is recommended.

To install and use the correct node version with `nvm`:

```js
nvm install
```

### Documentation

You can run the documentation locally at `http://localhost:8030/` by running the following.

```js
yarn
yarn start
```

If another process is already listening on port 8030, the next free port will be used. Alternatively, you can specify a port:

```js
yarn start --port 9000
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

### Services

Most services are published from the `lib/services` directory. Some are published from their module directories in this directory.

```js
import { keys } from '@elastic/eui/lib/services';
import { Timer } from '@elastic/eui/lib/services/time';
```

### Test

Test utilities are published from the `lib/test` directory.

```js
import { findTestSubject } from '@elastic/eui/lib/test';
```

## Using EUI in a standalone project

You can consume EUI in standalone projects, such as plugins and prototypes.

### Importing compiled CSS

Most of the time, you just need the compiled CSS, which provides the styling for the React components.

```js
import '@elastic/eui/dist/eui_theme_light.css';
```

Other compiled themes include:
```js
import '@elastic/eui/dist/eui_theme_dark.css';
```
```js
import '@elastic/eui/dist/eui_theme_amsterdam_light.css';
```
```js
import '@elastic/eui/dist/eui_theme_amsterdam_dark.css';
```

### Using our Sass variables on top of compiled CSS

If you want to build **on top** of the EUI theme by accessing the Sass variables, functions, and mixins, you'll need to import the Sass globals in addition to the compiled CSS mentioned above. This will require `style`, `css`, `postcss`, and `sass` loaders.

First import the correct colors file, followed by the globals file.

```scss
@import '@elastic/eui/src/themes/eui/eui_colors_light.scss';
@import '@elastic/eui/src/themes/eui/eui_globals.scss';
```

For the dark theme, swap the first import for the dark colors file.

```scss
@import '@elastic/eui/src/themes/eui/eui_colors_dark.scss';
@import '@elastic/eui/src/themes/eui/eui_globals.scss';
```

If you want to use the new, but in progress Amsterdam theme, you can import it similarly.

```scss
@import '@elastic/eui/src/themes/eui-amsterdam/eui_amsterdam_colors_light.scss';
@import '@elastic/eui/src/themes/eui-amsterdam/eui_amsterdam_globals.scss';
```

### Using Sass to customize EUI

EUI's Sass themes are token based, which can be altered to suite your theming needs like changing the primary color. Simply declare your token overrides before importing the whole EUI theme. This will re-compile **all of the EUI components** with your colors.

*Do not use in conjunction with the compiled CSS.*

Here is an example setup.

```scss
// mytheme.scss
$euiColorPrimary: #7B61FF;

@import '@elastic/eui/src/theme_light.scss';
```

### Fonts

By default, EUI ships with a font stack that includes some outside, open source fonts. If your system is internet available you can include these by adding the following imports to your SCSS/CSS files, otherwise you'll need to bundle the physical fonts in your build. EUI will drop to System Fonts (which you may prefer) in their absence.

```scss
// index.scss
@import url('https://fonts.googleapis.com/css?family=Roboto+Mono:400,400i,700,700i');
@import url('https://rsms.me/inter/inter-ui.css');
```

The Amsterdam theme uses the latest version of Inter that can be grabbed from Google Fonts as well.

```scss
// index.scss
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Roboto+Mono:ital,wght@0,400;0,700;1,400;1,700&display=swap');
```

### Reusing the variables in JavaScript

The Sass variables are also made available for consumption as json files. This enables reuse of values in css-in-js systems like [styled-components](https://www.styled-components.com). As the following example shows, it can also make the downstream components theme-aware without much extra effort:

```js
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import styled, { ThemeProvider } from 'styled-components';
import * as euiVars from '@elastic/eui/dist/eui_theme_light.json';

const CustomComponent = styled.div`
  color: ${props => props.theme.euiColorPrimary};
  border: ${props => props.theme.euiBorderThin};
`;

ReactDOM.render(
  <ThemeProvider theme={euiVars}>
    <CustomComponent>content</CustomComponent>
  </ThemeProvider>
, document.querySelector('#renderTarget'));
```

### "Module build failed" or "Module parse failed: Unexpected token" error

If you get an error when importing a React component, you might need to configure Webpack's `resolve.mainFields` to `['webpack', 'browser', 'main']` to import the components from `lib` instead of `src`. See the [Webpack docs](https://webpack.js.org/configuration/resolve/#resolve-mainfields) for more info.

### Failing icon imports

To reduce EUI's impact to application bundle sizes, the icons are dynamically imported on-demand. This is problematic for some bundlers and/or deployments, so a method exists to preload specific icons an application needs.

```javascript
import { appendIconComponentCache } from '@elastic/eui/es/components/icon/icon';

import { icon as EuiIconArrowDown } from '@elastic/eui/es/components/icon/assets/arrow_down';
import { icon as EuiIconArrowLeft } from '@elastic/eui/es/components/icon/assets/arrow_left';

// One or more icons are passed in as an object of iconKey (string): IconComponent
appendIconComponentCache({
  arrowDown: EuiIconArrowDown,
  arrowLeft: EuiIconArrowLeft,
});
```

## Customizing with custom classes

We do not recommend customizing EUI components by applying styles directly to EUI classes, eg. `.euiButton`. All components allow you to pass a custom `className` prop directly to the component which will then append this to the class list. Utilizing the cascade feature of CSS, you can then customize by overriding styles so long as your styles are imported **after** the EUI import.

```html
<EuiButton className="myCustomClass__button" />

// Renders as:

<button class="euiButton myCustomClass__button" />
```

## Using the test environment build

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