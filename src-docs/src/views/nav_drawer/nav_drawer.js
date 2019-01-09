import React, { Component, Fragment } from 'react';

import {
  EuiPage,
  EuiPageBody,
  EuiPageHeader,
  EuiPageHeaderSection,
  EuiPageContent,
  EuiPageContentHeader,
  EuiPageContentHeaderSection,
  EuiPageContentBody,
  EuiHeader,
  EuiHeaderSection,
  EuiHeaderSectionItem,
  EuiHeaderSectionItemButton,
  EuiIcon,
  EuiTitle,
  EuiNavDrawer,
  EuiNavDrawerMenu,
  EuiNavDrawerFlyout,
  EuiListGroup,
  EuiHorizontalRule,
} from '../../../../src/components';

export default class extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isCollapsed: true,
      flyoutIsCollapsed: true,
      flyoutIsAnimating: false,
      navFlyoutTitle: undefined,
      navFlyoutContent: [],
    };

    this.topLinks = [
      {
        label: 'Recently viewed',
        iconType: 'clock',
        size: 's',
        style: { color: 'inherit' },
        'aria-label': 'Recently viewed items',
        onClick: () => this.expandFlyout(this.recentLinks, 'Recent items'),
        extraAction: {
          color: 'subdued',
          iconType: 'arrowRight',
          iconSize: 's',
          'aria-label': 'Expand to view recent apps and objects',
          onClick: () => this.expandFlyout(this.recentLinks, 'Recent items'),
          alwaysShow: true,
        },
      },
      {
        label: 'Favorites',
        iconType: 'starEmpty',
        size: 's',
        style: { color: 'inherit' },
        'aria-label': 'Favorited items',
        onClick: () => this.expandFlyout(this.favoriteLinks, 'Favorite items'),
        extraAction: {
          color: 'subdued',
          iconType: 'arrowRight',
          iconSize: 's',
          'aria-label': 'Expand to view favorited apps and objects',
          onClick: () => this.expandFlyout(this.favoriteLinks, 'Favorite items'),
          alwaysShow: true,
        },
      },
    ];

    this.exploreLinks = [
      {
        label: 'Canvas',
        href: '/#/layout/nav-drawer',
        iconType: 'canvasApp',
        size: 's',
        style: { color: 'inherit' },
        'aria-label': 'Canvas',
        isActive: true,
        extraAction: {
          color: 'subdued',
          iconType: 'pinFilled',
          iconSize: 's',
          'aria-label': 'Pin to top',
          alwaysShow: true,
        },
      },
      {
        label: 'Discover',
        href: '/#/layout/nav-drawer',
        iconType: 'discoverApp',
        size: 's',
        style: { color: 'inherit' },
        'aria-label': 'Discover',
        extraAction: {
          color: 'subdued',
          iconType: 'pin',
          iconSize: 's',
          'aria-label': 'Pin to top',
        },
      },
      {
        label: 'Visualize',
        href: '/#/layout/nav-drawer',
        iconType: 'visualizeApp',
        size: 's',
        style: { color: 'inherit' },
        'aria-label': 'Visualize',
        extraAction: {
          color: 'subdued',
          iconType: 'pin',
          iconSize: 's',
          'aria-label': 'Pin to top',
        },
      },
      {
        label: 'Dashboard',
        href: '/#/layout/nav-drawer',
        iconType: 'dashboardApp',
        size: 's',
        style: { color: 'inherit' },
        'aria-label': 'Dashboard',
        extraAction: {
          color: 'subdued',
          iconType: 'pin',
          iconSize: 's',
          'aria-label': 'Pin to top',
        },
      },
      {
        label: 'Machine learning',
        href: '/#/layout/nav-drawer',
        iconType: 'machineLearningApp',
        size: 's',
        style: { color: 'inherit' },
        'aria-label': 'Machine learning',
        extraAction: {
          color: 'subdued',
          iconType: 'pin',
          iconSize: 's',
          'aria-label': 'Pin to top',
        },
      },
      {
        label: 'Graph',
        href: '/#/layout/nav-drawer',
        iconType: 'graphApp',
        size: 's',
        style: { color: 'inherit' },
        'aria-label': 'Graph',
        extraAction: {
          color: 'subdued',
          iconType: 'pin',
          iconSize: 's',
          'aria-label': 'Pin to top',
        },
      }
    ];

    this.solutionsLinks = [
      {
        label: 'APM',
        href: '/#/layout/nav-drawer',
        iconType: 'apmApp',
        size: 's',
        style: { color: 'inherit' },
        'aria-label': 'APM',
        extraAction: {
          color: 'subdued',
          iconType: 'pin',
          iconSize: 's',
          'aria-label': 'Pin to top',
        },
      },
      {
        label: 'Infrastructure',
        href: '/#/layout/nav-drawer',
        iconType: 'infraApp',
        size: 's',
        style: { color: 'inherit' },
        'aria-label': 'Infra',
        extraAction: {
          color: 'subdued',
          iconType: 'pin',
          iconSize: 's',
          'aria-label': 'Pin to top',
        },
      },
      {
        label: 'Log viewer',
        href: '/#/layout/nav-drawer',
        iconType: 'loggingApp',
        size: 's',
        style: { color: 'inherit' },
        'aria-label': 'Logs',
        extraAction: {
          color: 'subdued',
          iconType: 'pin',
          iconSize: 's',
          'aria-label': 'Pin to top',
        },
      },
      {
        label: 'Uptime',
        href: '/#/layout/nav-drawer',
        iconType: 'upgradeAssistantApp',
        size: 's',
        style: { color: 'inherit' },
        'aria-label': 'Graph',
        extraAction: {
          color: 'subdued',
          iconType: 'pin',
          iconSize: 's',
          'aria-label': 'Pin to top',
        },
      },
      {
        label: 'Maps',
        href: '/#/layout/nav-drawer',
        iconType: 'gisApp',
        size: 's',
        style: { color: 'inherit' },
        'aria-label': 'Maps',
        extraAction: {
          color: 'subdued',
          iconType: 'pin',
          iconSize: 's',
          'aria-label': 'Pin to top',
        },
      },
      {
        label: 'SIEM',
        href: '/#/layout/nav-drawer',
        iconType: 'securityAnalyticsApp',
        size: 's',
        style: { color: 'inherit' },
        'aria-label': 'SIEM',
        extraAction: {
          color: 'subdued',
          iconType: 'pin',
          iconSize: 's',
          'aria-label': 'Pin to top',
        },
      }
    ];

    this.adminLinks = [
      {
        label: 'Admin',
        iconType: 'managementApp',
        size: 's',
        style: { color: 'inherit' },
        'aria-label': 'Admin',
        onClick: () => this.expandFlyout(this.adminSubLinks, 'Tools and settings'),
        extraAction: {
          color: 'subdued',
          iconType: 'arrowRight',
          iconSize: 's',
          'aria-label': 'Pin to top',
          alwaysShow: true,
          onClick: () => this.expandFlyout(this.adminSubLinks, 'Tools and settings'),
        },
      },
    ];

    this.adminSubLinks = [
      {
        label: 'Dev tools',
        href: '/#/layout/nav-drawer',
        iconType: 'devToolsApp',
        size: 's',
        style: { color: 'inherit' },
        'aria-label': 'Dev tools',
        extraAction: {
          color: 'subdued',
          iconType: 'starEmpty',
          iconSize: 's',
          'aria-label': 'Add to favorites',
        },
      },
      {
        label: 'Stack Monitoring',
        href: '/#/layout/nav-drawer',
        iconType: 'monitoringApp',
        size: 's',
        style: { color: 'inherit' },
        'aria-label': 'Monitoring',
        extraAction: {
          color: 'subdued',
          iconType: 'starEmpty',
          iconSize: 's',
          'aria-label': 'Add to favorites',
        },
      },
      {
        label: 'Stack Management',
        href: '/#/layout/nav-drawer',
        iconType: 'managementApp',
        size: 's',
        style: { color: 'inherit' },
        'aria-label': 'Management',
        extraAction: {
          color: 'subdued',
          iconType: 'starEmpty',
          iconSize: 's',
          'aria-label': 'Add to favorites',
        },
      },
    ];

    this.recentLinks = [
      {
        label: 'My dashboard',
        href: '/#/layout/nav-drawer',
        iconType: 'dashboardApp',
        size: 's',
        style: { color: 'inherit' },
        'aria-label': 'My dashboard',
        extraAction: {
          color: 'subdued',
          iconType: 'starEmpty',
          iconSize: 's',
          'aria-label': 'Add to favorites',
        },
      },
      {
        label: 'My workpad',
        href: '/#/layout/nav-drawer',
        iconType: 'canvasApp',
        size: 's',
        style: { color: 'inherit' },
        'aria-label': 'My workpad',
        extraAction: {
          color: 'subdued',
          iconType: 'starEmpty',
          iconSize: 's',
          'aria-label': 'Add to favorites',
        },
      },
      {
        label: 'My logs',
        href: '/#/layout/nav-drawer',
        iconType: 'loggingApp',
        size: 's',
        style: { color: 'inherit' },
        'aria-label': 'My logs',
        extraAction: {
          color: 'subdued',
          iconType: 'starEmpty',
          iconSize: 's',
          'aria-label': 'Add to favorites',
        },
      },
    ];

    this.favoriteLinks = [
      {
        label: 'My workpad',
        href: '/#/layout/nav-drawer',
        iconType: 'canvasApp',
        size: 's',
        style: { color: 'inherit' },
        'aria-label': 'My workpad',
        extraAction: {
          color: 'subdued',
          iconType: 'starFilled',
          iconSize: 's',
          'aria-label': 'Add to favorites',
          alwaysShow: true,
        },
      },
      {
        label: 'My logs',
        href: '/#/layout/nav-drawer',
        iconType: 'loggingApp',
        size: 's',
        style: { color: 'inherit' },
        'aria-label': 'My logs',
        extraAction: {
          color: 'subdued',
          iconType: 'starFilled',
          iconSize: 's',
          'aria-label': 'Add to favorites',
          alwaysShow: true,
        },
      },
    ];
  }

  renderLogo() {
    return (
      <EuiHeaderSectionItemButton
        aria-label="Go to home page"
      >
        <EuiIcon type="logoKibana" href="#" size="l" />
      </EuiHeaderSectionItemButton>
    );
  }

  expandDrawer = () => {
    this.setState({ isCollapsed: false });
  };

  collapseDrawer = () => {
    this.setState({ flyoutIsAnimating: false });

    setTimeout(() => {
      this.setState({
        isCollapsed: true,
        flyoutIsCollapsed: true,
      });
    }, 350);
  };

  expandFlyout = (links, title) => {
    const content = links;

    this.setState({
      flyoutIsCollapsed: false,
      flyoutIsAnimating: true,
      navFlyoutTitle: title,
      navFlyoutContent: content
    });
  };

  collapseFlyout = () => {
    this.setState({ flyoutIsAnimating: true });

    setTimeout(() => {
      this.setState({ flyoutIsCollapsed: true });
    }, 250);
  };

  render() {
    const {
      isCollapsed,
      flyoutIsCollapsed,
      flyoutIsAnimating,
      navFlyoutTitle,
      navFlyoutContent,
    } = this.state;

    return (
      <Fragment>
        <div style={{ position: 'relative' }}>
          <EuiHeader>
            <EuiHeaderSection grow={false}>
              <EuiHeaderSectionItem border="right">{this.renderLogo()}</EuiHeaderSectionItem>
            </EuiHeaderSection>
          </EuiHeader>
          <EuiNavDrawer
            isCollapsed={isCollapsed}
            flyoutIsCollapsed={flyoutIsCollapsed}
            flyoutIsAnimating={flyoutIsAnimating}
            onMouseOver={this.expandDrawer}
            onFocus={this.expandDrawer}
            onMouseLeave={this.collapseDrawer}
            style={{ position: 'absolute' }} // This is for the embedded docs example only
          >
            <EuiNavDrawerMenu>
              <EuiListGroup listItems={this.topLinks} />
              <EuiHorizontalRule margin="none" />
              <EuiListGroup listItems={this.exploreLinks} />
              <EuiHorizontalRule margin="none" />
              <EuiListGroup listItems={this.solutionsLinks} />
              <EuiHorizontalRule margin="none" />
              <EuiListGroup listItems={this.adminLinks} />
            </EuiNavDrawerMenu>
            <EuiNavDrawerFlyout
              title={navFlyoutTitle}
              isCollapsed={flyoutIsCollapsed}
              listItems={navFlyoutContent}
              onMouseLeave={this.collapseFlyout}
            />
          </EuiNavDrawer>
          <EuiPage style={{ minHeight: '800px' }}>
            <EuiPageBody style={{ marginLeft: '64px' }}>
              <EuiPageHeader>
                <EuiPageHeaderSection>
                  <EuiTitle size="l">
                    <h1>Page title</h1>
                  </EuiTitle>
                </EuiPageHeaderSection>
              </EuiPageHeader>
              <EuiPageContent>
                <EuiPageContentHeader>
                  <EuiPageContentHeaderSection>
                    <EuiTitle>
                      <h2>Content title</h2>
                    </EuiTitle>
                  </EuiPageContentHeaderSection>
                </EuiPageContentHeader>
                <EuiPageContentBody>
                  Content body
                </EuiPageContentBody>
              </EuiPageContent>
            </EuiPageBody>
          </EuiPage>
        </div>
      </Fragment>
    );
  }
}
