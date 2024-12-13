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

import { _tourFooterBgColor } from './_tour_footer.styles';

export const euiTourStyles = (euiThemeContext: UseEuiTheme) => ({
  // Targets EuiPopoverPanel
  euiTour: css`
    [data-popover-arrow='top'] {
      background-color: ${_tourFooterBgColor(euiThemeContext)};
    }
  `,
});

export const euiTourBeaconStyles = ({ euiTheme }: UseEuiTheme) => {
  const beaconSize = euiTheme.size.m;
  const beaconOffset = mathWithUnits(beaconSize, (x) => x / -2);

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
      ${logicalCSS('top', '50%')}
      ${logicalCSS('left', '-50%')}
      ${logicalCSS('margin-top', beaconOffset)}
    `,
    left: css`
      ${logicalCSS('top', '50%')}
      ${logicalCSS('right', '-50%')}
      ${logicalCSS('margin-top', beaconOffset)}
    `,
    top: css`
      ${logicalCSS('left', '50%')}
      ${logicalCSS('bottom', '-50%')}
      ${logicalCSS('margin-left', beaconOffset)}
    `,
    bottom: css`
      ${logicalCSS('left', '50%')}
      ${logicalCSS('top', '-50%')}
      ${logicalCSS('margin-left', beaconOffset)}
    `,
  };
};
