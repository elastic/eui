/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { css } from '@emotion/react';
import { euiFontSize, logicalCSS, mathWithUnits } from '../../global_styling';
import { preventForcedColors } from '../../global_styling/functions/high_contrast';

import { UseEuiTheme } from '../../services';

import { euiSkeletonGradientAnimation } from './utils';

const calculateLineSize = (
  euiThemeContext: UseEuiTheme,
  size: 'xs' | 's' | 'm'
) => {
  const { fontSize, lineHeight } = euiFontSize(euiThemeContext, 'm', {
    customScale: size,
  });

  return `
    ${logicalCSS('height', fontSize)}
    ${logicalCSS(
      'margin-top',
      mathWithUnits([lineHeight, fontSize], (x, y) => x - y)
    )}
  `;
};

export const euiSkeletonTextStyles = (euiThemeContext: UseEuiTheme) => {
  const { euiTheme } = euiThemeContext;

  return {
    euiSkeletonText: css`
      display: block;
      ${logicalCSS('width', '100%')}
      border-radius: ${euiTheme.border.radius.small};
      ${euiSkeletonGradientAnimation(euiThemeContext)}
      ${preventForcedColors(euiThemeContext)}

      /* Offset via transform to more closely match placement of text */
      transform: translateY(-25%);

      &:last-child:not(:only-child) {
        ${logicalCSS('width', '75%')}
      }
    `,
    // Sizes
    m: css`
      ${calculateLineSize(euiThemeContext, 'm')}
    `,
    s: css`
      ${calculateLineSize(euiThemeContext, 's')}
    `,
    xs: css`
      ${calculateLineSize(euiThemeContext, 'xs')}
    `,
    relative: css`
      ${logicalCSS('height', '1em')}
      ${logicalCSS('margin-top', '0.5em')}
    `,
  };
};
