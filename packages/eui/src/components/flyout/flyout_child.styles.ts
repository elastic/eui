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
  highContrastModeStyles,
  euiYScroll,
} from '../../global_styling';
import { composeFlyoutSizing, maxedFlyoutWidth } from './flyout.styles';

export const euiFlyoutChildStyles = (euiThemeContext: UseEuiTheme) => {
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
      border-inline-start: ${euiTheme.border.thin};

      ${maxedFlyoutWidth(euiThemeContext)}
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

    s: css`
      ${composeFlyoutSizing(euiThemeContext, 's')}
    `,

    m: css`
      ${composeFlyoutSizing(euiThemeContext, 'm')}
    `,

    closeButton: css`
      position: absolute;
      inset-block-start: ${euiTheme.size.s};
      inset-inline-end: ${euiTheme.size.s};
      z-index: 1;
    `,

    overflow: {
      overflow: css`
        flex-grow: 1;
        display: flex;
        flex-direction: column;
        ${euiYScroll(euiThemeContext)}
      `,
      wrapper: css`
        display: flex;
        flex-direction: column;
        flex-grow: 1;
        ${logicalCSS('overflow-x', 'auto')}
      `,
    },
    banner: css`
      ${logicalCSSWithFallback('overflow-x', 'hidden')}
      ${highContrastModeStyles(euiThemeContext, {
        preferred: logicalCSS('border-bottom', euiTheme.border.thin),
      })}
    `,
  };
};
