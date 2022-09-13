/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { css } from '@emotion/react';
import { UseEuiTheme } from '../../services';
import {
  logicalCSS,
  logicalCSSWithFallback,
  euiYScrollWithShadows,
} from '../../global_styling';

export const euiFlyoutBodyStyles = (euiThemeContext: UseEuiTheme) => {
  return {
    euiFlyoutBody: css`
      ${logicalCSSWithFallback('overflow-y', 'hidden')}
      ${logicalCSS('height', '100%')}
    `,
    overflow: {
      euiFlyoutBody__overflow: css`
        ${euiYScrollWithShadows(euiThemeContext)};
      `,
      hasBanner: css`
        ${euiYScrollWithShadows(euiThemeContext, { side: 'end' })};
      `,
    },
    euiFlyoutBody__banner: css`
      .euiCallout {
        ${logicalCSSWithFallback('overflow-x', 'hidden')}
        border: none; // Remove border from callout when it is a flyout banner
        border-radius: 0; // Ensures no border-radius in all themes
      }
    `,
  };
};
