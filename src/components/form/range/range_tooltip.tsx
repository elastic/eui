/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { FunctionComponent, useMemo } from 'react';

import { useEuiTheme } from '../../../services';
import { logicalStyles } from '../../../global_styling';

import type { EuiRangeProps } from './types';
import {
  euiRangeTooltipStyles,
  euiRangeTooltipValueStyles,
} from './range_tooltip.styles';

export interface EuiRangeTooltipProps
  extends Pick<
    EuiRangeProps,
    'min' | 'max' | 'value' | 'valueAppend' | 'valuePrepend' | 'showTicks'
  > {
  name?: string;
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
  const valuePosition = useMemo(() => {
    let val = 0;
    if (typeof value === 'number') {
      val = value;
    } else if (typeof value === 'string') {
      val = parseFloat(value);
    }
    const decimal = (val - min) / (max - min);
    // Must be between 0-100%
    const valuePosition = decimal <= 1 ? decimal : 1;
    return valuePosition >= 0 ? valuePosition : 0;
  }, [value, min, max]);

  // Change left/right position based on value (half way point)
  const valuePositionSide = useMemo(
    () => (valuePosition > 0.5 ? 'left' : 'right'),
    [valuePosition]
  );
  const valuePositionStyle = useMemo(() => {
    if (valuePositionSide === 'left') {
      return logicalStyles({ right: `${(1 - valuePosition) * 100}%` });
    } else if (valuePositionSide === 'right') {
      return logicalStyles({ left: `${valuePosition * 100}%` });
    }
  }, [valuePosition, valuePositionSide]);

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
        style={valuePositionStyle}
      >
        {valuePrepend}
        {value}
        {valueAppend}
      </output>
    </div>
  );
};
