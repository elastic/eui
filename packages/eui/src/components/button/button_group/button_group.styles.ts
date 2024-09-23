/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { css } from '@emotion/react';
import { UseEuiTheme } from '../../../services';
import { logicalCSS, mathWithUnits } from '../../../global_styling';
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
  const { euiTheme, highContrastMode } = euiThemeContext;

  const {
    controlCompressedHeight,
    controlCompressedBorderRadius,
    backgroundColor,
    borderColor,
  } = euiFormVariables(euiThemeContext);

  const _highContrastAffordance = highContrastMode
    ? `
      & > .euiButtonGroupButton:not(:first-child),
      & > .euiButtonGroup__tooltipWrapper:not(:first-child) .euiButtonGroupButton {
        ${logicalCSS('border-left', 'none')}
      }

      /* Target Windows high contrast themes, which ignore background-color
       * and make selections difficult to distinguish */
      @media (forced-colors: active) {
        .euiButtonGroupButton-isSelected {
          ${logicalCSS(
            'border-bottom-width',
            mathWithUnits(euiTheme.border.width.thick, (x) => x * 1.5)
          )}
        }
      }
      `
    : '';

  return {
    // Base
    euiButtonGroup__buttons: css`
      ${logicalCSS('max-width', '100%')}
      display: flex;
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
      ${_highContrastAffordance}
    `,
    s: css`
      border-radius: ${euiTheme.border.radius.small};
      ${_highContrastAffordance}
    `,
    compressed: css`
      ${logicalCSS('height', controlCompressedHeight)}
      background-color: ${backgroundColor};
      border: ${euiTheme.border.width.thin} solid ${borderColor};
      border-radius: ${controlCompressedBorderRadius};
    `,
  };
};
