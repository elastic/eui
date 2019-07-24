import React, { FunctionComponent } from 'react';
import classNames from 'classnames';

export type EuiRangeLevelColor = 'primary' | 'success' | 'warning' | 'danger';

export const LEVEL_COLORS: EuiRangeLevelColor[] = [
  'primary',
  'success',
  'warning',
  'danger',
];

export interface EuiRangeLevel {
  min: number;
  max: number;
  color: EuiRangeLevelColor;
}

export interface EuiRangeLevelsProps {
  levels?: EuiRangeLevel[];
  max: number;
  min: number;
  showTicks?: boolean;
}

export const EuiRangeLevels: FunctionComponent<EuiRangeLevelsProps> = ({
  levels = [],
  max,
  min,
  showTicks,
}) => {
  const validateLevelIsInRange = (level: EuiRangeLevel) => {
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
