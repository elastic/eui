import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export const EuiRange = ({ className, id, name, min, max, fullWidth, value, ...rest }) => {
  const classes = classNames(
    'euiRange',
    {
      'euiRange--fullWidth': fullWidth,
    },
    className
  );

  return (
    <input
      type="range"
      id={id}
      name={name}
      className={classes}
      min={min}
      max={max}
      value={value}
      {...rest}
    />
  );
};

EuiRange.propTypes = {
  name: PropTypes.string,
  id: PropTypes.string,
  min: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  value: PropTypes.string,
  fullWidth: PropTypes.bool,
};

EuiRange.defaultProps = {
  min: 1,
  max: 100,
  fullWidth: false,
};
