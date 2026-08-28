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
   * @deprecated - use a semantic token instead (e.g. `inline`, `control` or `panel`)
   * Primary corner radius size
   * - Default value: 4px
   */
  medium: CSSProperties['borderRadius'];
  /**
   * @deprecated - use a semantic token instead (e.g. `inline`, `control` or `panel`)
   * Small corner radius size
   * - Default value: 4px
   */
  small: CSSProperties['borderRadius'];
  /**
   * Inline or text-adjacent content (e.g. skeleton bars, swatches, inline code)
   * - Default value: 4px
   */
  inline: CSSProperties['borderRadius'];
  /**
   * Controls and form elements (e.g. buttons, inputs)
   * - Default value: 8px
   */
  control: CSSProperties['borderRadius'];
  /**
   * Panels, cards, and popovers
   * - Default value: 12px
   */
  panel: CSSProperties['borderRadius'];
  /**
   * App or layout layer (e.g. framed shell, side nav)
   * - Default value: 16px
   */
  frame: CSSProperties['borderRadius'];
}

export interface _EuiThemeBorderColorValues {
  /**
   * Color for all borders; Default is `colors.lightShade`.
   * In high contrast mode, this value becomes `colors.fullShade` and cannot be overridden.
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
