/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */
import { css, keyframes } from '@emotion/react';
import {
  _EuiThemeSize,
  euiCanAnimate,
  logicalSizeCSS,
} from '../../global_styling';
import { UseEuiTheme } from '../../services';
import { EuiLoadingSpinnerSize } from './loading_spinner';

const _spinnerTurn = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

const _spinnerDash = keyframes`
  0% {
    stroke-dasharray: 0 150;
    stroke-dashoffset: 0;
  }

  50% {
    stroke-dasharray: 42 150;
    stroke-dashoffset: -16;
  }

  100% {
    stroke-dasharray: 42 150;
    stroke-dashoffset: -59;
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

const durationMs = (value: string = '', multiple: number) =>
  `${Math.round((parseFloat(value) || 500) * multiple)}ms`;

export const euiLoadingSpinnerStyles = ({
  euiTheme,
  colorMode,
}: UseEuiTheme) => {
  // Dash cycle is 3 × extraSlow. The turn is 4/3 of that cycle.
  const dashDuration = durationMs(euiTheme.animation.extraSlow, 3);
  const turnDuration = durationMs(euiTheme.animation.extraSlow, 4);

  return {
    euiLoadingSpinner: css`
      flex-shrink: 0; /* Ensures it never scales down below its intended size */
      display: inline-flex;
      color: currentColor;
    `,
    svg: css`
      inline-size: 100%;
      block-size: 100%;
      overflow: visible;
      fill: none;
      stroke: currentColor;

      .euiLoadingSpinner__track {
        opacity: ${colorMode === 'DARK' ? 0.24 : 0.18};
      }

      .euiLoadingSpinner__arc {
        stroke-dasharray: 42 150;
        stroke-dashoffset: -16;
        transform-origin: center;

        ${euiCanAnimate} {
          animation: ${_spinnerDash} ${dashDuration} linear infinite,
            ${_spinnerTurn} ${turnDuration} linear infinite;
        }
      }
    `,

    // Sizes
    s: css`
      ${logicalSizeCSS(
        euiTheme.size[spinnerSizes.s],
        euiTheme.size[spinnerSizes.s]
      )}
    `,
    m: css`
      ${logicalSizeCSS(
        euiTheme.size[spinnerSizes.m],
        euiTheme.size[spinnerSizes.m]
      )}
    `,
    l: css`
      ${logicalSizeCSS(
        euiTheme.size[spinnerSizes.l],
        euiTheme.size[spinnerSizes.l]
      )}
    `,
    xl: css`
      ${logicalSizeCSS(
        euiTheme.size[spinnerSizes.xl],
        euiTheme.size[spinnerSizes.xl]
      )}
    `,
    xxl: css`
      ${logicalSizeCSS(
        euiTheme.size[spinnerSizes.xxl],
        euiTheme.size[spinnerSizes.xxl]
      )}
    `,
  };
};
