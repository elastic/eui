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
import { EuiFieldNumber, EuiFieldNumberProps } from '../field_number';

import type { _SingleRangeValue, _SharedRangeInputSide } from './types';
import { euiRangeInputStyles } from './range_input.styles';

export interface EuiRangeInputProps
  extends Omit<EuiFieldNumberProps, 'max' | 'min' | 'value' | 'step'>,
    Omit<_SingleRangeValue, 'onChange'>,
    _SharedRangeInputSide {
  autoSize?: boolean;
  digitTolerance: number;
}

export const EuiRangeInput: FunctionComponent<EuiRangeInputProps> = ({
  min,
  max,
  step,
  value,
  disabled,
  compressed,
  onChange,
  name,
  side = 'max',
  digitTolerance,
  fullWidth,
  autoSize = true,
  ...rest
}) => {
  // Chrome will properly size the input based on the max value, but FF does not.
  // Calculate the width of the input based on highest number of characters.
  // Add 2 to accommodate for input stepper
  const widthStyle = useMemo(() => {
    return autoSize
      ? logicalStyles({ width: `${digitTolerance / 1.25 + 2}em` })
      : {};
  }, [autoSize, digitTolerance]);

  const euiTheme = useEuiTheme();
  const styles = euiRangeInputStyles(euiTheme);
  const cssStyles = [styles.euiRangeInput];

  return (
    <EuiFieldNumber
      name={name}
      className={`euiRangeInput euiRangeInput--${side}`}
      css={cssStyles}
      min={Number(min)}
      max={Number(max)}
      step={step}
      value={value === '' ? '' : Number(value)}
      disabled={disabled}
      compressed={compressed}
      onChange={onChange}
      style={widthStyle}
      fullWidth={fullWidth}
      {...rest}
    />
  );
};
