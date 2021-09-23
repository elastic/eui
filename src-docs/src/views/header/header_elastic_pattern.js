import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
// Uncomment to use in consuming apps or CodeSandbox
// import theme from '@elastic/eui/dist/eui_theme_light.json';

import {
  EuiAvatar,
  EuiBadge,
  EuiButton,
  EuiCollapsibleNav,
  EuiCollapsibleNavGroup,
  EuiFlexItem,
  EuiFlyout,
  EuiFlyoutBody,
  EuiFlyoutHeader,
  EuiHeader,
  EuiHeaderLink,
  EuiHeaderLinks,
  EuiHeaderLogo,
  EuiHeaderSectionItemButton,
  EuiIcon,
  EuiListGroupItem,
  EuiPageTemplate,
  EuiPopover,
  EuiPortal,
  EuiShowFor,
  EuiText,
  EuiTitle,
  EuiSelectableTemplateSitewide,
  EuiSelectableMessage,
} from '../../../../src/components';
import { ExampleContext } from '../../services';

export default ({ theme }) => {
  useEffect(() => {
    document.body.classList.add('euiBody--headerIsFixed--double');

    return () => {
      document.body.classList.remove('euiBody--headerIsFixed--double');
    };
  }, []);

  /**
   * Collapsible Nav
   */
  const [navIsOpen, setNavIsOpen] = useState(
    JSON.parse(String(localStorage.getItem('navIsDocked'))) || false
  );
  const [navIsDocked, setNavIsDocked] = useState(
    JSON.parse(String(localStorage.getItem('navIsDocked'))) || false
  );
  const collapsibleNav = (
    <EuiCollapsibleNav
      id="guideHeaderCollapsibleNavExample"
      aria-label="Main navigation"
      isOpen={navIsOpen}
      isDocked={navIsDocked}
      button={
        <EuiHeaderSectionItemButton
          aria-label="Toggle main navigation"
          onClick={() => setNavIsOpen(!navIsOpen)}
        >
          <EuiIcon type={'menu'} size="m" aria-hidden="true" />
        </EuiHeaderSectionItemButton>
      }
      onClose={() => setNavIsOpen(false)}
    >
      <EuiFlexItem className="eui-yScroll">
        {/* Docs callout */}
        <EuiCollapsibleNavGroup background="none" title="EuiCollapsibleNav">
          <EuiText size="s" color="subdued" style={{ padding: '0 8px 8px' }}>
            <p>
              Please see the component page for{' '}
              <Link to="/navigation/collapsible-nav">
                <strong>EuiCollapsibleNav</strong>
              </Link>{' '}
              on how to configure your navigation.
            </p>
          </EuiText>
        </EuiCollapsibleNavGroup>
      </EuiFlexItem>
      <EuiFlexItem grow={false}>
        {/* Docking button only for larger screens that can support it*/}
        <EuiShowFor sizes={['l', 'xl']}>
          <EuiCollapsibleNavGroup>
            <EuiListGroupItem
              size="xs"
              color="subdued"
              label={`${navIsDocked ? 'Undock' : 'Dock'} navigation`}
              onClick={() => {
                setNavIsDocked(!navIsDocked);
                localStorage.setItem(
                  'navIsDocked',
                  JSON.stringify(!navIsDocked)
                );
              }}
              iconType={navIsDocked ? 'lock' : 'lockOpen'}
            />
          </EuiCollapsibleNavGroup>
        </EuiShowFor>
      </EuiFlexItem>
    </EuiCollapsibleNav>
  );

  /**
   * Header Alerts
   */
  const [isAlertFlyoutVisible, setIsAlertFlyoutVisible] = useState(false);
  const headerAlerts = (
    <EuiPortal>
      <EuiFlyout
        onClose={() => setIsAlertFlyoutVisible(false)}
        size="s"
        id="guideHeaderAlertExample"
        aria-labelledby="guideHeaderAlertExampleTitle"
      >
        <EuiFlyoutHeader hasBorder>
          <EuiTitle size="s">
            <h2 id="guideHeaderAlertExampleTitle">EuiHeaderAlert</h2>
          </EuiTitle>
        </EuiFlyoutHeader>
        <EuiFlyoutBody>
          <EuiText size="s" color="subdued">
            <p>
              Please see the component page for{' '}
              <Link to="/layout/header">
                <strong>EuiHeaderAlert</strong>
              </Link>{' '}
              on how to configure your alerts.
            </p>
          </EuiText>
        </EuiFlyoutBody>
      </EuiFlyout>
    </EuiPortal>
  );

  /**
   * User Menu
   */
  const [isUserMenuVisible, setIsUserMenuVisible] = useState(false);
  const userMenu = (
    <EuiPopover
      id="guideHeaderUserMenuExample"
      repositionOnScroll
      button={
        <EuiHeaderSectionItemButton
          aria-controls="guideHeaderUserMenuExample"
          aria-expanded={isUserMenuVisible}
          aria-haspopup="true"
          aria-label="User menu"
          onClick={() => setIsUserMenuVisible(!isUserMenuVisible)}
        >
          <EuiAvatar name="John Username" size="s" />
        </EuiHeaderSectionItemButton>
      }
      isOpen={isUserMenuVisible}
      anchorPosition="downRight"
      closePopover={() => setIsUserMenuVisible(false)}
    >
      <div style={{ width: 320 }}>
        <EuiText size="s" color="subdued">
          <p>
            Please see the component page for{' '}
            <Link to="/layout/header">
              <strong>EuiHeader</strong>
            </Link>{' '}
            on how to configure your user menu.
          </p>
        </EuiText>
      </div>
    </EuiPopover>
  );

  /**
   * Spaces Menu
   */
  const [isSpacesMenuVisible, setIsSpacesMenuVisible] = useState(false);
  const spacesMenu = (
    <EuiPopover
      id="guideHeaderSpacesMenuExample"
      repositionOnScroll
      button={
        <EuiHeaderSectionItemButton
          aria-controls="guideHeaderSpacesMenuExample"
          aria-expanded={isSpacesMenuVisible}
          aria-haspopup="true"
          aria-label="Spaces menu"
          onClick={() => setIsSpacesMenuVisible(!isSpacesMenuVisible)}
        >
          <EuiAvatar type="space" name="Default Space" size="s" />
        </EuiHeaderSectionItemButton>
      }
      isOpen={isSpacesMenuVisible}
      anchorPosition="downRight"
      closePopover={() => setIsSpacesMenuVisible(false)}
    >
      <div style={{ width: 320 }}>
        <EuiText size="s" color="subdued">
          <p>
            Please see the component page for{' '}
            <Link to="/layout/header">
              <strong>EuiHeader</strong>
            </Link>{' '}
            on how to configure your spaces menu.
          </p>
        </EuiText>
      </div>
    </EuiPopover>
  );

  /**
   * Deployment Menu
   */
  const [isDeploymentMenuVisible, setIsDeploymentMenuVisible] = useState(false);
  const deploymentMenu = (
    <EuiPopover
      id="guideHeaderDeploymentMenuExample"
      repositionOnScroll
      button={
        <EuiBadge
          color={theme.euiColorDarkestShade.rgba}
          iconType="arrowDown"
          iconSide="right"
          aria-controls="guideHeaderDeploymentMenuExample"
          aria-expanded={isDeploymentMenuVisible}
          aria-haspopup="true"
          onClickAriaLabel="Current deployment: Production logs. Click to open deployment menu."
          onClick={() => setIsDeploymentMenuVisible(!isDeploymentMenuVisible)}
        >
          Production logs
        </EuiBadge>
      }
      isOpen={isDeploymentMenuVisible}
      anchorPosition="downRight"
      closePopover={() => setIsDeploymentMenuVisible(false)}
    >
      <EuiText size="s" color="subdued">
        <p>Deployment menu pattern TBD</p>
      </EuiText>
    </EuiPopover>
  );

  /**
   * Sitewide search
   */
  const search = (
    <EuiSelectableTemplateSitewide
      options={[]}
      searchProps={{
        append: '⌘K',
        compressed: true,
      }}
      popoverButton={
        <EuiHeaderSectionItemButton aria-label="Sitewide search">
          <EuiIcon type="search" size="m" />
        </EuiHeaderSectionItemButton>
      }
      popoverButtonBreakpoints={['xs', 's']}
      popoverProps={{
        repositionOnScroll: true, // Necessary when placing search in a fixed component
      }}
      emptyMessage={
        <EuiSelectableMessage style={{ minHeight: 300 }}>
          <p>
            Please see the component page for{' '}
            <Link to="/forms/selectable">
              <strong>EuiSelectableTemplateSitewide</strong>
            </Link>{' '}
            on how to configure your sitewide search.
          </p>
        </EuiSelectableMessage>
      }
    />
  );

  return (
    <>
      <EuiHeader
        theme="dark"
        position="fixed"
        sections={[
          {
            items: [
              <EuiHeaderLogo iconType="logoElastic" href="">
                Elastic
              </EuiHeaderLogo>,
              deploymentMenu,
            ],
            borders: 'none',
          },
          {
            items: [<EuiShowFor sizes={['m', 'l', 'xl']}>{search}</EuiShowFor>],
            borders: 'none',
          },
          {
            items: [
              <EuiShowFor sizes={['xs', 's']}>{search}</EuiShowFor>,
              <EuiHeaderSectionItemButton
                notification={true}
                aria-label="Notifications: Updates available"
                onClick={() => setIsAlertFlyoutVisible(!isAlertFlyoutVisible)}
              >
                <EuiIcon type="cheer" size="m" />
              </EuiHeaderSectionItemButton>,
              userMenu,
            ],
            borders: 'none',
          },
        ]}
      />
      <EuiHeader
        position="fixed"
        sections={[
          {
            items: [collapsibleNav, spacesMenu],
            breadcrumbs: [
              {
                text: 'Management',
                onClick: () => {},
              },
              {
                text: 'Users',
              },
            ],
            borders: 'right',
          },
          {
            items: [
              <EuiHeaderLinks
                popoverProps={{
                  repositionOnScroll: true, // Necessary when placing search in a fixed component
                }}
              >
                <EuiHeaderLink color="primary">Share</EuiHeaderLink>
                <EuiHeaderLink color="primary">Clone</EuiHeaderLink>
                <ExampleContext.Consumer>
                  {({ parentPath }) => (
                    <EuiButton
                      iconType="exit"
                      style={{ minWidth: 80 }}
                      size="s"
                      color="primary"
                      href={`#${parentPath}`}
                    >
                      Exit full screen
                    </EuiButton>
                  )}
                </ExampleContext.Consumer>
              </EuiHeaderLinks>,
            ],
          },
        ]}
      />

      {isAlertFlyoutVisible ? headerAlerts : null}
      <EuiPageTemplate template="empty" />
    </>
  );
};
