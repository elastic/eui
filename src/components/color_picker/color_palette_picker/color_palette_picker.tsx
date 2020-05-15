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

import { EuiText } from '../../text';

import { EuiFlexGroup, EuiFlexItem } from '../../flex';
import { CommonProps } from '../../common';

import { getLinearGradient, getFixedLinearGradient } from '../utils';
import { ColorStop } from '../color_stops';

import { EuiSuperSelectProps } from '../../form/super_select';

export interface EuiColorPalettePickerPaletteProps {
  /**
   *  A unique value
   */
  value: string;
  /**
   *  The name of your palette
   */
  title?: string;
  /**
   * Specify if the palette is
   * `fixed`: individual color blocks; or
   * `gradient`: each color fades into the next; or
   * `text`: a text only option (a title is required).
   */
  type: 'fixed' | 'gradient' | 'text';
  /**
   * Array of color `strings` or `ColorStops` in the form of
   * { stop: number, color: string }
   */
  palette?: string[] | ColorStop[];
}

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
     * An array of #EuiColorPalettePickerPalette objects
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
  const getPalette = (palette: [], type: string) => {
    const background =
      type === 'fixed'
        ? getFixedLinearGradient(palette)
        : getLinearGradient(palette);

    return (
      <div
        className="euiColorPalettePicker__colorContainer"
        style={{ background }}
      />
    );
  };

  const getText = (title: any) => title;

  const getInputDisplay = (title: string, palette: [], type: string) => {
    if (selectionDisplay === 'title') {
      return getText(title);
    } else {
      return type === 'text' ? getText(title) : getPalette(palette, type);
    }
  };

  const paletteOptions = palettes.map((item: any) => {
    return {
      value: String(item.value),
      inputDisplay: getInputDisplay(item.title, item.palette, item.type),
      dropdownDisplay: (
        <EuiFlexGroup gutterSize="xs" direction="column">
          {item.title && item.type !== 'text' && (
            <EuiFlexItem>
              <EuiText
                size="xs"
                className="euiColorPalettePicker__paletteTitle">
                <span>{item.title}</span>
              </EuiText>
            </EuiFlexItem>
          )}
          <EuiFlexItem>
            {item.type !== 'text'
              ? getPalette(item.palette, item.type)
              : getText(item.title)}
          </EuiFlexItem>
        </EuiFlexGroup>
      ),
    };
  });

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
