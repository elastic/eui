/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { css } from '@emotion/react';
import { logicalCSS } from '../../../global_styling/functions';

export const euiButtonSplitStyles = () => {
  return {
    euiButtonSplit: css`
      display: inline-flex;
      align-items: stretch;
    `,
    leftButton: css`
      ${logicalCSS('border-top-right-radius', '0 !important')}
      ${logicalCSS('border-bottom-right-radius', '0 !important')}
    `,
    rightSpan: (color: string, fill?: boolean) => css`
      display: flex;
      align-items: stretch;
      ${color !== 'text' || fill ? 'margin-left: 1px;' : ''}
    `,
    iconButton: (color: string, fill?: boolean) => css`
      ${logicalCSS('border-top-left-radius', '0 !important')}
      ${logicalCSS('border-bottom-left-radius', '0 !important')}
      ${color === 'text' && !fill
        ? logicalCSS('border-left', 'none !important')
        : ''}
    `,
  };
};
