/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { buildTheme, EuiThemeShape } from '@elastic/eui';

import { colors } from './variables/_colors';
import { animation } from './variables/_animation';
import { breakpoint } from './variables/_breakpoint';
import { base, size } from './variables/_size';
import { border } from './variables/_borders';
import { levels } from './variables/_levels';
import { font } from './variables/_typography';
import { focus } from './variables/_states';

export const EUI_THEME_BERLIN_KEY = 'EUI_THEME_BERLIN';

export const euiThemeBerlin: EuiThemeShape = {
  colors,
  base,
  size,
  border,
  font,
  animation,
  breakpoint,
  levels,
  focus,
};

export const EuiThemeBerlin = buildTheme(euiThemeBerlin, EUI_THEME_BERLIN_KEY);
