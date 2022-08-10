/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { css } from '@emotion/react';
import { logicalCSS } from '../../../global_styling';

export const euiPageBodyStyles = () => ({
  euiPageBody: css`
    display: flex;
    flex-direction: column;
    align-items: stretch;
    flex: 1 1 100%;
    // Make sure that inner flex layouts don't get larger than this container
    ${logicalCSS('max-width', '100%')}
    ${logicalCSS('min-width', '0')}
  `,

  // Max widths
  restrictWidth: css`
    ${logicalCSS('margin-horizontal', 'auto')};
  `,
});
