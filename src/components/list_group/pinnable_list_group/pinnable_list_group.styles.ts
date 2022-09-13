/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { css } from '@emotion/react';
import { UseEuiTheme, makeHighContrastColor } from '../../../services';

export const euiPinnableListGroupItemExtraActionStyles = ({
  euiTheme,
}: UseEuiTheme) => {
  return {
    // Base
    euiPinnableListGroup__itemExtraAction: css`
      svg {
        transform: rotate(45deg);
      }
    `,
    // Variants
    pinned: css`
      &:not(:hover):not(:focus) {
        color: ${makeHighContrastColor(euiTheme.colors.lightShade)(euiTheme)};
      }
    `,
  };
};
