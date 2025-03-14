/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { css } from '@emotion/react';
import { logicalCSS } from '../../global_styling';
import { highContrastModeStyles } from '../../global_styling/functions/high_contrast';
import { transparentize, UseEuiTheme } from '../../services';

export const euiErrorBoundaryStyles = (euiThemeContext: UseEuiTheme) => {
  const { euiTheme, highContrastMode } = euiThemeContext;
  const color1 = transparentize(
    euiTheme.colors.danger,
    highContrastMode ? 1 : 0.25
  );
  const color2 = transparentize(
    euiTheme.colors.danger,
    highContrastMode ? 0.25 : 0.05
  );

  return {
    euiErrorBoundary: css`
      ${logicalCSS('padding-horizontal', euiTheme.size.base)}
      ${logicalCSS('padding-vertical', euiTheme.size.base)}

      ${highContrastModeStyles(euiThemeContext, {
        none: `
          background-image: repeating-linear-gradient(
            45deg,
            ${color1},
            ${color1} 1px,
            ${color2} 1px,
            ${color2} 19px
          );
          background-size: 54px 54px; /* Fix for Safari 15.4+ */
        `,
        // Windows high contrast themes ignore background-images that aren't url()s.
        // We can fake a basic danger-colored "border" with a little inline SVG trickery
        forced: `
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='100%25' height='100%25' fill='${encodeURIComponent(
            euiTheme.colors.textDanger
          )}' /%3E%3C/svg%3E");
        `,
      })}
    `,
  };
};
