import React, { useState } from 'react';
// @ts-ignore "TEMP"
import { Link } from 'react-router-dom';

import {
  EuiCollapsibleNav,
  EuiCollapsibleNavGroup,
} from '../../../../src/components/collapsible_nav';
import {
  EuiHeaderSectionItemButton,
  EuiHeaderLogo,
  EuiHeader,
  EuiHeaderLinks,
  EuiHeaderLink,
} from '../../../../src/components/header';
import { EuiIcon } from '../../../../src/components/icon';
import { EuiButton } from '../../../../src/components/button';
import { EuiPage } from '../../../../src/components/page';
import { EuiListGroupItem } from '../../../../src/components/list_group';
import { EuiFlexItem } from '../../../../src/components/flex';
import { GuideFullScreen } from '../../services/full_screen/full_screen';

import { EuiShowFor } from '../../../../src/components/responsive';
import { EuiText } from '../../../../src/components/text';
import { EuiAvatar } from '../../../../src/components/avatar';
import { EuiBadge } from '../../../../src/components/badge';
import { EuiPortal } from '../../../../src/components/portal';
import {
  EuiFlyout,
  EuiFlyoutHeader,
  EuiFlyoutBody,
} from '../../../../src/components/flyout';
import { EuiTitle } from '../../../../src/components/title';
import { EuiPopover } from '../../../../src/components/popover';

export default ({ theme }: { theme: any }) => {
  /** Collapsible Nav */
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
          onClick={() => setNavIsOpen(!navIsOpen)}>
          <EuiIcon type={'menu'} size="m" aria-hidden="true" />
        </EuiHeaderSectionItemButton>
      }
      onClose={() => setNavIsOpen(false)}>
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
        aria-labelledby="guideHeaderAlertExampleTitle">
        <EuiFlyoutHeader hasBorder>
          <EuiTitle size="s">
            <h2 id="guideHeaderAlertExampleTitle">EuiHeaderAlert</h2>
          </EuiTitle>
        </EuiFlyoutHeader>
        <EuiFlyoutBody>
          <EuiText size="s" color="subdued">
            <p>
              Please see the component page for{' '}
              <Link to="/navigation/collapsible-nav">
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
      ownFocus
      button={
        <EuiHeaderSectionItemButton
          aria-controls="guideHeaderUserMenuExample"
          aria-expanded={isUserMenuVisible}
          aria-haspopup="true"
          aria-label="User menu"
          onClick={() => setIsUserMenuVisible(!isUserMenuVisible)}>
          <EuiAvatar name="John Username" size="s" />
        </EuiHeaderSectionItemButton>
      }
      isOpen={isUserMenuVisible}
      anchorPosition="downRight"
      closePopover={() => setIsUserMenuVisible(false)}>
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
      ownFocus
      button={
        <EuiHeaderSectionItemButton
          aria-controls="guideHeaderSpacesMenuExample"
          aria-expanded={isSpacesMenuVisible}
          aria-haspopup="true"
          aria-label="Spaces menu"
          onClick={() => setIsSpacesMenuVisible(!isSpacesMenuVisible)}>
          <EuiAvatar type="space" name="Default Space" size="s" />
        </EuiHeaderSectionItemButton>
      }
      isOpen={isSpacesMenuVisible}
      anchorPosition="downRight"
      closePopover={() => setIsSpacesMenuVisible(false)}>
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
      ownFocus
      button={
        <EuiBadge
          color={theme.euiColorDarkestShade.rgba}
          iconType="arrowDown"
          iconSide="right"
          aria-controls="guideHeaderDeploymentMenuExample"
          aria-expanded={isDeploymentMenuVisible}
          aria-haspopup="true"
          onClickAriaLabel="Current deployment: Production logs. Click to open deployment menu."
          onClick={() => setIsDeploymentMenuVisible(!isDeploymentMenuVisible)}>
          Production logs
        </EuiBadge>
      }
      isOpen={isDeploymentMenuVisible}
      anchorPosition="downRight"
      closePopover={() => setIsDeploymentMenuVisible(false)}>
      <EuiText size="s" color="subdued">
        <p>Deployment menu pattern TBD</p>
      </EuiText>
    </EuiPopover>
  );

  return (
    <GuideFullScreen
      onOpen={() => {
        document.body.classList.add('euiBody--headerIsFixed--double');
      }}>
      {setIsFullScreen => (
        <React.Fragment>
          <EuiHeader
            theme="dark"
            position="fixed"
            sections={[
              {
                items: [
                  <EuiHeaderLogo iconType="logoElastic" href="">
                    Elastic
                  </EuiHeaderLogo>,
                ],
                borders: 'none',
              },
              {
                items: [
                  deploymentMenu,
                  <EuiHeaderSectionItemButton
                    aria-label="Notifications"
                    notification={'•'}
                    onClick={() =>
                      setIsAlertFlyoutVisible(!isAlertFlyoutVisible)
                    }>
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
                  <EuiHeaderLinks>
                    <EuiHeaderLink>Share</EuiHeaderLink>
                    <EuiHeaderLink>Clone</EuiHeaderLink>
                    <EuiButton
                      iconType="minimize"
                      style={{ minWidth: 80 }}
                      size="s"
                      color="secondary"
                      onClick={() => {
                        setIsFullScreen(false);
                        document.body.classList.remove(
                          'euiBody--headerIsFixed--double'
                        );
                      }}>
                      Exit full screen
                    </EuiButton>
                  </EuiHeaderLinks>,
                ],
              },
            ]}
          />

          {isAlertFlyoutVisible ? headerAlerts : null}

          <EuiPage className="guideFullScreenOverlay" />
        </React.Fragment>
      )}
    </GuideFullScreen>
  );
};
