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
  EuiTitle,
  EuiNavDrawer,
  EuiListGroup,
  EuiHorizontalRule,
  EuiShowFor,
  EuiFocusTrap,
  EuiButton
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

    this.topLinks = [
      {
        label: 'Recently viewed',
        iconType: 'clock',
        size: 's',
        style: { color: 'inherit' },
        'aria-label': 'Recently viewed items',
        flyoutMenu: {
          title: 'Recent items',
          listItems: [
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
              label: 'Workpad with title that wraps',
              href: '/#/layout/nav-drawer',
              iconType: 'canvasApp',
              size: 's',
              style: { color: 'inherit' },
              'aria-label': 'Workpad with title that wraps',
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
          ],
        },
      },
      {
        label: 'Favorites',
        iconType: 'starEmpty',
        size: 's',
        style: { color: 'inherit' },
        'aria-label': 'Favorited items',
        flyoutMenu: {
          title: 'Favorite items',
          listItems: [
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
          ],
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
        flyoutMenu: {
          title: 'Tools and settings',
          listItems: [
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
          ]
        },
      },
    ];
  }

  onKeyDown = event => {
    if (event.keyCode === keyCodes.ESCAPE) {
      event.preventDefault();
      event.stopPropagation();
      this.closeFullScreen();
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
        href="/#/layout/nav-drawer"
        aria-label="Goes to home"
      />
    );
  }

  renderMenuTrigger() {
    return (
      <EuiHeaderSectionItemButton
        aria-label="Open nav"
        onClick={() => this.navDrawerRef.toggleOpen()}
      >
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
        className: 'customClass'
      },
      {
        text: 'Truncation test is here for a really long item',
        href: '#',
        onClick: e => {
          e.preventDefault();
          console.log('You clicked truncation test');
        }
      },
      {
        text: 'hidden',
        href: '#',
        onClick: e => {
          e.preventDefault();
          console.log('You clicked hidden');
        }
      },
      {
        text: 'Users',
        href: '#',
        onClick: e => {
          e.preventDefault();
          console.log('You clicked users');
        }
      },
      {
        text: 'Create'
      }
    ];

    return (
      <EuiHeaderBreadcrumbs
        breadcrumbs={breadcrumbs}
      />
    );
  }

  setNavDrawerRef = ref => this.navDrawerRef = ref;

  render() {

    let fullScreenDisplay;

    if (this.state.isFullScreen) {

      fullScreenDisplay = (
        <EuiFocusTrap>
          <div style={{ position: 'fixed', top: 0, left: 0, height: '100%', width: '100%' }} onKeyDown={this.onKeyDown}>
            <EuiHeader>
              <EuiHeaderSection grow={false}>
                <EuiShowFor sizes={['xs', 's']}>
                  <EuiHeaderSectionItem border="right">
                    {this.renderMenuTrigger()}
                  </EuiHeaderSectionItem>
                </EuiShowFor>
                <EuiHeaderSectionItem border="right">{this.renderLogo()}</EuiHeaderSectionItem>
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
              <EuiListGroup listItems={this.topLinks} />
              <EuiHorizontalRule margin="none" />
              <EuiListGroup listItems={this.exploreLinks} />
              <EuiHorizontalRule margin="none" />
              <EuiListGroup listItems={this.solutionsLinks} />
              <EuiHorizontalRule margin="none" />
              <EuiListGroup listItems={this.adminLinks} />
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
                      aria-label="Exit fullscreen demo"
                    >
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
          aria-label="Show fullscreen demo"
        >
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
