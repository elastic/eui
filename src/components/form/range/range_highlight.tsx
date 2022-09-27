/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { FunctionComponent } from 'react';
import classNames from 'classnames';

import { useEuiTheme } from '../../../services';
import {
  euiRangeHighlightStyles,
  euiRangeHighlightProgressStyles,
} from './range_highlight.styles';
import { EuiRangeLevels, EuiRangeLevel } from './range_levels';
import { euiRangeVariables } from './range.styles';

export interface EuiRangeHighlightProps {
  className?: string;
  background?: string;
  compressed?: boolean;
  hasFocus?: boolean;
  showTicks?: boolean;
  lowerValue: number;
  upperValue: number;
  max: number;
  min: number;
  levels?: EuiRangeLevel[];
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
}

export const EuiRangeHighlight: FunctionComponent<EuiRangeHighlightProps> = ({
  className,
  hasFocus,
  showTicks,
  lowerValue,
  upperValue,
  max,
  min,
  compressed,
  background,
  onClick,
  levels,
}) => {
  // Calculate the width the range based on value
  // const rangeWidth = (value - min) / (max - min);
  const leftPosition = (lowerValue - min) / (max - min);
  const rangeWidth = (upperValue - lowerValue) / (max - min);

  const highlightRef = React.useRef<HTMLDivElement | null>(null);
  const trackWidth = highlightRef.current?.clientWidth || 0;

  const classes = classNames(
    'euiRangeHighlight',
    {
      'euiRangeHighlight--hasTicks': showTicks,
      'euiRangeHighlight--compressed': compressed,
    },
    className
  );

  const progressClasses = classNames('euiRangeHighlight__progress', {
    'euiRangeHighlight__progress--hasFocus': hasFocus,
  });

  const euiTheme = useEuiTheme();
  const styles = euiRangeHighlightStyles(euiTheme);
  const cssStyles = [styles.euiRangeHighlight, showTicks && styles.hasTicks];

  const progressStyles = euiRangeHighlightProgressStyles(euiTheme);
  const cssProgressStyles = [
    progressStyles.euiRangeHighlight__progress,
    hasFocus && progressStyles.hasFocus,
  ];

  const euiRangeVars = euiRangeVariables(euiTheme);

  const rangeWidthStyle = {
    background,
    marginLeft: `${leftPosition * 100}%`,
    width: `${rangeWidth * 100}%`,
  };

  const levelsWrapperStyle = {
    background: 'transparent',
    marginLeft: `${leftPosition * 100}%`,
    width: `${rangeWidth * 100}%`,
    height: euiRangeVars.trackHeight,
    position: 'relative',
    overflow: 'hidden',
  };

  const levelsStyle = {
    left: `-${trackWidth * leftPosition}px`,
    width: `${trackWidth}px`,
    height: euiRangeVars.trackHeight,
    top: 0,
  };

  return (
    <div
      className={classes}
      css={cssStyles}
      onClick={onClick}
      ref={highlightRef}
    >
      {((levels && levels.length === 0) || !levels) && (
        <div
          className={progressClasses}
          css={cssProgressStyles}
          style={rangeWidthStyle}
        />
      )}

      {levels && !!levels.length && (
        <div style={levelsWrapperStyle as any}>
          <EuiRangeLevels
            style={levelsStyle}
            compressed={compressed}
            levels={levels}
            max={max}
            min={min}
            showTicks={showTicks}
          />
        </div>
      )}
    </div>
  );
};
