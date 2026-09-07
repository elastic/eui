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

const decorClipSize = '9px'; // the height of the decor clip that includes the border rounding
const decorClipPath = `polygon(0 0, 100% 0, 100% ${decorClipSize}, 0 ${decorClipSize})`;
const euiToastAnimation = keyframes`
  from {
    clip-path: ${decorClipPath};
  }
  to {
    clip-path: polygon(0 0, 0% 0, 0% ${decorClipSize}, 0 ${decorClipSize});
  }
`;

const euiToastAnimationRTL = keyframes`
  from {
    clip-path: ${decorClipPath};
  }
  to {
    clip-path: polygon(100% 0, 100% 0, 100% ${decorClipSize}, 100% ${decorClipSize});
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
  const highlightSizeOffset = mathWithUnits([highlightOffset], (x) => x * 2);
  const paddingTop = mathWithUnits(
    [euiTheme.size.base, highlightSize],
    (x, y) => x + y
  );
  const offsetTop = mathWithUnits(
    [euiTheme.size.s, highlightSize],
    (x, y) => x + y
  );

  const decorCommonStyles = `
    content: '';
    position: absolute;
    inset-block-start: 0;
    inset-inline-start: 0;
    block-size: 100%;
    inline-size: 100%;
    border-radius: ${euiTheme.border.radius.panel};
    border-end-start-radius: 0;
    border-block-start: ${highlightSize} solid;
    clip-path: ${decorClipPath};
    pointer-events: none;

    ${highContrastModeStyles(euiThemeContext, {
      preferred: `
        inset-block-start: -${highlightOffset};
      inset-inline-start: -${highlightOffset};
      inline-size: calc(100% + ${highlightSizeOffset});
      `,
    })}
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
      content: '';
      position: absolute;
      inset: 0;
      pointer-events: none;
      ${preventForcedColors(euiThemeContext)}

      ${highContrastModeStyles(euiThemeContext, {
        preferred: `
          --euiToastTypeBackgroundColor: ${euiTheme.colors.borderBasePlain};
        `,
      })}

      &::before {
        ${decorCommonStyles}
        z-index: ${decorLevel};
        border-block-start-color: var(--euiToastTypeBackgroundColor);
      }

      &::after {
        ${decorCommonStyles}
        /* ensure highlight is on top of panel border */
        z-index: ${decorLevel + 1};
        border-block-start-color: var(--euiToastTypeColor);
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
