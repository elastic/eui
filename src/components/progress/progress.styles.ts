/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { css, keyframes } from '@emotion/react';
import {
  logicalCSS,
  logicalTextAlignCSS,
  euiCantAnimate,
  euiFontSize,
  euiTextTruncate,
} from '../../global_styling';
import {
  UseEuiTheme,
  euiPaletteColorBlind,
  makeHighContrastColor,
} from '../../services';
import { euiText } from '../text/text.styles';

/**
 * DRY utilities for native/determinate progress components vs non-native indeterminate
 */
const crossBrowserProgressValue = (cssProperties: string) => `
  &::-webkit-progress-value {
    ${cssProperties}
  }
  &::-moz-progress-bar {
    ${cssProperties}
  }
`;
const indeterminateProgressValue = (cssProperties: string) => `
  &::before {
    ${cssProperties}
  }
`;

/**
 * Color utilities
 */
const visColors = euiPaletteColorBlind();

const nativeVsIndeterminateColor = (color: string, isNative: boolean) => {
  const selectors = isNative
    ? crossBrowserProgressValue
    : indeterminateProgressValue;
  return selectors(`background-color: ${color};`);
};

/**
 * DRY utils for non-static positions
 */
const nonStaticPositioning = (isNative: boolean) => `
  ${logicalCSS('top', 0)}
  ${logicalCSS('left', 0)}
  ${logicalCSS('right', 0)}
  background-color: transparent;
  ${
    isNative
      ? `
      &::-webkit-progress-bar {
        background-color: transparent;
      }`
      : ''
  }
`;

/**
 * Animations
 */
const euiIndeterminateAnimation = keyframes`
  0% {
    transform: scaleX(1) translateX(-100%);
  }
  100% {
    transform: scaleX(1) translateX(100%);
  }
`;

/**
 * Emotion styles
 */
export const euiProgressStyles = (
  { euiTheme }: UseEuiTheme,
  isNative: boolean
) => ({
  euiProgress: css`
    overflow: hidden;
    background-color: ${euiTheme.colors.lightShade};
  `,
  // https://css-tricks.com/html5-progress-element/
  // Good resource if you need to work in here. There's some gotchas with
  // dealing with cross-browser progress bars.
  native: css`
    display: block;
    ${logicalCSS('width', '100%')}
    appearance: none;
    border: none;
    border-radius: ${euiTheme.size.s};

    &::-webkit-progress-bar {
      background-color: ${euiTheme.colors.lightShade};
    }

    ${crossBrowserProgressValue(
      'transition: width ${euiTheme.animation.normal} linear;'
    )}
  `,
  // An indeterminate bar has an unreliable end time. Because of a Firefox animation issue,
  // we apply this style to a <div> instead of a <progress> element.
  // See https://css-tricks.com/html5-progress-element/ for more info.
  indeterminate: css`
    &::before {
      position: absolute;
      content: '';
      ${logicalCSS('width', '100%')}
      ${logicalCSS('top', 0)}
      ${logicalCSS('bottom', 0)}
      ${logicalCSS('left', 0)}
      transform: scaleX(0) translateX(0%);
      animation: ${euiIndeterminateAnimation} 1s
        ${euiTheme.animation.resistance} infinite;

      ${euiCantAnimate} {
        animation-duration: 2s;
        animation-timing-function: linear;
      }
    }
  `,
  // Sizes
  xs: css`
    ${logicalCSS('height', euiTheme.size.xxs)}
  `,
  s: css`
    ${logicalCSS('height', euiTheme.size.xs)}
  `,
  m: css`
    ${logicalCSS('height', euiTheme.size.s)}
  `,
  l: css`
    ${logicalCSS('height', euiTheme.size.m)}
  `,
  // Positioning
  fixed: css`
    position: fixed;
    z-index: ${Number(euiTheme.levels.header) + 1};
    ${nonStaticPositioning(isNative)}
  `,
  absolute: css`
    position: absolute;
    ${nonStaticPositioning(isNative)}
  `,
  static: css`
    position: relative;
  `,
  // Colors
  primary: css`
    ${nativeVsIndeterminateColor(euiTheme.colors.primary, isNative)}
  `,
  success: css`
    ${nativeVsIndeterminateColor(euiTheme.colors.success, isNative)}
  `,
  warning: css`
    ${nativeVsIndeterminateColor(euiTheme.colors.warning, isNative)}
  `,
  danger: css`
    ${nativeVsIndeterminateColor(euiTheme.colors.danger, isNative)}
  `,
  subdued: css`
    ${nativeVsIndeterminateColor(euiTheme.colors.subduedText, isNative)}
  `,
  accent: css`
    ${nativeVsIndeterminateColor(euiTheme.colors.accent, isNative)}
  `,
  vis0: css`
    ${nativeVsIndeterminateColor(visColors[0], isNative)}
  `,
  vis1: css`
    ${nativeVsIndeterminateColor(visColors[1], isNative)}
  `,
  vis2: css`
    ${nativeVsIndeterminateColor(visColors[2], isNative)}
  `,
  vis3: css`
    ${nativeVsIndeterminateColor(visColors[3], isNative)}
  `,
  vis4: css`
    ${nativeVsIndeterminateColor(visColors[4], isNative)}
  `,
  vis5: css`
    ${nativeVsIndeterminateColor(visColors[5], isNative)}
  `,
  vis6: css`
    ${nativeVsIndeterminateColor(visColors[6], isNative)}
  `,
  vis7: css`
    ${nativeVsIndeterminateColor(visColors[7], isNative)}
  `,
  vis8: css`
    ${nativeVsIndeterminateColor(visColors[8], isNative)}
  `,
  vis9: css`
    ${nativeVsIndeterminateColor(visColors[9], isNative)}
  `,
  customColor: css`
    ${nativeVsIndeterminateColor('currentColor', isNative)}
  `,
});

