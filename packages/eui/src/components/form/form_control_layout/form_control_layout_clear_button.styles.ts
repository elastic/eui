/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { css } from '@emotion/react';

import { logicalSizeCSS, mathWithUnits } from '../../../global_styling';
import { UseEuiTheme } from '../../../services';

export const EuiFormControlLayoutClearButtonStyles = ({
  euiTheme,
  colorMode,
  highContrastMode,
}: UseEuiTheme) => {
  const backgroundColor =
    colorMode === 'DARK' || highContrastMode // mediumShade is not sufficient WCAG contrast
      ? euiTheme.colors.darkShade
      : euiTheme.colors.mediumShade;

  return {
    euiFormControlLayoutClearButton: css`
      pointer-events: all;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 50%;
      /* Windows high contrast themes ignore background-color, so we use border to color the button instead for better support */
      border-style: solid;
      border-color: ${backgroundColor};

      &:disabled {
        cursor: not-allowed;
        background-color: ${euiTheme.colors.disabled};
      }
    `,

    size: {
      s: `
        ${logicalSizeCSS(euiTheme.size.m)}
        border-width: ${mathWithUnits(euiTheme.size.m, (x) => x / 2)};
      `,
      m: `
        ${logicalSizeCSS(euiTheme.size.base)}
        border-width: ${mathWithUnits(euiTheme.size.base, (x) => x / 2)};
      `,
    },

    icon: {
      euiFormControlLayoutClearButton__icon: css`
        transform: scale(0.5);
        fill: ${euiTheme.colors.emptyShade};
        stroke: ${euiTheme.colors.emptyShade};
      `,
      size: {
        s: css`
          stroke-width: ${euiTheme.size.xs};
        `,
        m: css`
          stroke-width: ${euiTheme.size.xxs};
        `,
      },
    },
  };
};
