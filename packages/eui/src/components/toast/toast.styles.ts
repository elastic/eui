/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { css, keyframes } from '@emotion/react';
import {
  euiCanAnimate,
  euiShadowLarge,
  mathWithUnits,
} from '@elastic/eui-theme-common';

import { euiTextBreakWord, logicalCSS } from '../../global_styling';
import {
  highContrastModeStyles,
  preventForcedColors,
} from '../../global_styling/functions/high_contrast';
import { UseEuiTheme } from '../../services';
import { euiTitle } from '../title/title.styles';
import { euiPanelBorderStyles } from '../panel/panel.styles';

const TEXT_MAX_WIDTH = 1200;
const CONTAINER_NAME = 'euiToast';
const CQC_BREAKPOINT_NARROWEST = '(max-width: 320px)';

// Shrinks the highlight from the inline-end. The decor's radius clips the bar,
// so these insets only change its length.
const euiToastAnimation = keyframes`
  from {
    clip-path: inset(0 0 0 0);
  }
  to {
    clip-path: inset(0 100% 0 0);
  }
`;

const euiToastAnimationRTL = keyframes`
  from {
    clip-path: inset(0 0 0 0);
  }
  to {
    clip-path: inset(0 0 0 100%);
  }
`;

export const euiToastStyles = (euiThemeContext: UseEuiTheme) => {
  const { euiTheme, highContrastMode } = euiThemeContext;

  const borderRadius = euiTheme.border.radius.panel;
  const decorLevel = Number(euiTheme.levels.content) + 1;
  const highlightSize = mathWithUnits(
    [euiTheme.border.width.thin, euiTheme.border.width.thick],
    (x, y) => (highContrastMode ? x * 2 + y : x + y)
  );
  const highlightOffset = euiTheme.border.width.thin;
  const paddingTop = mathWithUnits(
    [euiTheme.size.base, highlightSize],
    (x, y) => x + y
  );
  const offsetTop = mathWithUnits(
    [euiTheme.size.s, highlightSize],
    (x, y) => x + y
  );

  // Straight bar. The decor clips it to the toast radius so the ends follow
  // the corner curve instead of a border stroke finishing in a sharp point.
  const decorCommonStyles = `
    content: '';
    position: absolute;
    inset-block-start: 0;
    inset-inline-start: 0;
    inline-size: 100%;
    block-size: ${highlightSize};
    pointer-events: none;
  `;

  return {
    // Base
    euiToast: css`
      container-type: inline-size;
      container-name: ${CONTAINER_NAME};
      position: relative;
      border-radius: ${borderRadius};
      ${euiShadowLarge(euiThemeContext, { borderAllInHighContrastMode: true })}

      ${logicalCSS('padding-top', paddingTop)}
      ${logicalCSS('padding-bottom', euiTheme.size.base)}
      ${logicalCSS('padding-horizontal', euiTheme.size.base)}
      background-color: ${euiTheme.colors.backgroundBasePlain};
      ${logicalCSS('width', '100%')}

      ${euiTextBreakWord()} /* Prevent long lines from overflowing */
      ${euiPanelBorderStyles(euiThemeContext)}
    `,
    decor: css`
      position: absolute;
      inset: 0;
      border-radius: ${borderRadius};
      overflow: hidden;
      pointer-events: none;
      ${preventForcedColors(euiThemeContext)}

      ${highContrastModeStyles(euiThemeContext, {
        preferred: `
          --euiToastTypeBackgroundColor: ${euiTheme.colors.borderBasePlain};
          /* Cover the high contrast border so the clip matches its outer radius */
          inset-block-start: -${highlightOffset};
          inset-inline-start: -${highlightOffset};
          inset-inline-end: -${highlightOffset};
        `,
      })}

      &::before {
        ${decorCommonStyles}
        z-index: ${decorLevel};
        background-color: var(--euiToastTypeBackgroundColor);
      }

      &::after {
        ${decorCommonStyles}
        /* ensure highlight is on top of panel border */
        z-index: ${decorLevel + 1};
        background-color: var(--euiToastTypeColor);
      }
    `,
    // handles content + actions layout
    wrapper: css`
      display: flex;
      flex-direction: column;
      gap: ${euiTheme.size.m};
      inline-size: 100%;
    `,
    // handles icon + text layout
    body: css`
      display: flex;
      flex-direction: row;
      align-self: center;
      gap: ${euiTheme.size.m};
      inline-size: 100%;
    `,
    // handles text layout
    content: css`
      display: flex;
      flex-direction: column;
      gap: ${euiTheme.size.xs};
      align-self: center;
      inline-size: 100%;
      max-inline-size: ${TEXT_MAX_WIDTH}px;

      .euiToast__text + .euiToast__additionalContent {
        ${logicalCSS('margin-top', euiTheme.size.s)}
      }
    `,
    text: css`
      display: flex;
      flex-direction: column;
      gap: ${euiTheme.size.xs};
    `,
    icon: css`
      grid-area: icon;
      position: relative;
      ${logicalCSS('margin-vertical', euiTheme.size.xxs)}
    `,
    actions: css`
      grid-area: actions;
      display: flex;
      gap: ${euiTheme.size.s};
      ${logicalCSS('margin-left', euiTheme.size.xl)}

      /* uses container query directly as it should apply generically independent of size */
      @container ${CONTAINER_NAME} ${CQC_BREAKPOINT_NARROWEST} {
        flex-wrap: wrap;

        /* use full width actions */
        > * {
          inline-size: 100%;
        }
      }
    `,
    dismissButton: css`
      position: absolute;
      ${logicalCSS('top', offsetTop)};
      ${logicalCSS('right', euiTheme.size.s)}
    `,

    hasAnimation: css`
      &::after {
        ${euiCanAnimate} {
          will-change: clip-path;
          animation: ${euiToastAnimation} var(--euiToastAnimationMs) linear
            forwards;

          [dir='rtl'] & {
            animation: ${euiToastAnimationRTL} var(--euiToastAnimationMs) linear
              forwards;
          }
        }
      }
    `,
  };
};

export const euiToastHeaderStyles = (euiThemeContext: UseEuiTheme) => {
  const { euiTheme } = euiThemeContext;
  return {
    // Base
    euiToastHeader: css`
      display: flex;
      /* Align icon with first line of title text if it wraps */
      align-items: baseline;
      ${euiTitle(euiThemeContext, 'xs')}
      font-weight: ${euiTheme.font.weight.bold};
    `,
    hasDismissButton: css`
      padding-inline-end: ${euiTheme.size.l};
    `,
  };
};
