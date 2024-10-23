/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */
import { SEMANTIC_COLORS } from './colors/_semantic_colors';
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
  backgroundFocused: background_colors.backgroundBasePlain,
  backgroundAutofilled: background_colors.backgroundBasePrimary,
  prependBackground: SEMANTIC_COLORS.shade15,
  border: border_colors.borderBasePlain,
  borderAutofilled: border_colors.borderBasePrimary,
  controlBorder: border_colors.borderBaseText,
  controlBorderSelected: border_colors.borderBasePrimary,
  controlBorderDisabled: border_colors.borderBaseDisabled,
  controlBackgroundUnselected: background_colors.backgroundBasePlain,
  colorHasPlaceholder: text_colors.textSubdued,
  colorDisabled: text_colors.textDisabled,
  iconDisabled: text_colors.textDisabled,
};

const _dark_forms = {
  ..._forms,
  background: dark_background_colors.backgroundBasePlain,
  backgroundDisabled: dark_background_colors.backgroundBaseDisabled,
  backgroundFocused: dark_background_colors.backgroundBasePlain,
  backgroundAutofilled: dark_background_colors.backgroundBasePrimary,
  prependBackground: SEMANTIC_COLORS.shade130,
  border: dark_border_colors.borderBasePlain,
  borderAutofilled: dark_border_colors.borderBasePrimary,
  controlBorder: dark_border_colors.borderBaseText,
  controlBorderSelected: dark_border_colors.borderBasePrimary,
  controlBorderDisabled: dark_border_colors.borderBaseDisabled,
  controlBackgroundUnselected: dark_background_colors.backgroundBasePlain,
  colorHasPlaceholder: dark_text_colors.textSubdued,
  colorDisabled: dark_text_colors.textDisabled,
  iconDisabled: dark_text_colors.textDisabled,
};

export const forms = {
  LIGHT: _forms,
  DARK: _dark_forms,
};
