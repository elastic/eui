import React from 'react';

export const EuiRangeSlider = (
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
    ...rest
  }
) => (
  <input
    type="range"
    id={id}
    name={name}
    className={className}
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
