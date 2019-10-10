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

- [`react-router` 3.x](#react-router-3x)
- [`react-router` 4.x](#react-router-4x)
- [`react-router` 5.x](#react-router-5x)

## Techniques

There are many techniques for integrating EUI with `react-router` ([see below](#techniques-we-dont-recommend) for some techniques we don't recommend), but we think these two are the strongest:

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
const RouterLinkAdapter = ({to, children}) => {
  const {href, onClick} = getRouterLinkProps(to);
  return children(href, onClick);
};

<RouterLinkAdapter to="/location">
  {(onClick, href) => <EuiLink onClick={onClick} href={href}>Link</EuiLink>}
<RouterLinkAdapter/>
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
  // NOTE: As an alternative to consuming context directly, you could use the `withRouter` HOC
  // (https://github.com/ReactTraining/react-router/blob/v3/docs/API.md#withroutercomponent-options)
  static contextTypes = {
    router: PropTypes.shape({
      createHref: PropTypes.func.isRequired,
      push: PropTypes.func.isRequired,
    }).isRequired,
  }

  constructor(...args) {
    super(...args);

    // Share the router with the app without requiring React or context.
    registerRouter(this.context.router);
  }
}

// <App> *must* be a child of <Router> because <App> depends on the context provided by <Router>
ReactDOM.render(
  <Router history={history}>
    <Route path="/" component={App} />,
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

    // If target prop is set (e.g. to "_blank"), let browser handle link.
    if (event.target.getAttribute('target')) {
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

  constructor(...args) {
    super(...args);

    // Share the router with the app without requiring React or context.
    registerRouter(this.context.router);
  }
}

// <App> *must* be a child of <Router> because <App> depends on the context provided by <Router>
ReactDOM.render(
  <Router>
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
    
    // If target prop is set (e.g. to "_blank"), let browser handle link.
    if (event.target.getAttribute('target')) {
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

## react-router 5.x

### react-router 5.0

The React Context handling has changed in in 5.0 and we can't rely on it anymore. A solution is to create
an `extractRouter` HOC that will intercept the router and send it to your custom handler.


```js
// extractRouter.hoc.js
import { withRouter } from 'react-router-dom';

export const extractRouter = onRouter => WrappedComponent =>
  withRouter(
    class extends Component {
      componentDidMount() {
        const { match, location, history } = this.props;
        const router = { route: { match, location }, history };
        onRouter(router);
      }

      render() {
        return <WrappedComponent {...this.props} />;
      }
    }
  );
```

```jsx
import { extractRouter } from './hoc';
import { registerRouter } from './routing';

// App is your app's root component.
class App extends Component {
  ...
}

const AppMount = extractRouter(registerRouter)(App);

// <App> *must* be a child of <Router> because <App> depends on the context provided by <Router>
ReactDOM.render(
  <Router>
    <AppMount />,
  </Router>,
  appRoot
)
```

### react-router 5.1

In react-router 5.1, we can fully capitalize in the React Hooks utility, in this case, `useHistory`. Using this, we do not need other HOC wrapper files and global router variable. We just need to create the file below, and then use it anywhere by importing `EuiCustomLink`. There is an example repository for this: https://github.com/Imballinst/elastic-react-router-hooks.

```jsx
// File name: "EuiCustomLink.js".
import React from 'react';
import { EuiLink } from '@elastic/eui';
import { useHistory } from 'react-router';

// Most of the content of this files are from https://github.com/elastic/eui/pull/1976.
const isModifiedEvent = (event) =>
  !!(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey);

const isLeftClickEvent = (event) => event.button === 0;

export default function EuiCustomLink({ to, ...props }) {
  // This is the key!
  const history = useHistory();

  function onClick(event) {
    if (event.defaultPrevented) {
      return;
    }

    // If target prop is set (e.g. to "_blank"), let browser handle link.
    if (event.target.getAttribute('target')) {
      return;
    }

    if (isModifiedEvent(event) || !isLeftClickEvent(event)) {
      return;
    }

    // Prevent regular link behavior, which causes a browser refresh.
    event.preventDefault();

    // Push the route to the history.
    history.push(to);
  }

  return <EuiLink {...props} href={to} onClick={onClick} />;
}
```

```jsx
// App is your app's root component.
class App extends Component {
  ...
}

// <App> *must* be a child of <Router> because <App> depends on the context provided by <Router>
ReactDOM.render(
  <Router>
    <App />,
  </Router>,
  appRoot
)
```


## Techniques we don't recommend

### Using EUI classes with the react-router `<Link>` component

It's possible to integrate EUI with `react-router` by using its CSS classes only:

```jsx
<Link className="euiLink" to="/location">Link</Link>
```

But it's important to be aware of two caveats to this approach:

* EUI's components contain a lot of useful behavior. For example, `EuiLink` will render either
  a button or an anchor tag depending on the presence of `onClick` and `href` props. It will also
  create a secure `rel` attribute if you add `target="_blank"`. Consumers lose out on these
  features if they use EUI's CSS instead of its React components.
* This creates a brittle dependency upon the `euiLink` CSS class. If we were to rename this
  class in EUI, this would constitute a breaking change and we'd make a note of it in the change
  log. But if a consumer doesn't notice this note then the only way they could detect that something
  in their UI has changed (and possibly broken) would be through manual testing.
