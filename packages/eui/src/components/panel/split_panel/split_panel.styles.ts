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

export const euiSplitPanelOuterStyles = {
  euiSplitPanelOuter: css`
    display: flex;
    ${logicalCSS('min-width', 0)}
    overflow: hidden;
  `,
  column: css`
    flex-direction: column;
  `,
  row: css`
    flex-direction: row;
  `,
};

export const euiSplitPanelInnerStyles = ({
  highContrastMode,
}: UseEuiTheme) => ({
  euiSplitPanelInner: css`
    /* Make sure they're evenly split */
    flex-basis: 0%;

    /* Ensure no movement if they have click handlers */
    /* stylelint-disable declaration-no-important */
    transform: none !important;
    box-shadow: none !important;

    /* Don't double up on borders in high contrast mode */
    ${highContrastMode ? 'border: none !important;' : ''}
  `,
});
