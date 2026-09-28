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
  const { euiTheme } = euiThemeContext;

  return {
    euiFlyoutBody: css`
      ${logicalCSSWithFallback('overflow-y', 'hidden')}
      ${logicalCSS('height', '100%')}
      /* Preserve a standard control plus the content padding and scroll fade */
      ${logicalCSS(
        'min-height',
        `calc(${euiTheme.size.xxl} + var(--euiFlyoutBodyPadding, 0px) + var(--euiFlyoutBodyPadding, 0px) + ${euiTheme.size.s})`
      )}
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
      /* Omit bottom padding so body content keeps owning the gap below the banner */
      ${logicalCSS('padding-top', 'var(--euiFlyoutBodyPadding, 0)')}
      ${logicalCSS('padding-horizontal', 'var(--euiFlyoutBodyPadding, 0)')}

      .euiFlyout:not(:has(.euiFlyoutHeader, .euiFlyoutMenu)) & {
        /* Extra end padding so the banner clears the absolutely positioned close button */
        ${logicalCSS('padding-right', euiTheme.size.xxl)}
      }
    `,
  };
};
