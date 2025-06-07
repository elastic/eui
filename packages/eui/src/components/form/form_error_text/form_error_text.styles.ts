/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { css } from '@emotion/react';

import { isEuiThemeRefreshVariant, UseEuiTheme } from '../../../services';
import { euiFontSize, logicalCSS } from '../../../global_styling';

export const euiFormErrorTextStyles = (euiThemeContext: UseEuiTheme) => {
  const { euiTheme } = euiThemeContext;
  const isRefreshVariant = isEuiThemeRefreshVariant(
    euiThemeContext,
    'formVariant'
  );

  return {
    euiFormErrorText: css`
      ${logicalCSS('padding-top', euiTheme.size.xs)}
      ${euiFontSize(euiThemeContext, 'xs')}
      color: ${isRefreshVariant
        ? euiTheme.colors.textDanger
        : euiTheme.colors.danger};
    `,
  };
};
