/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { computed } from '../../services/theme/utils';

// const usingFullTheme = `sizeToPixel(0.25)({ base: 16, [...] })`
// const usingBaseValue = `sizeToPixel(0.25)(16)`
export const sizeToPixel = (scale: number = 1) => (
  themeOrBase: number | { base: number; [key: string]: any }
) => {
  const base = typeof themeOrBase === 'object' ? themeOrBase.base : themeOrBase;
  return `${base * scale}px`;
};

export type EuiThemeBase = number;

export const base: EuiThemeBase = 16;

export type EuiThemeSize = {
  xxs: string;
  xs: string;
  s: string;
  m: string;
  base: string;
  l: string;
  xl: string;
  xxl: string;
  xxxl: string;
  xxxxl: string;
};

export const size: EuiThemeSize = {
  xxs: computed(sizeToPixel(0.125)),
  xs: computed(sizeToPixel(0.25)),
  s: computed(sizeToPixel(0.5)),
  m: computed(sizeToPixel(0.75)),
  base: computed(sizeToPixel()),
  l: computed(sizeToPixel(1.5)),
  xl: computed(sizeToPixel(2)),
  xxl: computed(sizeToPixel(2.5)),
  xxxl: computed(sizeToPixel(3)),
  xxxxl: computed(sizeToPixel(4)),
};
