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
  EuiHeaderBreadcrumbs,
  EuiHeaderLogo,
  EuiIcon,
  EuiImage,
  EuiTitle,
  EuiNavDrawerGroup,
  EuiNavDrawer,
  EuiHorizontalRule,
  EuiShowFor,
  EuiFocusTrap,
  EuiButton,
} from '../../../../src/components';

import { keyCodes } from '../../../../src/services';

import HeaderUserMenu from '../header/header_user_menu';
import HeaderSpacesMenu from '../header/header_spaces_menu';

export default class extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isFullScreen: false,
    };

    const faveExtraAction = {
      color: 'subdued',
      iconType: 'starEmpty',
      iconSize: 's',
      'aria-label': 'Add to favorites',
    };

    const pinExtraAction = {
      color: 'subdued',
      iconType: 'pin',
      iconSize: 's',
    };

    const pinExtraActionFn = val => {
      pinExtraAction['aria-label'] = `Pin ${val} to top`;
      return pinExtraAction;
    };

    this.topLinks = [
      {
        label: 'Recently viewed',
        iconType: 'clock',
        flyoutMenu: {
          title: 'Recent items',
          listItems: [
            {
              label: 'My dashboard',
              href: '#/layout/nav-drawer',
              iconType: 'dashboardApp',
              extraAction: faveExtraAction,
            },
            {
              label: 'Workpad with title that wraps',
              href: '#/layout/nav-drawer',
              iconType: 'canvasApp',
              extraAction: faveExtraAction,
            },
            {
              label: 'My logs',
              href: '#/layout/nav-drawer',
              iconType: 'logsApp',
              'aria-label': 'This is an alternate aria-label',
              extraAction: faveExtraAction,
            },
          ],
        },
      },
      {
        label: 'Favorites',
        iconType: 'starEmpty',
        flyoutMenu: {
          title: 'Favorite items',
          listItems: [
            {
              label: 'My workpad',
              href: '#/layout/nav-drawer',
              iconType: 'canvasApp',
              extraAction: {
                color: 'subdued',
                iconType: 'starFilled',
                iconSize: 's',
                'aria-label': 'Remove from favorites',
                alwaysShow: true,
              },
            },
            {
              label: 'My logs',
              href: '#/layout/nav-drawer',
              iconType: 'logsApp',
              extraAction: {
                color: 'subdued',
                iconType: 'starFilled',
                iconSize: 's',
                'aria-label': 'Remove from favorites',
                alwaysShow: true,
              },
            },
          ],
        },
      },
    ];

    this.adminLinks = [
      {
        label: 'Admin',
        iconType: 'managementApp',
        flyoutMenu: {
          title: 'Tools and settings',
          listItems: [
            {
              label: 'Dev tools',
              href: '#/layout/nav-drawer',
              iconType: 'devToolsApp',
              extraAction: {
                color: 'subdued',
                iconType: 'starEmpty',
                iconSize: 's',
                'aria-label': 'Add to Tools and Settings to favorites',
              },
            },
            {
              label: 'Stack Monitoring',
              href: '#/layout/nav-drawer',
              iconType: 'monitoringApp',
              extraAction: {
                color: 'subdued',
                iconType: 'starEmpty',
                iconSize: 's',
                'aria-label': 'Add Stack Monitoring to favorites',
              },
            },
            {
              label: 'Stack Management',
              href: '#/layout/nav-drawer',
              iconType: 'managementApp',
              extraAction: {
                color: 'subdued',
                iconType: 'starEmpty',
                iconSize: 's',
                'aria-label': 'Add Stack Management to favorites',
              },
            },
            {
              label: 'Nature Plugin (image as icon)',
              href: '#/layout/nav-drawer',
              extraAction: { ...pinExtraActionFn('Nature Plugin') },
              icon: (
                <EuiImage
                  size="s"
                  alt="Random nature image"
                  url="https://source.unsplash.com/300x300/?Nature"
                />
              ),
            },
          ],
        },
      },
    ];

    this.analyzeLinks = [
      {
        label: 'Analyze',
        iconType: 'logoBusinessAnalytics',
        flyoutMenu: {
          title: 'Analyze your data',
          listItems: [
            {
              label: 'Discover',
              href: '#/layout/nav-drawer',
              iconType: 'discoverApp',
              extraAction: {
                color: 'subdued',
                iconType: 'starEmpty',
                iconSize: 's',
                'aria-label': 'Add Discover to favorites',
              },
            },
            {
              label: 'Visualize',
              href: '#/layout/nav-drawer',
              iconType: 'visualizeApp',
              extraAction: {
                color: 'subdued',
                iconType: 'starEmpty',
                iconSize: 's',
                'aria-label': 'Add Visualize to favorites',
              },
            },
            {
              label: 'Canvas',
              href: '#/layout/nav-drawer',
              iconType: 'canvasApp',
              extraAction: {
                color: 'subdued',
                iconType: 'starEmpty',
                iconSize: 's',
                'aria-label': 'Add Canvas to favorites',
              },
            },
            {
              label: 'Maps',
              href: '#/layout/nav-drawer',
              iconType: 'gisApp',
              extraAction: {
                color: 'subdued',
                iconType: 'starEmpty',
                iconSize: 's',
                'aria-label': 'Add Maps to favorites',
              },
            },
            {
              label: 'Machine Learning',
              href: '#/layout/nav-drawer',
              iconType: 'machineLearningApp',
              extraAction: {
                color: 'subdued',
                iconType: 'starEmpty',
                iconSize: 's',
                'aria-label': 'Add Machine Learning to favorites',
              },
            },
            {
              label: 'Graph',
              href: '#/layout/nav-drawer',
              iconType: 'graphApp',
              extraAction: {
                color: 'subdued',
                iconType: 'starEmpty',
                iconSize: 's',
                'aria-label': 'Add Graph to favorites',
              },
            },
          ],
        },
      },
    ];

    this.securityLinks = [
      {
        label: 'Security',
        iconType: 'logoSecurity',
        flyoutMenu: {
          title: 'Security',
          listItems: [
            {
              label: 'SIEM',
              href: '#/layout/nav-drawer',
              iconType: 'securityApp',
              extraAction: { ...pinExtraActionFn('SIEM') },
            },
            {
              label: 'Endpoints',
              href: '#/layout/nav-drawer',
              iconType: 'securityAnalyticsApp',
              extraAction: {
                color: 'subdued',
                iconType: 'starEmpty',
                iconSize: 's',
                'aria-label': 'Add SIEM to favorites',
              },
            },
          ],
        },
      },
    ];

    this.searchLinks = [
      {
        label: 'Enterprise Search',
        iconType: 'logoAppSearch',
        flyoutMenu: {
          title: 'Enterprise search',
          listItems: [
            {
              label: 'Site search',
              href: '#/layout/nav-drawer',
              iconType: 'searchProfilerApp',
              extraAction: {
                color: 'subdued',
                iconType: 'starEmpty',
                iconSize: 's',
                'aria-label': 'Add Enterprise search to favorites',
              },
            },
            {
              label: 'App search',
              href: '#/layout/nav-drawer',
              iconType: 'searchProfilerApp',
              extraAction: {
                color: 'subdued',
                iconType: 'starEmpty',
                iconSize: 's',
                'aria-label': 'Add App Search to favorites',
              },
            },
            {
              label: 'Workplace search',
              href: '#/layout/nav-drawer',
              iconType: 'searchProfilerApp',
              extraAction: {
                color: 'subdued',
                iconType: 'starEmpty',
                iconSize: 's',
                'aria-label': 'Add Workplace Search to favorites',
              },
            },
          ],
        },
      },
    ];

    this.observabilityLinks = [
      {
        label: 'Observability',
        iconType: 'logoMetrics',
        flyoutMenu: {
          title: 'Observe your operations',
          listItems: [
            {
              label: 'Logs',
              href: '#/layout/nav-drawer',
              iconType: 'logsApp',
              extraAction: {
                color: 'subdued',
                iconType: 'starEmpty',
                iconSize: 's',
                'aria-label': 'Add Logs to favorites',
              },
            },
            {
              label: 'Metrics',
              href: '#/layout/nav-drawer',
              iconType: 'metricsApp',
              extraAction: {
                color: 'subdued',
                iconType: 'starEmpty',
                iconSize: 's',
                'aria-label': 'Add Metrics to favorites',
              },
            },
            {
              label: 'APM',
              href: '#/layout/nav-drawer',
              iconType: 'apmApp',
              extraAction: {
                color: 'subdued',
                iconType: 'starEmpty',
                iconSize: 's',
                'aria-label': 'Add APM to favorites',
              },
            },
            {
              label: 'Uptime',
              href: '#/layout/nav-drawer',
              iconType: 'uptimeApp',
              extraAction: {
                color: 'subdued',
                iconType: 'starEmpty',
                iconSize: 's',
                'aria-label': 'Add Uptime to favorites',
              },
            },
          ],
        },
      },
    ];
  }

  onKeyDown = event => {
    if (event.keyCode === keyCodes.ESCAPE) {
      //   event.preventDefault();
      //   event.stopPropagation();
      //   this.closeFullScreen();
    }
  };

  toggleFullScreen = () => {
    this.setState(prevState => ({
      isFullScreen: !prevState.isFullScreen,
    }));
  };

  closeFullScreen = () => {
    this.setState({
      isFullScreen: false,
    });
  };

  renderLogo() {
    return (
      <EuiHeaderLogo
        iconType="logoKibana"
        href="#/layout/nav-drawer"
        aria-label="Goes to home"
      />
    );
  }

  renderMenuTrigger() {
    return (
      <EuiHeaderSectionItemButton
        aria-label="Open nav"
        onClick={() => this.navDrawerRef.toggleOpen()}>
        <EuiIcon type="apps" href="#" size="m" />
      </EuiHeaderSectionItemButton>
    );
  }

  renderBreadcrumbs() {
    const breadcrumbs = [
      {
        text: 'Management',
        href: '#',
        onClick: e => {
          e.preventDefault();
          console.log('You clicked management');
        },
        'data-test-subj': 'breadcrumbsAnimals',
        className: 'customClass',
      },
      {
        text: 'Truncation test is here for a really long item',
        href: '#',
        onClick: e => {
          e.preventDefault();
          console.log('You clicked truncation test');
        },
      },
      {
        text: 'hidden',
        href: '#',
        onClick: e => {
          e.preventDefault();
          console.log('You clicked hidden');
        },
      },
      {
        text: 'Users',
        href: '#',
        onClick: e => {
          e.preventDefault();
          console.log('You clicked users');
        },
      },
      {
        text: 'Create',
      },
    ];

    return <EuiHeaderBreadcrumbs breadcrumbs={breadcrumbs} />;
  }

  setNavDrawerRef = ref => (this.navDrawerRef = ref);

  render() {
    let fullScreenDisplay;

    if (this.state.isFullScreen) {
      fullScreenDisplay = (
        <EuiFocusTrap>
          <div
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              height: '100%',
              width: '100%',
            }}
            onKeyDown={this.onKeyDown}>
            <EuiHeader>
              <EuiHeaderSection grow={false}>
                <EuiShowFor sizes={['xs', 's']}>
                  <EuiHeaderSectionItem border="right">
                    {this.renderMenuTrigger()}
                  </EuiHeaderSectionItem>
                </EuiShowFor>
                <EuiHeaderSectionItem border="right">
                  {this.renderLogo()}
                </EuiHeaderSectionItem>
                <EuiHeaderSectionItem border="right">
                  <HeaderSpacesMenu />
                </EuiHeaderSectionItem>
              </EuiHeaderSection>

              {this.renderBreadcrumbs()}

              <EuiHeaderSection side="right">
                <EuiHeaderSectionItem>
                  <HeaderUserMenu />
                </EuiHeaderSectionItem>
              </EuiHeaderSection>
            </EuiHeader>
            <EuiNavDrawer ref={this.setNavDrawerRef}>
              <EuiNavDrawerGroup listItems={this.topLinks} />
              <EuiHorizontalRule margin="none" />
              <EuiNavDrawerGroup listItems={this.analyzeLinks} />
              <EuiNavDrawerGroup listItems={this.securityLinks} />
              <EuiNavDrawerGroup listItems={this.searchLinks} />
              <EuiNavDrawerGroup listItems={this.observabilityLinks} />
              <EuiHorizontalRule margin="none" />
              <EuiNavDrawerGroup listItems={this.adminLinks} />
            </EuiNavDrawer>
            <EuiPage className="euiNavDrawerPage">
              <EuiPageBody className="euiNavDrawerPage__pageBody">
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
                    <EuiButton
                      fill
                      onClick={this.toggleFullScreen}
                      iconType="exit"
                      aria-label="Exit fullscreen demo">
                      Exit fullscreen demo
                    </EuiButton>
                  </EuiPageContentBody>
                </EuiPageContent>
              </EuiPageBody>
            </EuiPage>
          </div>
        </EuiFocusTrap>
      );
    }
    return (
      <Fragment>
        <EuiButton
          onClick={this.toggleFullScreen}
          iconType="fullScreen"
          aria-label="Show fullscreen demo">
          Show fullscreen demo
        </EuiButton>

        {/*
          If the below fullScreen code renders, it actually attaches to the body because of
          EuiOverlayMask's React portal usage.
        */}

        {fullScreenDisplay}
      </Fragment>
    );
  }
}
