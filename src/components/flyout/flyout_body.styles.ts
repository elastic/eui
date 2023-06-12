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
    euiFlyoutBody__overflow: {
      noBanner: css`
        ${euiYScrollWithShadows(euiThemeContext)}
      `,
      hasBanner: css`
        ${euiYScrollWithShadows(euiThemeContext, { side: 'end' })}
      `,
    },
    euiFlyoutBody__banner: css`
      ${logicalCSSWithFallback('overflow-x', 'hidden')}
    `,
  };
};
