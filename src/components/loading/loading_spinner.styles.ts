/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { css, keyframes } from '@emotion/react';
import { UseEuiTheme } from '../../services';

const _loadingSpinner = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(359deg);
  }
`;

export const spinnerSizes = {
  s: 'm',
  m: 'base',
  l: 'l',
  xl: 'xl',
  xxl: 'xxl',
};

export const spinnerColors = (main: string, highlight: string) => {
  return `${highlight} ${main} ${main} ${main}`;
};

export const euiLoadingSpinnerStyles = ({ euiTheme }: UseEuiTheme) => {
  return {
    euiLoadingSpinner: css`
      flex-shrink: 0; // Ensures it never scales down below its intended size
      display: inline-block;
      border-radius: 50%;
      border: ${euiTheme.border.thick};
      border-color: ${spinnerColors(
        euiTheme.border.color,
        euiTheme.colors.primary
      )};

      // sass-lint:disable-block mixins-before-declarations
      // @include euiCanAnimate {
      animation: ${_loadingSpinner} 0.6s infinite linear;
      // }
    `,

    // Sizes
    s: css`
      width: ${euiTheme.size[spinnerSizes.s]};
      height: ${euiTheme.size[spinnerSizes.s]};
      border-width: 1.5px;
    `,
    m: css`
      width: ${euiTheme.size[spinnerSizes.m]};
      height: ${euiTheme.size[spinnerSizes.m]};
      border-width: 1.5px;
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
