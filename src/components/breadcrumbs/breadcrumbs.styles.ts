/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { css } from '@emotion/react';
import { UseEuiTheme } from '../../services';
import { euiFontSize, logicalCSS } from '../../global_styling';

export const euiBreadcrumbsListStyles = (euiThemeContext: UseEuiTheme) => {
  // Styles cast to the <ol> element
  const { euiTheme } = euiThemeContext;
  return {
    euiBreadcrumbs__list: css`
      ${euiFontSize(euiThemeContext, 's')};
      align-items: center;
      display: flex;
      flex-wrap: wrap;
      line-height: ${euiTheme.size.l};
      ${logicalCSS(
        // Add vertical space between breadcrumbs, but make sure the whole breadcrumb set doesn't add space below itself
        'margin-bottom',
        `-${euiTheme.size.xs}`
      )}
      ${logicalCSS('min-width', 0)} // Ensure it shrinks if the window is narrow
    `,
    isTruncated: css`
      flex-wrap: nowrap;
      white-space: nowrap;
    `,
  };
};
