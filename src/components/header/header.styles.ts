/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { css } from '@emotion/react';

import { euiShadowSmall } from '../../themes/amsterdam/global_styling/mixins';
import { logicalCSS } from '../../global_styling';
import {
  UseEuiTheme,
  shade,
  transparentize,
  makeHighContrastColor,
} from '../../services';

export const euiHeaderVariables = (euiThemeContext: UseEuiTheme) => {
  const { euiTheme } = euiThemeContext;

  return {
    height: euiTheme.size.xxxl,
    childHeight: euiTheme.size.xxl,
    padding: euiTheme.size.s,
  };
};

export const euiHeaderStyles = (euiThemeContext: UseEuiTheme) => {
  const { euiTheme, colorMode } = euiThemeContext;
  const { height, padding } = euiHeaderVariables(euiThemeContext);

  // Curated border color to fade into the shadow without looking too much like a border
  // It adds separation between the header and flyout
  const borderColor =
    colorMode === 'DARK'
      ? shade(euiTheme.colors.emptyShade, 0.35)
      : shade(euiTheme.border.color, 0.03);

  return {
    euiHeader: css`
      display: flex;
      justify-content: space-between;
      ${logicalCSS('height', height)}
      ${logicalCSS('padding-horizontal', padding)}
      ${euiShadowSmall(euiThemeContext)}
    `,
    // Position
    static: css`
      /* Ensure the shadow shows above content */
      z-index: ${Number(euiTheme.levels.header!) - 1};
      position: relative;
    `,
    fixed: css`
      z-index: ${euiTheme.levels.header};
      position: fixed;
      ${logicalCSS('top', 0)}
      ${logicalCSS('horizontal', 0)}

      & + [data-fixed-header] {
        ${logicalCSS('top', height)}
      }
    `,
    // Theme
    default: css`
      background-color: ${euiTheme.colors.emptyShade};
      ${logicalCSS(
        'border-bottom',
        `${euiTheme.border.width.thin} solid ${borderColor}`
      )}
    `,
    dark: css(euiHeaderDarkStyles(euiThemeContext, borderColor)),
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

const euiHeaderDarkStyles = (
  euiThemeContext: UseEuiTheme,
  defaultBorderColor: string
) => {
  const { euiTheme, colorMode } = euiThemeContext;
  const { controlPlaceholderText } = euiFormVariables(euiThemeContext);

  const backgroundColor =
    colorMode === 'DARK'
      ? shade(euiTheme.colors.lightestShade, 0.5)
      : shade(euiTheme.colors.darkestShade, 0.28);
  const borderColor =
    colorMode === 'DARK' ? defaultBorderColor : backgroundColor;

  return `
    background-color: ${backgroundColor};
    ${logicalCSS('border-bottom-color', borderColor)}

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
        background-color: ${shade(euiTheme.colors.primary, 0.5)};
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

      &--group,
      input {
        box-shadow: inset 0 0 0 ${euiTheme.border.width.thin}
          ${transparentize(euiTheme.colors.ghost, 0.3)};
      }

      &:not(:focus-within) {
        /* Increase contrast of filled text to be more than placeholder text */
        color: ${euiTheme.colors.ghost};

        input {
          /* Increase contrast of placeholder text */
          &::placeholder {
            color: ${makeHighContrastColor(
              controlPlaceholderText,
              8
            )(backgroundColor)};
          }

          /* Inherit color from form control layout */
          color: inherit;
          background-color: transparent;
        }

        .euiFormControlLayout__append {
          background-color: transparent;
          color: inherit;
        }
      }
    }
  `;
};
