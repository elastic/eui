/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { css } from '@emotion/react';
import {
  logicalCSS,
  logicalCSSWithFallback,
  euiScrollBarStyles,
  euiFontSize,
} from '../../global_styling';
import { UseEuiTheme } from '../../services';

export const euiPaginationStyles = (euiThemeContext: UseEuiTheme) => {
  const { euiTheme } = euiThemeContext;

  return {
    // Base
    euiPagination: css`
      ${euiScrollBarStyles(euiThemeContext)}
      display: flex;
      align-items: center;
      ${logicalCSSWithFallback('overflow-y', 'hidden')}
      ${logicalCSSWithFallback('overflow-x', 'auto')}
    `,
    // Elements
    euiPagination__compressedText: css`
      display: inline-flex;
      align-items: center;
      line-height: 1; /* Overrides EuiText line-height */

      > span {
        ${logicalCSS('margin-horizontal', euiTheme.size.s)}
        font-weight: ${euiTheme.font.weight.semiBold};

        &:first-of-type {
          color: ${euiTheme.colors.textPrimary};
        }
      }
    `,
    euiPagination__list: css`
      display: flex;
      align-items: baseline;
    `,
    euiPagination__ellipsis: css`
      color: ${euiTheme.colors.textDisabled};
      font-size: ${euiFontSize(euiThemeContext, 's').fontSize};
      ${logicalCSS('padding-horizontal', euiTheme.size.s)}
      ${logicalCSS('height', euiTheme.size.l)}
    `,
  };
};
