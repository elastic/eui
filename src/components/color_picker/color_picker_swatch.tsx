import React, { HTMLAttributes, SFC } from 'react';
import classNames from 'classnames';
import { EuiColorPickerEmptySwatch } from './color_picker_empty_swatch';

export interface EuiColorPickerSwatchProps
  extends HTMLAttributes<HTMLDivElement> {
  color?: string;
}

export const EuiColorPickerSwatch: SFC<EuiColorPickerSwatchProps> = ({
  color,
  className,
  ...rest
}) => {
  const isClear = !color;
  const classes = classNames('euiColorPicker__swatch', className, {
    euiColorPicker__emptySwatch: isClear,
  });
  let children;

  if (isClear) {
    children = <EuiColorPickerEmptySwatch />;
  }

  return (
    <div
      className={classes}
      data-test-subj='colorSwatch'
      style={{ background: color ? color : '' }}
      {...rest}>
      {children}
    </div>
  );
};
