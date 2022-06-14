/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { css } from '@emotion/react';
import { logicalTextAlignCSS } from '../../global_styling';

export const euiStatStyles = () => ({
  euiStat: css``,
  // Text align
  left: css`
    ${logicalTextAlignCSS('left')}
    align-items: flex-start;
  `,
  center: css`
    ${logicalTextAlignCSS('center')}
    align-items: center;
  `,
  right: css`
    ${logicalTextAlignCSS('right')}
    align-items: flex-end;
  `,
});
