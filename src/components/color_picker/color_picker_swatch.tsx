import React, { ButtonHTMLAttributes, Ref, forwardRef } from 'react';
import classNames from 'classnames';

import { CommonProps, Omit } from '../common';

export type EuiColorPickerSwatchProps = CommonProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'color'> & {
    color?: string;
  };

export const EuiColorPickerSwatch = forwardRef(
  (
    { className, color, style, ...rest }: EuiColorPickerSwatchProps,
    ref: Ref<HTMLButtonElement>
  ) => {
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
  }
);
