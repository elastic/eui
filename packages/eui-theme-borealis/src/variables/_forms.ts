/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */
import { computed, mathWithUnits } from '@elastic/eui-theme-common';
import {
  dark_background_colors,
  dark_border_colors,
  dark_text_colors,
} from './colors/_colors_dark';
import {
  background_colors,
  border_colors,
  text_colors,
} from './colors/_colors_light';

const _forms = {
  background: background_colors.backgroundBasePlain,
  backgroundDisabled: background_colors.backgroundBaseDisabled,
  backgroundReadOnly: background_colors.backgroundBasePlain,
  backgroundFocused: background_colors.backgroundBasePlain,
  backgroundAutofilled: background_colors.backgroundBasePrimary,
  prependBackground: background_colors.backgroundBaseFormsPrepend,
  border: border_colors.borderBasePlain,
  borderDisabled: border_colors.borderBaseDisabled,
  borderAutofilled: border_colors.borderBasePrimary,
  controlBorder: border_colors.borderBaseFormsControl,
  controlBorderSelected: border_colors.borderStrongPrimary,
  controlBorderDisabled: border_colors.borderBaseDisabled,
  controlBackgroundUnselected: 'transparent',
  controlBackgroundDisabled:
    background_colors.backgroundBaseFormsControlDisabled,
  colorHasPlaceholder: text_colors.textSubdued,
  colorDisabled: text_colors.textDisabled,
  iconDisabled: text_colors.textDisabled,
};

const _dark_forms = {
  ..._forms,
  background: dark_background_colors.backgroundBasePlain,
  backgroundDisabled: dark_background_colors.backgroundBaseDisabled,
  backgroundReadOnly: dark_background_colors.backgroundBasePlain,
  backgroundFocused: dark_background_colors.backgroundBasePlain,
  backgroundAutofilled: dark_background_colors.backgroundBasePrimary,
  prependBackground: dark_background_colors.backgroundBaseFormsPrepend,
  border: dark_border_colors.borderBasePlain,
  borderDisabled: dark_border_colors.borderBaseDisabled,
  borderAutofilled: dark_border_colors.borderBasePrimary,
  controlBorder: dark_border_colors.borderBaseFormsControl,
  controlBorderSelected: dark_border_colors.borderStrongPrimary,
  controlBorderDisabled: dark_border_colors.borderBaseDisabled,
  controlBackgroundUnselected: 'transparent',
  controlBackgroundDisabled:
    dark_background_colors.backgroundBaseFormsControlDisabled,
  colorHasPlaceholder: dark_text_colors.textSubdued,
  colorDisabled: dark_text_colors.textDisabled,
  iconDisabled: dark_text_colors.textDisabled,
};

export const forms = {
  maxWidth: computed(
    ([base]) => mathWithUnits(base, (x) => x * 25),
    ['size.base']
  ),
  LIGHT: _forms,
  DARK: _dark_forms,
};
