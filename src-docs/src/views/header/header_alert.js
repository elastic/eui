import React, { useState, useRef, Fragment } from 'react';

import {
  EuiButton,
  EuiFocusTrap,
  EuiHorizontalRule,
  EuiHeader,
  EuiHeaderSection,
  EuiHeaderSectionItem,
  EuiHeaderSectionItemButton,
  EuiHeaderLogo,
  EuiHeaderLink,
  EuiHeaderLinks,
  EuiIcon,
  EuiImage,
  EuiNavDrawerGroup,
  EuiNavDrawer,
  EuiPage,
  EuiPageBody,
  EuiPageHeader,
  EuiPageHeaderSection,
  EuiPageContent,
  EuiPageContentHeader,
  EuiPageContentHeaderSection,
  EuiPageContentBody,
  EuiShowFor,
  EuiTitle,
} from '../../../../src/components';

import { keyCodes } from '../../../../src/services';

import HeaderUserMenu from './header_user_menu';
import HeaderSpacesMenu from './header_spaces_menu';
import HeaderUpdates from './header_updates';

export default () => {
  const [isFullScreen, setIsFullScreen] = useState(false);

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

  const topLinks = [
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

  const exploreLinks = [
    {
      label: 'Canvas',
      href: '#/layout/nav-drawer',
      iconType: 'canvasApp',
      isActive: true,
      extraAction: {
        ...pinExtraActionFn('Canvas'),
        alwaysShow: true,
      },
    },
    {
      label: 'Discover',
      href: '#/layout/nav-drawer',
      iconType: 'discoverApp',
      extraAction: { ...pinExtraActionFn('Discover') },
    },
    {
      label: 'Visualize',
      href: '#/layout/nav-drawer',
      iconType: 'visualizeApp',
      extraAction: { ...pinExtraActionFn('Visualize') },
    },
    {
      label: 'Dashboard',
      href: '#/layout/nav-drawer',
      iconType: 'dashboardApp',
      extraAction: { ...pinExtraActionFn('Dashboard') },
    },
    {
      label: 'Machine learning',
      href: '#/layout/nav-drawer',
      iconType: 'machineLearningApp',
      extraAction: { ...pinExtraActionFn('Machine learning') },
    },
    {
      label: 'Custom Plugin (no icon)',
      href: '#/layout/nav-drawer',
      extraAction: { ...pinExtraActionFn('Custom Plugin') },
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
  ];

  const solutionsLinks = [
    {
      label: 'APM',
      href: '#/layout/nav-drawer',
      iconType: 'apmApp',
      extraAction: { ...pinExtraActionFn('APM') },
    },
    {
      label: 'Metrics',
      href: '#/layout/nav-drawer',
      iconType: 'metricsApp',
      extraAction: { ...pinExtraActionFn('Infrastructure') },
    },
    {
      label: 'Logs',
      href: '#/layout/nav-drawer',
      iconType: 'logsApp',
      extraAction: { ...pinExtraActionFn('Log viewer') },
    },
    {
      label: 'Uptime',
      href: '#/layout/nav-drawer',
      iconType: 'upgradeAssistantApp',
      extraAction: { ...pinExtraActionFn('Uptime') },
    },
    {
      label: 'Maps',
      href: '#/layout/nav-drawer',
      iconType: 'gisApp',
      extraAction: { ...pinExtraActionFn('Maps') },
    },
    {
      label: 'SIEM',
      href: '#/layout/nav-drawer',
      iconType: 'securityAnalyticsApp',
      extraAction: { ...pinExtraActionFn('SIEM') },
    },
  ];

  const adminLinks = [
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
              'aria-label': 'Add to favorites',
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
              'aria-label': 'Add to favorites',
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
              'aria-label': 'Add to favorites',
            },
          },
        ],
      },
    },
  ];

  const onKeyDown = event => {
    if (event.keyCode === keyCodes.ESCAPE) {
      event.preventDefault();
      event.stopPropagation();
      closeFullScreen();
    }
  };

  const toggleFullScreen = () => setIsFullScreen(isFullScreen => !isFullScreen);

  const closeFullScreen = () => setIsFullScreen(false);

  const renderLogo = () => {
    return (
      <EuiHeaderLogo
        iconType="logoKibana"
        href="#/layout/nav-drawer"
        aria-label="Goes to home"
      />
    );
  };

  const renderMenuTrigger = () => {
    return (
      <EuiHeaderSectionItemButton
        aria-label="Open nav"
        onClick={() => navDrawerRef.current.toggleOpen()}>
        <EuiIcon type="apps" href="#" size="m" />
      </EuiHeaderSectionItemButton>
    );
  };

  const navDrawerRef = useRef(null);
  let fullScreenDisplay;

  if (isFullScreen) {
    fullScreenDisplay = (
      <EuiFocusTrap>
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            zIndex: 1000,
            height: '100%',
            width: '100%',
          }}
          onKeyDown={onKeyDown}>
          <EuiHeader>
            <EuiHeaderSection grow={false}>
              <EuiShowFor sizes={['xs', 's']}>
                <EuiHeaderSectionItem border="right">
                  {renderMenuTrigger()}
                </EuiHeaderSectionItem>
              </EuiShowFor>
              <EuiHeaderSectionItem border="right">
                {renderLogo()}
              </EuiHeaderSectionItem>
              <EuiHeaderSectionItem border="right">
                <HeaderSpacesMenu />
              </EuiHeaderSectionItem>
            </EuiHeaderSection>

            <EuiHeaderLinks>
              <EuiHeaderLink href="#">Home</EuiHeaderLink>
            </EuiHeaderLinks>

            <EuiHeaderSection side="right">
              <EuiHeaderSectionItem>
                <HeaderUpdates />
              </EuiHeaderSectionItem>
              <EuiHeaderSectionItem>
                <HeaderUserMenu />
              </EuiHeaderSectionItem>
            </EuiHeaderSection>
          </EuiHeader>
          <EuiNavDrawer ref={navDrawerRef}>
            <EuiNavDrawerGroup listItems={topLinks} />
            <EuiHorizontalRule margin="none" />
            <EuiNavDrawerGroup listItems={exploreLinks} />
            <EuiHorizontalRule margin="none" />
            <EuiNavDrawerGroup listItems={solutionsLinks} />
            <EuiHorizontalRule margin="none" />
            <EuiNavDrawerGroup listItems={adminLinks} />
          </EuiNavDrawer>
          <EuiPage className="euiNavDrawerPage">
            <EuiPageBody className="euiNavDrawerPage__pageBody">
              <EuiPageHeader>
                <EuiPageHeaderSection>
                  <EuiTitle size="m">
                    <h2>Kibana news feed demo</h2>
                  </EuiTitle>
                </EuiPageHeaderSection>
              </EuiPageHeader>
              <EuiPageContent>
                <EuiPageContentHeader>
                  <EuiPageContentHeaderSection>
                    <p>
                      Click the <EuiIcon type="email" size="m" /> button to see
                      ‘What’s new?’
                    </p>
                  </EuiPageContentHeaderSection>
                </EuiPageContentHeader>
                <EuiPageContentBody>
                  <EuiButton
                    fill
                    onClick={toggleFullScreen}
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
        onClick={toggleFullScreen}
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
};
