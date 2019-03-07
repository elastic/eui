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
    this.updateTheme();

    document.addEventListener('keydown', this.onKeydown);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.onKeydown);
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
      <EuiPage restrictWidth={1240} className="guidePage">
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
            {React.cloneElement(children, { selectedTheme: theme })}
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

  onKeydown = e => {
    if (e.target !== document.body) {
      return;
    }

    if (e.metaKey) {
      return;
    }

    const {
      routes,
      currentRoute,
    } = this.props;

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
