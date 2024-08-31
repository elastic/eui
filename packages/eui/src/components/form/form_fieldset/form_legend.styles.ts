/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { css } from '@emotion/react';

import { UseEuiTheme } from '../../../services';
import { logicalCSS } from '../../../global_styling';
import { euiFormLabel } from '../form_label/form_label.styles';

export const euiFormLegendStyles = (euiThemeContext: UseEuiTheme) => {
  const { euiTheme } = euiThemeContext;

  return {
    euiFormLegend: css`
      ${euiFormLabel(euiThemeContext)}
    `,
    // Skip css`` to avoid generating an extra Emotion className
    uncompressed: logicalCSS('margin-bottom', euiTheme.size.s),
    compressed: css(logicalCSS('margin-bottom', euiTheme.size.xs)),
  };
};
