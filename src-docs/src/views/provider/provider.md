## Basic setup

For EUI to work correctly, set up **EuiProvider** at the root of your application.

```jsx
import { EuiProvider } from '@elastic/eui'

const MyApp = ({ Page }) => (
  <EuiProvider>
    <Page />
  </EuiProvider>
);
```

See [**EuiThemeProvider**](/#/theming/theme-provider) for full documentation as all relevant props will pass through. For instance, it's likely that you will want to implement color mode switching at this level:

```jsx
<EuiProvider colorMode={isDark ? 'dark' : 'light'} />
```

It is not recommended to recreate the functionality of **EuiProvider** by composing its constituent parts. More context, functionality, and configurations will be added to **EuiProvider** in future releases. Nested instances of [**EuiThemeProvider**](/#/theming/theme-provider), however, are valid.

## Global reset

A reset stylesheet and the global EUI styles are applied via Emotion. To prevent loading these styles from loading, pass `theme={null}` to the provider.

### `@emotion/cache` and style injection location

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

const MyApp = () => (
  <EuiProvider cache={cache}>
    {/* Content */}
  </EuiProvider>
);
```

Any other options available with [the **createCache** API](https://emotion.sh/docs/@emotion/cache#createcache) will be respected by EUI.

Note that EUI does not include the `@emotion/cache` library, so you will need to add it to your application dependencies.


