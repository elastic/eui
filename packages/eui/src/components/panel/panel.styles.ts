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

export const euiPanelStyles = (euiThemeContext: UseEuiTheme) => {
  const { euiTheme } = euiThemeContext;

  const borderStyle = `
    position: relative;

    /* Using a pseudo element for the border instead of floating border only 
      because the transparent border might otherwise be visible with arbitrary 
      full-width/height content in light mode. */
    ::before {
      content: '';
      position: absolute;
      inset: 0;
      border: ${euiTheme.border.width.thin} solid
        ${euiTheme.colors.borderBaseFloating};
      border-radius: inherit;
      pointer-events: none;
    }
  `;

  return {
    // Base
    euiPanel: css`
      flex-grow: 0;
    `,

    grow: css`
      flex-grow: 1;
    `,

    hasShadow: css`
      ${euiShadow(euiThemeContext, 'm')}

      ${borderStyle}
    `,

    hasBorder: css`
      border: ${euiTheme.border.thin};
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
        ${euiShadow(euiThemeContext, 'l')}
        transform: translateY(-2px);
        cursor: pointer;
      }
    `,
  };
};
