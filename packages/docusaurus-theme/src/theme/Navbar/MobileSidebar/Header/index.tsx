import React from 'react';
import { useNavbarMobileSidebar } from '@docusaurus/theme-common/internal';
import { translate } from '@docusaurus/Translate';
import NavbarColorModeToggle from '@theme-original/Navbar/ColorModeToggle';
import NavbarLogo from '@theme-original/Navbar/Logo';
import { EuiIcon, useEuiMemoizedStyles, UseEuiTheme } from '@elastic/eui';
import { css } from '@emotion/react';
import useIsBrowser from '@docusaurus/useIsBrowser';
import euiVersions from '@site/static/versions.json';

import { VersionSwitcher } from '../../../../components/version_switcher';
import { ThemeSwitcher } from '../../../../components/theme_switcher';

const getStyles = ({ euiTheme }: UseEuiTheme) => ({
  sidebar: css`
    gap: ${euiTheme.size.s};

    > :first-child {
      border-right: ${euiTheme.border.thin};
    }
  `,
  close: css`
    display: flex;
    align-items: center;
    justify-content: center;
    width: ${euiTheme.size.xl};
    height: ${euiTheme.size.xl};
    border-radius: ${euiTheme.border.radius.small};

    &:hover {
      background-color: var(--ifm-color-emphasis-200);
      color: currentColor;
    }
  `,
});

function CloseButton() {
  const mobileSidebar = useNavbarMobileSidebar();
  const styles = useEuiMemoizedStyles(getStyles);

  return (
    <button
      type="button"
      aria-label={translate({
        id: 'theme.docs.sidebar.closeSidebarButtonAriaLabel',
        message: 'Close navigation bar',
        description: 'The ARIA label for close button of mobile sidebar',
      })}
      className="clean-btn navbar-sidebar__close"
      css={styles.close}
      onClick={() => mobileSidebar.toggle()}
    >
      <EuiIcon type="cross" size="l" />
    </button>
  );
}

export default function NavbarMobileSidebarHeader(): JSX.Element {
  const isBrowser = useIsBrowser();
  const styles = useEuiMemoizedStyles(getStyles);

  const versions = euiVersions?.euiVersions ?? undefined;

  return (
    <div className="navbar-sidebar__brand" css={styles.sidebar}>
      <NavbarLogo />
      {isBrowser && versions && <VersionSwitcher versions={versions} />}
      {isBrowser && <ThemeSwitcher />}
      <NavbarColorModeToggle />
      <CloseButton />
    </div>
  );
}
