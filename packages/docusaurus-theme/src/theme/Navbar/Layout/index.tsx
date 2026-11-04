/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { type ComponentProps, JSX } from 'react';
import clsx from 'clsx';
import { css } from '@emotion/react';
import { useThemeConfig } from '@docusaurus/theme-common';
import {
  useHideableNavbar,
  useNavbarMobileSidebar,
} from '@docusaurus/theme-common/internal';
import { translate } from '@docusaurus/Translate';
import type { Props } from '@theme-original/Navbar/Layout';
import { useEuiMemoizedStyles, UseEuiTheme } from '@elastic/eui';

import NavbarMobileSidebar from '../MobileSidebar';
import { VersionSwitcherProps } from '../../../components/version_switcher';

const getStyles = ({ euiTheme }: UseEuiTheme) => {
  const inset = euiTheme.size.m; // 12px

  return {
    navbar: css`
      --ifm-navbar-padding-horizontal: ${euiTheme.size.base};
      --ifm-navbar-padding-vertical: ${euiTheme.size.s};
      --ifm-navbar-item-padding-horizontal: 0;
      --ifm-navbar-item-padding-vertical: 0;

      /* POC: glass fill — opacity/blur need design input */
      --ifm-navbar-background-color: color-mix(
        in srgb,
        ${euiTheme.colors.backgroundBasePlain} 88%,
        transparent
      );

      flex-grow: 0;
      flex-shrink: 0;

      /* Floating inset bar */
      &.navbar--fixed-top {
        top: ${inset};
        margin-block-start: ${inset};
        margin-inline: ${inset};
        width: calc(100% - ${inset} * 2);
      }

      border-radius: ${euiTheme.border.radius.panel};
      border: ${euiTheme.border.width.thin} solid ${euiTheme.border.color};
      box-shadow: none;
      background-color: var(--ifm-navbar-background-color);
      backdrop-filter: blur(12px) saturate(180%);
      -webkit-backdrop-filter: blur(12px) saturate(180%);

      .navbar-sidebar__brand {
        border-block-end: ${euiTheme.border.width.thin} solid
          ${euiTheme.border.color};
        box-shadow: none;
      }

      @media (prefers-reduced-transparency: reduce) {
        --ifm-navbar-background-color: ${euiTheme.colors.backgroundBasePlain};
        backdrop-filter: none;
        -webkit-backdrop-filter: none;
      }
    `,
    navbarHideable: css`
      transition: transform var(--ifm-transition-fast) ease;
    `,
    navbarHidden: css`
      transform: translate3d(0, calc(-100% - ${inset} - 2px), 0);
    `,
  };
};

function NavbarBackdrop(props: ComponentProps<'div'>) {
  return (
    <div
      role="presentation"
      {...props}
      className={clsx('navbar-sidebar__backdrop', props.className)}
    />
  );
}

export default function NavbarLayout({
  children,
  versionSwitcherOptions,
}: Props & { versionSwitcherOptions?: VersionSwitcherProps }): JSX.Element {
  const {
    navbar: { hideOnScroll, style },
  } = useThemeConfig();
  const mobileSidebar = useNavbarMobileSidebar();
  const { navbarRef, isNavbarVisible } = useHideableNavbar(hideOnScroll);

  const styles = useEuiMemoizedStyles(getStyles);

  return (
    <nav
      ref={navbarRef}
      aria-label={translate({
        id: 'theme.NavBar.navAriaLabel',
        message: 'Main',
        description: 'The ARIA label for the main navigation',
      })}
      className={clsx('navbar', 'navbar--fixed-top', {
        'navbar--dark': style === 'dark',
        'navbar--primary': style === 'primary',
        'navbar-sidebar--show': mobileSidebar.shown,
      })}
      css={[
        styles.navbar,
        hideOnScroll && [
          styles.navbarHideable,
          !isNavbarVisible && styles.navbarHidden,
        ],
      ]}
    >
      {children}
      <NavbarBackdrop onClick={mobileSidebar.toggle} />
      <NavbarMobileSidebar versionSwitcherOptions={versionSwitcherOptions} />
    </nav>
  );
}
