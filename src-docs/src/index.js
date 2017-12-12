import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import {
  Router,
} from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';

import configureStore from './store/configure_store';

import { AppContainer } from './views/app_container';
import { HomeView } from './views/home/home_view';
import { NotFoundView } from './views/not_found/not_found_view';

import {
  Routes,
  registerTheme,
} from './services';

import themeLight from './theme_light.scss';
import themeDark from './theme_dark.scss';
import themeK6 from './theme_k6.scss';

registerTheme('light', [
  themeLight
]);

registerTheme('dark', [
  themeDark
]);

registerTheme('k6', [
  themeK6
]);

// Set up app

const store = configureStore();
const routerHistory = syncHistoryWithStore(Routes.history, store);

const childRoutes = [].concat(Routes.getAppRoutes());
childRoutes.push({
  path: '*',
  component: NotFoundView,
  name: 'Page Not Found',
});

const routes = [{
  path: '/',
  component: AppContainer,
  indexRoute: {
    component: HomeView,
    source: 'views/home/HomeView',
  },
  childRoutes,
}];

// Update document title with route name.
const onRouteEnter = route => {
  const leafRoute = route.routes[route.routes.length - 1];
  document.title = leafRoute.name ?
    `Elastic UI Framework - ${leafRoute.name}` :
    'Elastic UI Framework';
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
    <Router
      history={routerHistory}
      routes={routes}
    />
  </Provider>,
  document.getElementById('guide')
);
