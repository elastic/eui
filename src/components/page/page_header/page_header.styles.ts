/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { css } from '@emotion/react';
import { logicalCSS } from '../../../global_styling';
import { UseEuiTheme } from '../../../services';

export const euiPageHeaderStyles = ({ euiTheme }: UseEuiTheme) => {
  return {
    euiPageHeader: css`
      ${logicalCSS('width', '100%')};
      // Make sure that inner flex layouts don't get larger than this container
      ${logicalCSS('min-width', '0')};
      display: flex;
      flex-direction: column;
      flex-shrink: 0; // Ensures Safari doesn't shrink beyond contents
    `,
    border: css`
      ${logicalCSS('border-bottom', euiTheme.border.thin)};
    `,
  };
};
