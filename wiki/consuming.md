# Consuming EUI

## What's available

EUI publishes React UI components, simple JavaScript helpers called services, and a few utilities to help you write Jest tests. Please refer to the [docs site](https://elastic.github.io/eui) for comprehensive info on what's available.

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

Services are generally available from within the `lib/services` directory, though some are only available from within their module directories within this directory.

```js
import { keyCodes } from '@elastic/eui/lib/services';
import { Timer } from '@elastic/eui/lib/services/time';
```

### Test

Test utiliies are available from within the `lib/test` directory.

```js
import { findTestSubject } from '@elastic/eui/lib/test';
```

## Using EUI within Kibana

EUI is a dependency of [Kibana](https://www..github.com/elastic/kibana). The CSS is already included as part of Kibana's CSS bundle, so to use EUI code within Kibana you just have to import the components or services you want.

## Using EUI within a standalone project

You can consume EUI within standalone projects such as plugins and prototypes.

### Importing CSS or SCSS

Most of the time you'll just need the CSS which provides the styling for the React components. In this case, you can use Webpack to import the compiled EUI CSS with the `style`,`css`, and `postcss` loaders.

```js
import '@elastic/eui/dist/eui_theme_light.css';
```

If you want access to the Sass variables, functions, and mixins within EUI then you'll need to import the SCSS file. This will require `style`, `css`, `postcss`, and `sass` loaders. You'll also want to import the SCSS file into one of your own SCSS files, to gain access to these variables, functions, and mixins.

```scss
// index.scss
@import '../node_modules/@elastic/eui/src/theme_light.scss';
```

### "Module build failed" or "Module parse failed: Unexpected token" errors

If you get an error when trying to import a React component, you may need to configure Webpack's `resolve.mainFields` to `['webpack', 'browser', 'main']` so that it imports the components from `lib` intead of `src`. See the [Webpack docs](https://webpack.js.org/configuration/resolve/#resolve-mainfields) for more info.
