/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { css } from '@emotion/react';
import { UseEuiTheme } from '../../services';
import { logicalCSS } from '../../global_styling';

/**
 * Styles cast to <li> element
 */
export const euiBreadcrumbStyles = (euiThemeContext: UseEuiTheme) => {
  const { euiTheme } = euiThemeContext;
  return {
    euiBreadcrumb: css`
      align-items: center;
      display: flex;
      ${logicalCSS(
        // See .euiBreadcrumbs__list's negative margin-bottom
        'margin-bottom',
        euiTheme.size.xs
      )}
    `,
    isTruncated: css`
      overflow: hidden;
    `,
    isCollapsed: css`
      flex-shrink: 0;
    `,

    // Types
    page: css`
      &:not(:last-of-type) {
        &::after {
          background: ${euiTheme.colors.lightShade};
          content: '';
          flex-shrink: 0;
          ${logicalCSS('margin-top', euiTheme.size.xs)}
          ${logicalCSS('margin-bottom', 0)}
          ${logicalCSS('margin-horizontal', euiTheme.size.s)}
          ${logicalCSS('height', euiTheme.size.base)}
          ${logicalCSS('width', '1px')}
          transform: translateY(-1px) rotate(15deg);
        }
      }
    `,
    application: css`
      &:not(:last-of-type) {
        ${logicalCSS('margin-right', `-${euiTheme.size.xs}`)}
      }
    `,
  };
};
