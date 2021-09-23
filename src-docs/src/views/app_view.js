import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import createCache from '@emotion/cache';
import { GuidePageChrome, ThemeContext, GuidePageHeader } from '../components';
import { translateUsingPseudoLocale } from '../services';

import {
  EuiErrorBoundary,
  EuiPage,
  EuiContext,
  EuiPageBody,
  EuiProvider,
} from '../../../src/components';

import { EuiThemeAmsterdam } from '../../../src/themes/eui-amsterdam/theme';
import { EuiThemeDefault } from '../../../src/themes/eui/theme';

import { keys } from '../../../src/services';

import favicon16Prod from '../images/favicon/prod/favicon-16x16.png';
import favicon32Prod from '../images/favicon/prod/favicon-32x32.png';
import favicon96Prod from '../images/favicon/prod/favicon-96x96.png';
import favicon16Dev from '../images/favicon/dev/favicon-16x16.png';
import favicon32Dev from '../images/favicon/dev/favicon-32x32.png';
import favicon96Dev from '../images/favicon/dev/favicon-96x96.png';

const emotionCache = createCache({
  key: 'eui-docs',
  container: document.querySelector('#emotion-global-insert'),
});

export class AppView extends Component {
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

  render() {
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

    const isLocalDev = window.location.host.includes('803');

    return (
      <ThemeContext.Consumer>
        {({ theme }) => (
          <EuiProvider
            cache={emotionCache}
            resetStyles={true}
            theme={
              theme.includes('amsterdam') ? EuiThemeAmsterdam : EuiThemeDefault
            }
            colorMode={theme.includes('light') ? 'light' : 'dark'}
          >
            <Helmet>
              <title>{`${this.props.currentRoute.name} - Elastic UI Framework`}</title>
              <link
                rel="icon"
                type="image/png"
                href={isLocalDev ? favicon16Dev : favicon16Prod}
                sizes="16x16"
              />
              <link
                rel="icon"
                type="image/png"
                href={isLocalDev ? favicon32Dev : favicon32Prod}
                sizes="32x32"
              />
              <link
                rel="icon"
                type="image/png"
                href={isLocalDev ? favicon96Dev : favicon96Prod}
                sizes="96x96"
              />
            </Helmet>
            <EuiContext i18n={i18n}>
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
                  {React.cloneElement(children, {
                    selectedTheme: theme,
                    title: currentRoute.name,
                  })}
                </EuiPageBody>
              </EuiPage>
            </EuiContext>
          </EuiProvider>
        )}
      </ThemeContext.Consumer>
    );
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
