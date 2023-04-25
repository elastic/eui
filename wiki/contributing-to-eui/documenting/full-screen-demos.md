# Full screen demos

EUI's documentation sections provide an easy way to create full screen demos that are simply blank pages (no headers or other chrome).

## When should you use one?

Full screen demos are most useful for page-level components, such as [EuiCollapsibleNav](https://elastic.github.io/eui/#/navigation/collapsible-nav/collapsible-nav-all) or [EuiPageTemplate](https://elastic.github.io/eui/#/templates/page-template/examples/full-page).

Smaller, atom-like components typically do not require a full-screen demo.

## How to

To create a basic full screen demo with a built-in button add the following as your section.

```jsx
{
  title: '',
  fullScreen: {
    slug: 'url-you-want',
    demo: <FullScreenDemo />,
  }
}
```

If you want something other than a button to display in the default demo render, you can still provide a `demo` key.

```jsx
{
  title: '',
  demo: <Demo />,
  fullScreen: {
    slug: 'url-you-want',
    demo: <FullScreenDemo />,
  }
}
```

In your full screen demo component, you'll want to provide an easy exit back to the original page. You can do this by adding a button wrapped with `ExampleContext.consumer` which passes the `parentPath` through.

```jsx
import { ExampleContext } from '../../services';

<ExampleContext.Consumer>
  {({ parentPath }) => (
    <EuiButton fill href={`#${parentPath}`} iconType="exit">
      Exit full screen
    </EuiButton>
  )}
</ExampleContext.Consumer>
```
