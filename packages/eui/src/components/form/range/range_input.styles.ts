/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the "Elastic License
 * 2.0", the "GNU Affero General Public License v3.0 only", and the "Server Side
 * Public License v 1"; you may not use this file except in compliance with, at
 * your election, the "Elastic License 2.0", the "GNU Affero General Public
 * License v3.0 only", or the "Server Side Public License, v 1".
 */

import { css } from '@emotion/react';
import { UseEuiTheme } from '../../../services';

export const euiRangeInputStyles = ({ euiTheme }: UseEuiTheme) => ({
  euiRangeInput: css`
    inline-size: auto;
    min-inline-size: ${euiTheme.base * 4}px;

    .euiRange__popover &,
    .euiDualRange__popover & {
      inline-size: 100%;
    }
  `,
});
