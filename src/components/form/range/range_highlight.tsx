/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { FunctionComponent, useState } from 'react';
import classNames from 'classnames';

import { useEuiTheme } from '../../../services';
import { logicalStyles } from '../../../global_styling';

import {
  euiRangeHighlightStyles,
  euiRangeHighlightProgressStyles,
  euiRangeHighlightLevelsWrapperStyles,
  euiRangeHighlightLevelsStyles,
} from './range_highlight.styles';
import { EuiRangeLevels, EuiRangeLevel } from './range_levels';

export interface EuiRangeHighlightProps {
  className?: string;
  background?: string;
  compressed?: boolean;
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
  const leftPosition = (lowerValue - min) / (max - min);
  const rangeWidth = (upperValue - lowerValue) / (max - min);

  const [trackWidth, setTrackWidth] = useState(0);
  const handleRef = (node: HTMLDivElement | null) => {
    setTrackWidth(node?.clientWidth ?? 0);
  };

  const classes = classNames('euiRangeHighlight', className);

  const euiTheme = useEuiTheme();

  const styles = euiRangeHighlightStyles(euiTheme);
  const cssStyles = [styles.euiRangeHighlight, showTicks && styles.hasTicks];

  const progressStyles = euiRangeHighlightProgressStyles(euiTheme);
  const cssProgressStyles = [progressStyles.euiRangeHighlight__progress];
  const progressStyle = {
    background,
    marginLeft: `${leftPosition * 100}%`,
    width: `${rangeWidth * 100}%`,
  };

  const levelsWrapperStyles = euiRangeHighlightLevelsWrapperStyles(euiTheme);
  const cssLevelsWrapperStyles = [
    levelsWrapperStyles.euiRangeHighlight__levelsWrapper,
  ];
  const levelsWrapperStyle = {
    marginLeft: `${leftPosition * 100}%`,
    width: `${rangeWidth * 100}%`,
  };

  const levelsStyles = euiRangeHighlightLevelsStyles(euiTheme);
  const cssLevelsStyles = [levelsStyles.euiRangeHighlight__levels];
  const levelsStyle = {
    left: `-${trackWidth * leftPosition}px`,
    width: `${trackWidth}px`,
  };

  return (
    <div className={classes} css={cssStyles} onClick={onClick} ref={handleRef}>
      {((levels && levels.length === 0) || !levels) && (
        <div
          className="euiRangeHighlight__progress"
          css={cssProgressStyles}
          style={logicalStyles(progressStyle)}
        />
      )}

      {levels && !!levels.length && (
        <div
          css={cssLevelsWrapperStyles}
          style={logicalStyles(levelsWrapperStyle)}
        >
          <EuiRangeLevels
            css={cssLevelsStyles}
            style={logicalStyles(levelsStyle)}
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
