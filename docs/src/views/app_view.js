import PropTypes from 'prop-types';
import React, { Component } from 'react';

import {
  Routes,
  getTheme,
  applyTheme,
} from '../services';

import {
  GuidePageChrome,
} from '../components';

import {
  EuiPage,
  EuiPageBody,
  EuiPageContent,
  EuiPageContentBody,
  EuiPageSideBar,
} from '../../../src/components';

export class AppView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      theme: getTheme(),
    };
  }

  onToggleTheme = () => {
    if (getTheme() === 'light') {
      applyTheme('dark');
    } else {
      applyTheme('light');
    }

    this.setState({
      theme: getTheme(),
    });
  };

  renderContent() {
    if (this.props.isSandbox) {
      return (
        <div className="guideSandbox">
          {this.props.children}
        </div>
      );
    } else {
      return (
        <EuiPage>
          <EuiPageBody>
            <EuiPageSideBar>
              <GuidePageChrome
                onToggleTheme={this.onToggleTheme}
                routes={this.props.routes}
                components={Routes.components}
                sandboxes={Routes.sandboxes}
              />
            </EuiPageSideBar>

            <EuiPageContent>
              <EuiPageContentBody>
                {this.props.children}
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
  currentRouteName: PropTypes.string.isRequired,
  registerSection: PropTypes.func,
  unregisterSection: PropTypes.func,
  sections: PropTypes.array,
  isSandbox: PropTypes.bool,
};
