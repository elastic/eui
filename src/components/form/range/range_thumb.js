import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export const EuiRangeThumb = ({
  min,
  max,
  value,
  disabled,
  showInput,
  showTicks,
  ...rest
}) => {
  const classes = classNames('euiRangeThumb', {
    'euiRangeThumb--hasTicks': showTicks,
  });
  return (
    <div
      className={classes}
      role="slider"
      aria-valuemin={min}
      aria-valuemax={max}
      aria-valuenow={Number(value)}
      aria-disabled={!!disabled}
      tabIndex={showInput || !!disabled ? '-1' : '0'}
      {...rest}
    />
  );
};

EuiRangeThumb.propTypes = {
  min: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  showInput: PropTypes.bool,
  showTicks: PropTypes.bool,
};
