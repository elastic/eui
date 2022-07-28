/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { css } from '@emotion/react';
import { UseEuiTheme, shade, tint, COLOR_MODES_STANDARD } from '../../services';
import { logicalCSS } from '../../global_styling';
import { popoverArrowSize } from '../popover/popover_arrow/_popover_arrow.styles';

export const euiTourStyles = ({ euiTheme, colorMode }: UseEuiTheme) => ({
  // Targets EuiPopoverPanel
  euiTour: css`
    &[data-popover-open='true'] {
      [class*='euiTourBeacon'] {
        opacity: 1;
      }
    }

    [data-popover-arrow='top'] {
      &:before {
        ${logicalCSS(
          'border-top-color',
          colorMode === COLOR_MODES_STANDARD.dark
            ? shade(euiTheme.colors.lightestShade, 0.45)
            : tint(euiTheme.colors.lightestShade, 0.5)
        )};
      }
    }
  `,
});

export const euiTourBeaconStyles = ({ euiTheme }: UseEuiTheme) => {
  const arrowSize = euiTheme.size[popoverArrowSize];
  const arrowSizeInt = parseInt(arrowSize, 10);

  return {
    // Base
    euiTourBeacon: css`
      pointer-events: none;
      position: absolute;
      opacity: 0;
      transition: opacity 0s ${euiTheme.animation.slow}; // delay time equals EuiPopover animation time
    `,

    // Positions
    right: css`
      ${logicalCSS('top', `${arrowSizeInt / 2}px`)};
      ${logicalCSS('left', `${arrowSizeInt * -2}px`)};
    `,
    left: css`
      ${logicalCSS('top', `${arrowSizeInt / 2}px`)};
      ${logicalCSS('left', arrowSize)};
    `,
    top: css`
      ${logicalCSS('top', arrowSize)};
      ${logicalCSS('left', `${arrowSizeInt / 2}px`)};
    `,
    bottom: css`
      ${logicalCSS('top', `${arrowSizeInt * -2}px`)};
      ${logicalCSS('left', `${arrowSizeInt / 2}px`)};
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
    // Removes extra margin applied to siblint EuiTitle's
    ${logicalCSS('margin-top', 0)};
  `,
  euiTourHeader__subtitle: css`
    color: ${euiTheme.colors.subduedText};
  `,
});

export const euiTourFooterStyles = ({ euiTheme, colorMode }: UseEuiTheme) => ({
  // Base
  euiTourFooter: css`
    background-color: ${colorMode === COLOR_MODES_STANDARD.dark
      ? shade(euiTheme.colors.lightestShade, 0.45)
      : tint(euiTheme.colors.lightestShade, 0.5)};
    ${logicalCSS('border-bottom-left-radius', euiTheme.border.radius.medium)};
    ${logicalCSS('border-bottom-right-radius', euiTheme.border.radius.medium)};
  `,
});
