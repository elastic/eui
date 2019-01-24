import React from 'react';
// import PropTypes from 'prop-types';

export const EuiRangeHighlight = props => {
  const {
    lowerValue,
    upperValue,
    max,
    min,
  } = props;

  // Calculate the width the range based on value
  // const rangeWidth = (value - min) / (max - min);
  const leftPosition = (lowerValue - min) / (max - min);
  const rangeWidth = (upperValue - lowerValue) / (max - min);
  const rangeWidthStyle = {
    marginLeft: `${leftPosition * 100}%`,
    width: `${rangeWidth * 100}%`
  };

  return (
    <div className="euiRange__range">
      <div className="euiRange__range__progress" style={rangeWidthStyle} />
    </div>
  );
};
