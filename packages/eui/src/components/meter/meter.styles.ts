/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { css } from '@emotion/react';
import {
  euiFontSize,
  euiTextTruncate,
  highContrastModeStyles,
  logicalCSS,
  logicalTextAlignCSS,
  preventForcedColors,
} from '../../global_styling';
import { makeHighContrastColor, UseEuiTheme } from '../../services';
import { euiText } from '../text/text.styles';

/**
 * Sets the fill bar color directly on ::before.
 * EuiMeter always renders its bar via ::before (never a native element),
 * so color application is simpler than EuiProgress which supports native <progress>.
 */
const euiMeterBarColor = (color: string) => css`
  &::before {
    background-color: ${color};
  }
`;

/**
 * Emotion styles
 */
export const euiMeterStyles = (euiThemeContext: UseEuiTheme) => {
  const { euiTheme, highContrastMode } = euiThemeContext;
  const backgroundColor = highContrastMode
    ? euiTheme.colors.emptyShade
    : euiTheme.colors.lightShade;

  return {
    euiMeter: css`
      --euiMeterBackgroundColor: ${backgroundColor};

      background-color: var(--euiMeterBackgroundColor);
      overflow: hidden;

      &::before {
        position: absolute;
        content: '';
      }

      ${highContrastModeStyles(euiThemeContext, {
        preferred: `
          border: ${euiTheme.border.thin};
        `,
      })}
    `,
    // Sizes
    _sharedSizeCSS: (size: string) => `
      ${logicalCSS('height', size)}
      border-radius: ${euiTheme.size.s};
    `,
    get xs() {
      return css(
        // Increased visibility/size for high contrast modes
        this._sharedSizeCSS(
          highContrastMode ? euiTheme.size.xs : euiTheme.size.xxs
        )
      );
    },
    get s() {
      return css(this._sharedSizeCSS(euiTheme.size.xs));
    },
    get m() {
      return css(this._sharedSizeCSS(euiTheme.size.s));
    },
    get l() {
      return css(this._sharedSizeCSS(euiTheme.size.m));
    },
    // Positioning
    fixed: css`
      position: fixed;
      z-index: ${Number(euiTheme.levels.header) + 1};
      ${logicalCSS('top', 0)}
      ${logicalCSS('left', 0)}
      ${logicalCSS('right', 0)}
      background-color: transparent;
    `,
    absolute: css`
      position: absolute;
      ${logicalCSS('top', 0)}
      ${logicalCSS('left', 0)}
      ${logicalCSS('right', 0)}
      background-color: transparent;
      ${logicalCSS('border-top-left-radius', 'inherit')}
      ${logicalCSS('border-top-right-radius', 'inherit')}
    `,
    static: css`
      position: relative;
    `,
    fill: css`
      &::before {
        ${logicalCSS('top', 0)}
        ${logicalCSS('bottom', 0)}
        ${logicalCSS('left', 'var(--euiMeterBarStart, 0%)')}
        ${logicalCSS('width', 'var(--euiMeterBarWidth, 0%)')}
        background-color: currentColor;
        border-start-start-radius: var(--euiMeterBarStartRadius);
        border-end-start-radius: var(--euiMeterBarStartRadius);
        border-start-end-radius: var(--euiMeterBarEndRadius);
        border-end-end-radius: var(--euiMeterBarEndRadius);
        outline: ${euiTheme.border.width.thin} solid
          ${highContrastMode
            ? euiTheme.border.color
            : euiTheme.colors.backgroundBasePlain};

        ${preventForcedColors(euiThemeContext)}
      }
    `,
    // Custom colors are set via the element's inline `color` style and
    // picked up by `currentColor` in the fill::before background-color.
    primary: euiMeterBarColor(euiTheme.colors.primary),
    success: euiMeterBarColor(euiTheme.colors.success),
    warning: euiMeterBarColor(euiTheme.colors.warning),
    danger: euiMeterBarColor(euiTheme.colors.danger),
    subdued: euiMeterBarColor(euiTheme.colors.textSubdued),
    accent: euiMeterBarColor(euiTheme.colors.accent),
    accentSecondary: euiMeterBarColor(euiTheme.colors.accentSecondary),
    vis0: euiMeterBarColor(euiTheme.colors.vis.euiColorVis0),
    vis1: euiMeterBarColor(euiTheme.colors.vis.euiColorVis1),
    vis2: euiMeterBarColor(euiTheme.colors.vis.euiColorVis2),
    vis3: euiMeterBarColor(euiTheme.colors.vis.euiColorVis3),
    vis4: euiMeterBarColor(euiTheme.colors.vis.euiColorVis4),
    vis5: euiMeterBarColor(euiTheme.colors.vis.euiColorVis5),
    vis6: euiMeterBarColor(euiTheme.colors.vis.euiColorVis6),
    vis7: euiMeterBarColor(euiTheme.colors.vis.euiColorVis7),
    vis8: euiMeterBarColor(euiTheme.colors.vis.euiColorVis8),
    vis9: euiMeterBarColor(euiTheme.colors.vis.euiColorVis9),
    gradient: css`
      /* container-type lets 100cqi inside ::before always resolve to the
         track's full inline size, anchoring the gradient to the track width
         so the fill bar reveals a portion of it rather than stretching it. */
      container-type: inline-size;

      &::before {
        background: var(--euiMeterGradient);
        background-size: 100cqi 100%;
        background-repeat: no-repeat;
        background-position-x: left var(--euiMeterGradientOffset, 0);
        background-position-y: center;
      }
    `,
  };
};

