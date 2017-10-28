import PropTypes from 'prop-types';
import React, { Component } from 'react';

import {
  Routes,
  getTheme,
  applyTheme,
} from '../services';

import {
  GuideHeader,
  GuideNav,
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
          <GuideHeader
            onToggleTheme={this.onToggleTheme}
            routes={this.props.routes}
            components={Routes.components}
            exitSandbox={this.props.exitSandbox}
          />
          {this.props.children}
        </div>
      );
    } else {
      return (
        <EuiPage>
          <EuiPageBody>
            <EuiPageSideBar>
              <GuideNav
                onToggleTheme={this.onToggleTheme}
                routes={this.props.routes}
                components={Routes.components}
                sandboxes={Routes.sandboxes}
                enterSandbox={this.props.enterSandbox}
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
  routes: PropTypes.array.isRequired,
  registerSection: PropTypes.func,
  unregisterSection: PropTypes.func,
  sections: PropTypes.array,
  source: PropTypes.array,
  title: PropTypes.string,
  isSandbox: PropTypes.bool,
  enterSandbox: PropTypes.func,
  exitSandbox: PropTypes.func,
};

AppView.defaultProps = {
  source: [],
};
