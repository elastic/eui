/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { css, keyframes } from '@emotion/react';
import { euiShadowFlat } from '@elastic/eui-theme-common';

import { euiCanAnimate } from '../../global_styling';
import { UseEuiTheme } from '../../services';

const euiBottomBarAppear = keyframes`
  0% {
    transform: translateY(100%);
    opacity: 0;
  }

  100% {
    transform: translateY(0%);
    opacity: 1;
  }
`;

export const euiBottomBarStyles = (euiThemeContext: UseEuiTheme) => {
  const { euiTheme } = euiThemeContext;

  return {
    // Base
    // `color` is inherited from the wrapping `EuiThemeProvider colorMode="dark"`
    euiBottomBar: css`
      ${euiShadowFlat(euiThemeContext)}
      background: ${euiTheme.components.bottomBarBackground};
      ${euiCanAnimate} {
        animation: ${euiBottomBarAppear} ${euiTheme.animation.slow}
          ${euiTheme.animation.resistance};
      }
    `,
    static: css``, // Default
    fixed: css`
      position: fixed;
      z-index: ${Number(euiTheme.levels.header) - 2};
    `,
    sticky: css`
      position: sticky;
      z-index: ${Number(euiTheme.levels.header) - 2};
    `,
    // Padding
    s: css`
      padding: ${euiTheme.size.s};
    `,
    m: css`
      padding: ${euiTheme.size.base};
    `,
    l: css`
      padding: ${euiTheme.size.l};
    `,
    none: '',
  };
};
