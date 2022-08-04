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
import { euiRangeHighlightStyles } from './range_highlight.styles';

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
}) => {
  // Calculate the width the range based on value
  // const rangeWidth = (value - min) / (max - min);
  const leftPosition = (lowerValue - min) / (max - min);
  const rangeWidth = (upperValue - lowerValue) / (max - min);

  const rangeWidthStyle = {
    background,
    marginLeft: `${leftPosition * 100}%`,
    width: `${rangeWidth * 100}%`,
  };

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
  const cssStyles = [styles.euiRangeHighlight];

  const cssProgressStyles = [styles.euiRangeHighlight__progress];

  return (
    <div className={classes} css={cssStyles} onClick={onClick}>
      <div
        className={progressClasses}
        css={cssProgressStyles}
        style={rangeWidthStyle}
      />
    </div>
  );
};
