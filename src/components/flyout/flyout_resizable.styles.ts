/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { css } from '@emotion/react';

import { UseEuiTheme } from '../../services';
import { logicalCSS } from '../../global_styling';

export const euiFlyoutResizableButtonStyles = ({ euiTheme }: UseEuiTheme) => ({
  euiFlyoutResizableButton: css`
    position: absolute;

    /* Hide the default grab icon (although the hover/focus states should remain) */
    &::before,
    &::after {
      background-color: transparent;
    }
  `,
  left: css`
    ${logicalCSS('right', `-${euiTheme.border.width.thin}`)}
  `,
  right: css`
    ${logicalCSS('left', `-${euiTheme.border.width.thin}`)}
  `,
});
