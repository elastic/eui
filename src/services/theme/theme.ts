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

/* eslint-disable @typescript-eslint/no-unused-vars */

import { buildTheme, COLOR_MODE_KEY } from './utils';
import {
  light_colors,
  dark_colors,
} from '../../global_styling/variables/_colors';
import {
  light_colors_ams,
  dark_colors_ams,
} from '../../themes/eui-amsterdam/global_styling/variables/_colors';

import { base, size } from '../../global_styling/variables/_size';

import fonts from '../../global_styling/variables/_typography';
import fonts_ams from '../../themes/eui-amsterdam/global_styling/variables/_typography';

import { border } from '../../global_styling/variables/_borders';
import { border_ams } from '../../themes/eui-amsterdam/global_styling/variables/_borders';

import { titles } from '../../global_styling/variables/title';
import { titles_ams } from '../../themes/eui-amsterdam/global_styling/variables/title';

/**
 * Anything using `COLOR_MODE_KEY` directly, is something that should be top level, while
 * anything using the `color.` key will remain under `color`
 */

/* DEFAULT THEME */
// TODO: All theme files need to be imported here or else they error out.
// Creation of the themes shouldn't be restricted to a particular file

export const light = {
  ...light_colors,
  base,
  size,
  ...fonts,
  border,
  titles, // TODO: Rename to `title` when it doesn't conflict with colors.title and move to component-specific file
};

export const dark = {
  ...dark_colors,
  base,
  size,
  ...fonts,
  border,
  titles,
};

export const euiThemeDefault = {
  [COLOR_MODE_KEY]: {
    light,
    dark,
  },
};

export const EuiThemeDefault = buildTheme(euiThemeDefault, 'EUI_THEME_DEFAULT');

/* AMSTERDAM THEME */

export const amsterdam_light = {
  ...light_colors_ams,
  base,
  size,
  ...fonts_ams,
  border: border_ams,
  titles: titles_ams,
  // array: [1, 2, 3],
};

export const amsterdam_dark = {
  ...dark_colors_ams,
  base,
  size,
  ...fonts_ams,
  border: border_ams,
  titles: titles_ams,
};

export const euiThemeAmsterdam = {
  [COLOR_MODE_KEY]: {
    light: amsterdam_light,
    dark: amsterdam_dark,
  },
};

// export const EuiThemeAmsterdam = buildTheme(
//   euiThemeAmsterdam,
//   'EUI_THEME_AMSTERDAM'
// );
