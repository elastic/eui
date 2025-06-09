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
  highContrastModeStyles,
} from '../../global_styling';

export const euiFlyoutChildStyles = (
  euiThemeContext: UseEuiTheme,
  stackingBreakpointValue: number,
  sideBySideWidth: string
) => {
  const { euiTheme } = euiThemeContext;
  return {
    // Base styles for the child flyout
    euiFlyoutChild: css`
      position: absolute;
      inset-block-start: 0;
      inset-inline-start: 0;
      block-size: 100%;
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
      transform: translateX(-100%);
      border-inline-end: ${euiTheme.border.thin};
    `,
    stackedPosition: css`
      inset-inline-end: 0;
      inline-size: 100%;
      border-block-end: ${euiTheme.border.thin};
    `,

    // Dynamic style for side-by-side width using passed vw value
    sizeVariant: css`
      @media (min-width: ${stackingBreakpointValue}px) {
        inline-size: ${sideBySideWidth};
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
