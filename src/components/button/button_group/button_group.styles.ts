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
import { euiFormVariables } from '../../form/form.styles';

export const euiButtonGroupStyles = () => {
  return {
    euiButtonGroup: css`
      display: inline-block;
      ${logicalCSS('max-width', '100%')}
      position: relative; /* Ensures the EuiScreenReaderOnly component is positioned relative to this component */
    `,
    fullWidth: css`
      display: block;
    `,
  };
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
    `,
    fullWidth: css`
      ${logicalCSS('width', '100%')}

      .euiButtonGroupButton {
        flex: 1;
      }
    `,
    // Sizes
    m: css`
      border-radius: ${euiTheme.border.radius.medium};
    `,
    s: css`
      border-radius: ${euiTheme.border.radius.small};
    `,
    compressed: css`
      ${logicalCSS('height', controlCompressedHeight)}
      background-color: ${backgroundColor};
      border: ${euiTheme.border.width.thin} solid ${borderColor};
      border-radius: ${controlCompressedBorderRadius};
    `,
  };
};
