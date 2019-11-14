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
    compressed?: boolean;
    hasFocus?: boolean;
    showRange?: boolean;
    showTicks?: boolean;
    disabled?: boolean;
    tabIndex?: number;
    onChange?: ChangeEventHandler<HTMLInputElement>;
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
        value={value}
        disabled={disabled}
        onChange={onChange}
        style={style}
        tabIndex={tabIndex}
        {...rest}
      />
    );
  }
);
