/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { css, keyframes } from '@emotion/react';
import { euiShadow } from '@elastic/eui-theme-common';

import { logicalCSS, euiFontSize, euiCanAnimate } from '../../global_styling';
import { UseEuiTheme } from '../../services';
import { _popoverArrowStyles } from '../../services/popover';
import { euiPanelBorderStyles } from '../panel/panel.styles';

export const euiToolTipBackgroundColor = (euiTheme: UseEuiTheme['euiTheme']) =>
  euiTheme.components.tooltipBackground;

export const euiToolTipBorderColor = (euiTheme: UseEuiTheme['euiTheme']) =>
  euiTheme.components.tooltipBorder;

const euiToolTipAnimationVertical = (size: string) => keyframes`
    0% {
        opacity: 0;
        transform: translateY(${size});
    }

    100% {
        opacity: 1;
        transform: translateY(0);
    }
`;

const euiToolTipAnimationHorizontal = (size: string) => keyframes`
    0% {
        opacity: 0;
        transform: translateX(${size});
    }

    100% {
        opacity: 1;
        transform: translateX(0);
    }
`;

export const euiToolTipStyles = (euiThemeContext: UseEuiTheme) => {
  const { euiTheme, highContrastMode } = euiThemeContext;

  const hasShadow = !highContrastMode;
  const animationTiming = `${euiTheme.animation.slow} ease-out 0s forwards`;

  const arrowSize = euiTheme.size.m;
  const arrowStyles = _popoverArrowStyles(euiThemeContext, arrowSize);

  return {
    // Base
    euiToolTip: css`
      ${hasShadow ? euiShadow(euiThemeContext) : ''}
      border-radius: ${euiTheme.border.radius.medium};
      background-color: ${euiToolTipBackgroundColor(euiTheme)};
      color: ${euiTheme.colors.ghost};
      z-index: ${euiTheme.levels.toast};
      ${logicalCSS('max-width', '256px')}
      overflow-wrap: break-word;
      padding: ${euiTheme.size.s};
      ${euiFontSize(euiThemeContext, 's')}

      position: absolute;

      ${euiPanelBorderStyles(euiThemeContext)}

      [class*='euiHorizontalRule'] {
        background-color: ${euiToolTipBorderColor(euiTheme)};
      }
    `,
    // Sizes
    s: css`
      ${euiFontSize(euiThemeContext, 'xs')}
    `,
    // Positions
    top: css`
      ${euiCanAnimate} {
        animation: ${euiToolTipAnimationVertical(`-${euiTheme.size.base}`)}
          ${animationTiming};
      }
    `,
    bottom: css`
      ${euiCanAnimate} {
        animation: ${euiToolTipAnimationVertical(euiTheme.size.base)}
          ${animationTiming};
      }
    `,
    left: css`
      ${euiCanAnimate} {
        animation: ${euiToolTipAnimationHorizontal(`-${euiTheme.size.base}`)}
          ${animationTiming};
      }
    `,
    right: css`
      ${euiCanAnimate} {
        animation: ${euiToolTipAnimationHorizontal(euiTheme.size.base)}
          ${animationTiming};
      }
    `,
    // Arrow
    euiToolTip__arrow: css`
      ${arrowStyles._arrowStyles}
      background-color: inherit;
    `,
    arrowPositions: arrowStyles.positions,
    // Title
    euiToolTip__title: css`
      font-weight: ${euiTheme.font.weight.bold};
      ${logicalCSS(
        'border-bottom',
        `solid ${euiTheme.border.width.thin} ${euiToolTipBorderColor(euiTheme)}`
      )}
      ${logicalCSS('padding-bottom', euiTheme.size.xs)}
      ${logicalCSS('margin-bottom', euiTheme.size.xs)}
    `,
  };
};

export const euiToolTipAnchorStyles = () => ({
  // Elements
  euiToolTipAnchor: css`
    /* Disabled elements don't fire mouse events, which means leaving a disabled element
       wouldn't trigger the onMouseOut and hide the tooltip. Disabling pointer events
       on disabled elements means any mouse events remain handled by parent elements
       https://jakearchibald.com/2017/events-and-disabled-form-fields/ */
    *[disabled] {
      pointer-events: none;
    }
  `,
  // Variants
  block: css`
    display: block;
  `,
  inlineBlock: css`
    display: inline-block;
  `,
});
