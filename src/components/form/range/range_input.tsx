/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { FunctionComponent } from 'react';

import { EuiFieldNumber, EuiFieldNumberProps } from '../field_number';

export interface EuiRangeInputProps
  extends Omit<EuiFieldNumberProps, 'max' | 'min' | 'value'> {
  autoSize?: boolean;
  digitTolerance: number;
  max: number;
  min: number;
  side?: 'min' | 'max';
  value: string | number;
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
  // Chrome will properly size the input based on the max value, but FF & IE do not.
  // Calculate the width of the input based on highest number of characters.
  // Add 2 to accommodate for input stepper
  const widthStyle = autoSize
    ? { width: `${digitTolerance / 1.25 + 2}em` }
    : undefined;

  return (
    <EuiFieldNumber
      name={name}
      className={`euiRangeInput euiRangeInput--${side}`}
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
