/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, {
  CSSProperties,
  FunctionComponent,
  useMemo,
  useEffect,
} from 'react';
import classNames from 'classnames';

import { useEuiTheme } from '../../../services';
import { logicalStyles } from '../../../global_styling';

import type { EuiRangeLevel, EuiRangeProps } from './types';
import { EuiRangeLevelColor, isNamedLevelColor } from './range_levels_colors';
import {
  euiRangeLevelsStyles,
  euiRangeLevelStyles,
} from './range_levels.styles';

import { calculateThumbPosition, EUI_THUMB_SIZE } from './utils';

export interface EuiRangeLevelsProps
  extends Pick<
    EuiRangeProps,
    'levels' | 'min' | 'max' | 'showTicks' | 'showRange'
  > {
  trackWidth: number;
  style?: CSSProperties;
}

export const EuiRangeLevels: FunctionComponent<EuiRangeLevelsProps> = ({
  levels = [],
  max,
  min,
  showTicks,
  showRange,
  trackWidth,
  ...rest
}) => {
  const euiTheme = useEuiTheme();
  const styles = euiRangeLevelsStyles(euiTheme);
  const cssStyles = [
    styles.euiRangeLevels,
    showTicks && styles.hasTicks,
    showRange && styles.hasRange,
  ];

  return (
    <div className="euiRangeLevels" css={cssStyles} {...rest}>
      {levels.map((level, index) => (
        <EuiRangeLevelElement
          key={index}
          level={level}
          min={min}
          max={max}
          trackWidth={trackWidth}
        />
      ))}
    </div>
  );
};

// Internal subcomponent
const EuiRangeLevelElement: FunctionComponent<{
  level: EuiRangeLevel;
  min: EuiRangeLevelsProps['min'];
  max: EuiRangeLevelsProps['max'];
  trackWidth: number;
}> = ({ level, min, max, trackWidth }) => {
  const {
    color,
    className,
    min: levelMin,
    max: levelMax,
    ...levelRest
  } = level;

  const isNamedColor = useMemo(() => isNamedLevelColor(color), [color]);

  useEffect(() => {
    validateLevelIsInRange({ min: levelMin, max: levelMax }, { min, max });
  }, [levelMin, levelMax, min, max]);

  const styles = useMemo(() => {
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

    return logicalStyles({
      left: `calc(${left}% + ${leftOffset}px)`,
      right: `calc(${100 - right}% - ${rightOffset}px)`,
      backgroundColor: !isNamedColor ? color : undefined,
    });
  }, [levelMin, levelMax, min, max, trackWidth, isNamedColor, color]);

  const levelClasses = classNames('euiRangeLevel', className);

  const euiTheme = useEuiTheme();
  const levelStyles = euiRangeLevelStyles(euiTheme);
  const cssLevelStyles = [
    levelStyles.euiRangeLevel,
    isNamedColor
      ? levelStyles[color as EuiRangeLevelColor]
      : levelStyles.customColor,
  ];

  return (
    <span
      style={styles}
      className={levelClasses}
      css={cssLevelStyles}
      {...levelRest}
    />
  );
};

const validateLevelIsInRange = (
  level: Pick<EuiRangeLevel, 'min' | 'max'>,
  { min, max }: Pick<EuiRangeLevelsProps, 'min' | 'max'>
) => {
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
