import PropTypes from 'prop-types';
import React, { Component } from 'react';

import { GuidePageChrome, ThemeProvider, ThemeContext } from '../components';
import { registerRouter, translateUsingPseudoLocale } from '../services';

import {
  EuiErrorBoundary,
  EuiPage,
  EuiPageBody,
  EuiContext,
} from '../../../src/components';

import { keyCodes } from '../../../src/services';

export class AppView extends Component {
  constructor(...args) {
    super(...args);

    // Share the router with the app without requiring React or context.
    // See `/wiki/react-router.md`
    registerRouter(this.context.router);
  }
  componentDidUpdate(prevProps) {
    if (prevProps.currentRoute.path !== this.props.currentRoute.path) {
      window.scrollTo(0, 0);
    }
  }

  componentDidMount() {
    document.addEventListener('keydown', this.onKeydown);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.onKeydown);
  }

  renderContent() {
    const { children, currentRoute, toggleLocale, locale, routes } = this.props;

    const { navigation } = routes;

    const mappingFuncs = {
      'en-xa': translateUsingPseudoLocale,
    };

    const i18n = {
      mappingFunc: mappingFuncs[locale],
      formatNumber: value => new Intl.NumberFormat(locale).format(value),
      locale,
    };

    return (
      <EuiPage restrictWidth={1240} className="guidePage">
        <EuiPageBody>
          <EuiErrorBoundary>
            <GuidePageChrome
              currentRoute={currentRoute}
              onToggleLocale={toggleLocale}
              selectedLocale={locale}
              navigation={navigation}
            />
          </EuiErrorBoundary>

          <div className="guidePageContent">
            <EuiContext i18n={i18n}>
              <ThemeContext.Consumer>
                {context =>
                  React.cloneElement(children, { selectedTheme: context.theme })
                }
              </ThemeContext.Consumer>
            </EuiContext>
          </div>
        </EuiPageBody>
      </EuiPage>
    );
  }

  render() {
    return (
      <ThemeProvider>
        <div className="guide">{this.renderContent()}</div>
      </ThemeProvider>
    );
  }

  onKeydown = e => {
    if (e.target !== document.body) {
      return;
    }

    if (e.metaKey) {
      return;
    }

    const { routes, currentRoute } = this.props;

    if (e.keyCode === keyCodes.LEFT) {
      pushRoute(routes.getPreviousRoute);
      return;
    }

    if (e.keyCode === keyCodes.RIGHT) {
      pushRoute(routes.getNextRoute);
    }

    function pushRoute(getRoute) {
      const route = getRoute(currentRoute.name);

      if (route) {
        routes.history.push(route.path);
      }
    }
  };
}

AppView.propTypes = {
  children: PropTypes.any,
  currentRoute: PropTypes.object.isRequired,
  locale: PropTypes.string.isRequired,
  toggleLocale: PropTypes.func.isRequired,
  routes: PropTypes.object.isRequired,
};

AppView.defaultProps = {
  currentRoute: {},
};

AppView.contextTypes = {
  router: PropTypes.shape({
    createHref: PropTypes.func.isRequired,
    push: PropTypes.func.isRequired,
  }).isRequired,
};
