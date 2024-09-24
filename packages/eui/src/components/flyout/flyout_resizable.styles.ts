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
  `,
  overlay: {
    left: css`
      ${logicalCSS('right', 0)}
    `,
    right: css`
      ${logicalCSS('left', 0)}
    `,
  },
  push: {
    left: css`
      ${logicalCSS('right', `-${euiTheme.border.width.thick}`)}
    `,
    right: css`
      ${logicalCSS('left', `-${euiTheme.border.width.thick}`)}
    `,
  },
  noOverlay: {
    noOverlay: css`
      margin-inline: 0;
    `,
    left: css`
      justify-content: flex-end;
    `,
    right: css`
      justify-content: flex-start;
    `,
  },
});
