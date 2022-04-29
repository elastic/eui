/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { computed } from '../../../../services/theme/utils';
import { transparentize } from '../../../../services/color';
import { _EuiThemeFocus } from '../../../../global_styling/variables/states';
import { sizeToPixel } from '../../../../global_styling/functions/size';

/**
 * NOTE: These were quick conversions of their Sass counterparts.
 *       They have yet to be used/tested.
 */

export const focus: _EuiThemeFocus = {
  color: 'currentColor',
  transparency: { LIGHT: 0.9, DARK: 0.7 },
  backgroundColor: computed(({ colors, focus }) =>
    transparentize(colors.primary, focus!.transparency)
  ),

  // Sizing
  widthLarge: computed(sizeToPixel(0.25)),
  width: computed(sizeToPixel(0.125)),

  // Outline
  outline: {
    outline: computed(({ focus }) => `${focus!.width} solid ${focus!.color}`),
  },
};
