/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import {
  _EuiThemeBase,
  _EuiThemeSizes,
} from '../../../../global_styling/variables';
import { sizeToPixel } from '../../../../global_styling/functions';

import { computed } from '../../../../services/theme/utils';

export const base: _EuiThemeBase = 16;

// Wrapper function to make sizeToPixel compatible with computed()
const sizeToPixelForAmsterdam = (scale: number = 1) => (theme: any) => {
  // For Amsterdam theme, the base is a simple number (16)
  // but computed() passes the entire theme object
  const baseValue = typeof theme.base === 'number' ? theme.base : 16;
  return sizeToPixel(scale)(baseValue);
};

export const size: _EuiThemeSizes = {
  xxs: computed(sizeToPixelForAmsterdam(0.125)),
  xs: computed(sizeToPixelForAmsterdam(0.25)),
  s: computed(sizeToPixelForAmsterdam(0.5)),
  m: computed(sizeToPixelForAmsterdam(0.75)),
  base: computed(sizeToPixelForAmsterdam()),
  l: computed(sizeToPixelForAmsterdam(1.5)),
  xl: computed(sizeToPixelForAmsterdam(2)),
  xxl: computed(sizeToPixelForAmsterdam(2.5)),
  xxxl: computed(sizeToPixelForAmsterdam(3)),
  xxxxl: computed(sizeToPixelForAmsterdam(4)),
};
