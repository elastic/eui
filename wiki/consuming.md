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

## Using EUI in Kibana

The EUI CSS is included in [Kibana's](https://www..github.com/elastic/kibana) CSS bundle. To use EUI code in Kibana, simply import the components and services you want.

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

### "Module build failed" or "Module parse failed: Unexpected token" error

If you get an error when importing a React component, you might need to configure Webpack's `resolve.mainFields` to `['webpack', 'browser', 'main']` to import the components from `lib` intead of `src`. See the [Webpack docs](https://webpack.js.org/configuration/resolve/#resolve-mainfields) for more info.
