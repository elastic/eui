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

import { EuiSuperSelect } from '../../form';

import { CommonProps } from '../../common';

import { getLinearGradient, getFixedLinearGradient } from '../utils';
import { ColorStop } from '../color_stops';

import { EuiSuperSelectProps } from '../../form/super_select';

export interface EuiColorPalettePickerPaletteTextProps {
  /**
   *  For storing unique value of item
   */
  value: string;
  /**
   *  The name of your palette
   */
  title: string;
  /**
   * `text`: a text only option (a title is required).
   */
  type: 'text';
  /**
   * Array of color `strings` or `ColorStops` in the form of
   * `{ stop: number, color: string }`. The stops must be numbers in an ordered range.
   */
  palette?: string[] | ColorStop[];
}

export interface EuiColorPalettePickerPaletteFixedProps {
  /**
   *  For storing unique value of item
   */
  value: string;
  /**
   *  The name of your palette
   */
  title?: string;
  /**
   * `fixed`: individual color blocks
   */
  type: 'fixed';
  /**
   * Array of color `strings`.
   */
  palette: string[];
}

export interface EuiColorPalettePickerPaletteGradientProps {
  /**
   *  For storing unique value of item
   */
  value: string;
  /**
   *  The name of your palette
   */
  title?: string;
  /**
   * `gradient`: each color fades into the next
   */
  type: 'gradient';
  /**
   * Array of color `strings` or `ColorStops` in the form of
   * `{ stop: number, color: string }`. The stops must be numbers in an ordered range.
   */
  palette: string[] | ColorStop[];
}

export type EuiColorPalettePickerPaletteProps =
  | EuiColorPalettePickerPaletteTextProps
  | EuiColorPalettePickerPaletteFixedProps
  | EuiColorPalettePickerPaletteGradientProps;

export type EuiColorPalettePickerProps<T extends string> = CommonProps &
  Omit<
    EuiSuperSelectProps<T>,
    'options' | 'itemLayoutAlign' | 'hasDividers'
  > & {
    /**
     *  Specify what should be displayed after a selection: a `palette` or `title`
     */
    selectionDisplay?: 'palette' | 'title';

    /**
     * An array of one of the following objects: #EuiColorPalettePickerPaletteText, #EuiColorPalettePickerPaletteFixed, #EuiColorPalettePickerPaletteGradient
     */
    palettes: EuiColorPalettePickerPaletteProps[];
  };

export const EuiColorPalettePicker: FunctionComponent<
  EuiColorPalettePickerProps<string>
> = ({
  className,
  compressed = false,
  disabled,
  fullWidth = false,
  isInvalid = false,
  onChange,
  readOnly = false,
  valueOfSelected,
  palettes,
  append,
  prepend,
  selectionDisplay = 'palette',
  ...rest
}) => {
  const getPalette = (
    item:
      | EuiColorPalettePickerPaletteFixedProps
      | EuiColorPalettePickerPaletteGradientProps
  ) => {
    const background =
      item.type === 'fixed'
        ? getFixedLinearGradient(item.palette)
        : getLinearGradient(item.palette);

    return (
      <div
        className="euiColorPalettePicker__itemGradient"
        style={{ background }}
      />
    );
  };

  const paletteOptions = palettes.map(
    (item: EuiColorPalettePickerPaletteProps) => {
      const paletteForDisplay = item.type !== 'text' ? getPalette(item) : null;
      return {
        value: String(item.value),
        inputDisplay:
          selectionDisplay === 'title' || item.type === 'text'
            ? item.title
            : paletteForDisplay,
        dropdownDisplay: (
          <div className="euiColorPalettePicker__item">
            {item.title && item.type !== 'text' && (
              <div className="euiColorPalettePicker__itemTitle">
                {item.title}
              </div>
            )}
            {item.type === 'text' ? item.title : paletteForDisplay}
          </div>
        ),
      };
    }
  );

  return (
    <EuiSuperSelect
      className={className}
      options={paletteOptions}
      valueOfSelected={valueOfSelected}
      onChange={onChange}
      hasDividers
      isInvalid={isInvalid}
      compressed={compressed}
      disabled={disabled}
      readOnly={readOnly}
      fullWidth={fullWidth}
      append={append}
      prepend={prepend}
      {...rest}
    />
  );
};
