/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { type ReactNode, JSX, useState } from 'react';
import { css, Global } from '@emotion/react';
import clsx from 'clsx';
import { useThemeConfig, ErrorCauseBoundary } from '@docusaurus/theme-common';
import { splitNavbarItems } from '@docusaurus/theme-common/internal';
import { useActiveDocContext } from '@docusaurus/plugin-content-docs/client';
import useIsBrowser from '@docusaurus/useIsBrowser';
import Link from '@docusaurus/Link';
import { useHistory, useLocation } from '@docusaurus/router';
import NavbarItem, {
  type Props as NavbarItemConfig,
} from '@theme-original/NavbarItem';
import NavbarColorModeToggle from '@theme-original/Navbar/ColorModeToggle';
import SearchBar from '@theme-original/SearchBar';
import NavbarLogo from '@theme-original/Navbar/Logo';
import NavbarSearch from '@theme-original/Navbar/Search';
import {
  EuiButtonIcon,
  EuiListGroup,
  EuiListGroupItem,
  EuiPopover,
  euiFocusRing,
  euiTextTruncate,
  useEuiMemoizedStyles,
  UseEuiTheme,
} from '@elastic/eui';
import {
  euiFormControlText,
  euiFormVariables,
  // @ts-ignore - reusing form styles as we don't have access to the plugin component yet
} from '@elastic/eui/lib/components/form/form.styles';

import {
  VersionSwitcher,
  VersionSwitcherProps,
} from '../../../components/version_switcher';
import { HighContrastModeToggle } from '../../../components/high_contrast_mode_toggle';
import { getNavbarBreakpoint, useIsNavbarCompact } from '../breakpoint';
import {
  HOME_NAV_ALL_SECTIONS,
  HOME_NAV_OVERFLOW_SECTIONS,
  HOME_NAV_SECTIONS,
} from '../../DocSidebar/doc_sections';

const DOCS_PATH = '/docs';

const placeHolderStyles = (content: string) => `
  &::-webkit-input-placeholder { ${content} }
  &::-moz-placeholder { ${content} }
  &:-moz-placeholder { ${content} }
  &::placeholder { ${content} }
`;

