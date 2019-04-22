import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export const EuiColorPickerSwatch = ({
  className,
  color,
  ...rest,
}) => {
  const classes = classNames('euiColorPickerSwatch', className);

  return (
    <button
      className={classes}
      style={{ background: color }}
      {...rest}
    />
  );
};

EuiColorPickerSwatch.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  color: PropTypes.string,
};
