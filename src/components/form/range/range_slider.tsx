import React, {
  FunctionComponent,
  InputHTMLAttributes,
  Ref,
  forwardRef,
} from 'react';
import classNames from 'classnames';

import { CommonProps, Omit } from '../../common';

interface InputOverrides {
  value?: number | number[] | string | string[];
}
export type EuiRangeSliderProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  keyof InputOverrides
> &
  CommonProps &
  InputOverrides & {
    min: number;
    max: number;
    hasFocus?: boolean;
    showRange?: boolean;
    showTicks?: boolean;
  };

export const EuiRangeSlider: FunctionComponent<
  EuiRangeSliderProps
> = forwardRef(
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
      ...rest
    },
    ref: Ref<HTMLInputElement>
  ) => {
    const classes = classNames(
      'euiRangeSlider',
      {
        'euiRangeSlider--hasTicks': showTicks,
        'euiRangeSlider--hasFocus': hasFocus,
        'euiRangeSlider--hasRange': showRange,
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
