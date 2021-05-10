import React, { createElement } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Switch, Route, Redirect } from 'react-router';

import configureStore, { history } from './store/configure_store';

import { AppContainer } from './views/app_container';
import { HomeView } from './views/home/home_view';
import { NotFoundView } from './views/not_found/not_found_view';
import { registerTheme, ExampleContext } from './services';

import Routes from './routes';
import themeLight from './theme_light.scss';
import themeDark from './theme_dark.scss';
import themeAmsterdamLight from './theme_amsterdam_light.scss';
import themeAmsterdamDark from './theme_amsterdam_dark.scss';
import { ThemeProvider } from './components/with_theme/theme_context';
import ScrollToHash from './components/scroll_to_hash';
import { LinkWrapper } from './views/link_wrapper';

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
    name: 'Elastic UI',
  },
  ...childRoutes,
];

ReactDOM.render(
  <Provider store={store}>
    <ThemeProvider>
      <Router history={history}>
        <ScrollToHash />
        <Switch>
          {routes.map(
            ({ name, path, sections, isNew, component, from, to }) => {
              const mainComponent = (
                <Route
                  key={path}
                  exact
                  path={`/${path}`}
                  render={(props) => {
                    const { location } = props;
                    // prevents encoded urls with a section id to fail
                    if (location.pathname.includes('%23')) {
                      const url = decodeURIComponent(location.pathname);
                      return <Redirect push to={url} />;
                    } else {
                      return (
                        <LinkWrapper>
                          <AppContainer
                            currentRoute={{ name, path, sections, isNew }}>
                            {createElement(component, {})}
                          </AppContainer>
                        </LinkWrapper>
                      );
                    }
                  }}
                />
              );

              const standaloneSections = (sections || [])
                .map(({ id, fullScreen }) => {
                  if (!fullScreen) return undefined;
                  const { slug, demo } = fullScreen;
                  return (
                    <Route
                      key={`/${path}/${slug}`}
                      path={`/${path}/${slug}`}
                      render={() => (
                        <ExampleContext.Provider
                          value={{ parentPath: `/${path}#${id}` }}>
                          {demo}
                        </ExampleContext.Provider>
                      )}
                    />
                  );
                })
                .filter((x) => !!x);

              if (from)
                return [
                  mainComponent,
                  ...standaloneSections,
                  <Route exact path={`/${from}`}>
                    <Redirect to={`/${to}`} />
                  </Route>,
                ];
              else if (component) return [mainComponent, ...standaloneSections];
              return null;
            }
          )}
        </Switch>
      </Router>
    </ThemeProvider>
  </Provider>,
  document.getElementById('guide')
);
