import React, { useState } from 'react';
// import { css } from '@emotion/css';
import { Link } from 'react-router-dom';

import {
  EuiAvatar,
  // EuiBadge,
  EuiButton,
  // EuiCollapsibleNav,
  EuiCollapsibleNavBeta,
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
  EuiPopover,
  EuiPortal,
  EuiShowFor,
  EuiText,
  EuiTitle,
  EuiSelectableTemplateSitewide,
  EuiSelectableMessage,
  // useEuiTheme,
  useGeneratedHtmlId,
} from '../../../../src';

// @ts-ignore Not TS yet
import { ExampleContext } from '../../services';

// FIXME this is temporary, for testing purposes — if we want to keep it, it'll need polish

export default () => {
  // const { euiTheme } = useEuiTheme();
  const guideHeaderCollapsibleNavId = useGeneratedHtmlId({
    prefix: 'guideHeaderCollapsibleNav',
  });
  const guideHeaderAlertFlyoutId = useGeneratedHtmlId({
    prefix: 'guideHeaderAlertFlyout',
  });
  const guideHeaderAlertFlyoutTitleId = useGeneratedHtmlId({
    prefix: 'guideHeaderAlertFlyoutTitle',
  });
  const guideHeaderUserPopoverId = useGeneratedHtmlId({
    prefix: 'guideHeaderUserPopover',
  });
  const guideHeaderSpacesPopoverId = useGeneratedHtmlId({
    prefix: 'guideHeaderSpacesPopover',
  });

  /**
   * Collapsible Nav
   */
  const [navIsOpen, setNavIsOpen] = useState(
    JSON.parse(String(localStorage.getItem('navIsDocked'))) || false
  );
  const [navIsDocked, setNavIsDocked] = useState(
    JSON.parse(String(localStorage.getItem('navIsDocked'))) || false
  );
  const collapsibleNavContent = (
    <>
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
    </>
  );
  // const collapsibleNavOld = (
  //   <EuiCollapsibleNav
  //     id={guideHeaderCollapsibleNavId}
  //     aria-label="Main navigation"
  //     isOpen={navIsOpen}
  //     isDocked={navIsDocked}
  //     button={
  //       <EuiHeaderSectionItemButton
  //         aria-label="Toggle main navigation"
  //         onClick={() => setNavIsOpen(!navIsOpen)}
  //       >
  //         <EuiIcon type={'menu'} size="m" aria-hidden="true" />
  //       </EuiHeaderSectionItemButton>
  //     }
  //     onClose={() => setNavIsOpen(false)}
  //   >
  //     {collapsibleNavContent}
  //   </EuiCollapsibleNav>
  // );
  const collapsibleNav = (
    <EuiCollapsibleNavBeta
      id={guideHeaderCollapsibleNavId}
      aria-label="Main navigation"
      isCollapsed={!navIsOpen}
      onCollapseToggle={() => setNavIsOpen(!navIsOpen)}
    >
      {navIsOpen ? (
        collapsibleNavContent
      ) : (
        <a href="#" style={{ padding: '0.875rem' }}>
          OK
        </a>
      )}
    </EuiCollapsibleNavBeta>
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
        id={guideHeaderAlertFlyoutId}
        aria-labelledby={guideHeaderAlertFlyoutTitleId}
        includeFixedHeadersInFocusTrap={true}
      >
        <EuiFlyoutHeader hasBorder>
          <EuiTitle size="s">
            <h2 id={guideHeaderAlertFlyoutTitleId}>EuiHeaderAlert</h2>
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
      id={guideHeaderUserPopoverId}
      repositionOnScroll
      button={
        <EuiHeaderSectionItemButton
          aria-controls={guideHeaderUserPopoverId}
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
      id={guideHeaderSpacesPopoverId}
      repositionOnScroll
      button={
        <EuiHeaderSectionItemButton
          aria-controls={guideHeaderSpacesPopoverId}
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

  const logo = <EuiHeaderLogo iconType="logoElastic" href="" />;

  return (
    <>
      {/* <EuiHeader
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
          },
          {
            items: [<EuiShowFor sizes={['m', 'l', 'xl']}>{search}</EuiShowFor>],
          },
        ]}
      /> */}
      <EuiHeader
        position="fixed"
        sections={[
          {
            items: [collapsibleNav, logo, spacesMenu],
            breadcrumbs: [
              {
                text: 'Management 1',
                onClick: () => {},
              },
              {
                text: 'Users 2',
              },
            ],
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
                  {({ parentPath }: { parentPath: string }) => (
                    <EuiButton
                      iconType="exit"
                      style={{ minWidth: 80 }}
                      size="s"
                      color="primary"
                      href={`#${parentPath}`}
                    >
                      Exit fullscreen
                    </EuiButton>
                  )}
                </ExampleContext.Consumer>
              </EuiHeaderLinks>,
            ],
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
          },
        ]}
      />

      {isAlertFlyoutVisible ? headerAlerts : null}
    </>
  );
};
