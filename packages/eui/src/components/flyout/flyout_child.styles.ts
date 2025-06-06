/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { css } from '@emotion/react';
import { UseEuiTheme } from '../../services';
import {
  logicalCSS,
  logicalCSSWithFallback,
  euiYScrollWithShadows,
  euiMinBreakpoint,
  highContrastModeStyles,
} from '../../global_styling';

export const euiFlyoutChildStyles = (euiThemeContext: UseEuiTheme) => {
  const { euiTheme } = euiThemeContext;
  return {
    // Base styles for the child flyout
    euiFlyoutChild: css`
      position: absolute;
      inset-block-start: 0; // Top edge aligns with parent's top
      inset-inline-start: 0; // Left edge aligns with parent's left edge initially
      block-size: 100%; // Full height of parent
      background: ${euiTheme.colors.backgroundBaseSubdued};
      display: flex;
      flex-direction: column;
      ${logicalCSSWithFallback('overflow-y', 'hidden')}
      ${logicalCSS('height', '100%')}
      z-index: ${Number(euiTheme.levels.flyout) + 1};
      transition: transform ${euiTheme.animation.normal} ease,
        width ${euiTheme.animation.normal} ease;
      border-inline-start: ${euiTheme.border.thin};
    `,

    // Position variants based on screen size
    sidePosition: css`
      // This style is applied when screen width > 'm' breakpoint
      transform: translateX(-100%); // Shift left by its own width
      border-inline-end: ${euiTheme.border.thin};
    `,
    stackedPosition: css`
      // This style is applied when screen width < 'm' breakpoint
      inset-inline-end: 0; // Takes full width of parent (effectively)
      inline-size: 100%; // Occupy full width of parent
      border-block-end: ${euiTheme.border.thin};
    `,

    // Size variants (these define the width of the child, which translateX(-100%) then uses)
    s: css`
      // On large screens, width matches parent 's' max-width.
      // On small (stacked), it's 100% (from stackedPosition).
      ${euiMinBreakpoint(euiThemeContext, 'm')} {
        inline-size: ${Math.round(euiTheme.breakpoint.s * 0.7)}px;
      }
    `,
    m: css`
      // On large screens, width matches parent 'm' max-width.
      // On small (stacked), it's 100%.
      ${euiMinBreakpoint(euiThemeContext, 'm')} {
        inline-size: ${euiTheme.breakpoint.m}px;
      }
    `,

    euiFlyoutChild__closeButton: css`
      position: absolute;
      inset-block-start: ${euiTheme.size.s};
      inset-inline-end: ${euiTheme.size.s};
      z-index: 1;
    `,

    overflow: {
      euiFlyoutChild__overflow: css`
        flex-grow: 1;
        ${logicalCSS('min-height', 0)}
        display: flex;
        flex-direction: column;
      `,
      noBanner: css`
        ${euiYScrollWithShadows(euiThemeContext)}
      `,
      hasBanner: css`
        ${euiYScrollWithShadows(euiThemeContext, { side: 'end' })}
      `,
    },
    euiFlyoutChild__banner: css`
      ${logicalCSSWithFallback('overflow-x', 'hidden')}
      ${highContrastModeStyles(euiThemeContext, {
        preferred: logicalCSS('border-bottom', euiTheme.border.thin),
      })}
    `,
    euiFlyoutChild__overflowContent: css`
      display: flex;
      flex-direction: column;
      flex-grow: 1;
      ${logicalCSS('min-height', 0)}
      ${logicalCSS('width', '100%')}
      ${logicalCSS('overflow-x', 'auto')}
    `,
  };
};