const getStyles = (euiThemeContext: UseEuiTheme) => {
  const { euiTheme } = euiThemeContext;
  const form = euiFormVariables(euiThemeContext);
  const iconColor = encodeURIComponent(euiTheme.colors.text);
  const { desktopMediaQuery, mobileMediaQuery } =
    getNavbarBreakpoint(euiThemeContext);

  return {
    navbarItems: css`
      --ifm-navbar-item-padding-horizontal: 0;
      --ifm-navbar-item-padding-vertical: 0;
      position: relative;
    `,
    navbarItemsLeft: css`
      gap: ${euiTheme.size.s};
      /* Keep left chrome from sitting under the centered search */
      z-index: 1;

      @media (max-width: ${euiTheme.breakpoint.s}px) {
        gap: 0;
      }

      ${desktopMediaQuery} {
        gap: ${euiTheme.size.m};
      }

      /* POC: left config items still collapse; right chrome stays put */
      .navbar__item {
        ${mobileMediaQuery} {
          display: none;
        }
      }

      .navbar__link {
        ${euiTextTruncate()}
        color: ${euiTheme.colors.textParagraph};
        font-size: var(--eui-font-size-s);
        font-weight: ${euiTheme.font.weight.medium};
        line-height: var(--eui-line-height-s);
        border-radius: ${euiTheme.border.radius.control};
        padding-inline: ${euiTheme.size.s};
        padding-block: ${euiTheme.size.xs};
        text-decoration: none;

        &:hover {
          color: ${euiTheme.colors.textPrimary};
          background-color: ${euiTheme.colors.backgroundBaseInteractiveHover};
          text-decoration: none;
        }

        &--active {
          color: ${euiTheme.colors.textPrimary};
          font-weight: ${euiTheme.font.weight.semiBold};
        }
      }
    `,
    // POC: true visual center regardless of left/right width asymmetry
    navbarItemsCenter: css`
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      flex: 0 0 auto;
      justify-content: center;
      pointer-events: none;

      .navbar__search {
        pointer-events: auto;
      }
    `,
    // POC: primary links on desktop; ellipsis-only on small viewports
    homeNav: css`
      display: flex;
      align-items: center;
      gap: ${euiTheme.size.xxs};
      margin-inline-start: ${euiTheme.size.xs};

      .homeNavPrimary {
        display: none;

        ${desktopMediaQuery} {
          display: contents;
        }
      }

      .navbar__link {
        ${euiTextTruncate()}
        color: ${euiTheme.colors.textParagraph};
        font-size: var(--eui-font-size-s);
        font-weight: ${euiTheme.font.weight.medium};
        line-height: var(--eui-line-height-s);
        border-radius: ${euiTheme.border.radius.control};
        padding-inline: ${euiTheme.size.s};
        padding-block: ${euiTheme.size.xs};
        text-decoration: none;

        &:hover {
          color: ${euiTheme.colors.textParagraph};
          background-color: ${euiTheme.colors.backgroundBaseInteractiveHover};
          text-decoration: none;
        }

        &--active {
          color: ${euiTheme.colors.textHeading};
          font-weight: ${euiTheme.font.weight.semiBold};

          &:hover {
            color: ${euiTheme.colors.textHeading};
          }
        }
      }
    `,
    homeNavOverflow: css`
      &.homeNavOverflow--active {
        color: ${euiTheme.colors.textHeading};
      }
    `,
    homeNavOverflowList: css`
      min-inline-size: ${euiTheme.base * 12}px;
    `,
    navbarItemsRight: css`
      gap: ${euiTheme.size.xxs};
      align-items: center;
      z-index: 1;

      @media (max-width: ${euiTheme.breakpoint.s}px) {
        gap: 0;
      }

      /* Space search from the color mode control */
      .navbar__search {
        margin-inline-end: ${euiTheme.size.s};
      }

      /* Infima uses inline-block on .navbar__item which baseline-aligns
         icons of different metrics; force a shared flex box instead */
      .navbar__item {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        padding: 0;
        line-height: 0;
      }
    `,
    actions: css`
      ${mobileMediaQuery} {
        display: none;
      }
    `,
    search: css`
      .navbar__search-input {
        // TODO: update search input styles or try to use EUI component
        --ifm-navbar-search-input-icon: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" height="16px" width="16px"><path fill="${iconColor}" d="M11.2709852,11.9779932 L15.14275,15.85075 C15.24075,15.94775 15.36875,15.99675 15.49675,15.99675 C15.62475,15.99675 15.75275,15.94775 15.85075,15.85075 C16.04575,15.65475 16.04575,15.33875 15.85075,15.14275 L12.2861494,11.5790625 C14.6668581,8.83239759 14.5527289,4.65636993 11.9437617,2.04675 C9.21444459,-0.68225 4.77355568,-0.68225 2.04623804,2.04675 C-0.682079347,4.77575 -0.682079347,9.21775 2.04623804,11.94675 C3.36890712,13.26875 5.12646738,13.99675 6.99499989,13.99675 C7.27093085,13.99675 7.49487482,13.77275 7.49487482,13.49675 C7.49487482,13.22075 7.27093085,12.99675 6.99499989,12.99675 C5.39240085,12.99675 3.88677755,12.37275 2.7530612,11.23975 C0.414646258,8.89975 0.414646258,5.09375 2.7530612,2.75375 C5.09047639,0.41375 8.89552438,0.41475 11.2369386,2.75375 C13.5753535,5.09375 13.5753535,8.89975 11.2369386,11.23975 C11.0419873,11.43475 11.0419873,11.75175 11.2369386,11.94675 C11.2479153,11.9577858 11.2592787,11.9682002 11.2709852,11.9779932 Z" /></svg>');
        --ifm-navbar-search-input-background-color: ${form.backgroundColor};
        --ifm-navbar-search-input-color: ${euiTheme.colors.text};

        ${euiFormControlText(euiThemeContext)};
        block-size: ${form.controlCompressedHeight};
        padding-block: ${form.controlCompressedPadding};
        inline-size: min(100vw - ${euiTheme.size.xxxxl}, 20rem);
        min-inline-size: 12rem;

        border: ${euiTheme.border.width.thin} solid ${form.borderColor};
        border-radius: ${euiTheme.border.radius.control};

        ${placeHolderStyles(`
          color: ${form.controlPlaceholderText};
          opacity: 1;
        `)}

        ${euiFocusRing(euiThemeContext, 'outset', {
          color: euiTheme.colors.primary,
        })}

        &:disabled {
          border-color: ${form.borderDisabledColor};
          background-color: ${form.backgroundDisabledColor};
        }

        &[readOnly] {
          background-color: ${form.backgroundReadOnlyColor};
        }
      }

      // the search plugin hardcodes light backgrounds for the results dropdown
      .algolia-autocomplete .ds-dropdown-menu [class^='ds-dataset-'] {
        background: ${euiTheme.colors.backgroundBasePlain};
      }

      html[data-theme='dark']
        .algolia-autocomplete
        .ds-cursor
        .algolia-docsearch-suggestion--wrapper {
        background: ${euiTheme.colors
          .backgroundBaseInteractiveHover} !important;
      }
    `,
    versionSwitcher: css`
      ${mobileMediaQuery} {
        display: none;
      }
    `,
    themeSwitcher: css`
      display: flex;
      align-items: center;
      gap: ${euiTheme.size.xxs};

      /* Match logo / version selector divider; 8px each side of the rule
         (margin accounts for parent flex gap so both sides stay even) */
      padding-inline-end: 8px;
      margin-inline-end: calc(8px - ${euiTheme.size.xxs});
      border-right: ${euiTheme.border.thin};
    `,
  };
};

