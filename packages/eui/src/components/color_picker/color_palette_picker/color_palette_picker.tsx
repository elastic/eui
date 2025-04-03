/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, {
  FunctionComponent,
  ReactNode,
  useCallback,
  useMemo,
} from 'react';

import { CommonProps } from '../../common';
import { EuiSpacer } from '../../spacer';
import { EuiText } from '../../text';
import {
  EuiSuperSelect,
  type EuiSuperSelectProps,
} from '../../form/super_select'; // Note: needs to be pointed at this specific subdir for Storybook to inherit types correctly??

import { EuiColorPaletteDisplay } from '../color_palette_display';
import { EuiFlexGroup, EuiFlexItem } from '../../flex';

export interface PaletteColorStop {
  stop: number;
  color: string;
}

export interface EuiColorPalettePickerPaletteTextProps extends CommonProps {
  /**
   *  For storing unique value of item
   */
  value: string;
  /**
   *  The name of your palette
   */
  title: string;
  /**
   * Node appended to right of title - disallowed for text-only options
   */
  append?: never;
  /**
   * `text`: a text only option (a title is required).
   */
  type: 'text';
  /**
   * Array of color `strings` or an array of {@link PaletteColorStop}. The stops must be numbers in an ordered range.
   */
  palette?: string[] | PaletteColorStop[];
}

export interface EuiColorPalettePickerPaletteFixedProps extends CommonProps {
  /**
   *  For storing unique value of item
   */
  value: string;
  /**
   *  The name of your palette
   */
  title?: string;
  /**
   * Node appended to right of title
   */
  append?: ReactNode;
  /**
   * `fixed`: individual color blocks
   */
  type: 'fixed';
  /**
   * Array of color `strings` or an array of {@link PaletteColorStop}. The stops must be numbers in an ordered range.
   */
  palette: string[] | PaletteColorStop[];
}

export interface EuiColorPalettePickerPaletteGradientProps extends CommonProps {
  /**
   *  For storing unique value of item
   */
  value: string;
  /**
   *  The name of your palette
   */
  title?: string;
  /**
   * Node appended to right of title
   */
  append?: ReactNode;
  /**
   * `gradient`: each color fades into the next
   */
  type: 'gradient';
  /**
   * Array of color `strings` or an array of {@link PaletteColorStop}. The stops must be numbers in an ordered range.
   */
  palette: string[] | PaletteColorStop[];
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
     * An array of one of the following objects: {@link EuiColorPalettePickerPaletteText}, {@link EuiColorPalettePickerPaletteFixed}, {@link EuiColorPalettePickerPaletteGradient}
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
  const getPalette = useCallback(
    ({
      type,
      palette,
      title,
    }:
      | EuiColorPalettePickerPaletteFixedProps
      | EuiColorPalettePickerPaletteGradientProps) => {
      return (
        <EuiColorPaletteDisplay type={type} palette={palette} title={title} />
      );
    },
    []
  );

  const paletteOptions = useMemo(
    () =>
      palettes.map((item: EuiColorPalettePickerPaletteProps) => {
        const { type, value, title, append, palette, ...rest } = item;
        const paletteForDisplay =
          item.type !== 'text' ? getPalette(item) : null;

        return {
          value: String(value),
          inputDisplay:
            selectionDisplay === 'title' || type === 'text'
              ? title
              : paletteForDisplay,
          dropdownDisplay: (
            <div className="euiColorPalettePicker__item">
              {title && type !== 'text' && (
                // Accessible labels are managed by color_palette_display_fixed and
                // color_palette_display_gradient. Adding the aria-hidden attribute
                // here to ensure screen readers don't speak the listbox options twice.
                <>
                  <EuiFlexGroup responsive={false}>
                    <EuiFlexItem>
                      <EuiText
                        aria-hidden="true"
                        className="euiColorPalettePicker__itemTitle"
                        size="xs"
                      >
                        {title}
                      </EuiText>
                    </EuiFlexItem>
                    {append && <EuiFlexItem grow={0}>{append}</EuiFlexItem>}
                  </EuiFlexGroup>
                  <EuiSpacer size="xs" />
                </>
              )}
              {type === 'text' ? title : paletteForDisplay}
            </div>
          ),
          ...rest,
        };
      }),
    [getPalette, palettes, selectionDisplay]
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
