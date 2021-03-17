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

import { buildTheme } from '../../services/theme';
import { base, size } from '../../global_styling/variables/_size';
import {
  light_colors_ams,
  dark_colors_ams,
} from './global_styling/variables/_colors';
import fonts_ams from './global_styling/variables/_typography';
import { border_ams } from './global_styling/variables/_borders';
import { title_ams } from './global_styling/variables/title';

// export const amsterdam_light = {
//   colors: {
//     ...light_colors_ams,
//   },
//   base,
//   size,
//   ...fonts_ams,
//   border: border_ams,
//   title: title_ams,
//   // array: [1, 2, 3],
// };

// export const amsterdam_dark = {
//   colors: {
//     ...dark_colors_ams,
//   },
//   base,
//   size,
//   ...fonts_ams,
//   border: border_ams,
//   title: title_ams,
// };

export const euiThemeAmsterdam = {
  colors: {
    light: light_colors_ams,
    dark: dark_colors_ams,
  },
  base,
  size,
  ...fonts_ams,
  border: border_ams,
  title: title_ams,
};

export const EuiThemeAmsterdam = buildTheme(
  euiThemeAmsterdam,
  'EUI_THEME_AMSTERDAM'
);
