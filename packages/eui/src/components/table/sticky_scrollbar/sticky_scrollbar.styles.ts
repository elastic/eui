/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { css } from '@emotion/react';
import { transparentize, type UseEuiTheme } from '../../../services';

export const euiTableStickyScrollbarStyles = ({ euiTheme }: UseEuiTheme) => ({
  wrapper: css`
    block-size: ${euiTheme.size.base};
    padding: ${euiTheme.size.xs};
    position: sticky;
    background: ${euiTheme.components.scrollbarTrackColor};
    inset-block-end: var(--euiTableStickyScrollbarOffsetBottom, 0);
    z-index: var(--euiTableStickyScrollbarZIndex, 0);
  `,
  wrapperHidden: css`
    display: none;
  `,
  track: css`
    block-size: 100%;
    background: ${transparentize(euiTheme.colors.darkShade, 0.5)};
    border-radius: ${euiTheme.border.radius.small};
  `,
});
