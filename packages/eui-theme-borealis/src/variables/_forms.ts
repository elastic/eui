/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */
import { computed, mathWithUnits } from '@elastic/eui-theme-common';

const _forms = {
  background: computed(
    ([backgroundBasePlain]) => backgroundBasePlain,
    ['colors.backgroundBasePlain']
  ),
  backgroundDisabled: computed(
    ([backgroundBaseDisabled]) => backgroundBaseDisabled,
    ['colors.backgroundBaseDisabled']
  ),
  backgroundReadOnly: computed(
    ([backgroundBasePlain]) => backgroundBasePlain,
    ['colors.backgroundBasePlain']
  ),
  backgroundFocused: computed(
    ([backgroundBasePlain]) => backgroundBasePlain,
    ['colors.backgroundBasePlain']
  ),
  backgroundAutofilled: computed(
    ([backgroundBasePrimary]) => backgroundBasePrimary,
    ['colors.backgroundBasePrimary']
  ),
  prependBackground: computed(
    ([backgroundBaseFormsPrepend]) => backgroundBaseFormsPrepend,
    ['colors.backgroundBaseFormsPrepend']
  ),
  border: computed(
    ([borderBasePlain]) => borderBasePlain,
    ['colors.borderBasePlain']
  ),
  borderDisabled: computed(
    ([borderBaseDisabled]) => borderBaseDisabled,
    ['colors.borderBaseDisabled']
  ),
  borderAutofilled: computed(
    ([borderBasePrimary]) => borderBasePrimary,
    ['colors.borderBasePrimary']
  ),
  controlBorder: computed(
    ([borderBaseFormsControl]) => borderBaseFormsControl,
    ['colors.borderBaseFormsControl']
  ),
  controlBorderSelected: computed(
    ([borderStrongPrimary]) => borderStrongPrimary,
    ['colors.borderStrongPrimary']
  ),
  controlBorderDisabled: computed(
    ([borderBaseDisabled]) => borderBaseDisabled,
    ['colors.borderBaseDisabled']
  ),
  controlBackgroundUnselected: 'transparent',
  controlBackgroundDisabled: computed(
    ([backgroundBaseFormsControlDisabled]) =>
      backgroundBaseFormsControlDisabled,
    ['colors.backgroundBaseFormsControlDisabled']
  ),
  colorHasPlaceholder: computed(
    ([textSubdued]) => textSubdued,
    ['colors.textSubdued']
  ),
  colorDisabled: computed(
    ([textDisabled]) => textDisabled,
    ['colors.textDisabled']
  ),
  iconDisabled: computed(
    ([textDisabled]) => textDisabled,
    ['colors.textDisabled']
  ),
};

const _dark_forms = {
  ..._forms,
};

export const forms = {
  maxWidth: computed(
    ([base]) => mathWithUnits(base, (x) => x * 25),
    ['size.base']
  ),
  LIGHT: _forms,
  DARK: _dark_forms,
};
