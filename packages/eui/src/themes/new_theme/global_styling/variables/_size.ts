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

export const size: _EuiThemeSizes = {
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