function useNavbarItems() {
  // TODO temporary casting until ThemeConfig type is improved
  return useThemeConfig().navbar.items as NavbarItemConfig[];
}

function NavbarItems({ items }: { items: NavbarItemConfig[] }): JSX.Element {
  return (
    <>
      {items.map((item, i) => (
        <ErrorCauseBoundary
          key={i}
          onError={(error) =>
            new Error(
              `A theme navbar item failed to render.
Please double-check the following navbar item (themeConfig.navbar.items) of your Docusaurus config:
${JSON.stringify(item, null, 2)}`,
              { cause: error }
            )
          }
        >
          <NavbarItem {...item} />
        </ErrorCauseBoundary>
      ))}
    </>
  );
}

function HomeNavOverflow({
  activeSidebarId,
}: {
  activeSidebarId?: string;
}): JSX.Element {
  const [isPopoverOpen, setPopoverOpen] = useState(false);
  const history = useHistory();
  const styles = useEuiMemoizedStyles(getStyles);
  // POC: match getNavbarBreakpoint — ellipsis carries all 6 sections when compact
  const isCompactNav = useIsNavbarCompact();
  const sections = isCompactNav
    ? HOME_NAV_ALL_SECTIONS
    : HOME_NAV_OVERFLOW_SECTIONS;
  const isOverflowActive = sections.some(
    (section) => section.sidebarId === activeSidebarId
  );
  const menuLabel = isCompactNav
    ? 'Documentation sections'
    : 'More documentation sections';

  const button = (
    <EuiButtonIcon
      size="s"
      color="text"
      iconType="ellipsis"
      className={clsx({ 'homeNavOverflow--active': isOverflowActive })}
      css={styles.homeNavOverflow}
      onClick={() => setPopoverOpen((open) => !open)}
      aria-expanded={isPopoverOpen}
      aria-label={menuLabel}
    />
  );

  return (
    <EuiPopover
      isOpen={isPopoverOpen}
      closePopover={() => setPopoverOpen(false)}
      button={button}
      panelPaddingSize="s"
      anchorPosition="downLeft"
      repositionOnScroll
      aria-label={menuLabel}
    >
      <EuiListGroup css={styles.homeNavOverflowList} maxWidth={false}>
        {sections.map((section) => {
          const isActive = section.sidebarId === activeSidebarId;

          return (
            <EuiListGroupItem
              key={section.sidebarId}
              label={section.label}
              isActive={isActive}
              color={isActive ? 'primary' : 'text'}
              onClick={() => {
                setPopoverOpen(false);
                if (!isActive) {
                  history.push(section.href);
                }
              }}
            />
          );
        })}
      </EuiListGroup>
    </EuiPopover>
  );
}

