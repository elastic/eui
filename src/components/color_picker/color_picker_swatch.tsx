import React, { ButtonHTMLAttributes, FunctionComponent } from 'react';
import classNames from 'classnames';

import { CommonProps, Omit } from '../common';

export type EuiColorPickerSwatchProps = CommonProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'color'> & {
    color?: string;
  };

export const EuiColorPickerSwatch: FunctionComponent<
  EuiColorPickerSwatchProps
> = ({ className, color, ...rest }) => {
  const classes = classNames('euiColorPickerSwatch', className);

  return (
    <button
      type="button"
      className={classes}
      style={{ background: color ? color : 'transparent' }}
      {...rest}
    />
  );
};
