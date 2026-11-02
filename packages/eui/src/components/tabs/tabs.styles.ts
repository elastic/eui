/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { css } from '@emotion/react';
import {
  logicalCSS,
  logicalCSSWithFallback,
  euiCanAnimate,
} from '../../global_styling';
import { highContrastModeStyles } from '../../global_styling/functions/high_contrast';
import { UseEuiTheme } from '../../services';

export const euiTabsStyles = (euiThemeContext: UseEuiTheme) => {
  const { euiTheme } = euiThemeContext;

  return {
    euiTabs: css`
      display: flex;
      ${logicalCSS('max-width', '100%')}
      ${logicalCSSWithFallback('overflow-x', 'auto')}
      ${logicalCSSWithFallback('overflow-y', 'hidden')}
      position: relative;
      flex-shrink: 0;
    `,
    bottomBorder: css`
      ${highContrastModeStyles(euiThemeContext, {
        none: `box-shadow: inset 0 -${euiTheme.border.width.thin} 0 ${euiTheme.border.color};`,
        forced: logicalCSS('border-bottom', euiTheme.border.thin),
      })}
    `,
    // sizes
    s: css`
      gap: ${euiTheme.size.m};
    `,
    m: css`
      gap: ${euiTheme.size.base};
    `,
    l: css`
      gap: ${euiTheme.size.l};
    `,
    // One underline for the whole list. Each tab's own ::after is hidden.
    // `left` stays physical because the transform is measured from that edge.
    euiTabs__indicator: css`
      position: absolute;
      left: 0;
      ${logicalCSS('bottom', 0)}
      ${logicalCSS('height', '2px')}
      background-color: ${euiTheme.colors.primary};
      border-radius: 2px;
      opacity: 0;
      pointer-events: none;
      z-index: 1;

      ${euiCanAnimate} {
        transition: transform ${euiTheme.animation.slow}
            ${euiTheme.animation.resistance},
          width ${euiTheme.animation.slow} ${euiTheme.animation.resistance};
      }

      &[data-disabled] {
        background-color: ${euiTheme.colors.textDisabled};
      }
    `,
    hideTabUnderline: css`
      .euiTab::after {
        content: none;
      }
    `,
  };
};
