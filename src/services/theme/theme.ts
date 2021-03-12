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

import { buildTheme, computed, COLOR_MODE_KEY } from './utils';
import {
  makeHighContrastColor,
  makeDisabledContrastColor,
} from '../../global_styling/functions/_colors';
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

/**
 * Anything using `COLOR_MODE_KEY` directly, is something that should be top level, while
 * anything using the `color.` key will remain under `color`
 */

// For some reason removing this causes a type error:
// TypeError: 'getOwnPropertyDescriptor' on proxy: trap reported non-configurability for property 'length' which is either non-existent or configurable in the proxy target
const poles = {
  ghost: '#FFF',
  ink: '#000',
};

const textVariants = {
  textPrimary: computed(['colors.primary'], ([primary]) =>
    makeHighContrastColor(primary)
  ),
  textAccent: computed(['colors.accent'], ([accent]) =>
    makeHighContrastColor(accent)
  ),
  textWarning: computed(['colors.warning'], ([warning]) =>
    makeHighContrastColor(warning)
  ),
  textDanger: computed(['colors.danger'], ([danger]) =>
    makeHighContrastColor(danger)
  ),
  textDisabled: computed(['colors.disabled'], ([disabled]) =>
    makeDisabledContrastColor(disabled)
  ),
  textSuccess: computed(['colors.success'], ([success]) =>
    makeHighContrastColor(success)
  ),
  link: computed(['colors.textPrimary'], ([textPrimary]) => textPrimary),
};

/* DEFAULT THEME */
// TODO: All theme files need to be imported here or else they error out.
// Creation of the themes shouldn't be restricted to a particular file

export const light = {
  ...poles,
  ...light_colors,
  ...textVariants,
  base,
  size,
  ...fonts,
  border,
};

export const dark = {
  ...poles,
  ...dark_colors,
  ...textVariants,
  base,
  size,
  ...fonts,
  border,
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
  ...poles,
  ...light_colors_ams,
  ...textVariants,
  base,
  size,
  ...fonts_ams,
  border: border_ams,
};

export const amsterdam_dark = {
  ...poles,
  ...dark_colors_ams,
  ...textVariants,
  base,
  size,
  ...fonts_ams,
  border: border_ams,
};

export const euiThemeAmsterdam = {
  [COLOR_MODE_KEY]: {
    light: amsterdam_light,
    dark: amsterdam_dark,
  },
};

export const EuiThemeAmsterdam = buildTheme(
  euiThemeAmsterdam,
  'EUI_THEME_AMSTERDAM'
);
