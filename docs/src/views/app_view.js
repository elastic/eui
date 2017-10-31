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
  EuiPage,
  EuiPageBody,
  EuiPageContent,
  EuiPageContentBody,
  EuiPageSideBar,
} from '../../../src/components';

export class AppView extends Component {
  updateTheme = () => {
    applyTheme(this.props.theme);
  }

  componentDidUpdate() {
    this.updateTheme();
  }

  componentDidMount() {
    this.updateTheme();
  }

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
                currentRouteName={this.props.currentRouteName}
                onToggleTheme={this.props.toggleTheme}
                routes={this.props.routes}
                components={Routes.components}
                sandboxes={Routes.sandboxes}
                sections={this.props.sections}
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
  toggleTheme: PropTypes.func.isRequired,
  theme: PropTypes.string.isRequired,
  sections: PropTypes.array.isRequired,
};

AppView.defaultProps = {
  currentRouteName: '',
  sections: [],
};
