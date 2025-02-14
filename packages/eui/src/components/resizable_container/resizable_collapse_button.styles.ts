/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { css } from '@emotion/react';
import {
  euiShadowXSmall,
  euiSlightShadowHover,
} from '@elastic/eui-theme-common';

import { UseEuiTheme } from '../../services';
import { logicalCSS, mathWithUnits } from '../../global_styling';

export const euiResizableCollapseButtonStyles = (
  euiThemeContext: UseEuiTheme
) => {
  const { euiTheme } = euiThemeContext;

  const buttonSize = euiTheme.size.l;
  const centeringOffset = mathWithUnits(buttonSize, (x) => x / -2); // Use negative margins instead of transforms to avoid having to override EuiButtonIcon's CSS
  const buttonOffset = euiTheme.size.base;

  return {
    euiResizableCollapseButton: css`
      z-index: 2; /* 1 higher than EuiResizableButton */
      position: absolute;

      /* Remove animation inherited from EuiButtonIcon */
      &:focus {
        animation: none;
      }
    `,
    collapsible: {
      collapsible: css`
        background: ${euiTheme.colors.emptyShade};
        ${euiShadowXSmall(euiThemeContext)}

        &:focus {
          ${euiSlightShadowHover(euiThemeContext)}
        }
      `,
      horizontal: {
        after: css`
          ${logicalCSS('right', 0)}
          ${logicalCSS('margin-right', centeringOffset)}
        `,
        before: css`
          ${logicalCSS('left', 0)}
          ${logicalCSS('margin-left', centeringOffset)}
        `,
        middle: css`
          ${logicalCSS('top', '50%')}
          ${logicalCSS('margin-top', centeringOffset)}
        `,
        top: css`
          ${logicalCSS('top', 0)}
          ${logicalCSS('margin-top', buttonOffset)}
        `,
        bottom: css`
          ${logicalCSS('bottom', 0)}
          ${logicalCSS('margin-bottom', buttonOffset)}
        `,
        // `left/right` aren't valid positions for the horizontal direction,
        // so we're using getters to fall back to the `middle` CSS
        get left() {
          return this.middle;
        },
        get right() {
          return this.middle;
        },
      },
      vertical: {
        after: css`
          ${logicalCSS('top', '100%')}
          ${logicalCSS('margin-top', centeringOffset)}
        `,
        before: css`
          ${logicalCSS('bottom', '100%')}
          ${logicalCSS('margin-bottom', centeringOffset)}
        `,
        middle: css`
          ${logicalCSS('left', '50%')}
          ${logicalCSS('margin-left', centeringOffset)}
        `,
        left: css`
          ${logicalCSS('left', 0)}
          ${logicalCSS('margin-left', buttonOffset)}
        `,
        right: css`
          ${logicalCSS('right', 0)}
          ${logicalCSS('margin-right', buttonOffset)}
        `,
        // `top/bottom` aren't valid positions for the horizontal direction,
        // so we're using getters to fall back to the `middle` CSS
        get top() {
          return this.middle;
        },
        get bottom() {
          return this.middle;
        },
      },
    },
    collapsed: {
      // When collapsed, the button itself is the full collapsed area
      // and we use flex to align the icon within
      collapsed: css`
        border-radius: 0;
        ${logicalCSS('top', 0)}
      `,
      horizontal: css`
        ${logicalCSS('height', '100%')}
      `,
      vertical: css`
        ${logicalCSS('width', '100%')}
      `,
      horizontalPositions: {
        top: css`
          ${logicalCSS('padding-top', buttonOffset)}
          align-items: flex-start;
        `,
        bottom: css`
          ${logicalCSS('padding-bottom', buttonOffset)}
          align-items: flex-end;
        `,
        middle: css``,
        left: css``,
        right: css``,
      },
      verticalPositions: {
        left: css`
          ${logicalCSS('padding-left', buttonOffset)}
          justify-content: flex-start;
        `,
        right: css`
          ${logicalCSS('padding-right', buttonOffset)}
          justify-content: flex-end;
        `,
        middle: css``,
        top: css``,
        bottom: css``,
      },
    },
  };
};
