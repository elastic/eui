## EuiProvider

`EuiProvider` contains all necessary context providers required for full functionality of EUI, including reset and globals styles, and `EuiThemeProvider` for theming and writing custom styles. 


### Basic setup

For EUI to work correctly, set up `EuiProvider` at the root of your application.

```jsx
import { EuiProvider } from '@elastic/eui'

const App = ({ Component }) => (
  <EuiProvider>
    <Component />
  </EuiProvider>
);
```

[See **EuiThemeProvider**](#/theming/theme-provider) for full documentation as all relevant props will pass through. For instance, it's likely that you will want to implement color mode switching at this level:

```jsx
<EuiProvider colorMode={isDark ? 'dark' : 'light'} />
```


### Configuration

#### Global styles

A reset stylesheet and global EUI styles will by default be applied via CSS-in-JS. To prevent loading these styles from loading, pass `theme={false}` to the provider. 


#### `@emotion/cache` and style injection location 

In the case that your app has its own static stylesheet, the global styles may not be injected into the correct location in the `<head>`, causing unintentional overrides or unapplied styles. [The **@emotion/cache** library](https://emotion.sh/docs/@emotion/cache) provides configuration options that help with specifying the injection location.

```html
<!-- index.html -->
<!DOCTYPE html>
<html lang="en">
  <head>
    <title>My App</title>
    <style id="global-style-insert"></style>
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>
```

```jsx
// App.js
import createCache from '@emotion/cache';
import { EuiProvider } from '@elastic/eui'

const cache = createCache({
  key: 'myApp',
  container: document.querySelector('#global-style-insert'),
});

const App = () => (
  <EuiProvider cache={cache}>
    {/* Content */}
  </EuiProvider>
);
```

Any other options available with [the **createCache** API](https://emotion.sh/docs/@emotion/cache#createcache) will be respected by EUI.
Note that EUI does not include the `@emotion/cache` library, so you will need to add it to your application dependencies.


### Recommended app structure

Although it is possible to recreate the functionality of `EuiProvider` by composing its constituant parts, this is not recommended. More context, functionality, and configuration will be added to `EuiProvider` in future releases. Nested instances of `EuiThemeProvider`, however, are entirely valid.

```jsx
// App.js
import * as React from 'react';
import createCache from '@emotion/cache';
import { EuiProvider } from '@elastic/eui'

import Component from './Component';

// If necessary:
const cache = createCache({
  key: 'myApp',
  container: document.querySelector('#global-style-insert'),
});

const App = () => {
  const [isDarkMode, setIsDarkMode] = React.useState(false);

  return (
    <EuiProvider cache={cache} colorMode={isDarkMode ? 'dark' : 'light'}>
      <Component />
    </EuiProvider>
  )
};
```

```jsx
// Component.js
import { EuiThemeProvider } from '@elastic/eui';

const Component = () => (
  <div>
    {/* Content using the global color mode */}
    <EuiThemeProvider colorMode="inverse">
      {/* Content using the inverse of the global color mode */}
    </EuiThemeProvider>
  </div>
);
```
