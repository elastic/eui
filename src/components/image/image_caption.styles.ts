/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { css } from '@emotion/react';
import { euiFontSize, logicalCSS } from '../../global_styling';
import { UseEuiTheme, transparentize } from '../../services';

export const euiImageCaptionStyles = (euiThemeContext: UseEuiTheme) => {
  const { euiTheme } = euiThemeContext;

  return {
    // Base
    euiImageCaption: css`
      ${euiFontSize(euiThemeContext, 's')};
      ${logicalCSS('margin-top', euiTheme.size.xs)};
    `,
    isOnOverlayMask: css`
      color: ${euiTheme.colors.ghost};
      text-shadow: 0 1px 2px ${transparentize(euiTheme.colors.ink, 0.6)};

      [class*='euiLink'] {
        color: ${euiTheme.colors.ghost}; // Override link color for visibility
      }
    `,
  };
};
