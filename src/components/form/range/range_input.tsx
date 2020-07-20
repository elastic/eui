/*
 * Licensed to Elasticsearch B.V. under one or more contributor
 * license agreements. See the NOTICE file distributed with
 * this work for additional information regarding copyright
 * ownership. Elasticsearch B.V. licenses this file to you under
 * the Apache License, Version 2.0 (the "License"); you may
 * not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
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
  // Add 2 to accomodate for input stepper
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
