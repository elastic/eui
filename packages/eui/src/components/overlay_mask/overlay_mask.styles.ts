/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { css } from '@emotion/css';
import { logicalCSS, euiAnimFadeIn } from '../../global_styling';
import { UseEuiTheme } from '../../services';

export const euiOverlayMaskStyles = ({
  euiTheme,
  highContrastMode,
}: UseEuiTheme) => ({
  euiOverlayMask: css`
    position: fixed;
    ${logicalCSS('top', 0)}
    ${logicalCSS('left', 0)}
    ${logicalCSS('right', 0)}
    ${logicalCSS('bottom', 0)}
    display: flex;
    align-items: center;
    justify-content: center;
    animation: ${euiAnimFadeIn} ${euiTheme.animation.fast} ease-in forwards;
    animation-iteration-count: 1;
    background: ${highContrastMode
      ? `rgba(155, 166, 184, 0.9)`
      : `rgba(155, 166, 184, 0.6)`};
    /* POC: glass blur effect; needs design input for blur/saturation values */
    backdrop-filter: blur(4px) saturate(180%);
    -webkit-backdrop-filter: blur(4px) saturate(180%);
  `,
  aboveHeader: css`
    z-index: ${euiTheme.levels.mask};
  `,
  belowHeader: css`
    z-index: ${euiTheme.levels.maskBelowHeader};
    ${logicalCSS('top', 'var(--euiFixedHeadersOffset, 0)')}
  `,
  noAnimation: css`
    animation: none;
  `,
});
