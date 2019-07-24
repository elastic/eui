# Consuming EUI

## What's available

EUI publishes React UI components, JavaScript helpers called services, and utilities for writing Jest tests. Please refer to the [Elastic UI Framework website](https://elastic.github.io/eui) for comprehensive info on what's available.

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
import { keyCodes } from '@elastic/eui/lib/services';
import { Timer } from '@elastic/eui/lib/services/time';
```

### Test

Test utilities are published from the `lib/test` directory.

```js
import { findTestSubject } from '@elastic/eui/lib/test';
```

## Requirements and dependencies

EUI expects that you polyfill ES2015 features, e.g. [`babel-polyfill`](https://babeljs.io/docs/usage/polyfill/). Without an ES2015 polyfill your app might throw errors on certain browsers.

EUI also has `moment` and `@elastic/datemath` as dependencies itself. These are already loaded in most Elastic repos, but make sure to install them if you are starting from scratch.

## Using EUI in Kibana

The EUI CSS is included in [Kibana's](https://www.github.com/elastic/kibana) CSS bundle. To use EUI code in Kibana, simply import the components and services you want.

## Using EUI in a standalone project

You can consume EUI in standalone projects, such as plugins and prototypes.

### Importing CSS or SCSS

Most of the time, you just need the CSS, which provides the styling for the React components. In this case, you can use Webpack to import the compiled EUI CSS with the `style`,`css`, and `postcss` loaders.

```js
import '@elastic/eui/dist/eui_theme_light.css';
```

If you want access to the Sass variables, functions, and mixins in EUI then you'll need to import the SCSS file. This will require `style`, `css`, `postcss`, and `sass` loaders. You'll also want to import the SCSS file into one of your own SCSS files, to gain access to these variables, functions, and mixins.

```scss
// index.scss
@import '../node_modules/@elastic/eui/src/theme_light.scss';
```

By default, EUI ships with a font stack that includes some outside, open source fonts. If your system is internet available you can include these by adding the following imports to your SCSS/CSS files, otherwise you'll need to bundle the physical fonts in your build. EUI will drop to System Fonts (which you may prefer) in their absence.

```scss
// index.scss
@import url('https://fonts.googleapis.com/css?family=Roboto+Mono:400,400i,700,700i');
@import url('https://rsms.me/inter/inter-ui.css');
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

If you get an error when importing a React component, you might need to configure Webpack's `resolve.mainFields` to `['webpack', 'browser', 'main']` to import the components from `lib` intead of `src`. See the [Webpack docs](https://webpack.js.org/configuration/resolve/#resolve-mainfields) for more info.
