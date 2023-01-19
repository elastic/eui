/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { css, keyframes } from '@emotion/react';

import { logicalCSS } from '../../global_styling';
import { UseEuiTheme } from '../../services';

const tableLoadingLine = keyframes`
  from {
    ${logicalCSS('left', 0)}
    ${logicalCSS('width', 0)}
  }

  20% {
    ${logicalCSS('left', 0)}
    ${logicalCSS('width', '40%')}
  }

  80% {
    ${logicalCSS('left', '60%')}
    ${logicalCSS('width', '40%')}
  }

  100% {
    ${logicalCSS('left', '100%')}
    ${logicalCSS('width', 0)}
  }
`;

export const euiBasicTableBodyLoading = ({ euiTheme }: UseEuiTheme) => css`
  position: relative;
  overflow: hidden;

  &::before {
    position: absolute;
    content: '';
    ${logicalCSS('width', '100%')}
    ${logicalCSS('height', euiTheme.border.width.thick)}
    background-color: ${euiTheme.colors.primary};
    animation: ${tableLoadingLine} 1000ms linear;
    animation-iteration-count: infinite;
  }
`;

// Unsets the extra height caused by tooltip/popover wrappers around table action buttons
// Without this, the row height jumps whenever actions are disabled
export const euiBasicTableActionsWrapper = css`
  line-height: 1;
`;
