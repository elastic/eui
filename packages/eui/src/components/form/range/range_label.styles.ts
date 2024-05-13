/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { css } from '@emotion/react';
import { UseEuiTheme } from '../../../services';
import { euiFontSize, logicalCSS } from '../../../global_styling';
import { euiRangeVariables } from './range.styles';

export const euiRangeLabelStyles = (euiThemeContext: UseEuiTheme) => {
  const euiTheme = euiThemeContext.euiTheme;
  const range = euiRangeVariables(euiThemeContext);

  return {
    euiRangeLabel: css`
      font-size: ${euiFontSize(euiThemeContext, 'xs').fontSize};
    `,
    min: css`
      ${logicalCSS('padding-right', euiTheme.size.s)}
    `,
    max: css`
      ${logicalCSS('padding-left', euiTheme.size.s)}
    `,
    isDisabled: css`
      opacity: ${range.disabledOpacity};
    `,
  };
};
