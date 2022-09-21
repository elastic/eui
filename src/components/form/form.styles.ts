/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { UseEuiTheme } from '../../services';

export const euiFormVariables = (euiThemeContext: UseEuiTheme) => {
  const { euiTheme } = euiThemeContext;

  return {
    maxWidth: `${euiTheme.base * 25}px`,
    controlHeight: euiTheme.size.xxl,
    controlCompressedHeight: euiTheme.size.xl,
    controlPadding: euiTheme.size.m,
    controlCompressedPadding: euiTheme.size.s,
    controlBorderRadius: euiTheme.border.radius.medium,
    controlCompressedBorderRadius: euiTheme.border.radius.small,
    checkboxBorderRadius: euiTheme.border.radius.small,
  };
};
