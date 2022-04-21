/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { css, keyframes } from '@emotion/react';
import { UseEuiTheme } from '../../services';
import { euiShadowFlat } from '../../themes/amsterdam/global_styling/mixins';

//const _euiBottomBarColor = '#131317';
const _euiBottomBarZHeader = 1000;

const euiBottomBarAppear = keyframes`
0% {
    transform: translateY(100%);
    opacity: 0;
  }

  100% {
    transform: translateY(00%);
    opacity: 1;
  }
`;

export const euiBottomBarStyles = ({ euiTheme, colorMode }: UseEuiTheme) => ({
  // Base
  euiBottomBar: css`
    ${euiShadowFlat(euiTheme, undefined, colorMode)};
    background: ${euiTheme.colors.lightShade};
    color: ${euiTheme.colors.text};
    animation: ${euiBottomBarAppear} ${euiTheme.animation.slow}
      ${euiTheme.animation.resistance};
    z-index: ${_euiBottomBarZHeader - 2};
  `,
  static: css``,
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
});