function NavbarContentLayout({
  left,
  center,
  right,
}: {
  left: ReactNode;
  center?: ReactNode;
  right: ReactNode;
}) {
  const styles = useEuiMemoizedStyles(getStyles);

  return (
    <div className="navbar__inner" css={styles.navbarItems}>
      <div className="navbar__items" css={styles.navbarItemsLeft}>
        {left}
      </div>
      {center != null && (
        <div
          className="navbar__items navbar__items--center"
          css={styles.navbarItemsCenter}
        >
          {center}
        </div>
      )}
      <div
        className="navbar__items navbar__items--right"
        css={styles.navbarItemsRight}
      >
        {right}
      </div>
    </div>
  );
}

type Props = {
  versionSwitcherOptions?: VersionSwitcherProps;
};

export default function NavbarContent({
  versionSwitcherOptions,
}: Props): JSX.Element {
  const isBrowser = useIsBrowser();
  const location = useLocation();
  const items = useNavbarItems();
  const [leftItems, rightItems] = splitNavbarItems(items);

  const styles = useEuiMemoizedStyles(getStyles);

  const searchBarItem = items.find((item) => item.type === 'search');
  const isRoot = !location?.pathname.includes(DOCS_PATH);
  // Only mark active when on a real docs page in that sidebar (not homepage)
  const { activeDoc } = useActiveDocContext(undefined);
  const activeSidebarId = activeDoc?.sidebar;
  // POC: match getNavbarBreakpoint — center search when compact, else before theme
  const isCompactNav = useIsNavbarCompact();
  const showSearch = !searchBarItem && !isRoot;
  const search = showSearch ? (
    <NavbarSearch>
      <SearchBar />
    </NavbarSearch>
  ) : null;

  return (
    <>
      {/* adding search styles globally to ensure they are available for usage on
      homepage as well without duplication. NOTE: swizzle/wrap does not work for
      the plugin SearchBar component */}
      <Global styles={styles.search} />
      <NavbarContentLayout
        left={
          <>
            <NavbarLogo />
            <div css={styles.versionSwitcher}>
              {isBrowser && versionSwitcherOptions && (
                <VersionSwitcher {...versionSwitcherOptions} />
              )}
            </div>
            <nav css={styles.homeNav} aria-label="Primary documentation">
              <div className="homeNavPrimary">
                {HOME_NAV_SECTIONS.map((section) => (
                  <Link
                    key={section.sidebarId}
                    className={clsx('navbar__link', {
                      'navbar__link--active':
                        activeSidebarId === section.sidebarId,
                    })}
                    to={section.href}
                    aria-current={
                      activeSidebarId === section.sidebarId ? 'page' : undefined
                    }
                  >
                    {section.label}
                  </Link>
                ))}
              </div>
              <HomeNavOverflow activeSidebarId={activeSidebarId} />
            </nav>
            <NavbarItems items={leftItems} />
          </>
        }
        center={isCompactNav ? search : undefined}
        right={
          <>
            {!isCompactNav && search}
            <div css={styles.themeSwitcher}>
              <NavbarColorModeToggle className="colorModeToggle" />
              {isBrowser && <HighContrastModeToggle />}
            </div>
            <NavbarItems items={rightItems} />
          </>
        }
      />
    </>
  );
}
