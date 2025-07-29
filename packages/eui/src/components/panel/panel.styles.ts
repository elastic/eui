/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { css } from '@emotion/react';
import { euiShadow } from '@elastic/eui-theme-common';

import { UseEuiTheme } from '../../services';
import {
  euiCanAnimate,
  logicalCSS,
  logicalTextAlignCSS,
} from '../../global_styling';
import { highContrastModeStyles } from '../../global_styling/functions/high_contrast';

export const euiPanelBorderStyles = (
  euiThemeContext: UseEuiTheme,
  options?: {
    borderColor?: string;
  }
) => {
  const { euiTheme } = euiThemeContext;
  const { borderColor = euiTheme.border.color } = options ?? {};

  return /*css*/ `
    &::after {
      content: '';
      position: absolute;
      /* ensure to keep on top of flush content */
      z-index: 0;
      inset: 0;
      border: ${euiTheme.border.width.thin} solid ${borderColor};
      border-radius: inherit;
      pointer-events: none;
    }
  `;
};

export const euiPanelStyles = (euiThemeContext: UseEuiTheme) => {
  const { euiTheme } = euiThemeContext;

  return {
    // Base
    euiPanel: css`
      position: relative;
      flex-grow: 0;
    `,

    grow: css`
      flex-grow: 1;
    `,

    hasShadow: css`
      ${euiShadow(euiThemeContext, 'm')}
    `,

    hasBorder: css`
      ${euiPanelBorderStyles(euiThemeContext)}
    `,

    radius: {
      none: css``,
      m: css`
        border-radius: ${euiTheme.border.radius.medium};
      `,
    },

    // Setup interactive behavior
    isClickable: css`
      ${euiCanAnimate} {
        transition: box-shadow ${euiTheme.animation.fast}
            ${euiTheme.animation.resistance},
          transform ${euiTheme.animation.fast} ${euiTheme.animation.resistance};
      }

      &:enabled {
        /* This is a good selector for buttons since it doesn't exist on divs
           in case of button wrapper which inherently is inline-block and no width */
        display: block;
        ${logicalCSS('width', '100%')}
        ${logicalTextAlignCSS('left')}
      }

      &:hover,
      &:focus {
        ${highContrastModeStyles(euiThemeContext, {
          none: euiShadow(euiThemeContext, 'l'),
          // Windows high contrast themes ignore box-shadows - use a filter workaround instead
          preferred: `
            &:not(.euiPanel--transparent) {
              filter: drop-shadow(0 ${euiTheme.border.width.thick} 0 ${euiTheme.border.color});
            }
          `,
        })}
        transform: translateY(-2px);
        cursor: pointer;
      }
    `,
  };
};
