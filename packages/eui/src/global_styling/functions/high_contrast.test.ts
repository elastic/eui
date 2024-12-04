/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { UseEuiTheme } from '../../services';
import { overrideForcedColors } from './high_contrast';

const mockForcedHighContrastMode = {
  highContrastMode: 'forced',
} as UseEuiTheme;

const mockRegularContrastMode = {
  highContrastMode: false,
} as UseEuiTheme;

describe('overrideForcedColors', () => {
  it('returns forced-color-adjust CSS when high contrast is being forced', () => {
    expect(overrideForcedColors(mockForcedHighContrastMode)).toEqual(
      'forced-color-adjust: none;'
    );
  });

  it('returns nothing when highContrastMode is not forced', () => {
    expect(overrideForcedColors(mockRegularContrastMode)).toEqual('');
  });
});
