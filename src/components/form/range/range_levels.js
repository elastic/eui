import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export const LEVEL_COLORS = ['primary', 'success', 'warning', 'danger'];

export const EuiRangeLevels = ({ levels, max, min, showTicks }) => {
  const classes = classNames('euiRangeLevels', {
    'euiRangeLevels--hasTicks': showTicks
  });
  return (
    <div className={classes}>
      {levels.map((level, index) => {
        const range = level.max - level.min;
        const width = (range / (max - min)) * 100;

        return (
          <span key={index} style={{ width: `${width}%` }} className={`euiRangeLevel euiRangeLevel--${level.color}`} />
        );
      })}
    </div>
  );
};

EuiRangeLevels.propTypes = {
  levels: PropTypes.arrayOf(
    PropTypes.shape({
      min: PropTypes.number,
      max: PropTypes.number,
      color: PropTypes.oneOf(LEVEL_COLORS),
    }),
  ),
  max: PropTypes.number.isRequired,
  min: PropTypes.number.isRequired,
  showTicks: PropTypes.bool
};
