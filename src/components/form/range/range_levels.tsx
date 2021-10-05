/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { CSSProperties, FunctionComponent, useState } from 'react';
import classNames from 'classnames';
import { CommonProps } from '../../common';

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

export interface EuiRangeLevel extends CommonProps {
  min: number;
  max: number;
  /**
   * Accepts one of `["primary", "success", "warning", "danger"]` or a valid CSS color value.
   */
  color: EuiRangeLevelColor | CSSProperties['color'];
}

export interface EuiRangeLevelsProps {
  /**
   * An array of #EuiRangeLevel objects
   */
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
      {levels.map((level, index) => {
        validateLevelIsInRange(level);

        const {
          color,
          className,
          min: levelMin,
          max: levelMax,
          ...rest
        } = level;

        let left = 0;
        let right = 0;
        let leftOffset = 0;
        let rightOffset = 0;
        if (trackWidth > 0) {
          left =
            levelMin === min
              ? 0
              : calculateThumbPosition(levelMin, min, max, trackWidth);
          leftOffset = calculateOffset(left, levelMin, min);
          right =
            levelMax === max
              ? 100
              : calculateThumbPosition(levelMax, min, max, trackWidth);
          rightOffset = calculateOffset(right, levelMax, max);
        }

        const isNamedColor = LEVEL_COLORS.includes(color as EuiRangeLevelColor);

        const styles = {
          left: `calc(${left}% + ${leftOffset}px)`,
          right: `calc(${100 - right}% - ${rightOffset}px)`,
          backgroundColor: !isNamedColor ? color : undefined,
        };

        const levelClasses = classNames(
          'euiRangeLevel',
          {
            'euiRangeLevel--customColor': !isNamedColor,
            [`euiRangeLevel--${color}`]: isNamedColor,
          },
          className
        );

        return (
          <span key={index} style={styles} className={levelClasses} {...rest} />
        );
      })}
    </div>
  );
};
