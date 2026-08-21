/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { css } from '@emotion/react';
import { UseEuiTheme } from '../../../services';
import { euiDisabledSelector, logicalCSS } from '../../../global_styling';
import {
  highContrastModeStyles,
  preventForcedColors,
} from '../../../global_styling/functions/high_contrast';
import { euiFormVariables } from '../../form/form.styles';

export const euiButtonGroupStyles = {
  euiButtonGroup: css`
    display: inline-block;
    ${logicalCSS('max-width', '100%')}
    position: relative; /* Ensures the EuiScreenReaderOnly component is positioned relative to this component */
  `,
  fullWidth: css`
    display: block;
  `,
};

export const euiButtonGroupButtonsStyles = (euiThemeContext: UseEuiTheme) => {
  const { euiTheme } = euiThemeContext;

  const buttonSizes = {
    s: `
      border-radius: ${euiTheme.border.radius.control};
      ${_highContrastStyles(euiThemeContext)}
    `,
    m: `
      border-radius: ${euiTheme.border.radius.control};
      ${_highContrastStyles(euiThemeContext)}
    `,
  };

  const { controlCompressedHeight, backgroundColor, borderColor } =
    euiFormVariables(euiThemeContext);

  return {
    // Base
    euiButtonGroup__buttons: css`
      ${logicalCSS('max-width', '100%')}
      display: flex;
      align-items: center;

      &:where([data-variant='default'] &) {
        flex-wrap: wrap;
      }

      &:where([data-size='s'] &) {
        ${buttonSizes.s}
      }

      &:where([data-size='m'] &) {
        ${buttonSizes.m}
      }
    `,
    fullWidth: css`
      ${logicalCSS('width', '100%')}

      .euiButtonGroupButton,
      .euiButtonGroup__tooltipWrapper {
        flex: 1;
        ${logicalCSS('width', '100%')}
      }

      .euiButton {
        flex-grow: 1;
        /* ensure buttons grow within the group but not each to full width */
        inline-size: auto;
      }

      .euiButtonEmpty {
        /* prevent EuiButtonEmpty from shrinking when EuiButton siblings grow */
        flex-shrink: 0;
      }
    `,
    // Sizes
    size: {
      m: css`
        ${buttonSizes.m}
      `,
      s: css`
        ${buttonSizes.s}
      `,
      compressed: css`
        ${logicalCSS('height', controlCompressedHeight)}
        background-color: ${backgroundColor};
        border: ${euiTheme.border.width.thin} solid ${borderColor};
        border-radius: ${euiTheme.border.radius.control};
        ${_highContrastStyles(euiThemeContext, true)}
      `,
    },
    gutterSize: {
      xs: css`
        gap: ${euiTheme.size.xs};
      `,
      s: css`
        gap: ${euiTheme.size.s};
      `,
      m: css`
        gap: ${euiTheme.size.base};
      `,
      l: css`
        gap: ${euiTheme.size.l};
      `,
      xl: css`
        gap: ${euiTheme.size.xl};
      `,
    },
  };
};

const _highContrastStyles = (
  euiThemeContext: UseEuiTheme,
  compressed?: boolean
) => {
  const { euiTheme } = euiThemeContext;

  return highContrastModeStyles(euiThemeContext, {
    preferred: compressed
      ? `
        .euiButtonGroupButton {
          border: none;
        }
      `
      : '',
    forced: `
      .euiButtonGroupButton-isSelected {
        ${preventForcedColors(euiThemeContext)}
        color: ${euiTheme.colors.emptyShade};
        background-color: ${euiTheme.colors.fullShade};

        &:is(:hover, :focus):not(${euiDisabledSelector}) {
          &::before {
            border-color: ${euiTheme.colors.textInverse};
          }
        }
      }

      .euiButtonGroupButton:is(${euiDisabledSelector}) {
        opacity: 0.5;
      }
    `,
  });
};
