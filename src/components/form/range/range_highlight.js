import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export const EuiRangeHighlight = ({
  hasFocus,
  showTicks,
  lowerValue,
  upperValue,
  max,
  min,
}) => {
  // Calculate the width the range based on value
  // const rangeWidth = (value - min) / (max - min);
  const leftPosition = (lowerValue - min) / (max - min);
  const rangeWidth = (upperValue - lowerValue) / (max - min);
  const rangeWidthStyle = {
    marginLeft: `${leftPosition * 100}%`,
    width: `${rangeWidth * 100}%`,
  };

  const classes = classNames('euiRangeHighlight', {
    'euiRangeHighlight--hasTicks': showTicks,
  });

  const progressClasses = classNames('euiRangeHighlight__progress', {
    'euiRangeHighlight__progress--hasFocus': hasFocus,
  });

  return (
    <div className={classes}>
      <div className={progressClasses} style={rangeWidthStyle} />
    </div>
  );
};

EuiRangeHighlight.propTypes = {
  hasFocus: PropTypes.bool,
  showTicks: PropTypes.bool,
  lowerValue: PropTypes.number.isRequired,
  upperValue: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  min: PropTypes.number.isRequired,
};
