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
  /**
   * Shows static min/max labels on the sides of the range slider
   */
  showLabels: PropTypes.bool,
  /**
   * Displays an extra input control for direct manipulation
   */
  showInput: PropTypes.bool,
  /**
   * Shows clickable tick marks and labels at the given interval (`step`/`tickInterval`)
   */
  showTicks: PropTypes.bool,
  /**
   * Create colored indicators for certain intervals
   */
  levels: PropTypes.arrayOf(
    PropTypes.shape({
      min: PropTypes.number,
      max: PropTypes.number,
      color: PropTypes.oneOf(LEVEL_COLORS),
    }),
  ),
  /**
   * Shows a thick line from min to value
   */
  showRange: PropTypes.bool,
  /**
   * Shows a tooltip styled value
   */
  showValue: PropTypes.bool,
};

EuiRangeWrapper.defaultProps = {
  fullWidth: false,
  compressed: false,
  showLabels: false,
  showInput: false,
  showTicks: false,
  showValue: false,
  levels: [],
};
