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
import { preventForcedColors } from '../../global_styling/functions/high_contrast';
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
  { euiTheme, highContrastMode }: UseEuiTheme,
  colors: EuiLoadingSpinnerColor = {}
): string => {
  let {
    border = euiTheme.components.loadingSpinnerBorder,
    highlight = euiTheme.components.loadingSpinnerHighlight,
  } = colors;

  if (highContrastMode === 'forced') {
    border = euiTheme.colors.lightestShade;
    highlight = euiTheme.colors.fullShade;
  }
  return `${highlight} ${border} ${border} ${border}`;
};

export const euiLoadingSpinnerStyles = (euiThemeContext: UseEuiTheme) => {
  const { euiTheme, highContrastMode } = euiThemeContext;

  const smallerBorderWidth = highContrastMode
    ? euiTheme.border.width.thick
    : mathWithUnits(euiTheme.border.width.thin, (x) => x * 1.5);
  const largerBorderWidth = highContrastMode
    ? mathWithUnits(euiTheme.border.thick, (x) => x * 2)
    : euiTheme.border.width.thick;

  return {
    euiLoadingSpinner: css`
      flex-shrink: 0; /* Ensures it never scales down below its intended size */
      display: inline-block;
      border-radius: 50%;
      border: ${largerBorderWidth} solid ${euiTheme.border.color};
      ${logicalShorthandCSS(
        'border-color',
        euiSpinnerBorderColorsCSS(euiThemeContext)
      )}
      ${preventForcedColors(euiThemeContext)}

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
      border-width: ${smallerBorderWidth};
    `,
    m: css`
      ${logicalSizeCSS(
        euiTheme.size[spinnerSizes.m],
        euiTheme.size[spinnerSizes.m]
      )}
      border-width: ${smallerBorderWidth};
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
