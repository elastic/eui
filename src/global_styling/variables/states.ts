/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { ColorModeSwitch } from '../../services/theme/types';
import { CSSProperties } from 'react';

/**
 * NOTE: These were quick conversions of their Sass counterparts.
 *       The commented out keys have not been established as necessary yet.
 */

export interface _EuiThemeFocusOutline {
  /**
   * A single CSS property: value
   */
  [key: string]: ColorModeSwitch;
}

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
   * Used to transparentize any color at certain values
   */
  // transparency: ColorModeSwitch<number>;
  /**
   * Default color plus transparency
   */
  // backgroundColor: ColorModeSwitch;
  /**
   * Using `outline` is new for Amsterdam but is set to `none` in legacy theme
   */
  // outline: _EuiThemeFocusOutline;
}
