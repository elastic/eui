/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { EuiThemeVariantFlags, UseEuiTheme } from '@elastic/eui-theme-common';

import { useEuiTheme } from './hooks';

export const isEuiThemeRefreshVariant = (
  { euiTheme }: UseEuiTheme,
  flag: keyof EuiThemeVariantFlags
) => {
  return euiTheme.flags[flag] === 'refresh';
};

/**
 * Util to retrieve visual variant for UI elements
 * Note: Temporary only - will be removed once the visual refresh is completed.
 */
export const useEuiThemeRefreshVariant = (flag: keyof EuiThemeVariantFlags) => {
  const euiThemeContext = useEuiTheme();

  return isEuiThemeRefreshVariant(euiThemeContext, flag);
};
