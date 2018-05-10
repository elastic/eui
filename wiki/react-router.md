# Using react-router with EUI

EUI doesn't prescribe the use of any particular routing library, and we also don't want to incur
the maintenance burden of supporting router-specific components. For these reasons, EUI doesn't
publish any tools for working with `react-router` (or any other routing lib). However,
integrating EUI with `react-router` on the consumer's side is fairly straightforward.

## How react-router works

Links in `react-router` accept a `to` prop and convert this to both `href` and `onClick` props
under the hood. The `onClick` is used to push a new `history` location, and the `href` allows you to
open the link in a new tab. Any mechanism for integrating EUI with `react-router` needs to bridge
this `to` prop with EUI components' `href` and `onClick` props.

## Techniques

There are many techniques for integrating EUI with `react-router`, but we think these two are
the strongest:

### 1) Conversion function (recommended)

You can use a conversion function to convert a `to` value
to `href` and `onClick` values, which you can then pass to any EUI button or link component.
Many EUI components are designed to accept both props if they accept one.

This technique is recommended because of its flexibility. As a consumer, you have the option to
use either the `href` or `onClick` values, or both. It's also terser than the second option.

```jsx
<EuiLink {...getRouterLinkProps('/location')}>Link</EuiLink>
```

### 2) Adapter component

Alternatively, you can create a component which will consume or encapsulate the
`getRouterLinkProps` logic, and use that in conjunction with a
[`render` prop](https://reactjs.org/docs/render-props.html).

```jsx
const RouterLinkAdapter = ({to, render}) => {
  const {href, onClick} = getRouterLinkProps(to);
  return render(href, onClick);
};

<RouterLinkAdapter to="/location">
  {(onClick, href) => <EuiLink onClick={onClick} href={href}>Link</EuiLink>}
<RouterLinkAdapter/>;
```

## react-router 3.x

### Share `router` globally

To enable these techniques, you'll need to make the `router` instance available outside of React's
`context`. One method for doing this is to assign it to a globally-available singleton within your
app's root component.

```jsx
import { registerRouter } from './routing';

// App is your app's root component.
class App extends Component {
  static contextTypes = {
    router: PropTypes.shape({
      createHref: PropTypes.func.isRequired,
      push: PropTypes.func.isRequired,
    }).isRequired,
  }

  componentDidMount() {
    this.registerRouter();
  }

  registerRouter() {
    // Share the router with the app without requiring React or context.
    const { router } = this.context;
    registerRouter(router);
  }
}

ReactDOM.render(
  <Router history={history}>
    <Route path='/' component={App} />,
  </Router>,
  appRoot
)
```

### Hot module reloading

Note that if using HMR, you'll need to re-register the router after a hot reload.

```js
  componentDidUpdate() {
    // You may want to add some conditions here to cull this logic from a production build,
    // e.g. `if (process.env.NODE_ENV !== 'production' && module.hot)`
    this.registerRouter();
  }
```

### `routing.js` service

You can create a `routing.js` service to surface the `registerRouter` method as well as your
conversion function (called `getRouterLinkProps` here).

```js
// routing.js

const isModifiedEvent = event => !!(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey);

const isLeftClickEvent = event => event.button === 0;

const resolveToLocation = (to, router) => typeof to === 'function' ? to(router.location) : to;

let router;
export const registerRouter = reactRouter => {
  router = reactRouter;
};

/**
 * The logic for generating hrefs and onClick handlers from the `to` prop is largely borrowed from
 * https://github.com/ReactTraining/react-router/blob/v3/modules/Link.js.
 */
export const getRouterLinkProps = to => {
  const location = resolveToLocation(to, router);
  const href = router.createHref(location);
  const onClick = event => {
    if (event.defaultPrevented) {
      return;
    }

    if (isModifiedEvent(event) || !isLeftClickEvent(event)) {
      return;
    }

    // Prevent regular link behavior, which causes a browser refresh.
    event.preventDefault();
    router.push(location);
  };

  return {href, onClick}
};
```

## react-router 4.x

### Share `router` globally

Setup is slightly different with `react-router` 4.x. To enable these techniques, you'll need to make
the `router` instance available outside of React's `context`. One method for doing this is to assign
it to a globally-available singleton within your app's root component.

```jsx
import { registerRouter } from './routing';

// App is your app's root component.
class App extends Component {
  static contextTypes = {
    router: PropTypes.shape({
      history: PropTypes.shape({
        push: PropTypes.func.isRequired,
        createHref: PropTypes.func.isRequired
      }).isRequired
    }).isRequired
  }

  componentDidMount() {
    this.registerRouter();
  }

  registerRouter() {
    // Share the router with the app without requiring React or context.
    const { router } = this.context;
    registerRouter(router);
  }
}

ReactDOM.render(
  <Router}>
    <App />,
  </Router>,
  appRoot
)
```

### Hot module reloading

[See above](#hot-module-reloading).

### `routing.js` service

You can create a `routing.js` service to surface the `registerRouter` method as well as your
conversion function (called `getRouterLinkProps` here).

```js
// routing.js

import { createLocation } from 'history';

const isModifiedEvent = event => !!(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey);

const isLeftClickEvent = event => event.button === 0;

let router;
export const registerRouter = reactRouter => {
  router = reactRouter;
};

/**
 * The logic for generating hrefs and onClick handlers from the `to` prop is largely borrowed from
 * https://github.com/ReactTraining/react-router/blob/master/packages/react-router-dom/modules/Link.js.
 */
export const getRouterLinkProps = to => {
  const location = typeof to === "string"
    ? createLocation(to, null, null, router.history.location)
    : to;

  const href = router.history.createHref(location);

  const onClick = event => {
    if (event.defaultPrevented) {
      return;
    }

    if (isModifiedEvent(event) || !isLeftClickEvent(event)) {
      return;
    }

    // Prevent regular link behavior, which causes a browser refresh.
    event.preventDefault();
    router.history.push(location);
  };

  return {href, onClick}
};

```
