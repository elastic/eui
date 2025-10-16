/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { css } from '@emotion/react';
import { UseEuiTheme } from '../../../services';
import { logicalCSS } from '../../../global_styling';
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

  const {
    controlCompressedHeight,
    controlCompressedBorderRadius,
    backgroundColor,
    borderColor,
  } = euiFormVariables(euiThemeContext);

  return {
    // Base
    euiButtonGroup__buttons: css`
      ${logicalCSS('max-width', '100%')}
      display: flex;
      align-items: center;
    `,
    fullWidth: css`
      ${logicalCSS('width', '100%')}

      .euiButtonGroupButton,
      .euiButtonGroup__tooltipWrapper {
        flex: 1;
        ${logicalCSS('width', '100%')}
      }
    `,
    // Sizes
    m: css`
      border-radius: ${euiTheme.border.radius.medium};
      ${_highContrastStyles(euiThemeContext)}
    `,
    s: css`
      border-radius: ${euiTheme.border.radius.small};
      ${_highContrastStyles(euiThemeContext)}
    `,
    compressed: css`
      ${logicalCSS('height', controlCompressedHeight)}
      background-color: ${backgroundColor};
      border: ${euiTheme.border.width.thin} solid ${borderColor};
      border-radius: ${controlCompressedBorderRadius};
      ${_highContrastStyles(euiThemeContext, true)}
    `,
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

        &:is(:hover, :focus):not(:disabled) {
          &::before {
            border-color: ${euiTheme.colors.textInverse};
          }
        }
      }

      .euiButtonGroupButton[disabled] {
        opacity: 0.5;
      }
    `,
  });
};
