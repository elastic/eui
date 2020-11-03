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

import React, { FunctionComponent } from 'react';
import classnames from 'classnames';
import { ExclusiveUnion, keysOf } from '../../common';
import { ColorStop } from '../color_stops';
import {
  EuiColorPaletteDisplayFixed,
  EuiColorPaletteDisplayFixedProps,
} from './color_palette_display_fixed';
import {
  EuiColorPaletteDisplayGradient,
  EuiColorPaletteDisplayGradientProps,
} from './color_palette_display_gradient';

const sizeToClassNameMap = {
  xs: 'euiColorPaletteDisplay--sizeExtraSmall',
  s: 'euiColorPaletteDisplay--sizeSmall',
  m: 'euiColorPaletteDisplay--sizeMedium',
};

export const SIZES = keysOf(sizeToClassNameMap);

export type EuiColorPaletteDisplaySize = keyof typeof sizeToClassNameMap;

export interface EuiColorPaletteDisplayShared {
  /**
   * Array of color `strings` or an array of #ColorStop. The stops must be numbers in an ordered range.
   */
  palette: string[] | ColorStop[];
}

interface DisplayGradient extends EuiColorPaletteDisplayGradientProps {
  /**
   *   Specify the type of palette.
   *  `gradient`: each color fades into the next.
   */
  type: 'gradient';
}

interface DisplayFixed extends EuiColorPaletteDisplayFixedProps {
  /**
   *  `fixed`: individual color blocks.
   */
  type?: 'fixed';
}

export type EuiColorPaletteDisplayProps = {
  /**
   * Height of the palette display
   */
  size?: EuiColorPaletteDisplaySize;
} & ExclusiveUnion<DisplayFixed, DisplayGradient>;

export const EuiColorPaletteDisplay: FunctionComponent<EuiColorPaletteDisplayProps> = ({
  type = 'fixed',
  palette,
  className,
  size = 's',
  ...rest
}) => {
  const classes = classnames(
    'euiColorPaletteDisplay',
    className,
    sizeToClassNameMap[size]
  );

  return (
    <>
      {type === 'fixed' ? (
        <EuiColorPaletteDisplayFixed
          className={classes}
          palette={palette}
          {...rest}
        />
      ) : (
        <EuiColorPaletteDisplayGradient
          className={classes}
          palette={palette}
          {...rest}
        />
      )}
    </>
  );
};
