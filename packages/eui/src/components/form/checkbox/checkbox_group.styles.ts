/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { css } from '@emotion/react';

import { UseEuiTheme } from '../../../services';

export const euiCheckboxGroupStyles = ({ euiTheme }: UseEuiTheme) => ({
  euiCheckboxGroup: css`
    display: flex;
    flex-direction: column;
  `,
  // Skip css`` to avoid generating a className
  uncompressed: `
    gap: ${euiTheme.size.xs}
  `,
  compressed: css`
    gap: 0;
  `,
});
