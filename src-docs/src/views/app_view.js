import PropTypes from 'prop-types';
import React, { Component } from 'react';

import {
  applyTheme,
} from '../services';

import {
  GuidePageChrome,
} from '../components';

import {
  EuiErrorBoundary,
  EuiPage,
  EuiPageBody,
} from '../../../src/components';

import { keyCodes } from '../../../src/services';

export class AppView extends Component {
  updateTheme = () => {
    applyTheme(this.props.theme);
  }

  componentDidUpdate(prevProps) {
    this.updateTheme();

    if (prevProps.currentRoute.path !== this.props.currentRoute.path) {
      window.scrollTo(0, 0);
    }
  }

  componentDidMount() {
    const {
      routes,
    } = this.props;

    this.updateTheme();

    document.addEventListener('keydown', e => {
      if (e.target !== document.body) {
        return;
      }

      let route;

      switch (e.keyCode) {
        case keyCodes.LEFT:
          route = routes.getPreviousRoute(this.props.currentRoute.name);
          break;
        case keyCodes.RIGHT:
          route = routes.getNextRoute(this.props.currentRoute.name);
          break;
        default:
          break;
      }

      if (route) {
        routes.history.push(route.path);
      }
    });
  }

  renderContent() {
    const {
      children,
      currentRoute,
      toggleTheme,
      theme,
      routes,
    } = this.props;

    const { navigation } = routes;

    return (
      <EuiPage className="guidePage">
        <EuiPageBody>
          <EuiErrorBoundary>
            <GuidePageChrome
              currentRouteName={currentRoute.name}
              onToggleTheme={toggleTheme}
              selectedTheme={theme}
              navigation={navigation}
            />
          </EuiErrorBoundary>

          <div className="guidePageContent">
            {children}
          </div>
        </EuiPageBody>
      </EuiPage>
    );
  }

  render() {
    return (
      <div className="guide">
        {this.renderContent()}
      </div>
    );
  }
}

AppView.propTypes = {
  children: PropTypes.any,
  currentRoute: PropTypes.object.isRequired,
  theme: PropTypes.string.isRequired,
  toggleTheme: PropTypes.func.isRequired,
  routes: PropTypes.object.isRequired,
};

AppView.defaultProps = {
  currentRoute: {},
};
