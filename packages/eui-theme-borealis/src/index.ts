/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { buildTheme, EuiThemeShape } from '@elastic/eui-theme-common';

import { colors } from './variables/colors';
import { animation } from './variables/_animation';
import { breakpoint } from './variables/_breakpoint';
import { base, size } from './variables/_size';
import { border } from './variables/_borders';
import { levels } from './variables/_levels';
import { font } from './variables/_typography';
import { focus } from './variables/_states';
import { components } from './variables/_components';
import { overrides } from './variables/_overrides';

export { colorVis } from './variables/colors/_colors_vis';

export const EUI_THEME_BOREALIS_KEY = 'EUI_THEME_BOREALIS';

export const euiThemeBorealis: EuiThemeShape = {
  colors,
  base,
  size,
  border,
  font,
  animation,
  breakpoint,
  levels,
  focus,
  components,
  flags: {
    hasGlobalFocusColor: true,
    hasVisColorAdjustment: false,
    buttonVariant: 'refresh',
  },
  overrides,
};

export const EuiThemeBorealis = buildTheme(
  euiThemeBorealis,
  EUI_THEME_BOREALIS_KEY
);
