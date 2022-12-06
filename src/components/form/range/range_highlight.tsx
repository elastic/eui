/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { FunctionComponent, useMemo } from 'react';
import classNames from 'classnames';

import { useEuiTheme } from '../../../services';
import { logicalStyles } from '../../../global_styling';

import type { EuiRangeProps } from './types';
import {
  euiRangeHighlightStyles,
  euiRangeHighlightProgressStyles,
  euiRangeHighlightLevelsWrapperStyles,
  euiRangeHighlightLevelsStyles,
} from './range_highlight.styles';
import { EuiRangeLevels } from './range_levels';

export interface EuiRangeHighlightProps
  extends Pick<EuiRangeProps, 'min' | 'max' | 'levels' | 'showTicks'> {
  className?: string;
  background?: string;
  trackWidth: number;
  lowerValue: number;
  upperValue: number;
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
}

export const EuiRangeHighlight: FunctionComponent<EuiRangeHighlightProps> = ({
  className,
  showTicks,
  trackWidth,
  lowerValue,
  upperValue,
  max,
  min,
  background,
  onClick,
  levels,
}) => {
  // Calculate the width of the range based on value
  const leftPosition = useMemo(() => {
    return (lowerValue - min) / (max - min);
  }, [lowerValue, min, max]);

  const rangeWidth = useMemo(() => {
    return (upperValue - lowerValue) / (max - min);
  }, [upperValue, lowerValue, min, max]);

  const classes = classNames('euiRangeHighlight', className);

  const euiTheme = useEuiTheme();

  const styles = euiRangeHighlightStyles(euiTheme);
  const cssStyles = [styles.euiRangeHighlight, showTicks && styles.hasTicks];

  const progressStyles = euiRangeHighlightProgressStyles(euiTheme);
  const cssProgressStyles = [progressStyles.euiRangeHighlight__progress];
  const progressStyle = useMemo(() => {
    return logicalStyles({
      background,
      marginLeft: `${leftPosition * 100}%`,
      width: `${rangeWidth * 100}%`,
    });
  }, [background, leftPosition, rangeWidth]);

  const levelsWrapperStyles = euiRangeHighlightLevelsWrapperStyles(euiTheme);
  const cssLevelsWrapperStyles = [
    levelsWrapperStyles.euiRangeHighlight__levelsWrapper,
  ];
  const levelsWrapperStyle = useMemo(() => {
    return logicalStyles({
      marginLeft: `${leftPosition * 100}%`,
      width: `${rangeWidth * 100}%`,
    });
  }, [leftPosition, rangeWidth]);

  const levelsStyles = euiRangeHighlightLevelsStyles(euiTheme);
  const cssLevelsStyles = [levelsStyles.euiRangeHighlight__levels];
  const levelsStyle = useMemo(() => {
    return logicalStyles({
      left: `-${trackWidth * leftPosition}px`,
      width: `${trackWidth}px`,
    });
  }, [trackWidth, leftPosition]);

  return (
    <div className={classes} css={cssStyles} onClick={onClick}>
      {((levels && levels.length === 0) || !levels) && (
        <div
          className="euiRangeHighlight__progress"
          css={cssProgressStyles}
          style={progressStyle}
        />
      )}

      {levels && !!levels.length && (
        <div css={cssLevelsWrapperStyles} style={levelsWrapperStyle}>
          <EuiRangeLevels
            css={cssLevelsStyles}
            style={levelsStyle}
            levels={levels}
            max={max}
            min={min}
            showTicks={showTicks}
            trackWidth={trackWidth}
          />
        </div>
      )}
    </div>
  );
};
