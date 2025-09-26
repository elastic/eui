/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { LOKI_SELECTORS } from '../../../.storybook/loki';
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
  EuiHeaderLink,
  EuiHeaderLinks,
  EuiHeaderLogo,
  EuiHeaderSectionItemButton,
  EuiIcon,
  EuiLink,
  EuiListGroupItem,
  EuiPageTemplate,
  EuiPopover,
  EuiPortal,
  EuiSelectableMessage,
  EuiSelectableTemplateSitewide,
  EuiShowFor,
  EuiText,
  EuiTitle,
} from '../../components';
import { useEuiTheme, useGeneratedHtmlId } from '../../services';
import { EuiHeader, EuiHeaderProps } from './header';

const meta: Meta<EuiHeaderProps> = {
  title: 'Layout/EuiHeader/EuiHeader',
  component: EuiHeader,
  args: {
    // Component defaults
    position: 'static',
    theme: 'default',
  },
};

export default meta;
type Story = StoryObj<EuiHeaderProps>;

export const Playground: Story = {};

export const Sections: Story = {
  args: {
    position: 'fixed',
    sections: [
      {
        items: [
          <EuiHeaderLogo
            iconType="logoElastic"
            href="#"
            aria-label="Go to home page"
          />,
          <EuiHeaderSectionItemButton aria-label="Spaces menu">
            <EuiAvatar type="space" name="Sales Team" size="s" />
          </EuiHeaderSectionItemButton>,
        ],
        breadcrumbs: [
          { text: 'Management', href: '#' },
          { text: 'Users', href: '#' },
          { text: 'Create' },
        ],
        breadcrumbProps: {
          'aria-label': 'Header sections breadcrumbs',
        },
      },
      {
        items: [
          <EuiHeaderLinks aria-label="App navigation dark theme example">
            <EuiHeaderLink isActive>Docs</EuiHeaderLink>
            <EuiHeaderLink>Code</EuiHeaderLink>
            <EuiHeaderLink iconType="help"> Help</EuiHeaderLink>
          </EuiHeaderLinks>,
          <EuiHeaderSectionItemButton aria-label="Account menu">
            <EuiAvatar name="John Username" size="s" />
          </EuiHeaderSectionItemButton>,
          <EuiHeaderSectionItemButton
            notification="1"
            aria-label="Apps menu with 1 new app"
          >
            <EuiIcon type="apps" size="m" />
          </EuiHeaderSectionItemButton>,
        ],
      },
    ],
  },
};

export const DarkThemeWithSitewideSearch: Story = {
  parameters: {
    layout: 'fullscreen',
    controls: { include: ['theme'] },
    loki: { chromeSelector: LOKI_SELECTORS.portal }, // Required to capture the open popover
  },
  args: {
    theme: 'dark',
    position: 'fixed',
    sections: [
      {
        items: [
          <EuiHeaderLogo iconType="logoElastic" href="">
            Elastic
          </EuiHeaderLogo>,
        ],
      },
      {
        items: [
          <EuiSelectableTemplateSitewide
            options={[
              {
                label: 'Welcome dashboards',
                icon: {
                  type: 'clock',
                  color: 'subdued',
                },
                avatar: { name: 'Default Space' },
                meta: [
                  {
                    text: 'Dashboard',
                    type: 'application',
                    highlightSearchString: true,
                  },
                ],
              },
            ]}
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
              isOpen: true,
              repositionOnScroll: true, // Necessary when placing search in a fixed component
            }}
            colorModes={{
              search: 'dark',
              popover: 'global',
            }}
          />,
        ],
      },
      {
        items: [
          <EuiHeaderSectionItemButton
            notification={true}
            aria-label="Notifications: Updates available"
          >
            <EuiIcon type="cheer" size="m" />
          </EuiHeaderSectionItemButton>,
        ],
      },
    ],
  },
};

