/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { isLegacyTheme } from './themes';

describe('isLegacyTheme', () => {
  it('returns true for the default name', () => {
    expect(isLegacyTheme('EUI_THEME_LEGACY')).toBe(true);
    expect(isLegacyTheme('EUI_THEME_AMSTERDAM')).toBe(false);
    expect(isLegacyTheme('CUSTOM_DEFAULT')).toBe(false);
  });
});
