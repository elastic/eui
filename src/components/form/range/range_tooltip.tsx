/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { FunctionComponent, ReactNode } from 'react';

import { useEuiTheme } from '../../../services';
import { logicalStyles } from '../../../global_styling';

import {
  euiRangeTooltipStyles,
  euiRangeTooltipValueStyles,
} from './range_tooltip.styles';

export interface EuiRangeTooltipProps {
  value?: number | string;
  valueAppend?: ReactNode;
  valuePrepend?: ReactNode;
  max: number;
  min: number;
  name?: string;
  showTicks?: boolean;
}

export const EuiRangeTooltip: FunctionComponent<EuiRangeTooltipProps> = ({
  value,
  valueAppend,
  valuePrepend,
  max,
  min,
  name,
  showTicks,
}) => {
  // Calculate the left position based on value
  let val = 0;
  if (typeof value === 'number') {
    val = value;
  } else if (typeof value === 'string') {
    val = parseFloat(value);
  }
  const decimal = (val - min) / (max - min);
  // Must be between 0-100%
  let valuePosition = decimal <= 1 ? decimal : 1;
  valuePosition = valuePosition >= 0 ? valuePosition : 0;

  // Change left/right position based on value (half way point)
  let valuePositionSide: 'left' | 'right';
  let valuePositionStyle;
  if (valuePosition > 0.5) {
    valuePositionSide = 'left';
    valuePositionStyle = { right: `${(1 - valuePosition) * 100}%` };
  } else {
    valuePositionSide = 'right';
    valuePositionStyle = { left: `${valuePosition * 100}%` };
  }

  const euiTheme = useEuiTheme();
  const styles = euiRangeTooltipStyles(euiTheme);
  const cssStyles = [styles.euiRangeTooltip];

  const valueStyles = euiRangeTooltipValueStyles(euiTheme);
  const cssValueStyles = [
    valueStyles.euiRangeTooltip__value,
    valueStyles[valuePositionSide],
    showTicks && valueStyles.hasTicks,
  ];

  return (
    <div className="euiRangeTooltip" css={cssStyles}>
      <output
        className="euiRangeTooltip__value"
        css={cssValueStyles}
        htmlFor={name}
        style={logicalStyles(valuePositionStyle)}
      >
        {valuePrepend}
        {value}
        {valueAppend}
      </output>
    </div>
  );
};
