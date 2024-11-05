/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import {
  computed,
  sizeToPixel,
  type _EuiThemeFocus,
} from '@elastic/eui-theme-common';

export const focus: _EuiThemeFocus = {
  // Focus ring
  color: computed(([textPrimary]) => textPrimary, ['colors.textPrimary']),
  width: computed(sizeToPixel(0.125)),
  // Focus background
  transparency: { LIGHT: 0.1, DARK: 0.2 },
  backgroundColor: computed(
    ([backgroundBaseInteractiveHover]) => backgroundBaseInteractiveHover,
    ['colors.backgroundBaseInteractiveHover']
  ),
};
