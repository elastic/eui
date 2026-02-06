/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { UseEuiTheme } from '../../services';

export const euiDateRangePickerStyles = {
  // this could be EuiFlexGroup
  root: ({ euiTheme }: UseEuiTheme) => ({
    display: 'flex',
    alignItems: 'center',
    gap: euiTheme.size.s,
  }),
  badge: ({ euiTheme }: UseEuiTheme) => ({
    fontFamily: euiTheme.font.familyCode,
    fontWeight: euiTheme.font.weight.light,
    letterSpacing: '0.075ch',
  }),
};
