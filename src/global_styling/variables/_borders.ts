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
import { sizeToPixel } from '../../services/theme/size';

export interface _EuiThemeBorderWidthValues {
  /**
   * Thinnest width for border
   */
  thin: CSSProperties['borderWidth'];
  /**
   * Thickest width for border
   */
  thick: CSSProperties['borderWidth'];
}

export interface _EuiThemeBorderRadiusValues {
  /**
   * Primary corner radius size
   */
  medium: CSSProperties['borderRadius'];
  /**
   * Small corner radius size
   */
  small: CSSProperties['borderRadius'];
}

export interface _EuiThemeBorderColorValues {
  /**
   * Color for all borders; Default is `colors.lightShade`
   */
  color: ColorModeSwitch;
}

export interface _EuiThemeBorderValues extends _EuiThemeBorderColorValues {
  /**
   * Varied thicknesses for borders
   */
  width: _EuiThemeBorderWidthValues;
  /**
   * Varied border radii
   */
  radius: _EuiThemeBorderRadiusValues;
}

export interface _EuiThemeBorderTypes {
  /**
   * Full `border` property string computed using `border.width.thin` and `border.color`
   */
  thin: CSSProperties['border'];
  /**
   * Full `border` property string computed using `border.width.thick` and `border.color`
   */
  thick: CSSProperties['border'];
  /**
   * Full editable style `border` property string computed using `border.width.thick` and `border.color`
   */
  editable: CSSProperties['border'];
}

export type EuiThemeBorder = _EuiThemeBorderValues & _EuiThemeBorderTypes;

export const border: EuiThemeBorder = {
  color: computed(([lightShade]) => lightShade, ['colors.lightShade']),
  width: {
    thin: '1px',
    thick: '2px',
  },
  radius: {
    medium: computed(sizeToPixel(0.25)),
    small: computed(sizeToPixel(0.125)),
  },
  thin: computed(([width, color]) => `${width.thin} solid ${color}`, [
    'border.width',
    'border.color',
  ]),
  thick: computed(([width, color]) => `${width.thick} solid ${color}`, [
    'border.width',
    'border.color',
  ]),
  editable: computed(([width, color]) => `${width.thick} dotted ${color}`, [
    'border.width',
    'border.color',
  ]),
};
