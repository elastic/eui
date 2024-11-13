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

      /* Windows high contrast themes force all border colors to a single color, which
        renders the animation useless/invisible - we'll need to use another approach */
      @media (forced-colors: none) {
        border: ${euiTheme.border.thick};
        ${logicalShorthandCSS(
          'border-color',
          euiSpinnerBorderColorsCSS(euiThemeContext)
        )}
      }

      ${euiCanAnimate} {
        animation: ${_loadingSpinner} 0.6s infinite linear;
      }
    `,

    // Sizes
    s: css`
      ${logicalSizeCSS(euiTheme.size[spinnerSizes.s])}
      border-width: ${mathWithUnits(
        euiTheme.border.width.thin,
        (x) => x * 1.5
      )};
      ${_highContrastFallback(euiThemeContext, 's')}
    `,
    m: css`
      ${logicalSizeCSS(euiTheme.size[spinnerSizes.m])}
      border-width: ${mathWithUnits(
        euiTheme.border.width.thin,
        (x) => x * 1.5
      )};
      ${_highContrastFallback(euiThemeContext)}
    `,
    l: css`
      ${logicalSizeCSS(euiTheme.size[spinnerSizes.l])}
      ${_highContrastFallback(euiThemeContext)}
    `,
    xl: css`
      ${logicalSizeCSS(euiTheme.size[spinnerSizes.xl])}
      ${_highContrastFallback(euiThemeContext)}
    `,
    xxl: css`
      ${logicalSizeCSS(
        euiTheme.size[spinnerSizes.xxl],
        euiTheme.size[spinnerSizes.xxl]
      )}
      ${_highContrastFallback(euiThemeContext)}
    `,
  };
};

// Windows high contrast themes allow colors on url-based background-images,
// so we're inline an SVG to render as a fallback (using opposite shades for contrast)
const _highContrastFallback = (
  { euiTheme, highContrastMode }: UseEuiTheme,
  size: 's' | 'm' = 'm'
) => {
  if (!highContrastMode) return '';

  const colorOne = encodeURIComponent(euiTheme.colors.emptyShade);
  const colorTwo = encodeURIComponent(euiTheme.colors.fullShade);

  const pathSizes = {
    s: [
      "d='M10 0a10 10 0 0 1 9.75 12.225l-2.925-.668A7 7 0 0 0 10 3Z'",
      "d='M19.75 12.225A10 10 0 1 1 9.997 0v3a7 7 0 1 0 6.827 8.557Z'",
    ],
    m: [
      "d='M10 0a10 10 0 0 1 9.75 12.225l-1.95-.445A8 8 0 0 0 10 2Z'",
      "d='M19.75 12.225A10 10 0 1 1 9.997 0v2a8 8 0 1 0 7.802 9.78Z'",
    ],
  };

  return `
    @media (forced-colors: active) {
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100%25' height='100%25' viewBox='0 0 20 20'%3E%3Cpath fill='${colorOne}' ${pathSizes[size][0]} /%3E%3Cpath fill='${colorTwo}' ${pathSizes[size][1]} /%3E%3C/svg%3E");
    }
  `;
};
