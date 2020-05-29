import React, { Component } from 'react';

import { ThemeProvider, ThemeContext } from '../components';

import {
  EuiErrorBoundary,
  EuiPage,
  EuiPageBody,
  EuiContext,
} from '../../../src/components';

export class PlaygroundView extends Component {
  constructor(...args) {
    super(...args);

    // Share the router with the app without requiring React or context.
    // See `/wiki/react-router.md`
  }

  renderContent() {
    const { children } = this.props;

    return (
      <EuiPage restrictWidth={1240} className="guidePage">
        <EuiPageBody>
          <div className="guidePageContent">
            <EuiContext i18n={'i18n'}>
              <ThemeContext.Consumer>
                {context =>
                  React.cloneElement(children, { selectedTheme: context.theme })
                }
              </ThemeContext.Consumer>
            </EuiContext>
          </div>
        </EuiPageBody>
      </EuiPage>
    );
  }

  render() {
    return (
      <ThemeProvider>
        <div className="guide">{this.renderContent()}</div>
      </ThemeProvider>
    );
  }
}
