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

import { computed } from '../../services/theme/utils';
import {
  makeDisabledContrastColor,
  makeHighContrastColor,
  shade,
  tint,
} from '../functions/_colors';

export const poles = {
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
  textSuccess: computed(['colors.success'], ([success]) =>
    makeHighContrastColor(success)
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
  link: computed(['colors.textPrimary'], ([textPrimary]) => textPrimary),
};

export const light_colors = {
  ...poles,

  // Brand
  primary: '#006BB4',
  accent: '#DD0A73',

  // Status
  success: '#017D73',
  warning: '#F5A700',
  danger: '#BD271E',

  // Grays
  emptyShade: '#FFF',
  lightestShade: '#F5F7FA',
  lightShade: '#D3DAE6',
  mediumShade: '#98A2B3',
  darkShade: '#69707D',
  darkestShade: '#343741',
  fullShade: '#000',

  // Backgrounds
  pageBackground: computed(['colors.lightestShade'], ([lightestShade]) =>
    tint(lightestShade, 0.5)
  ),
  highlight: '#FFFCDD',

  // Every color below must be based mathematically on the set above and in a particular order.
  text: computed(['colors.darkestShade'], ([darkestShade]) => darkestShade),
  title: computed(['colors.text'], ([text]) => shade(text, 0.5)),
  disabled: computed(['colors.text'], ([text]) => tint(text, 0.7)),

  textSubdued: computed(['colors.mediumShade'], ([mediumShade]) =>
    makeHighContrastColor(mediumShade)
  ),

  ...textVariants,
};

export const dark_colors = {
  ...poles,

  // Brand
  primary: '#1BA9F5',
  accent: '#F990C0',

  // Status
  success: '#7DE2D1',
  warning: '#FFCE7A',
  danger: '#F66',

  // Grays
  emptyShade: '#1D1E24',
  lightestShade: '#25262E',
  lightShade: '#343741',
  mediumShade: '#535966',
  darkShade: '#98A2B3',
  darkestShade: '#D4DAE5',
  fullShade: '#FFF',

  // Backgrounds
  pageBackground: computed(['colors.lightestShade'], ([lightestShade]) =>
    shade(lightestShade, 0.3)
  ),
  highlight: '#2E2D25',

  // Every color below must be based mathematically on the set above and in a particular order.
  text: '#DFE5EF',
  title: computed(['colors.text'], ([text]) => text),
  disabled: computed(['colors.text'], ([text]) => shade(text, 0.7)),

  textSubdued: computed(['colors.mediumShade'], ([mediumShade]) =>
    makeHighContrastColor(mediumShade)
  ),

  ...textVariants,
};
