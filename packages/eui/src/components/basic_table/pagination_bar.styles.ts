/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { css } from '@emotion/react';
import { UseEuiTheme } from '../../services';
import { logicalShorthandCSS } from '../../global_styling';

/**
 * @internal
 */
export const euiBasicTablePaginationBarStyles = (theme: UseEuiTheme) => {
  const { euiTheme } = theme;

  return {
    root: css`
      ${logicalShorthandCSS(
        'padding',
        `${euiTheme.size.xs} ${euiTheme.size.s}`
      )}
    `,
    panelled: css`
      background: ${euiTheme.colors.backgroundBaseSubdued};
      border: ${euiTheme.border.thin};
      border-block-start-width: 0;
      ${logicalShorthandCSS(
        'border-radius',
        `0 0 ${euiTheme.border.radius.medium} ${euiTheme.border.radius.medium}`
      )}
    `,
  };
};
