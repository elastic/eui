import PropTypes from 'prop-types';
import React, { Component } from 'react';

import { GuidePageChrome, ThemeContext } from '../components';
import { registerRouter, translateUsingPseudoLocale } from '../services';

import {
  EuiErrorBoundary,
  EuiPage,
  EuiContext,
  EuiPageBody,
} from '../../../src/components';

import { keys } from '../../../src/services';
import { GuidePageHeader } from '../components/guide_page/guide_page_header';

export class AppView extends Component {
  constructor(...args) {
    super(...args);

    // Share the router with the app without requiring React or context.
    // See `/wiki/react-router.md`
    const { history, location, match } = this.props;
    registerRouter({ history, location, match });
  }
  componentDidUpdate(prevProps) {
    if (prevProps.currentRoute.path !== this.props.currentRoute.path) {
      window.scrollTo(0, 0);
    }
  }

  componentDidMount() {
    document.title = `Elastic UI Framework - ${this.props.currentRoute.name}`;
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
      formatNumber: (value) => new Intl.NumberFormat(locale).format(value),
      locale,
    };

    return (
      <>
        <GuidePageHeader
          onToggleLocale={toggleLocale}
          selectedLocale={locale}
        />
        <EuiPage paddingSize="none">
          <EuiErrorBoundary>
            <GuidePageChrome
              currentRoute={currentRoute}
              navigation={navigation}
              onToggleLocale={toggleLocale}
              selectedLocale={locale}
            />
          </EuiErrorBoundary>

          <EuiPageBody panelled>
            <EuiContext i18n={i18n}>
              <ThemeContext.Consumer>
                {(context) => {
                  return React.cloneElement(children, {
                    selectedTheme: context.theme,
                    title: currentRoute.name,
                  });
                }}
              </ThemeContext.Consumer>
            </EuiContext>
          </EuiPageBody>
        </EuiPage>
      </>
    );
  }

  render() {
    return this.renderContent();
  }

  onKeydown = (event) => {
    if (event.target !== document.body) {
      return;
    }

    if (event.metaKey) {
      return;
    }

    const { routes, currentRoute } = this.props;

    if (event.key === keys.ARROW_LEFT) {
      pushRoute(routes.getPreviousRoute);
      return;
    }

    if (event.key === keys.ARROW_RIGHT) {
      pushRoute(routes.getNextRoute);
    }

    function pushRoute(getRoute) {
      const route = getRoute(currentRoute.name);

      if (route) {
        routes.history.push(`/${route.path}`);
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
