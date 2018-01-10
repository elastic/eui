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
  EuiPageContent,
  EuiPageContentBody,
  EuiPageSideBar,
} from '../../../src/components';

import { keyCodes } from '../../../src/services';

export class AppView extends Component {
  updateTheme = () => {
    applyTheme(this.props.theme);
  }

  componentDidUpdate() {
    this.updateTheme();
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
      isSandbox,
      toggleTheme,
      theme,
      routes,
    } = this.props;

    if (isSandbox) {
      return (
        <div className="guideSandbox">
          {children}
        </div>
      );
    } else {
      return (
        <EuiPage>
          <EuiPageBody>
            <EuiErrorBoundary>
              <EuiPageSideBar>
                <GuidePageChrome
                  currentRouteName={currentRoute.name}
                  onToggleTheme={toggleTheme}
                  selectedTheme={theme}
                  guidelines={routes.guidelines}
                  components={routes.components}
                  patterns={routes.patterns}
                  sandboxes={routes.sandboxes}
                />
              </EuiPageSideBar>
            </EuiErrorBoundary>

            <EuiPageContent>
              <EuiPageContentBody>
                {children}
              </EuiPageContentBody>
            </EuiPageContent>
          </EuiPageBody>
        </EuiPage>
      );
    }
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
  isSandbox: PropTypes.bool,
  theme: PropTypes.string.isRequired,
  toggleTheme: PropTypes.func.isRequired,
  routes: PropTypes.object.isRequired,
};

AppView.defaultProps = {
  currentRoute: {},
};
