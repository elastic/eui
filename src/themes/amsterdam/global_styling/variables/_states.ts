/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

/**
 * NOTE: These were quick conversions of their Sass counterparts.
 *       The commented out keys have not been established as necessary yet.
 */

import { computed } from '../../../../services/theme/utils';
import { _EuiThemeFocus } from '../../../../global_styling/variables/states';
import { sizeToPixel } from '../../../../global_styling/functions/size';

export const focus: _EuiThemeFocus = {
  color: 'currentColor',
  width: computed(sizeToPixel(0.125)),

  // transparency: { LIGHT: 0.9, DARK: 0.7 },
  // backgroundColor: computed(({ colors, focus }) =>
  //   transparentize(colors.primary, focus!.transparency)
  // ),

  // Outline
  // outline: {
  //   outline: computed(({ focus }) => `${focus!.width} solid ${focus!.color}`),
  // },
};
