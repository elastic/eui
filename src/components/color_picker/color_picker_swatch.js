import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { EuiColorPickerEmptySwatch } from './color_picker_empty_swatch';

export const EuiColorPickerSwatch = ({
  color,
  className,
  ...rest
}) => {
  const isClear = !color;
  const classes = classNames('euiColorPicker__swatch', className, {
    'euiColorPicker__emptySwatch': isClear,
  });
  let children;

  if (isClear) {
    children = <EuiColorPickerEmptySwatch />;
  }

  return (
    <div
      className={classes}
      data-test-subj="colorSwatch"
      style={{ background: color ? color : '' }}
      {...rest}
    >
      {children}
    </div>
  );
};

EuiColorPickerSwatch.propTypes = {
  className: PropTypes.string,
  color: PropTypes.string,
};
