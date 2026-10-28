/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { css } from '@emotion/react';
import { logicalSizeCSS } from '../../global_styling';
import { UseEuiTheme } from '../../services';

export const euiLoadingElasticRingStyles = ({
  euiTheme,
  colorMode,
}: UseEuiTheme) => ({
  euiLoadingElasticRing: css`
    position: relative;
    display: inline-block;
    line-height: 0;
  `,
  euiLoadingElasticRing__svg: css`
    display: block;
    overflow: visible;
  `,
  euiLoadingElasticRing__ring: css`
    transform-origin: 60px 60px;
  `,
  // POC: same light/dark flip as .euiIcon__fillNegative on logo icons
  euiLoadingElasticRing__mark: css`
    fill: ${colorMode === 'DARK'
      ? euiTheme.colors.fullShade
      : euiTheme.colors.darkestShade};
  `,
  euiLoadingElasticRing__size: (px: number) => css`
    ${logicalSizeCSS(`${px}px`)}
  `,
});
