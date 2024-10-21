/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { computed } from '../../../../services/theme/utils';
import {
  darken,
  shade,
  tint,
  transparentize,
} from '../../../../services/color/manipulation';

const _forms = {
  background: computed(
    ([lightestShade]) => tint(lightestShade, 0.6),
    ['colors.lightestShade']
  ),
  backgroundDisabled: computed(
    ([lightestShade]) => darken(lightestShade, 0.05),
    ['colors.lightestShade']
  ),
  backgroundFocused: computed(
    ([emptyShade]) => emptyShade,
    ['colors.emptyShade']
  ),
  backgroundAutofilled: computed(
    ([primary]) => {
      const background = tint(primary, 0.8);
      return tint(background, 0.7);
    },
    ['colors.primary']
  ),
  prependBackground: computed(
    ([lightShade]) => tint(lightShade, 0.5),
    ['colors.lightShade']
  ),
  border: computed(
    ([lightShade]) => {
      const color = darken(lightShade, 4);
      return transparentize(color, 0.1);
    },
    ['colors.lightShade']
  ),
  borderAutofilled: computed(
    ([primaryText]) => transparentize(primaryText, 0.2),
    ['colors.primaryText']
  ),
  controlBorder: computed(
    ([lightestShade]) => shade(lightestShade, 0.4),
    ['colors.lightestShade']
  ),
  controlBackgroundUnselected: computed(
    ([emptyShade]) => emptyShade,
    ['colors.emptyShade']
  ),

  colorHasPlaceholder: computed(
    ([subduedText]) => tint(subduedText, 0.08),
    ['colors.subduedText']
  ),
  colorDisabled: computed(([lightShade]) => lightShade, ['colors.lightShade']),
};

const _dark_forms = {
  ..._forms,
  background: computed(
    ([lightestShade]) => shade(lightestShade, 0.4),
    ['colors.lightestShade']
  ),
  backgroundFocused: computed(
    ([emptyShade]) => shade(emptyShade, 0.4),
    ['colors.emptyShade']
  ),
  backgroundAutofilled: computed(
    ([primary]) => {
      const background = shade(primary, 0.7);
      return shade(background, 0.5);
    },
    ['colors.primary']
  ),
  prependBackground: computed(
    ([lightShade]) => shade(lightShade, 0.15),
    ['colors.lightShade']
  ),
  border: computed(([ghost]) => transparentize(ghost, 0.1), ['colors.ghost']),
  controlBorder: computed(
    ([lightestShade]) => tint(lightestShade, 0.31),
    ['colors.lightestShade']
  ),
};

export const forms = {
  LIGHT: _forms,
  DARK: _dark_forms,
};
