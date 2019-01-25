import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export const LEVEL_COLORS = ['primary', 'success', 'warning', 'danger'];

export const EuiRangeWrapper = ({
  children,
  compressed,
  disabled,
  fullWidth,
  showLabels,
  showTicks,
  levels,
  showRange,
  showValue,
}) => {

  const classes = classNames(
    'euiRange__wrapper',
    {
      'euiRange__wrapper--fullWidth': fullWidth,
      'euiRange__wrapper--compressed': compressed,
      'euiRange__wrapper--disabled': disabled,
      'euiRange__wrapper--hasLabels': showLabels,
      'euiRange__wrapper--hasLevels': levels.length,
      'euiRange__wrapper--hasRange': showRange,
      'euiRange__wrapper--hasTicks': showTicks,
      'euiRange__wrapper--hasValue': showValue,
    },
  );

  return (
    <div className={classes}>
      {children}
    </div>
  );
};

EuiRangeWrapper.propTypes = {
  fullWidth: PropTypes.bool,
  compressed: PropTypes.bool,
  showLabels: PropTypes.bool,
  showInput: PropTypes.bool,
  showTicks: PropTypes.bool,
  levels: PropTypes.array,
  showRange: PropTypes.bool,
  showValue: PropTypes.bool,
};
