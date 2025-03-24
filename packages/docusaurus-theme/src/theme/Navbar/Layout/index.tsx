import { type ComponentProps, JSX } from 'react';
import clsx from 'clsx';
import { css } from '@emotion/react';
import { useThemeConfig } from '@docusaurus/theme-common';
import {
  useHideableNavbar,
  useNavbarMobileSidebar,
} from '@docusaurus/theme-common/internal';
import { translate } from '@docusaurus/Translate';
import NavbarMobileSidebar from '@theme-original/Navbar/MobileSidebar';
import type { Props } from '@theme-original/Navbar/Layout';
import { useEuiMemoizedStyles, UseEuiTheme } from '@elastic/eui';

const getStyles = ({ euiTheme }: UseEuiTheme) => {
  return {
    navbar: css`
      --ifm-navbar-padding-horizontal: ${euiTheme.size.m};
      --ifm-navbar-padding-vertical: ${euiTheme.size.s};
      --ifm-navbar-item-padding-horizontal: 0;
      --ifm-navbar-item-padding-vertical: 0;

      --ifm-navbar-background-color: ${euiTheme.colors.textInverse};

      flex-grow: 0;
      flex-shrink: 0;

      &,
      .navbar-sidebar__brand {
        border-block-end: ${euiTheme.border.thin};
        box-shadow: none;
      }
    `,
    navbarHideable: css`
      transition: transform var(--ifm-transition-fast) ease;
    `,
    navbarHidden: css`
      transform: translate3d(0, calc(-100% - 2px), 0);
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

export default function NavbarLayout({ children }: Props): JSX.Element {
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
      <NavbarMobileSidebar />
    </nav>
  );
}
