/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { JSX } from 'react';
import { useNavbarMobileSidebar } from '@docusaurus/theme-common/internal';
import { translate } from '@docusaurus/Translate';
import NavbarColorModeToggle from '@theme-original/Navbar/ColorModeToggle';
import NavbarLogo from '@theme-original/Navbar/Logo';
import { EuiIcon, useEuiMemoizedStyles, UseEuiTheme } from '@elastic/eui';
import { css } from '@emotion/react';
import useIsBrowser from '@docusaurus/useIsBrowser';

import {
  VersionSwitcher,
  VersionSwitcherProps,
} from '../../../../components/version_switcher';
import { HighContrastModeToggle } from '../../../../components/high_contrast_mode_toggle';

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

type Props = {
  versionSwitcherOptions?: VersionSwitcherProps;
};

export default function NavbarMobileSidebarHeader({
  versionSwitcherOptions,
}: Props): JSX.Element {
  const isBrowser = useIsBrowser();
  const styles = useEuiMemoizedStyles(getStyles);

  return (
    <div className="navbar-sidebar__brand" css={styles.sidebar}>
      <NavbarLogo />
      {isBrowser && versionSwitcherOptions && (
        <VersionSwitcher {...versionSwitcherOptions} />
      )}
      <NavbarColorModeToggle />
      {isBrowser && <HighContrastModeToggle />}
      <CloseButton />
    </div>
  );
}
