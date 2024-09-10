/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { css } from '@emotion/react';

import { UseEuiTheme } from '../../../../services';
import {
  euiTextTruncate,
  logicalTextAlignCSS,
} from '../../../../global_styling';

/**
 * Styles only applied to data header cell content, not control header cells
 */
export const euiDataGridHeaderCellStyles = (euiThemeContext: UseEuiTheme) => {
  return {
    euiDataGridHeaderCell__content: css`
      flex-grow: 1; /* ensures content stretches and allows for manual layout styles to apply */
      ${euiTextTruncate()}
    `,
    // Overwrite inherited 'center' styles from <button>
    left: css`
      ${logicalTextAlignCSS('left')}
    `,
    // Numeric and currency schemas are aligned to the right
    right: css`
      ${logicalTextAlignCSS('right')}
    `,
  };
};
