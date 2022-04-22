/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, {
  ChangeEventHandler,
  InputHTMLAttributes,
  forwardRef,
} from 'react';
import classNames from 'classnames';

import { CommonProps } from '../../common';

export type EuiRangeSliderProps = InputHTMLAttributes<HTMLInputElement> &
  CommonProps & {
    id?: string;
    name?: string;
    min: number;
    max: number;
    step?: number;
    sliderDefaultValue?: number;
    compressed?: boolean;
    isLoading?: boolean;
    hasFocus?: boolean;
    showRange?: boolean;
    showTicks?: boolean;
    disabled?: boolean;
    tabIndex?: number;
    onChange?: ChangeEventHandler<HTMLInputElement>;
  };

const sliderDefaultValueCalc = (
  min: number,
  max: number,
  sliderDefaultValue: number | undefined
) => {
  if (sliderDefaultValue === undefined || sliderDefaultValue < min) {
    return min;
  }
  if (sliderDefaultValue > max) {
    return max;
  }
  if (sliderDefaultValue >= min && sliderDefaultValue <= max) {
    return sliderDefaultValue;
  }
};

export const EuiRangeSlider = forwardRef<HTMLInputElement, EuiRangeSliderProps>(
  (
    {
      className,
      disabled,
      id,
      max,
      min,
      name,
      step,
      sliderDefaultValue,
      onChange,
      tabIndex,
      value,
      style,
      showTicks,
      showRange,
      hasFocus,
      compressed,
      ...rest
    },
    ref
  ) => {
    const classes = classNames(
      'euiRangeSlider',
      {
        'euiRangeSlider--hasTicks': showTicks,
        'euiRangeSlider--hasFocus': hasFocus,
        'euiRangeSlider--hasRange': showRange,
        'euiRangeSlider--compressed': compressed,
      },
      className
    );
    return (
      <input
        ref={ref}
        type="range"
        id={id}
        name={name}
        className={classes}
        min={min}
        max={max}
        step={step}
        value={
          value === ''
            ? sliderDefaultValueCalc(min, max, sliderDefaultValue)
            : value
        }
        disabled={disabled}
        onChange={onChange}
        style={style}
        tabIndex={tabIndex}
        {...rest}
      />
    );
  }
);

EuiRangeSlider.displayName = 'EuiRangeSlider';
