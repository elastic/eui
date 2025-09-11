/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import {
  computed,
  sizeToPixelFromTheme,
  type _EuiThemeBase,
  type _EuiThemeSizes,
} from '@elastic/eui-theme-common';

export const base: _EuiThemeBase = {
  base: 16,
  fontBase: 14,
};

export const size: _EuiThemeSizes = {
  xxs: computed(sizeToPixelFromTheme(0.125)),
  xs: computed(sizeToPixelFromTheme(0.25)),
  s: computed(sizeToPixelFromTheme(0.5)),
  m: computed(sizeToPixelFromTheme(0.75)),
  base: computed(sizeToPixelFromTheme()),
  l: computed(sizeToPixelFromTheme(1.5)),
  xl: computed(sizeToPixelFromTheme(2)),
  xxl: computed(sizeToPixelFromTheme(2.5)),
  xxxl: computed(sizeToPixelFromTheme(3)),
  xxxxl: computed(sizeToPixelFromTheme(4)),
};
