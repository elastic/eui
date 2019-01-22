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
  EuiNavDrawerMenu,
  EuiNavDrawerFlyout,
  EuiListGroup,
  EuiHorizontalRule,
  EuiShowFor,
  EuiHideFor,
  EuiOutsideClickDetector,
} from '../../../../src/components';

import HeaderUserMenu from '../header/header_user_menu';
import HeaderSpacesMenu from '../header/header_spaces_menu';

export default class extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isCollapsed: true,
      flyoutIsCollapsed: true,
      flyoutIsAnimating: false,
      navFlyoutTitle: undefined,
      navFlyoutContent: [],
      mobileIsHidden: true,
      showScrollbar: false,
      outsideClickDisabled: true,
      isManagingFocus: false,
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
        onClick={this.toggleOpen}
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

  timeoutID;

  toggleOpen = () => {
    this.setState({
      mobileIsHidden: !this.state.mobileIsHidden
    });

    setTimeout(() => {
      this.setState({
        outsideClickDisabled: this.state.mobileIsHidden ? true : false,
      });
    }, 350);
  };

  expandDrawer = () => {
    this.setState({ isCollapsed: false });

    setTimeout(() => {
      this.setState({
        showScrollbar: true,
      });
    }, 350);

    // This prevents the drawer from collapsing when tabbing through children
    // by clearing the timeout thus cancelling the onBlur event (see focusOut).
    // This means isManagingFocus remains true as long as a child element
    // has focus. This is the case since React bubbles up onFocus and onBlur
    // events from the child elements.
    clearTimeout(this.timeoutID);

    if (!this.state.isManagingFocus) {
      this.setState({
        isManagingFocus: true,
      });
    }
  };

  collapseDrawer = () => {
    this.setState({
      flyoutIsAnimating: false,
    });

    setTimeout(() => {
      this.setState({
        isCollapsed: true,
        flyoutIsCollapsed: true,
        mobileIsHidden: true,
        showScrollbar: false,
        outsideClickDisabled: true,
      });
    }, 350);

    // Scrolls the menu and flyout back to top when the nav drawer collapses
    document.getElementById('navDrawerMenu').scroll(0, 0);
    document.getElementById('navDrawerFlyout').scroll(0, 0);
  };

  focusOut = () => {
    // This collapses the drawer when no children have focus (i.e. tabbed out).
    // In other words, if focus does not bubble up from a child element, then
    // the drawer will collapse. See the corresponding block in expandDrawer
    // (called by onFocus) which cancels this operation via clearTimeout.
    this.timeoutID = setTimeout(() => {
      if (this.state.isManagingFocus) {
        this.setState({
          isManagingFocus: false,
        });

        this.collapseDrawer();
      }
    }, 0);
  }

  expandFlyout = (links, title) => {
    const content = links;

    this.setState(prevState => ({
      flyoutIsCollapsed: prevState.navFlyoutTitle === title ? !this.state.flyoutIsCollapsed : false,
    }));

    this.setState({
      flyoutIsAnimating: true,
      navFlyoutTitle: title,
      navFlyoutContent: content
    });
  };

  collapseFlyout = () => {
    this.setState({ flyoutIsAnimating: true });

    setTimeout(() => {
      this.setState({
        flyoutIsCollapsed: true,
        navFlyoutTitle: null,
        navFlyoutContent: null
      });
    }, 250);
  };

  render() {
    const {
      isCollapsed,
      flyoutIsCollapsed,
      flyoutIsAnimating,
      navFlyoutTitle,
      navFlyoutContent,
      mobileIsHidden,
      showScrollbar,
      outsideClickDisabled,
    } = this.state;

    return (
      <Fragment>
        <div style={{ position: 'relative' }}>
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
          <EuiOutsideClickDetector
            onOutsideClick={() => this.collapseDrawer()}
            isDisabled={outsideClickDisabled}
          >
            <EuiNavDrawer
              isCollapsed={isCollapsed}
              flyoutIsCollapsed={flyoutIsCollapsed}
              flyoutIsAnimating={flyoutIsAnimating}
              onMouseOver={this.expandDrawer}
              onFocus={this.expandDrawer}
              onBlur={this.focusOut}
              onMouseLeave={this.collapseDrawer}
              mobileIsHidden={mobileIsHidden}
              showScrollbar={showScrollbar}
              style={{ position: 'absolute' }} // This is for the embedded docs example only
            >
              <EuiNavDrawerMenu id="navDrawerMenu">
                <EuiListGroup listItems={this.topLinks} />
                <EuiHorizontalRule margin="none" />
                <EuiListGroup listItems={this.exploreLinks} />
                <EuiHorizontalRule margin="none" />
                <EuiListGroup listItems={this.solutionsLinks} />
                <EuiHorizontalRule margin="none" />
                <EuiListGroup listItems={this.adminLinks} />
              </EuiNavDrawerMenu>
              <EuiNavDrawerFlyout
                id="navDrawerFlyout"
                title={navFlyoutTitle}
                isCollapsed={flyoutIsCollapsed}
                listItems={navFlyoutContent}
                onMouseLeave={this.collapseFlyout}
              />
            </EuiNavDrawer>
          </EuiOutsideClickDetector>
          <EuiPage style={{ minHeight: '600px' }}>
            <EuiPageBody style={{ marginLeft: '64px' }}>
              <EuiHideFor sizes={['xs', 's']}>
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
                    Body content
                  </EuiPageContentBody>
                </EuiPageContent>
              </EuiHideFor>
            </EuiPageBody>
          </EuiPage>
        </div>
      </Fragment>
    );
  }
}
