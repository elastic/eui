import React, { FunctionComponent } from 'react';
import classNames from 'classnames';

export interface EuiRangeHighlightProps {
  hasFocus?: boolean;
  showTicks?: boolean;
  lowerValue: number;
  upperValue: number;
  max: number;
  min: number;
}

export const EuiRangeHighlight: FunctionComponent<EuiRangeHighlightProps> = ({
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
