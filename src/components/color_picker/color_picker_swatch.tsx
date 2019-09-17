import React, { ButtonHTMLAttributes, forwardRef } from 'react';
import classNames from 'classnames';

import { CommonProps, Omit } from '../common';

export type EuiColorPickerSwatchProps = CommonProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'color'> & {
    color?: string;
  };

export const EuiColorPickerSwatch = forwardRef<
  HTMLButtonElement,
  EuiColorPickerSwatchProps
>(({ className, color, style, ...rest }, ref) => {
  const classes = classNames('euiColorPickerSwatch', className);

  return (
    <button
      type="button"
      className={classes}
      style={{ background: color ? color : 'transparent', ...style }}
      ref={ref}
      {...rest}
    />
  );
});
