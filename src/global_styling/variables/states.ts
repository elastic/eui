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
 *       They have yet to be used/tested.
 */

export interface _EuiThemeFocusOutline {
  /**
   * A single CSS property: value
   */
  [key: string]: ColorModeSwitch;
}

export interface _EuiThemeFocus {
  /**
   * Color is used deterministically by the legacy theme, and as fallback for Amsterdam
   */
  color: ColorModeSwitch;
  /**
   * Used to transprentize any color at certain values
   */
  transparency: ColorModeSwitch<number>;
  /**
   * Default color plus transparency
   */
  backgroundColor: ColorModeSwitch;
  /**
   * Width is the thickness of the outline or faux ring
   */
  width: CSSProperties['borderWidth'];
  /**
   * Larger thickness of the outline for larger components
   */
  widthLarge: CSSProperties['borderWidth'];
  /**
   * Using `outline` is new for Amsterdam but is set to `none` in legacy theme
   */
  outline: _EuiThemeFocusOutline;
}
