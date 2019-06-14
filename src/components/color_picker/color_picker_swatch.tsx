import React, {
  ButtonHTMLAttributes,
  FunctionComponent,
  Ref,
  forwardRef,
} from 'react';
import classNames from 'classnames';

import { CommonProps, Omit } from '../common';

export type EuiColorPickerSwatchProps = CommonProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'color'> & {
    color?: string;
  };

export const EuiColorPickerSwatch: FunctionComponent<
  EuiColorPickerSwatchProps
> = forwardRef(({ className, color, ...rest }, ref: Ref<HTMLButtonElement>) => {
  const classes = classNames('euiColorPickerSwatch', className);

  return (
    <button
      type="button"
      className={classes}
      style={{ background: color ? color : 'transparent' }}
      ref={ref}
      {...rest}
    />
  );
});
