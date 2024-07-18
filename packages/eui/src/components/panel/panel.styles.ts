/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { css } from '@emotion/react';
import { euiShadow } from '../../themes/amsterdam/global_styling/mixins';
import { UseEuiTheme } from '../../services';
import {
  euiCanAnimate,
  logicalCSS,
  logicalTextAlignCSS,
} from '../../global_styling';

export const euiPanelStyles = (euiThemeContext: UseEuiTheme) => {
  const { euiTheme } = euiThemeContext;

  return {
    // Base
    euiPanel: css`
      flex-grow: 0;
      background-color: #fff;
    `,

    grow: css`
      flex-grow: 1;
    `,
    // We're changing shadow to just be a bottom border, this is tricky on white backgrounds though...
    hasShadow: css`
      border-block-end: 1px solid #d0d9e4;
    `,

    // We're keeping the border option
    hasBorder: css`
      border: 1px solid #d0d9e4;
    `,

    // And shrinking the border radius
    radius: {
      none: css``,
      m: css`
        border-radius: 2px;
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
