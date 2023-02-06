/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { css } from '@emotion/react';
import {
  UseEuiTheme,
  shade,
  tint,
  COLOR_MODES_STANDARD,
  EuiThemeColorModeStandard,
} from '../../services';
import { logicalCSS, mathWithUnits, euiCanAnimate } from '../../global_styling';
import { openAnimationTiming } from '../popover/popover_panel/_popover_panel.styles';
import { popoverArrowSize } from '../popover/popover_arrow/_popover_arrow.styles';

const backgroundColor = (color: string, colorMode: EuiThemeColorModeStandard) =>
  colorMode === COLOR_MODES_STANDARD.dark
    ? shade(color, 0.45)
    : tint(color, 0.5);

export const euiTourStyles = ({ euiTheme, colorMode }: UseEuiTheme) => ({
  // Targets EuiPopoverPanel
  euiTour: css`
    [data-popover-arrow='top']::before {
      ${logicalCSS(
        'border-top-color',
        backgroundColor(euiTheme.colors.lightestShade, colorMode)
      )};
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
        opacity: 1; // Must alter here otherwise the transition does not occur
      }
    `,
    // Positions
    right: css`
      ${logicalCSS('top', arrowHalfSize)};
      ${logicalCSS('left', arrowOffset)};
    `,
    left: css`
      ${logicalCSS('top', arrowHalfSize)};
      ${logicalCSS('left', arrowSize)};
    `,
    top: css`
      ${logicalCSS('top', arrowSize)};
      ${logicalCSS('left', arrowHalfSize)};
    `,
    bottom: css`
      ${logicalCSS('top', arrowOffset)};
      ${logicalCSS('left', arrowHalfSize)};
    `,
  };
};

export const euiTourHeaderStyles = ({ euiTheme }: UseEuiTheme) => ({
  // Base
  euiTourHeader: css`
    ${logicalCSS('border-bottom', 'none')};
    // Overriding default EuiPopoverTitle styles
    ${logicalCSS('margin-bottom', euiTheme.size.s)};
  `,
  // Elements
  euiTourHeader__title: css`
    // Removes extra margin applied to sibling EuiTitle's
    ${logicalCSS('margin-top', 0)};
  `,
  euiTourHeader__subtitle: css`
    color: ${euiTheme.colors.subduedText};
    padding-block-end: ${euiTheme.size.xs};
  `,
});

export const euiTourFooterStyles = ({ euiTheme, colorMode }: UseEuiTheme) => ({
  // Base
  euiTourFooter: css`
    background-color: ${backgroundColor(
      euiTheme.colors.lightestShade,
      colorMode
    )};
    ${logicalCSS('border-bottom-left-radius', euiTheme.border.radius.medium)};
    ${logicalCSS('border-bottom-right-radius', euiTheme.border.radius.medium)};
  `,
});