/**
 * Data styles
 */
export const euiMeterDataStyles = (euiThemeContext: UseEuiTheme) => ({
  euiMeter__data: css`
    display: flex;
    justify-content: space-between;
    gap: ${euiThemeContext.euiTheme.size.xs};
    ${euiText(euiThemeContext.euiTheme)}
    ${euiFontSize(euiThemeContext, 'xs')}
  `,
  // Sizes
  l: css`
    ${euiFontSize(euiThemeContext, 's')}
  `,
});

export const euiMeterLabelStyles = {
  euiMeter__label: css`
    flex-grow: 1;
    ${euiTextTruncate()}
  `,
};

export const euiMeterValueTextStyles = ({ euiTheme }: UseEuiTheme) => ({
  euiMeter__valueText: css`
    flex-grow: 1;
    flex-shrink: 0;
    font-feature-settings: 'tnum' 1; /* Tabular numbers ensure the line up nicely when right-aligned */
    ${logicalTextAlignCSS('right')}
    ${euiTextTruncate()}
  `,
  // Colors
  primary: css`
    color: ${euiTheme.colors.textPrimary};
  `,
  success: css`
    color: ${euiTheme.colors.textSuccess};
  `,
  warning: css`
    color: ${euiTheme.colors.textWarning};
  `,
  danger: css`
    color: ${euiTheme.colors.textDanger};
  `,
  subdued: css`
    color: ${euiTheme.colors.textSubdued};
  `,
  accent: css`
    color: ${euiTheme.colors.textAccent};
  `,
  accentSecondary: css`
    color: ${euiTheme.colors.textAccentSecondary};
  `,
  vis0: css`
    color: ${makeHighContrastColor(euiTheme.colors.vis.euiColorVis0)(euiTheme)};
  `,
  vis1: css`
    color: ${makeHighContrastColor(euiTheme.colors.vis.euiColorVis1)(euiTheme)};
  `,
  vis2: css`
    color: ${makeHighContrastColor(euiTheme.colors.vis.euiColorVis2)(euiTheme)};
  `,
  vis3: css`
    color: ${makeHighContrastColor(euiTheme.colors.vis.euiColorVis3)(euiTheme)};
  `,
  vis4: css`
    color: ${makeHighContrastColor(euiTheme.colors.vis.euiColorVis4)(euiTheme)};
  `,
  vis5: css`
    color: ${makeHighContrastColor(euiTheme.colors.vis.euiColorVis5)(euiTheme)};
  `,
  vis6: css`
    color: ${makeHighContrastColor(euiTheme.colors.vis.euiColorVis6)(euiTheme)};
  `,
  vis7: css`
    color: ${makeHighContrastColor(euiTheme.colors.vis.euiColorVis7)(euiTheme)};
  `,
  vis8: css`
    color: ${makeHighContrastColor(euiTheme.colors.vis.euiColorVis8)(euiTheme)};
  `,
  vis9: css`
    color: ${makeHighContrastColor(euiTheme.colors.vis.euiColorVis9)(euiTheme)};
  `,
  customColor: css`
    color: currentColor;
  `,
});
