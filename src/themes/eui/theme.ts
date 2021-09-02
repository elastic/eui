/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { buildTheme } from '../../services/theme/utils';
import { EuiThemeShape } from '../../services/theme/types';
import { animation } from '../../global_styling/variables/_animations';
import { breakpoint } from '../../global_styling/variables/_breakpoint';
import { colors } from '../../global_styling/variables/_colors';
import { base, size } from '../../global_styling/variables/_size';
import { font } from '../../global_styling/variables/_typography';
import { border } from '../../global_styling/variables/_borders';

export const euiThemeDefault: EuiThemeShape = {
  colors,
  base,
  size,
  font,
  border,
  animation,
  breakpoint,
};

export const EuiThemeDefault = buildTheme(euiThemeDefault, 'EUI_THEME_DEFAULT');
