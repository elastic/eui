/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { FunctionComponent, CSSProperties } from 'react';
import classNames from 'classnames';
import { CommonProps } from '../../common';

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
    <div className={classes}>
      {levels.map((level, index) => {
        validateLevelIsInRange(level);

        const {
          color,
          className,
          min: levelMin,
          max: levelMax,
          ...rest
        } = level;

        const range = levelMax - levelMin;
        const width = (range / (max - min)) * 100;

        const isNamedColor = LEVEL_COLORS.includes(color as EuiRangeLevelColor);

        const styles = {
          width: `${width}%`,
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
