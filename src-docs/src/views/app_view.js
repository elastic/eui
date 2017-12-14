import PropTypes from 'prop-types';
import React, { Component } from 'react';

import {
  Routes,
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
    this.updateTheme();

    document.addEventListener('keydown', e => {
      if (e.target !== document.body) {
        return;
      }

      let route;

      switch (e.keyCode) {
        case keyCodes.LEFT:
          route = Routes.getPreviousRoute(this.props.currentRoute.name);
          break;
        case keyCodes.RIGHT:
          route = Routes.getNextRoute(this.props.currentRoute.name);
          break;
        default:
          break;
      }

      if (route) {
        Routes.history.push(route.path);
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
                  guidelines={Routes.guidelines}
                  components={Routes.components}
                  patterns={Routes.patterns}
                  sandboxes={Routes.sandboxes}
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
};

AppView.defaultProps = {
  currentRoute: {},
};
