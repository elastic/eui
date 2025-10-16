/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { type ReactNode, JSX } from 'react';
import { css, Global } from '@emotion/react';
import { useThemeConfig, ErrorCauseBoundary } from '@docusaurus/theme-common';
import {
  splitNavbarItems,
  useNavbarMobileSidebar,
} from '@docusaurus/theme-common/internal';
import useIsBrowser from '@docusaurus/useIsBrowser';
import { useLocation } from '@docusaurus/router';
import NavbarItem, {
  type Props as NavbarItemConfig,
} from '@theme-original/NavbarItem';
import NavbarColorModeToggle from '@theme-original/Navbar/ColorModeToggle';
import SearchBar from '@theme-original/SearchBar';
import NavbarMobileSidebarToggle from '@theme-original/Navbar/MobileSidebar/Toggle';
import NavbarLogo from '@theme-original/Navbar/Logo';
import NavbarSearch from '@theme-original/Navbar/Search';
import {
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

  return {
    navbarItems: css`
      --ifm-navbar-item-padding-horizontal: 0;
      --ifm-navbar-item-padding-vertical: 0;

      .navbar__item,
      [class*='colorModeToggle'] {
        @media (max-width: 996px) {
          display: none;
        }
      }

      .navbar__toggle {
        border-radius: ${euiTheme.border.radius.small};

        &:hover {
          background-color: var(--ifm-color-emphasis-200);
          color: currentColor;
        }
      }
    `,
    navbarItemsLeft: css`
      gap: ${euiTheme.size.s};

      @media (min-width: 997px) {
        gap: ${euiTheme.size.l};
      }

      .navbar__link {
        ${euiTextTruncate()}
      }
    `,
    navbarItemsRight: css`
      gap: ${euiTheme.size.s};
    `,
    actions: css`
      @media (max-width: 996px) {
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

        border: ${euiTheme.border.width.thin} solid ${form.borderColor};
        border-radius: ${form.controlBorderRadius};

        ${placeHolderStyles(`
          color: ${form.controlPlaceholderText};
          opacity: 1;
        `)}

        ${euiFocusRing(euiThemeContext, 'outset', { color: 'primary' })}

        &:disabled {
          border-color: ${form.borderDisabledColor};
          background-color: ${form.backgroundDisabledColor};
        }

        &[readOnly] {
          background-color: ${form.backgroundReadOnlyColor};
        }

        @media (min-width: 400px) {
          inline-size: 100%;
          max-inline-size: 25rem;
        }

        @media (min-width: 997px) {
          min-inline-size: 15rem;
        }

        @media (min-width: 1200px) {
          min-inline-size: 25rem;
        }
      }
    `,
    versionSwitcher: css`
      @media (max-width: 996px) {
        display: none;
      }
    `,
    themeSwitcher: css`
      @media (max-width: 996px) {
        display: none;
      }
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

function NavbarContentLayout({
  left,
  right,
}: {
  left: ReactNode;
  right: ReactNode;
}) {
  const styles = useEuiMemoizedStyles(getStyles);

  return (
    <div className="navbar__inner" css={styles.navbarItems}>
      <div className="navbar__items" css={styles.navbarItemsLeft}>
        {left}
      </div>
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
  const mobileSidebar = useNavbarMobileSidebar();
  const location = useLocation();
  const items = useNavbarItems();
  const [leftItems, rightItems] = splitNavbarItems(items);

  const styles = useEuiMemoizedStyles(getStyles);

  const searchBarItem = items.find((item) => item.type === 'search');
  const isRoot = !location?.pathname.includes(DOCS_PATH);

  return (
    <>
      {/* adding search styles globally to ensure they are available for usage on
      homepage as well without duplication. NOTE: swizzle/wrap does not work for
      the plugin SearchBar component */}
      <Global styles={styles.search} />
      <NavbarContentLayout
        left={
          <>
            {!mobileSidebar.disabled && <NavbarMobileSidebarToggle />}
            <NavbarLogo />
            <div css={styles.versionSwitcher}>
              {isBrowser && versionSwitcherOptions && (
                <VersionSwitcher {...versionSwitcherOptions} />
              )}
            </div>
            <NavbarItems items={leftItems} />
          </>
        }
        right={
          <>
            {!searchBarItem && !isRoot && (
              <NavbarSearch>
                <SearchBar />
              </NavbarSearch>
            )}
            <NavbarColorModeToggle className="colorModeToggle" />
            {isBrowser && (
              <div css={styles.themeSwitcher}>
                <HighContrastModeToggle />
              </div>
            )}
            <NavbarItems items={rightItems} />
          </>
        }
      />
    </>
  );
}
