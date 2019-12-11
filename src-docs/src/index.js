import React from 'react';
import { hydrate, render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';

import configureStore from './store/configure_store';

import { AppContainer } from './views/app_container';
import { HomeView } from './views/home/home_view';
import { NotFoundView } from './views/not_found/not_found_view';

import { registerTheme } from './services';

import Routes from './routes';
import themeLight from './theme_light.scss';
import themeDark from './theme_dark.scss';

registerTheme('light', [themeLight]);

registerTheme('dark', [themeDark]);

// Set up app

const store = configureStore();
const routerHistory = syncHistoryWithStore(Routes.history, store);

const childRoutes = [].concat(Routes.getAppRoutes());
childRoutes.push({
  path: '*',
  component: NotFoundView,
  name: 'Page Not Found',
});

const routes = [
  {
    path: '/',
    component: AppContainer,
    indexRoute: {
      component: HomeView,
      source: 'views/home/HomeView',
    },
    childRoutes,
  },
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

const hashLinkScroll = () => {
  const { hash } = window.location;
  if (hash !== '') {
    // Push onto callback queue so it runs after the DOM is updated,
    // this is required when navigating from a different page so that
    // the element is rendered on the page before trying to getElementById.
    setTimeout(() => {
      const id = hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) element.scrollIntoView({ behavior: 'smooth' });
    }, 0);
  }
};

const rootElement = document.getElementById('guide');
if (rootElement.hasChildNodes()) {
  hydrate(
    <Provider store={store}>
      <Router
        history={routerHistory}
        routes={routes}
        onUpdate={hashLinkScroll}
      />
    </Provider>,
    rootElement
  );
} else {
  render(
    <Provider store={store}>
      <Router
        history={routerHistory}
        routes={routes}
        onUpdate={hashLinkScroll}
      />
    </Provider>,
    rootElement
  );
}
