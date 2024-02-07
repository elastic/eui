/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { css } from '@emotion/react';
import { UseEuiTheme } from '../../services';
import { logicalCSS, mathWithUnits, euiCanAnimate } from '../../global_styling';
import { openAnimationTiming } from '../popover/popover_panel/_popover_panel.styles';
import { popoverArrowSize } from '../popover/popover_arrow/_popover_arrow.styles';

import { _tourFooterBgColor } from './_tour_footer.styles';

export const euiTourStyles = (euiThemeContext: UseEuiTheme) => ({
  // Targets EuiPopoverPanel
  euiTour: css`
    [data-popover-arrow='top']::before {
      ${logicalCSS('border-top-color', _tourFooterBgColor(euiThemeContext))}
    }
  `,
});

export const euiTourBeaconStyles = ({ euiTheme }: UseEuiTheme) => {
  const arrowSize = euiTheme.size[popoverArrowSize];
  const arrowHalfSize = mathWithUnits(arrowSize, (x) => x / 2);
  const arrowOffset = mathWithUnits(arrowSize, (x) => x * -2);

  return {
    // Base
    euiTourBeacon: css`
      pointer-events: none;
      position: absolute;
      ${euiCanAnimate} {
        opacity: 0;
        transition: opacity 0s ${euiTheme.animation[openAnimationTiming]};
      }
    `,
    isOpen: css`
      ${euiCanAnimate} {
        opacity: 1; /* Must alter here otherwise the transition does not occur */
      }
    `,
    // Positions
    right: css`
      ${logicalCSS('top', arrowHalfSize)}
      ${logicalCSS('left', arrowOffset)}
    `,
    left: css`
      ${logicalCSS('top', arrowHalfSize)}
      ${logicalCSS('left', arrowSize)}
    `,
    top: css`
      ${logicalCSS('top', arrowSize)}
      ${logicalCSS('left', arrowHalfSize)}
    `,
    bottom: css`
      ${logicalCSS('top', arrowOffset)}
      ${logicalCSS('left', arrowHalfSize)}
    `,
  };
};
