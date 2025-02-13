/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { CSSProperties } from 'react';
import { ColorModeSwitch } from '../../services/theme/types';

export interface _EuiThemeFocus {
  /**
   * Default color of the focus ring, some components may override this property
   * - Default value: currentColor
   */
  color: ColorModeSwitch;
  /**
   * Thickness of the outline
   * - Default value: 2px
   */
  width: CSSProperties['borderWidth'];
  /**
   * Used to transparentize the focus background color
   * - Default value: { LIGHT: 0.1, DARK: 0.2 }
   */
  transparency: ColorModeSwitch<number>;
  /**
   * Default focus background color. Not all components set a background color on focus
   * - Default value: `colors.primary` computed with `focus.transparency`
   */
  backgroundColor: ColorModeSwitch;
}
