/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { css } from '@emotion/react';
import { logicalSizeCSS, mathWithUnits } from '../../../global_styling';
import { UseEuiTheme } from '../../../services';

export const popoverArrowSize = 'base';

export const euiPopoverArrowStyles = (euiThemeContext: UseEuiTheme) => {
  const { euiTheme } = euiThemeContext;

  const arrowColor = 'var(--euiPopoverBackgroundColor)';
  const borderColor = euiTheme.colors.borderBaseFloating;
  const arrowSizeBase = euiTheme.size[popoverArrowSize];
  const arrowSize = mathWithUnits(arrowSizeBase, (x) => x + 3); // calculation to ensure size parity

  const arrowPlusSize = mathWithUnits(arrowSize, (x) => (x / 2 + 1) * -1);
  const arrowMinusSize = mathWithUnits(arrowSize, (x) => (x / 2 - 1) * -1);

  const adjustedPosition = 'calc(25% - 2px)';

  return {
    // Base
    euiPopoverArrow: css`
      position: absolute;
      ${logicalSizeCSS(arrowSize, arrowSize)}
      transform-origin: center;
      border-radius: ${mathWithUnits(
        euiTheme.border.radius.small,
        (x) => x / 2
      )};
      border: ${euiTheme.border.width.thin} solid transparent;
      background-color: ${arrowColor};
    `,

    // POSITIONS
    top: css`
      border-block-end-color: ${borderColor};
      border-inline-end-color: ${borderColor};
      transform: translate(${adjustedPosition}, ${arrowPlusSize}) rotateZ(45deg);
    `,

    bottom: css`
      border-block-start-color: ${borderColor};
      border-inline-start-color: ${borderColor};
      transform: translate(${adjustedPosition}, ${arrowMinusSize})
        rotateZ(45deg);
    `,

    left: css`
      border-block-start-color: ${borderColor};
      border-inline-end-color: ${borderColor};
      transform: translate(${arrowPlusSize}, ${adjustedPosition}) rotateZ(45deg);
    `,

    right: css`
      border-block-end-color: ${borderColor};
      border-inline-start-color: ${borderColor};
      transform: translate(${arrowMinusSize}, ${adjustedPosition})
        rotateZ(45deg);
    `,
  };
};
