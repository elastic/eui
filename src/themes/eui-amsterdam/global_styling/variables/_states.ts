/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { computed } from '../../../../services/theme/utils';
import { transparentize } from '../../../../services/color';
import {
  focus,
  _EuiThemeFocus,
} from '../../../../global_styling/variables/_states';

/**
 * NOTE: These were quick conversions of their Sass counterparts.
 *       They have yet to be used/tested.
 */

export const focus_ams: _EuiThemeFocus = {
  ...focus,
  color: 'currentColor',
  transparency: { LIGHT: 0.9, DARK: 0.7 },
  backgroundColor: computed(({ colors, focus }) =>
    transparentize(colors.primary, focus!.transparency)
  ),

  // Outline
  outline: {
    outline: computed(({ focus }) => `${focus!.width} solid ${focus!.color}`),
  },
};
