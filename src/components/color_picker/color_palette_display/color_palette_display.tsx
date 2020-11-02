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
import { CommonProps } from '../../common';
import { ColorStop } from '../color_stops';
import { EuiColorPaletteDisplayFixed } from './color_palette_display_fixed';
import { EuiColorPaletteDisplayGradient } from './color_palette_display_gradient';

export type EuiColorPaletteDisplayProps = CommonProps & {
  /**
   *  Specify the type of palette. `gradient`: each color fades into the next. `fixed`: individual color blocks
   */
  type?: 'gradient' | 'fixed';
  /**
   * Array of color `strings` or an array of #ColorStop. The stops must be numbers in an ordered range.
   */
  palette: string[] | ColorStop[];
};

export const EuiColorPaletteDisplay: FunctionComponent<EuiColorPaletteDisplayProps> = ({
  type = 'fixed',
  palette,
  className,
  ...rest
}) => {
  const classes = classnames('euiColorPaletteDisplay', className);

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
