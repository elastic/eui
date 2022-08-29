/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { css } from '@emotion/react';
import { logicalCSS, euiAnimFadeIn } from '../../global_styling';
import { transparentize, UseEuiTheme } from '../../services';

export const euiOverlayMaskStyles = ({ euiTheme }: UseEuiTheme) => ({
  euiOverlayMask: css`
    .euiOverlayMask {
      position: fixed;
      ${logicalCSS('top', 0)}
      ${logicalCSS('left', 0)}
      ${logicalCSS('right', 0)}
      ${logicalCSS('bottom', 0)}
      display: flex;
      align-items: center;
      justify-content: center;
      ${logicalCSS('padding-bottom', '10vh')};
      animation: ${euiAnimFadeIn} ${euiTheme.animation.fast} ease-in;
      background: ${transparentize(euiTheme.colors.ink, 0.5)};
    }
  `,
  aboveHeader: css`
    .euiOverlayMask {
      z-index: ${euiTheme.levels.mask};
    }
  `,
  belowHeader: css`
    .euiOverlayMask {
      z-index: ${euiTheme.levels.maskBelowHeader};
    }
  `,
});

export const euiOverlayMaskBodyStyles = css`
  body {
    overflow: hidden;
  }
`;
