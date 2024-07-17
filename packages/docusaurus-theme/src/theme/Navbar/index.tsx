import React from 'react';
import { css } from '@emotion/react';
import NavbarLayout from '@theme-original/Navbar/Layout';
import NavbarContent from '@theme-original/Navbar/Content';
import {
  euiFocusRing,
  logicalCSS,
  useEuiMemoizedStyles,
  UseEuiTheme,
} from '@elastic/eui';
import {
  euiFormControlText,
  euiFormVariables,
  // @ts-ignore - reusing form styles as we don't have access to the plugin component yet
} from '@elastic/eui/lib/components/form/form.styles';

const placeHolderStyles = (content: string) => `
  &::-webkit-input-placeholder { ${content} }
  &::-moz-placeholder { ${content} }
  &:-ms-input-placeholder { ${content} }
  &:-moz-placeholder { ${content} }
  &::placeholder { ${content} }
`;

const getStyles = (euiThemeContext: UseEuiTheme) => {
  const { euiTheme } = euiThemeContext;
  const form = euiFormVariables(euiThemeContext);
  const iconColor = encodeURIComponent(euiTheme.colors.text);

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

      .navbar__items {
        gap: ${euiTheme.size.s};

        @media (min-width: 997px) {
          gap: ${euiTheme.size.l};
        }
      }

      .navbar__items--right {
        gap: ${euiTheme.size.s};
      }

      .navbar__item,
      [class*='colorModeToggle'] {
        @media (max-width: 996px) {
          display: none;
        }
      }

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
          min-inline-size: 25rem;
        }
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
