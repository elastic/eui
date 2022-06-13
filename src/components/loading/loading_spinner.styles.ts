/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */
import { css, keyframes } from '@emotion/react';
import { _EuiThemeSize, euiCanAnimate } from '../../global_styling';
import { UseEuiTheme } from '../../services';
import {
  EuiLoadingSpinnerSize,
  EuiLoadingSpinnerProps,
} from './loading_spinner';

const _loadingSpinner = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(359deg);
  }
`;

const spinnerSizes: {
  [size in EuiLoadingSpinnerSize]: _EuiThemeSize;
} = {
  s: 'm',
  m: 'base',
  l: 'l',
  xl: 'xl',
  xxl: 'xxl',
};

const spinnerColorsCSS = (border?: string, highlight?: string) => {
  return `
    border-color: ${highlight} ${border} ${border} ${border};
  `;
};

export const euiLoadingSpinnerStyles = (
  { euiTheme }: UseEuiTheme,
  color?: EuiLoadingSpinnerProps['color']
) => {
  return {
    euiLoadingSpinner: css`
      flex-shrink: 0; // Ensures it never scales down below its intended size
      display: inline-block;
      border-radius: 50%;
      border: ${euiTheme.border.thick};
      ${spinnerColorsCSS(
        color?.border || euiTheme.colors.lightShade,
        color?.highlight || euiTheme.colors.primary
      )};

      ${euiCanAnimate} {
        animation: ${_loadingSpinner} 0.6s infinite linear;
      }
    `,

    // Sizes
    s: css`
      width: ${euiTheme.size[spinnerSizes.s]};
      height: ${euiTheme.size[spinnerSizes.s]};
      border-width: calc(${euiTheme.border.width.thin} * 1.5);
    `,
    m: css`
      width: ${euiTheme.size[spinnerSizes.m]};
      height: ${euiTheme.size[spinnerSizes.m]};
      border-width: calc(${euiTheme.border.width.thin} * 1.5);
    `,
    l: css`
      width: ${euiTheme.size[spinnerSizes.l]};
      height: ${euiTheme.size[spinnerSizes.l]};
    `,
    xl: css`
      width: ${euiTheme.size[spinnerSizes.xl]};
      height: ${euiTheme.size[spinnerSizes.xl]};
    `,
    xxl: css`
      width: ${euiTheme.size[spinnerSizes.xxl]};
      height: ${euiTheme.size[spinnerSizes.xxl]};
    `,
  };
};
