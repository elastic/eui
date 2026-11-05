/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import {
  type ComponentProps,
  JSX,
  useEffect,
  useState,
} from 'react';
import clsx from 'clsx';
import { css, Global } from '@emotion/react';
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

/** POC: scroll past this before the bar floats inset from the viewport edge */
const FLOAT_SCROLL_THRESHOLD_PX = 12;

const getStyles = ({ euiTheme }: UseEuiTheme) => {
  const inset = euiTheme.size.m; // 12px
  const duration = euiTheme.animation.fast;
  const easing = euiTheme.animation.resistance;

  return {
    rootInset: css`
      /* Shared with sidebar / TOC sticky offsets */
      :root {
        --eui-navbar-inset: 0px;
      }

      :root.navbar-is-floating {
        --eui-navbar-inset: ${inset};
      }
    `,
    navbar: css`
      --ifm-navbar-padding-horizontal: ${euiTheme.size.m}; /* 12px */
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

      /*
        Override Infima sticky → fixed so inset/radius changes don't reflow
        the page (sticky + margin-block-start was causing the content jump).
       */
      &.navbar--fixed-top {
        position: fixed;
        inset-block-start: 0;
        inset-inline: 0;
        inline-size: 100%;
        margin: 0;
      }

      border-radius: 0;
      border: ${euiTheme.border.width.thin} solid transparent;
      border-block-end-color: ${euiTheme.border.color};
      box-shadow: none;
      background-color: var(--ifm-navbar-background-color);
      backdrop-filter: blur(12px) saturate(180%);
      -webkit-backdrop-filter: blur(12px) saturate(180%);
      transition: inset ${duration} ${easing}, inline-size ${duration} ${easing},
        border-radius ${duration} ${easing}, border-color ${duration} ${easing};

      &.navbar--floating.navbar--fixed-top {
        inset-block-start: ${inset};
        inset-inline: ${inset};
        inline-size: auto;
        border-radius: ${euiTheme.border.radius.panel};
        border-color: ${euiTheme.border.color};
      }

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

      @media (prefers-reduced-motion: reduce) {
        transition: none;
      }
    `,
    /* Constant in-flow placeholder so fixed nav doesn't collapse content */
    spacer: css`
      block-size: var(--ifm-navbar-height);
      flex-grow: 0;
      flex-shrink: 0;
      pointer-events: none;
      visibility: hidden;
    `,
    navbarHideable: css`
      transition: transform var(--ifm-transition-fast) ease,
        inset ${duration} ${easing}, inline-size ${duration} ${easing},
        border-radius ${duration} ${easing}, border-color ${duration} ${easing};

      @media (prefers-reduced-motion: reduce) {
        transition: none;
      }
    `,
    navbarHidden: css`
      transform: translate3d(
        0,
        calc(-100% - var(--eui-navbar-inset, 0px) - 2px),
        0
      );
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
  const [isFloating, setIsFloating] = useState(false);

  const styles = useEuiMemoizedStyles(getStyles);

  useEffect(() => {
    const updateFloating = () => {
      const scrollY =
        window.scrollY ||
        document.documentElement.scrollTop ||
        document.body.scrollTop ||
        0;
      const next = scrollY > FLOAT_SCROLL_THRESHOLD_PX;
      setIsFloating((prev) => (prev === next ? prev : next));
    };

    updateFloating();
    window.addEventListener('scroll', updateFloating, { passive: true });
    return () => window.removeEventListener('scroll', updateFloating);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('navbar-is-floating', isFloating);
    return () => {
      document.documentElement.classList.remove('navbar-is-floating');
    };
  }, [isFloating]);

  return (
    <>
      <Global styles={styles.rootInset} />
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
          'navbar--floating': isFloating,
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
      {/* Keeps document flow height stable while the nav is position:fixed */}
      <div css={styles.spacer} aria-hidden="true" />
    </>
  );
}
