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
  logicalShorthandCSS,
  mathWithUnits,
} from '../../global_styling';
import { UseEuiTheme } from '../../services';
import {
  EuiLoadingSpinnerSize,
  EuiLoadingSpinnerColor,
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

export const euiSpinnerBorderColorsCSS = (
  { euiTheme }: UseEuiTheme,
  colors: EuiLoadingSpinnerColor = {}
): string => {
  const {
    border = euiTheme.colors.lightShade,
    highlight = euiTheme.colors.primary,
  } = colors;
  return `${highlight} ${border} ${border} ${border}`;
};

export const euiLoadingSpinnerStyles = (euiThemeContext: UseEuiTheme) => {
  const { euiTheme } = euiThemeContext;
  return {
    euiLoadingSpinner: css`
      flex-shrink: 0; /* Ensures it never scales down below its intended size */
      display: inline-block;
      border-radius: 50%;
      border: ${euiTheme.border.thick};
      ${logicalShorthandCSS(
        'border-color',
        euiSpinnerBorderColorsCSS(euiThemeContext)
      )}

      ${euiCanAnimate} {
        animation: ${_loadingSpinner} 0.6s infinite linear;
      }
    `,

    // Sizes
    s: css`
      ${logicalSizeCSS(
        euiTheme.size[spinnerSizes.s],
        euiTheme.size[spinnerSizes.s]
      )}
      border-width: ${mathWithUnits(
        euiTheme.border.width.thin,
        (x) => x * 1.5
      )};
    `,
    m: css`
      ${logicalSizeCSS(
        euiTheme.size[spinnerSizes.m],
        euiTheme.size[spinnerSizes.m]
      )}
      border-width: ${mathWithUnits(
        euiTheme.border.width.thin,
        (x) => x * 1.5
      )};
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
