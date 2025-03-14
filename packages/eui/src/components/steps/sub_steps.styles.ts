/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { css } from '@emotion/react';
import { UseEuiTheme } from '../../services';
import { highContrastModeStyles } from '../../global_styling/functions/high_contrast';

export const euiSubStepsStyles = (euiThemeContext: UseEuiTheme) => {
  const { euiTheme } = euiThemeContext;
  return {
    euiSubSteps: css`
      padding: ${euiTheme.size.base};
      background-color: ${euiTheme.colors.lightestShade};
      margin-block-end: ${euiTheme.size.base};
      ${highContrastModeStyles(euiThemeContext, {
        preferred: `border: ${euiTheme.border.thin};`,
      })}

      > *:last-child {
        margin-block-end: 0;
      }

      /* Change ordered list from numbers to lowercase letters */
      & ol,
      .euiText & ol {
        list-style-type: lower-alpha;
      }
    `,
  };
};
