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

export const euiPopoverArrowStyles = (euiThemeContext: UseEuiTheme) => {
  const { euiTheme, highContrastMode, colorMode } = euiThemeContext;
  const hasBorder = highContrastMode || colorMode === 'DARK';

  const arrowSize = euiTheme.size.base;
  const arrowOffset = mathWithUnits(arrowSize, (x) => x / -2);
  const arrowBorderRadius = mathWithUnits(
    euiTheme.border.radius.small,
    (x) => x / 2
  );

  return {
    // Wrapper
    euiPopoverArrowWrapper: css`
      position: absolute;
      ${logicalSizeCSS(arrowSize)}
    `,

    // Base
    euiPopoverArrow: css`
      position: absolute;
      ${logicalSizeCSS(arrowSize)}
      background-color: var(--euiPopoverBackgroundColor);
      ${hasBorder ? `border: ${euiTheme.border.thin};` : ''}
      border-radius: ${arrowBorderRadius};
      /* Use clip-path to ensure that arrows don't overlap into popover content */
      clip-path: polygon(0 0, 100% 100%, 0 100%);
      transform-origin: center;
    `,

    // POSITIONS
    top: css`
      ${logicalCSS('margin-top', arrowOffset)}
      transform: rotate(-45deg);
    `,

    bottom: css`
      ${logicalCSS('bottom', 0)}
      ${logicalCSS('margin-bottom', arrowOffset)}
      transform: rotate(135deg);
    `,

    left: css`
      ${logicalCSS('margin-left', arrowOffset)}
      transform: rotate(-135deg);
    `,

    right: css`
      ${logicalCSS('right', 0)}
      ${logicalCSS('margin-right', arrowOffset)}
      transform: rotate(45deg);
    `,
  };
};
