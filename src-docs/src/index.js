// specifically polyfill Object.entries for IE11 support (used by @elastic/charts)
import 'core-js/modules/es7.object.entries';
import 'core-js/modules/es6.number.is-finite';

import React, { createElement } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Switch, Route } from 'react-router';

import configureStore, { history } from './store/configure_store';

import { AppContainer } from './views/app_container';
import { HomeView } from './views/home/home_view';
import { NotFoundView } from './views/not_found/not_found_view';

import { registerTheme } from './services';

import Routes from './routes';
import themeLight from './theme_light.scss';
import themeDark from './theme_dark.scss';
import themeAmsterdamLight from './theme_amsterdam_light.scss';
import themeAmsterdamDark from './theme_amsterdam_dark.scss';

registerTheme('light', [themeLight]);
registerTheme('dark', [themeDark]);
registerTheme('amsterdam-light', [themeAmsterdamLight]);
registerTheme('amsterdam-dark', [themeAmsterdamDark]);

// Set up app

const store = configureStore();

const childRoutes = [].concat(Routes.getAppRoutes());
childRoutes.push({
  path: '*',
  component: NotFoundView,
  name: 'Page Not Found',
});

const routes = [
  {
    path: '/',
    component: HomeView,
  },
  ...childRoutes,
];

// Update document title with route name.
const onRouteEnter = route => {
  const leafRoute = route.routes[route.routes.length - 1];
  document.title = leafRoute.name
    ? `Elastic UI Framework - ${leafRoute.name}`
    : 'Elastic UI Framework';
};

const syncTitleWithRoutes = routesList => {
  if (!routesList) return;
  routesList.forEach(route => {
    route.onEnter = onRouteEnter; // eslint-disable-line no-param-reassign
    if (route.indexRoute) {
      // Index routes have a weird relationship with their "parent" routes,
      // so it seems we need to give their own onEnter hooks.
      route.indexRoute.onEnter = onRouteEnter; // eslint-disable-line no-param-reassign
    }
    syncTitleWithRoutes(route.childRoutes);
  });
};

syncTitleWithRoutes(routes);
ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Switch>
        {routes.map(({ name, path, sections, isNew, component }, i) => {
          if (component)
            return (
              <Route key={i} exact path={`/${path}`}>
                <AppContainer currentRoute={{ name, path, sections, isNew }}>
                  {createElement(component, {})}
                </AppContainer>
              </Route>
            );
          return null;
        })}
      </Switch>
    </Router>
  </Provider>,
  document.getElementById('guide')
);
