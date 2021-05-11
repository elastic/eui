/*
 * Licensed to Elasticsearch B.V. under one or more contributor
 * license agreements. See the NOTICE file distributed with
 * this work for additional information regarding copyright
 * ownership. Elasticsearch B.V. licenses this file to you under
 * the Apache License, Version 2.0 (the "License"); you may
 * not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
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
