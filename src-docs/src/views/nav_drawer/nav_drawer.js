import React, { Component } from 'react';

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
  EuiHeaderLogo,
  EuiTitle,
  EuiNavDrawer,
  EuiListGroup,
  EuiHorizontalRule,
} from '../../../../src/components';

const topLinks = [
  {
    label: 'Recently viewed',
    href: '/#/layout/nav-drawer',
    iconType: 'clock',
    size: 's',
    style: { color: 'inherit' },
    'aria-label': 'Recently viewed items',
    extraAction: {
      color: 'subdued',
      iconType: 'arrowRight',
      iconSize: 's',
      'aria-label': 'Expand to view recent apps and objects',
    },
  },
  {
    label: 'Favorites',
    href: '/#/layout/nav-drawer',
    iconType: 'pin',
    size: 's',
    style: { color: 'inherit' },
    'aria-label': 'Favorited items',
    extraAction: {
      color: 'subdued',
      iconType: 'arrowRight',
      iconSize: 's',
      'aria-label': 'Expand to view favorited apps and objects',
    },
  },
];

const bottomLinks = [
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
      'aria-label': 'Add to favorites',
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
      'aria-label': 'Add to favorites',
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
      'aria-label': 'Add to favorites',
    },
  },
  {
    label: 'Timelion',
    href: '/#/layout/nav-drawer',
    iconType: 'timelionApp',
    size: 's',
    style: { color: 'inherit' },
    'aria-label': 'Timelion',
    extraAction: {
      color: 'subdued',
      iconType: 'pin',
      iconSize: 's',
      'aria-label': 'Add to favorites',
    },
  },
  {
    label: 'Canvas',
    href: '/#/layout/nav-drawer',
    iconType: 'canvasApp',
    size: 's',
    style: { color: 'inherit' },
    'aria-label': 'Canvas',
    extraAction: {
      color: 'subdued',
      iconType: 'pin',
      iconSize: 's',
      'aria-label': 'Add to favorites',
    },
  },
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
      'aria-label': 'Add to favorites',
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
      'aria-label': 'Add to favorites',
    },
  },
  {
    label: 'Infra ops',
    href: '/#/layout/nav-drawer',
    iconType: 'infraApp',
    size: 's',
    style: { color: 'inherit' },
    'aria-label': 'Infra',
    extraAction: {
      color: 'subdued',
      iconType: 'pin',
      iconSize: 's',
      'aria-label': 'Add to favorites',
    },
  },
  {
    label: 'Logs',
    href: '/#/layout/nav-drawer',
    iconType: 'loggingApp',
    size: 's',
    style: { color: 'inherit' },
    'aria-label': 'Logs',
    extraAction: {
      color: 'subdued',
      iconType: 'pin',
      iconSize: 's',
      'aria-label': 'Add to favorites',
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
      'aria-label': 'Add to favorites',
    },
  },
  {
    label: 'Dev tools',
    href: '/#/layout/nav-drawer',
    iconType: 'devToolsApp',
    size: 's',
    style: { color: 'inherit' },
    'aria-label': 'Dev tools',
    extraAction: {
      color: 'subdued',
      iconType: 'pin',
      iconSize: 's',
      'aria-label': 'Add to favorites',
    },
  },
  {
    label: 'Monitoring',
    href: '/#/layout/nav-drawer',
    iconType: 'monitoringApp',
    size: 's',
    style: { color: 'inherit' },
    'aria-label': 'Monitoring',
    extraAction: {
      color: 'subdued',
      iconType: 'pin',
      iconSize: 's',
      'aria-label': 'Add to favorites',
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
      'aria-label': 'Add to favorites',
    },
  },
  {
    label: 'Management',
    href: '/#/layout/nav-drawer',
    iconType: 'managementApp',
    size: 's',
    style: { color: 'inherit' },
    'aria-label': 'Management',
    extraAction: {
      color: 'subdued',
      iconType: 'pin',
      iconSize: 's',
      'aria-label': 'Add to favorites',
    },
  },
];

export default class extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isCollapsed: true,
    };
  }

  renderLogo() {
    return <EuiHeaderLogo iconType="logoKibana" href="#" aria-label="Go to home page" />;
  }

  expandDrawer = () => {
    this.setState({ isCollapsed: false });
  };

  collapseDrawer = () => {
    this.setState({ isCollapsed: true });
  };

  render() {
    const {
      isCollapsed,
    } = this.state;

    return (
      <div>
        <EuiHeader>
          <EuiHeaderSection grow={false}>
            <EuiHeaderSectionItem border="right">{this.renderLogo()}</EuiHeaderSectionItem>
          </EuiHeaderSection>
        </EuiHeader>
        <EuiPage style={{ position: 'relative', minHeight: '800px' }}>
          <EuiNavDrawer isCollapsed={isCollapsed} onMouseOver={this.expandDrawer} onMouseOut={this.collapseDrawer}>
            <EuiListGroup listItems={topLinks} />
            <EuiHorizontalRule margin="s" />
            <EuiListGroup listItems={bottomLinks} />
          </EuiNavDrawer>

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
    );
  }
}
