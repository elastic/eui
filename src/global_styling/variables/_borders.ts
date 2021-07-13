/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { CSSProperties } from 'react';
import { ColorModeSwitch } from '../../services/theme/types';
import { computed } from '../../services/theme/utils';
import { sizeToPixel } from './_size';

export interface _EuiThemeBorderValues {
  /**
   * Color for all borders; Default is `colors.lightShade`
   */
  color: ColorModeSwitch;
  /**
   * Thinnest width for border
   */
  widthThin: CSSProperties['borderWidth'];
  /**
   * Thickest width for border
   */
  widthThick: CSSProperties['borderWidth'];
  /**
   * Main corner radius size
   */
  radius: CSSProperties['borderRadius'];
  /**
   * Small corner radius size
   */
  radiusSmall: CSSProperties['borderRadius'];
}

export interface _EuiThemeBorderTypes {
  /**
   * Full `border` property string computed using `border.widthThin` and `border.color`
   */
  thin: CSSProperties['border'];
  /**
   * Full `border` property string computed using `border.widthThick` and `border.color`
   */
  thick: CSSProperties['border'];
  /**
   * Full editable style `border` property string computed using `border.widthThick` and `border.color`
   */
  editable: CSSProperties['border'];
}

export type EuiThemeBorder = _EuiThemeBorderValues & _EuiThemeBorderTypes;

export const border: EuiThemeBorder = {
  color: computed(([lightShade]) => lightShade, ['colors.lightShade']),
  widthThin: '1px',
  widthThick: '2px',
  radius: computed(sizeToPixel(0.25)),
  radiusSmall: computed(sizeToPixel(0.125)),
  thin: computed(([widthThin, color]) => `${widthThin} solid ${color}`, [
    'border.widthThin',
    'border.color',
  ]),
  thick: computed(([widthThick, color]) => `${widthThick} solid ${color}`, [
    'border.widthThick',
    'border.color',
  ]),
  editable: computed(([widthThick, color]) => `${widthThick} dotted ${color}`, [
    'border.widthThick',
    'border.color',
  ]),
};
