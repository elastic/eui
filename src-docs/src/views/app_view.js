import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { GuidePageChrome, ThemeContext, GuidePageHeader } from '../components';

import {
  EuiErrorBoundary,
  EuiPage,
  EuiPageBody,
} from '../../../src/components';

import { keys } from '../../../src/services';

import { LinkWrapper } from './link_wrapper';

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

    return (
      <ThemeContext.Consumer>
        {({ theme }) => (
          <LinkWrapper>
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
          </LinkWrapper>
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
