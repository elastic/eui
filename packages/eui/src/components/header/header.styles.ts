/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { css } from '@emotion/react';
import { euiShadowXSmall } from '@elastic/eui-theme-common';

import { logicalCSS } from '../../global_styling';
import { UseEuiTheme, makeHighContrastColor } from '../../services';

export const euiHeaderVariables = (euiThemeContext: UseEuiTheme) => {
  const { euiTheme } = euiThemeContext;

  return {
    height: euiTheme.size.xxxl,
    childHeight: euiTheme.size.xxl,
    padding: euiTheme.size.s,
  };
};

export const euiHeaderStyles = (euiThemeContext: UseEuiTheme) => {
  const { euiTheme } = euiThemeContext;
  const { height, padding } = euiHeaderVariables(euiThemeContext);

  return {
    euiHeader: css`
      display: flex;
      justify-content: space-between;
      ${logicalCSS('height', height)}
      ${logicalCSS('padding-horizontal', padding)}
      ${logicalCSS('border-bottom', euiTheme.border.thin)}
      ${euiShadowXSmall(euiThemeContext)}
    `,
    // Position
    static: css`
      /* Ensure the shadow shows above content */
      z-index: ${Number(euiTheme.levels.header!) - 1};
      position: relative;
    `,
    fixed: css`
      /* Ensure it's above EuiFlyout */
      z-index: ${Number(euiTheme.levels.header!) + 1};
      position: fixed;
      ${logicalCSS('top', 0)}
      ${logicalCSS('horizontal', 0)}
    `,
    // Theme
    default: css`
      background-color: ${euiTheme.components.headerBackground};
    `,
    dark: css(euiHeaderDarkStyles(euiThemeContext)),
  };
};

/**
 * The `dark` header is (currently) a bit of a special case. We don't
 * actually want to use <EuiThemeProvider colorMode="dark"> inside it
 * because that will affect popovers and `SelectableSitewideTemplate`
 * as well, which we do not necessarily want to do (?)
 *
 * It's also possible that the dark header will go away or become unused
 * by Kibana in the near future, at which point we can remove this
 */
import { euiFormVariables } from '../form/form.styles';

const euiHeaderDarkStyles = (euiThemeContext: UseEuiTheme) => {
  const { euiTheme } = euiThemeContext;
  const { controlPlaceholderText } = euiFormVariables(euiThemeContext);

  const backgroundColor = euiTheme.components.headerDarkBackground;

  // Specific color overrides for EuiSelectableTemplateSitewide
  const selectableSitewide = {
    color: euiTheme.colors.ghost,
    borderColor: euiTheme.components.headerDarkSearchBorderColor,
    placeholderColor: makeHighContrastColor(
      controlPlaceholderText,
      8
    )(backgroundColor),
  };

  return `
    background-color: ${backgroundColor};

    .euiHeaderLogo__text,
    .euiHeaderLink,
    .euiHeaderSectionItemButton {
      color: ${euiTheme.colors.ghost};
    }

    .euiHeaderLink-isActive {
      color: ${makeHighContrastColor(euiTheme.colors.primary)(backgroundColor)};
    }

    .euiHeaderLogo,
    .euiHeaderLink,
    .euiHeaderSectionItemButton {
      &:focus {
        background-color: ${
          euiTheme.components.headerDarkSectionItemBackgroundFocus
        };
      }
    }

    .euiHeaderSectionItemButton__notification--badge {
      box-shadow: 0 0 0 ${euiTheme.border.width.thin} ${backgroundColor};
    }

    .euiHeaderSectionItemButton__notification--dot {
      stroke: ${backgroundColor};
    }

    .euiSelectableTemplateSitewide .euiFormControlLayout {
      background-color: transparent;

      input {
        box-shadow: inset 0 0 0 ${euiTheme.border.width.thin} ${
    selectableSitewide.borderColor
  };
      }

      &--group {
        border-color: ${euiTheme.components.headerDarkSearchBorderColor};

        input {
          box-shadow: none;
        }
      }

      &:not(:focus-within) {
        /* Increase contrast of filled text to be more than placeholder text */
        color: ${selectableSitewide.color};

        input {
          /* Increase contrast of placeholder text */
          &::placeholder {
            color: ${selectableSitewide.placeholderColor};
          }

          /* Inherit color from form control layout */
          color: inherit;
          background-color: transparent;
        }

        .euiFormControlLayout__append,
        .euiFormControlLayout__prepend {
          background-color: transparent;
        }

        .euiFormLabel {
          color: inherit;
        }
      }
    }
  `;
};
