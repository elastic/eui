/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { ColorModeSwitch } from '../../services/theme/types';
import { computed } from '../../services/theme/utils';
import { sizeToPixel } from '../../services/theme/size';
import { shade, tint, transparentize } from '../../services/color';
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

export const focus: _EuiThemeFocus = {
  color: computed(({ colors }) => transparentize(colors.primary, 0.3)),
  transparency: { LIGHT: 0.1, DARK: 0.3 },
  backgroundColor: {
    LIGHT: computed(
      ([primary, transparency]) => tint(primary, 1 - transparency),
      ['colors.primary', 'focus.transparency']
    ),
    DARK: computed(
      ([primary, transparency]) => shade(primary, 1 - transparency),
      ['colors.primary', 'focus.transparency']
    ),
  },

  // Sizing
  widthLarge: computed(sizeToPixel(0.25)),
  width: computed(sizeToPixel(0.125)),

  // Outline
  outline: {
    'box-shadow': computed(([color, width]) => `0 0 0 ${width} ${color}`, [
      'focus.color',
      'focus.width',
    ]),
  },
};