/**
 * Data styles
 */
export const euiProgressDataStyles = (euiThemeContext: UseEuiTheme) => ({
  euiProgress__data: css`
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

export const euiProgressLabelStyles = {
  euiProgress__label: css`
    flex-grow: 1;
    ${euiTextTruncate()}
  `,
};

export const euiProgressValueTextStyles = ({ euiTheme }: UseEuiTheme) => ({
  euiProgress__valueText: css`
    flex-grow: 1;
    flex-shrink: 0;
    font-feature-settings: 'tnum' 1; /* Tabular numbers ensure the line up nicely when right-aligned */
    ${logicalTextAlignCSS('right')}
    ${euiTextTruncate()}
  `,
  // Colors
  primary: css`
    color: ${euiTheme.colors.primaryText};
  `,
  success: css`
    color: ${euiTheme.colors.successText};
  `,
  warning: css`
    color: ${euiTheme.colors.warningText};
  `,
  danger: css`
    color: ${euiTheme.colors.dangerText};
  `,
  subdued: css`
    color: ${euiTheme.colors.subduedText};
  `,
  accent: css`
    color: ${euiTheme.colors.accentText};
  `,
  vis0: css`
    color: ${makeHighContrastColor(visColors[0])(euiTheme)};
  `,
  vis1: css`
    color: ${makeHighContrastColor(visColors[1])(euiTheme)};
  `,
  vis2: css`
    color: ${makeHighContrastColor(visColors[2])(euiTheme)};
  `,
  vis3: css`
    color: ${makeHighContrastColor(visColors[3])(euiTheme)};
  `,
  vis4: css`
    color: ${makeHighContrastColor(visColors[4])(euiTheme)};
  `,
  vis5: css`
    color: ${makeHighContrastColor(visColors[5])(euiTheme)};
  `,
  vis6: css`
    color: ${makeHighContrastColor(visColors[6])(euiTheme)};
  `,
  vis7: css`
    color: ${makeHighContrastColor(visColors[7])(euiTheme)};
  `,
  vis8: css`
    color: ${makeHighContrastColor(visColors[8])(euiTheme)};
  `,
  vis9: css`
    color: ${makeHighContrastColor(visColors[9])(euiTheme)};
  `,
  customColor: css`
    color: currentColor;
  `,
});
