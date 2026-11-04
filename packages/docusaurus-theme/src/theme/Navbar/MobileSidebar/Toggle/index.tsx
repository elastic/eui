/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { type ReactNode } from 'react';
import { css } from '@emotion/react';
import { useNavbarMobileSidebar } from '@docusaurus/theme-common/internal';
import { translate } from '@docusaurus/Translate';
import {
  EuiIcon,
  useEuiMemoizedStyles,
  UseEuiTheme,
} from '@elastic/eui';

import { getNavbarBreakpoint } from '../../breakpoint';

const getStyles = (euiThemeContext: UseEuiTheme) => {
  const { euiTheme } = euiThemeContext;
  const { mobileMediaQuery } = getNavbarBreakpoint(euiThemeContext);

  return {
    toggle: css`
      display: none;
      align-items: center;
      justify-content: center;
      padding: ${euiTheme.size.s};
      margin-inline-end: 0;
      color: ${euiTheme.colors.textParagraph};

      ${mobileMediaQuery} {
        display: inline-flex;
      }
    `,
  };
};

export default function MobileSidebarToggle(): ReactNode {
  const { toggle, shown } = useNavbarMobileSidebar();
  const styles = useEuiMemoizedStyles(getStyles);

  return (
    <button
      onClick={toggle}
      aria-label={translate({
        id: 'theme.docs.sidebar.toggleSidebarButtonAriaLabel',
        message: 'Toggle navigation bar',
        description:
          'The ARIA label for hamburger menu button of mobile navigation',
      })}
      aria-expanded={shown}
      className="navbar__toggle clean-btn"
      type="button"
      css={styles.toggle}
    >
      <EuiIcon type="menu" />
    </button>
  );
}
