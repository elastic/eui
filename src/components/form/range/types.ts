/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import type { ReactNode, CSSProperties, InputHTMLAttributes } from 'react';
import type { CommonProps } from '../../common';
import type { EuiFormControlLayoutProps } from '../form_control_layout';
import type { EuiRangeLevelColor } from './range_levels_colors';
import { EuiRangeInputProps } from './range_input';

/**
 * Internal type atoms split up both for easier categorization
 * and for easier reusing/picking
 */

export interface _SharedRangeValuesProps {
  max: number;
  min: number;
  /**
   * The number to increment or decrement between each interval
   * @default 1
   */
  step?: number;
}

export interface _SingleRangeValue extends _SharedRangeValuesProps {
  value: string | number;
  onChange?: (event: _SingleRangeChangeEvent, isValid: boolean) => void;
}
export interface _DualRangeValue extends _SharedRangeValuesProps {
  value: [_SingleRangeValue['value'], _SingleRangeValue['value']];
  onChange: (
    values: [_SingleRangeValue['value'], _SingleRangeValue['value']],
    isValid: boolean,
    event?: _DualRangeChangeEvent
  ) => void;
}
export interface _SharedRangesValues extends _SharedRangeValuesProps {
  value?: _SingleRangeValue['value'] | _DualRangeValue['value'];
}

export type _SingleRangeChangeEvent =
  | React.ChangeEvent<HTMLInputElement>
  | React.KeyboardEvent<HTMLInputElement>
  | React.MouseEvent<HTMLButtonElement>;
export type _DualRangeChangeEvent =
  | _SingleRangeChangeEvent
  | React.KeyboardEvent<HTMLDivElement>;

export interface _SharedRangeDataStructures {
  /**
   * Specified ticks at specified values
   */
  ticks?: EuiRangeTick[];
  /**
   * Modifies the number of tick marks and at what interval
   */
  tickInterval?: number;
  /**
   * Create colored indicators for certain intervals.
   * An array of #EuiRangeLevel objects
   */
  levels?: EuiRangeLevel[];
}

export interface _SharedRangeVisualConfiguration {
  /**
   * Pass `true` to displays an extra input control for direct manipulation.
   * Pass `"inputWithPopover"` to only show the input but show the range in a dropdown.
   */
  showInput?: boolean | 'inputWithPopover';
  /**
   * Shows static min/max labels on the sides of the range slider
   */
  showLabels?: boolean;
  /**
   * Shows a thick line from min to value
   */
  showRange?: boolean;
  /**
   * Shows clickable tick marks and labels at the given interval (`step`/`tickInterval`)
   */
  showTicks?: boolean;
}

export interface _SharedRangeInputProps {
  id?: string;
  name?: string;

  /**
   * Only impacts ticks rendered by `showTicks` or inputs rendered by `showInput`.
   */
  compressed?: boolean;
  /**
   * Only impacts inputs rendered by the `showInput` prop.
   * The range slider itself remains interactable unless `disabled` is applied.
   */
  readOnly?: boolean;
  /**
   * Disables both the range track and any input(s)
   */
  disabled?: boolean;
  /**
   * Expand to fill 100% of the parent.
   * Defaults to `fullWidth` prop of `<EuiForm>`.
   * @default false
   */
  fullWidth?: boolean;
  /**
   * Only impacts inputs rendered when the `showInput` prop is set to `"inputWithPopover"`
   */
  isLoading?: boolean;
  /**
   * Only impacts inputs rendered by the `showInput` prop
   */
  isInvalid?: boolean;
}

export type _SharedRangeInputSide = {
  /**
   * @default 'max'
   */
  side?: 'min' | 'max';
};

/**
 * Externally exported props types
 */

export interface EuiRangeProps
  extends CommonProps,
    Omit<
      InputHTMLAttributes<HTMLInputElement>,
      'value' | 'min' | 'max' | 'step' | 'onChange'
    >,
    _SingleRangeValue,
    _SharedRangeDataStructures,
    _SharedRangeVisualConfiguration,
    _SharedRangeInputProps {
  /**
   * Shows a tooltip styled value
   */
  showValue?: boolean;
  /**
   * Appends to the tooltip
   */
  valueAppend?: ReactNode;
  /**
   * Prepends to the tooltip
   */
  valuePrepend?: ReactNode;

  /**
   * Only impacts the input rendered by the `showInput` prop.
   * `string` | `ReactElement` or an array of these
   */
  prepend?: EuiFormControlLayoutProps['prepend'];
  /**
   * Only impacts the input rendered by the `showInput` prop.
   * `string` | `ReactElement` or an array of these
   */
  append?: EuiFormControlLayoutProps['append'];
}

export interface EuiDualRangeProps
  extends CommonProps,
    Omit<
      InputHTMLAttributes<HTMLInputElement>,
      'value' | 'min' | 'max' | 'step' | 'onChange'
    >,
    _DualRangeValue,
    _SharedRangeDataStructures,
    _SharedRangeVisualConfiguration,
    _SharedRangeInputProps {
  /**
   * Creates a draggble highlighted range area
   */
  isDraggable?: boolean;

  onBlur?: (
    event: React.FocusEvent<HTMLInputElement> | React.FocusEvent<HTMLDivElement>
  ) => void;
  onFocus?: (
    event: React.FocusEvent<HTMLInputElement> | React.FocusEvent<HTMLDivElement>
  ) => void;

  /**
   * Only impacts inputs rendered when the `showInput` prop is set to `"inputWithPopover"`.
   * `string` | `ReactElement` or an array of these
   */
  prepend?: EuiFormControlLayoutProps['prepend'];
  /**
   * Only impacts inputs rendered when the `showInput` prop is set to `"inputWithPopover"`.
   * `string` | `ReactElement` or an array of these
   */
  append?: EuiFormControlLayoutProps['append'];

  /**
   * Intended to be used with aria attributes. Some attributes may be overwritten.
   */
  minInputProps?: Partial<
    Omit<
      EuiRangeInputProps,
      | 'max'
      | 'min'
      | 'step'
      | 'compressed'
      | 'autoSize'
      | 'fullWidth'
      | 'controlOnly'
    >
  >;
  /**
   *  Intended to be used with aria attributes. Some attributes may be overwritten.
   */
  maxInputProps?: EuiDualRangeProps['minInputProps'];
}

export interface EuiRangeTick {
  value: number;
  label: ReactNode;
}

export interface EuiRangeLevel
  extends CommonProps,
    Pick<_SharedRangeValuesProps, 'min' | 'max'> {
  /**
   * Accepts one of `["primary", "success", "warning", "danger"]` or a valid CSS color value.
   */
  color: EuiRangeLevelColor | CSSProperties['color'];
}