const MultipleFixedHeadersExample = () => {
  const [fixedHeadersCount, setFixedHeadersCount] = useState(3);
  const [isFlyoutOpen, setIsFlyoutOpen] = useState(false);

  const sections = [
    {
      items: [
        <EuiHeaderLogo
          iconType="logoElastic"
          href="#"
          aria-label="Go to home page"
        />,
      ],
    },
    {
      items: [
        <EuiButton size="s" onClick={() => setIsFlyoutOpen(!isFlyoutOpen)}>
          Toggle flyout
        </EuiButton>,
      ],
    },
  ];

  return (
    <EuiPageTemplate>
      <EuiPageTemplate.Section>
        The page template and flyout should automatically adjust dynamically to
        the number of fixed headers on the page.
        {isFlyoutOpen && (
          <EuiFlyout onClose={() => setIsFlyoutOpen(false)}>
            The flyout position and mask should automatically adjust dynamically
            to the number of fixed headers on the page.
          </EuiFlyout>
        )}
        <br />
        <br />
        <EuiButton
          iconType="minusInCircle"
          disabled={fixedHeadersCount <= 0}
          onClick={() => setFixedHeadersCount((count) => count - 1)}
        >
          Remove a fixed header
        </EuiButton>
        &emsp;
        <EuiButton
          fill
          iconType="plusInCircle"
          onClick={() => setFixedHeadersCount((count) => count + 1)}
        >
          Add a fixed header
        </EuiButton>
        <br />
        <br />
        {/* Always render at least one static header so we can toggle/test the flyout */}
        <EuiHeader
          position={fixedHeadersCount ? 'fixed' : 'static'}
          sections={sections}
        />
        {/* Conditionally render additional fixed headers */}
        {Array.from({ length: fixedHeadersCount - 1 }).map((_, i) => (
          <EuiHeader key={i} position="fixed" sections={sections} />
        ))}
      </EuiPageTemplate.Section>
    </EuiPageTemplate>
  );
};

export const MultipleFixedHeaders: Story = {
  parameters: {
    layout: 'fullscreen',
    codeSnippet: {
      resolveChildren: true,
    },
  },
  render: (args) => <MultipleFixedHeadersExample {...args} />,
};

/**
 * Docs fullscreen examples
 */

const ElasticNavigationPatternExample = () => {
  const { euiTheme } = useEuiTheme();

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
  const guideHeaderDeploymentPopoverId = useGeneratedHtmlId({
    prefix: 'guideHeaderDeploymentPopover',
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
  const collapsibleNav = (
    <EuiCollapsibleNav
      id={guideHeaderCollapsibleNavId}
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
              <EuiLink href="https://eui.elastic.co/docs/components/navigation/collapsible-nav/">
                <strong>EuiCollapsibleNav</strong>
              </EuiLink>{' '}
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
        id={guideHeaderAlertFlyoutId}
        aria-labelledby={guideHeaderAlertFlyoutTitleId}
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
              <EuiLink href="https://eui.elastic.co/docs/components/layout/header#header-notifications">
                <strong>EuiHeaderAlert</strong>
              </EuiLink>{' '}
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
            <EuiLink href="https://eui.elastic.co/docs/components/layout/header">
              <strong>EuiHeader</strong>
            </EuiLink>{' '}
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
            <EuiLink href="https://eui.elastic.co/docs/components/layout/header">
              <strong>EuiHeader</strong>
            </EuiLink>{' '}
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
      id={guideHeaderDeploymentPopoverId}
      repositionOnScroll
      button={
        <EuiBadge
          color={euiTheme.colors.darkestShade}
          iconType="arrowDown"
          iconSide="right"
          aria-controls={guideHeaderDeploymentPopoverId}
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
      colorModes={{
        search: 'dark',
        popover: 'global',
      }}
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
            <EuiLink href="https://eui.elastic.co/docs/components/forms/selection/selectable/">
              <strong>EuiSelectableTemplateSitewide</strong>
            </EuiLink>{' '}
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
          },
          {
            items: [<EuiShowFor sizes={['m', 'l', 'xl']}>{search}</EuiShowFor>],
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
              </EuiHeaderLinks>,
            ],
          },
        ]}
      />

      {isAlertFlyoutVisible ? headerAlerts : null}
    </>
  );
};

export const ElasticNavigationPattern: Story = {
  parameters: {
    layout: 'fullscreen',
    codeSnippet: {
      resolveChildren: true,
    },
  },
  render: (args) => <ElasticNavigationPatternExample {...args} />,
};
