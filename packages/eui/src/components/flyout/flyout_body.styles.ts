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
import { highContrastModeStyles } from '../../global_styling/functions/high_contrast';

export const euiFlyoutBodyStyles = (euiThemeContext: UseEuiTheme) => {
  const { euiTheme } = euiThemeContext;
  return {
    euiFlyoutBody: css`
      ${logicalCSSWithFallback('overflow-y', 'hidden')}
      ${logicalCSS('height', '100%')}
    `,
    overflow: {
      euiFlyoutBody__overflow: css``,
      noBanner: css`
        ${euiYScrollWithShadows(euiThemeContext)}
      `,
      hasBanner: css`
        ${euiYScrollWithShadows(euiThemeContext, { side: 'end' })}
      `,
    },
    euiFlyoutBody__banner: css`
      ${logicalCSSWithFallback('overflow-x', 'hidden')}
      ${highContrastModeStyles(euiThemeContext, {
        preferred: logicalCSS('border-bottom', euiTheme.border.thin),
      })}
    `,
  };
};
