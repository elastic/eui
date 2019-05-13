import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export const LEVEL_COLORS = ['primary', 'success', 'warning', 'danger'];

export const EuiRangeLevels = ({ levels, max, min, showTicks }) => {
  const validateLevelIsInRange = level => {
    if (level.min < min) {
      throw new Error(
        `The level min of ${level.min} is lower than the min value of ${min}.`
      );
    }
    if (level.max > max) {
      throw new Error(
        `The level max of ${level.max} is higher than the max value of ${max}.`
      );
    }
  };

  const classes = classNames('euiRangeLevels', {
    'euiRangeLevels--hasTicks': showTicks,
  });

  return (
    <div className={classes}>
      {levels.map((level, index) => {
        validateLevelIsInRange(level);
        const range = level.max - level.min;
        const width = (range / (max - min)) * 100;

        return (
          <span
            key={index}
            style={{ width: `${width}%` }}
            className={`euiRangeLevel euiRangeLevel--${level.color}`}
          />
        );
      })}
    </div>
  );
};

EuiRangeLevels.propTypes = {
  levels: PropTypes.arrayOf(
    PropTypes.shape({
      min: PropTypes.number.isRequired,
      max: PropTypes.number.isRequired,
      color: PropTypes.oneOf(LEVEL_COLORS).isRequired,
    })
  ),
  max: PropTypes.number.isRequired,
  min: PropTypes.number.isRequired,
  showTicks: PropTypes.bool,
};
