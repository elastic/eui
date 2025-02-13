/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { CSSProperties } from 'react';
import { ColorModeSwitch } from '../../services/theme/types';

export interface _EuiThemeBorderWidthValues {
  /**
   * Thinnest width for border
   * - Default value: 1px
   */
  thin: CSSProperties['borderWidth'];
  /**
   * Thickest width for border
   * - Default value: 2px
   */
  thick: CSSProperties['borderWidth'];
}

export interface _EuiThemeBorderRadiusValues {
  /**
   * Primary corner radius size
   * - Default value: 6px
   */
  medium: CSSProperties['borderRadius'];
  /**
   * Small corner radius size
   * - Default value: 4px
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
   * - Default value: 1px solid [colors.lightShade]
   */
  thin: CSSProperties['border'];
  /**
   * Full `border` property string computed using `border.width.thick` and `border.color`
   * - Default value: 2px solid [colors.lightShade]
   */
  thick: CSSProperties['border'];
  /**
   * Full editable style `border` property string computed using `border.width.thick` and `border.color`
   * - Default value: 2px dotted [colors.lightShade]
   */
  editable: CSSProperties['border'];
}

export type _EuiThemeBorder = _EuiThemeBorderValues & _EuiThemeBorderTypes;
