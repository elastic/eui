/*
 * Licensed to Elasticsearch B.V. under one or more contributor
 * license agreements. See the NOTICE file distributed with
 * this work for additional information regarding copyright
 * ownership. Elasticsearch B.V. licenses this file to you under
 * the Apache License, Version 2.0 (the "License"); you may
 * not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

import { buildTheme, EuiThemeShape } from '../../services/theme';
import { animation } from '../../global_styling/variables/_animations';
import { breakpoint } from '../../global_styling/variables/_responsive';
import { base, size } from '../../global_styling/variables/_size';

import { colors_ams } from './global_styling/variables/_colors';
import { font_ams } from './global_styling/variables/_typography';
import { border_ams } from './global_styling/variables/_borders';
import { shadow_ams } from './global_styling/variables/_shadows';
import { focus_ams } from './global_styling/variables/_states';
import { fontSize } from '../../global_styling/variables/text';

export const euiThemeAmsterdam: EuiThemeShape = {
  colors: colors_ams,
  base,
  size,
  font: {
    ...font_ams,
    ...fontSize,
  },
  border: border_ams,
  focus: focus_ams,
  shadow: shadow_ams,
  animation,
  breakpoint,
};

export const EuiThemeAmsterdam = buildTheme(
  euiThemeAmsterdam,
  'EUI_THEME_AMSTERDAM'
);
