/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { css } from '@emotion/react';

import { UseEuiTheme } from '../../services';
import { mathWithUnits } from '../../global_styling';

export const euiDraggableStyles = (euiThemeContext: UseEuiTheme) => {
  const { euiTheme } = euiThemeContext;

  return {
    euiDraggable: css``,
    spacing: {
      none: css``,
      s: css`
        padding: ${euiTheme.size.xxs};
      `,
      m: css`
        padding: ${mathWithUnits(euiTheme.size.m, (x) => x / 2)};
      `,
      l: css`
        padding: ${euiTheme.size.m};
      `,
    },
  };
};
