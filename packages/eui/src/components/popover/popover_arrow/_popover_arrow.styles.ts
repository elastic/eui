/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { css } from '@emotion/react';
import {
  logicalCSS,
  logicalSizeCSS,
  mathWithUnits,
} from '../../../global_styling';
import { UseEuiTheme } from '../../../services';

export const popoverArrowSize = 'm';

export const euiPopoverArrowStyles = (euiThemeContext: UseEuiTheme) => {
  const { euiTheme, highContrastMode } = euiThemeContext;

  const arrowSize = euiTheme.size[popoverArrowSize];
  const arrowDoubleSize = mathWithUnits(arrowSize, (x) => x * 2);

  const highContrastPseudoElement = (css: string) => {
    return highContrastMode ? `&::before {${css}}` : '';
  };
  const highContrastBorderAffordance = mathWithUnits(
    euiTheme.border.width.thin,
    (x) => x * -2
  );

  return {
    // Base
    euiPopoverArrow: css`
      position: absolute;
      background-color: var(--euiPopoverBackgroundColor);

      ${highContrastPseudoElement(`
        content: '';
        position: absolute;
        background-color: inherit;
        border: ${euiTheme.border.thin};
        transform: rotate(45deg);
        transform-origin: top;
        ${logicalSizeCSS(mathWithUnits(arrowDoubleSize, (x) => x * 0.75))}
      `)}
    `,

    // POSITIONS
    top: css`
      clip-path: polygon(0 0, 50% 100%, 100% 0);
      ${logicalSizeCSS(arrowDoubleSize, arrowSize)}
      ${logicalCSS(
        'margin-top',
        highContrastMode ? highContrastBorderAffordance : 0
      )}

      ${highContrastPseudoElement(`
        ${logicalCSS('top', '-60%')}
        ${logicalCSS('left', '38%')}
      `)}
    `,

    bottom: css`
      clip-path: polygon(0 100%, 50% 0, 100% 100%);
      ${logicalSizeCSS(arrowDoubleSize, arrowSize)}
      ${logicalCSS('margin-top', `-${arrowSize}`)}

      ${highContrastPseudoElement(`
        ${logicalCSS('top', '54%')}
        ${logicalCSS('left', '38%')}
      `)}
    `,

    left: css`
      clip-path: polygon(0 0, 100% 50%, 0 100%);
      ${logicalSizeCSS(arrowSize, arrowDoubleSize)}
      ${logicalCSS(
        'margin-left',
        highContrastMode ? highContrastBorderAffordance : 0
      )}

      ${highContrastPseudoElement(`
        ${logicalCSS('top', '24%')}
        ${logicalCSS('left', '-30%')}
      `)}
    `,

    right: css`
      clip-path: polygon(100% 0, 0 50%, 100% 100%);
      ${logicalSizeCSS(arrowSize, arrowDoubleSize)}
      ${logicalCSS('margin-left', `-${arrowSize}`)}

      ${highContrastPseudoElement(`
        ${logicalCSS('top', '24%')}
        ${logicalCSS('left', '90%')}
      `)}
    `,
  };
};
