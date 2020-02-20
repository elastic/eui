import React, { ButtonHTMLAttributes, forwardRef, useMemo } from 'react';
import classNames from 'classnames';
import chroma from 'chroma-js';

import { CommonProps } from '../common';

export type EuiColorPickerSwatchProps = CommonProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'color'> & {
    color?: string;
  };

export const EuiColorPickerSwatch = forwardRef<
  HTMLButtonElement,
  EuiColorPickerSwatchProps
>(({ className, color, style, ...rest }, ref) => {
  const classes = classNames('euiColorPickerSwatch', className);
  const rgba = useMemo(
    () => (color && chroma.valid(color) ? chroma(color).rgba() : null),
    [color]
  );

  return (
    <button
      type="button"
      className={classes}
      style={{
        background: rgba ? `rgba(${rgba.join(',')})` : 'transparent',
        ...style,
      }}
      ref={ref}
      {...rest}
    />
  );
});
