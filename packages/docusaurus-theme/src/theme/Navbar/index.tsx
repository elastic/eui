import React from 'react';
import { css } from '@emotion/react';
import NavbarLayout from '@theme-original/Navbar/Layout';
import NavbarContent from '@theme-original/Navbar/Content';
import { useEuiMemoizedStyles, UseEuiTheme } from '@elastic/eui';

const getStyles = (euiThemeContext: UseEuiTheme) => {
  const { euiTheme } = euiThemeContext;

  // NOTE: we style the navbar via global classes here as we can't
  // eject the components without breaking the search due to changed
  // provider contexts
  return {
    navbar: css`
      --ifm-navbar-item-padding-horizontal: 0;
      --ifm-navbar-item-padding-vertical: 0;

      --ifm-navbar-background-color: ${euiTheme.colors.body};

      .navbar {
        border-block-end: ${euiTheme.border.thin};
        box-shadow: none;
      }
    `,
  };
};

export default function Navbar(): JSX.Element {
  const styles = useEuiMemoizedStyles(getStyles);

  return (
    <div css={styles.navbar}>
      <NavbarLayout>
        <NavbarContent />
      </NavbarLayout>
    </div>
  );
}
