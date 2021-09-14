/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { FunctionComponent, useState } from 'react';
import classNames from 'classnames';

import { calculateThumbPosition, EUI_THUMB_SIZE } from './utils';

const calculateOffset = (position: number, value: number, bound: number) => {
  const threshold = 30;
  let offset = value === bound ? 0 : EUI_THUMB_SIZE / 2;
  if (offset !== 0) {
    // Estimating offset by eye. Trying to account for range scaling at both ends.
    offset =
      position <= threshold ? offset + (1 / position) * threshold : offset;
    offset =
      position >= 100 - threshold
        ? offset - (1 / (100 - position)) * threshold
        : offset;
  }
  return offset;
};

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
  compressed?: boolean;
}

export const EuiRangeLevels: FunctionComponent<EuiRangeLevelsProps> = ({
  levels = [],
  max,
  min,
  showTicks,
  compressed,
}) => {
  const [trackWidth, setTrackWidth] = useState(0);
  const handleRef = (node: HTMLDivElement | null) => {
    setTrackWidth(node?.clientWidth ?? 0);
  };
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
    'euiRangeLevels--compressed': compressed,
  });

  return (
    <div className={classes} ref={handleRef}>
      {trackWidth > 0 &&
        levels.map((level, index) => {
          validateLevelIsInRange(level);

          const left =
            level.min === min
              ? 0
              : calculateThumbPosition(level.min, min, max, trackWidth);
          const leftOffset = calculateOffset(left, level.min, min);
          const right =
            level.max === max
              ? 100
              : calculateThumbPosition(level.max, min, max, trackWidth);
          const rightOffset = calculateOffset(right, level.max, max);

          return (
            <span
              key={index}
              style={{
                left: `calc(${left}% + ${leftOffset}px)`,
                right: `calc(${100 - right}% - ${rightOffset}px)`,
              }}
              className={`euiRangeLevel euiRangeLevel--${level.color}`}
            />
          );
        })}
    </div>
  );
};
