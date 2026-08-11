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
      flex-grow: 1;
      /* Keep a floor under the body. Its automatic minimum size is zero (it is
         a scroll container in the block axis), so without this a tall header
         and footer shrink it to nothing on short viewports and its content
         becomes unreachable. Below this height the flyout scrolls instead. */
      ${logicalCSS('min-height', euiTheme.size.xxxxl)}
      /* The below fixes scroll on Chrome and Safari */
      display: flex;
      flex-direction: column;
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
      overflow: hidden;

      .euiCallOut {
        ${logicalCSS('margin-top', `${euiTheme.size.s}`)}
        ${logicalCSS('margin-left', `${euiTheme.size.l}`)}
        ${logicalCSS('margin-right', `${euiTheme.size.l}`)}
      }

      .euiFlyout:not(:has(.euiFlyoutHeader)) & {
        /* Adds more spacing on the right to account for the close button */
        .euiCallOut {
          ${logicalCSS('margin-right', `${euiTheme.size.xxl}`)}
        }
      }
    `,
  };
};
