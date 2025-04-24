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
} from '../../global_styling/functions';
import { UseEuiTheme } from '../../services';

/**
 * Arrow clipping/transform/positioning CSS shared between EuiPopover and EuiToolTip
 */
export const _popoverArrowStyles = (
  { euiTheme, colorMode, highContrastMode }: UseEuiTheme,
  arrowSize: string
) => {
  const hasBorder = colorMode === 'DARK';

  const arrowOffset = mathWithUnits(
    [
      arrowSize,
      euiTheme.border.width.thin, // account for 1px pseudo element border on panel
    ],
    (x, y) => (highContrastMode ? x / -2 : x / -2 - y)
  );

  const arrowBorderRadius = mathWithUnits(
    euiTheme.border.radius.small,
    (x) => x / 2
  );

  return {
    _arrowStyles: `
      position: absolute;
      z-index: 1;
      ${logicalSizeCSS(arrowSize)}
      border-radius: ${arrowBorderRadius};
      /* Use clip-path to ensure that arrows don't overlap into popover content */
      clip-path: polygon(0 0, 100% 100%, 0 100%);
      transform-origin: center;
      ${hasBorder ? `border: ${euiTheme.border.thin};` : ''}
    `,

    positions: {
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
    },
  };
};
