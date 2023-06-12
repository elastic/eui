/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { css } from '@emotion/react';
import { logicalCSS } from '../../global_styling';
import { transparentize, UseEuiTheme } from '../../services';

export const euiErrorBoundaryStyles = ({ euiTheme }: UseEuiTheme) => {
  const color1 = transparentize(euiTheme.colors.danger, 0.25);
  const color2 = transparentize(euiTheme.colors.danger, 0.05);

  return {
    euiErrorBoundary: css`
      background-image: repeating-linear-gradient(
        45deg,
        ${color1},
        ${color1} 1px,
        ${color2} 1px,
        ${color2} 19px
      );
      background-size: 54px 54px; /* Fix for Safari 15.4+ */
      ${logicalCSS('padding-horizontal', euiTheme.size.base)}
      ${logicalCSS('padding-vertical', euiTheme.size.base)}
    `,
  };
};
