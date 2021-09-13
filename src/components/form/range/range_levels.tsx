/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { FunctionComponent } from 'react';
import classNames from 'classnames';
import { isValidHex } from '../../../services/color/is_valid_hex';

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
  /**
   * Accepts one of `["primary", "success", "warning", "danger"]` or a hex value (e.g. `#FFFFFF`, `#000`).
   */
  color: EuiRangeLevelColor | string;
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
        const range = level.max - level.min;
        const width = (range / (max - min)) * 100;

        const isHexColor = isValidHex(level.color);

        const styles = {
          width: `${width}%`,
          backgroundColor: isHexColor ? level.color : undefined,
        };

        const isNamedColor = LEVEL_COLORS.includes(
          level.color as EuiRangeLevelColor
        );

        const levelClasses = classNames('euiRangeLevel', {
          'euiRangeLevel--customColor': isHexColor,
          [`euiRangeLevel--${level.color}`]: isNamedColor,
        });

        return <span key={index} style={styles} className={levelClasses} />;
      })}
    </div>
  );
};
