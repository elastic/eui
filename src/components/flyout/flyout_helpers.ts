/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { UseEuiTheme } from '../../services';
import { EuiFlyoutPaddingSize } from './flyout_types';

export const getFlyoutPadding = (
  paddingSize: EuiFlyoutPaddingSize,
  { euiTheme }: UseEuiTheme
) => {
  const paddingModifiers = {
    none: 0,
    s: euiTheme.size.s,
    m: euiTheme.size.base,
    l: euiTheme.size.l,
  };

  return paddingModifiers[paddingSize];
};
