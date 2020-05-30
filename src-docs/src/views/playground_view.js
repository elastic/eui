import React, { Component } from 'react';

import { ThemeProvider, ThemeContext } from '../components';

import { childRoutes } from '../playground_routes';
import {
  EuiErrorBoundary,
  EuiPage,
  EuiPageBody,
  EuiContext,
  EuiSideNav,
} from '../../../src/components';

export class PlaygroundView extends Component {
  constructor(...args) {
    super(...args);

    // Share the router with the app without requiring React or context.
    // See `/wiki/react-router.md`
  }

  renderContent() {
    const { children } = this.props;
    const navigation = childRoutes
      .filter(({ path }) => path !== '*')
      .map(({ path, name }, id) => {
        if (path === '*') return null;
        const href = `#/playgrounds/${path}`;
        return {
          name,
          id,
          href,
        };

        // <Link to={`/playgrounds/${path}`}>{name}</Link>;
      });
    return (
      <EuiPage restrictWidth={1240} className="guidePage">
        <EuiPageBody>
          <EuiErrorBoundary>
            <div className="guideSideNav">
              <div className="guideSideNav__content">
                <EuiSideNav
                  mobileTitle="Navigate within $Playgrounds"
                  items={navigation}
                  className="guideSideNav__item"
                />
              </div>
            </div>
          </EuiErrorBoundary>
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
