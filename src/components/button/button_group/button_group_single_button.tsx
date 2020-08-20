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

import classNames from 'classnames';
import React, { FunctionComponent } from 'react';
import {
  ButtonGroupOptionProps,
  EuiButtonSingleGroupOptionProps,
} from './types';
import { EuiButtonDisplay } from '../button';

type Props = {
  idSelected: string;
} & ButtonGroupOptionProps &
  EuiButtonSingleGroupOptionProps;

export const EuiButtonGroupSingleButton: FunctionComponent<Props> = ({
  id,
  value,
  label,
  isDisabled,
  className,
  idSelected,
  isIconOnly,
  size,
  name,
  color,
  onChange,
  ...rest
}) => {
  const isSelectedState = id === idSelected;
  const badColorCombo = size === 'compressed' && color === 'ghost';

  const buttonClasses = classNames(
    'euiButtonGroupButton',
    {
      'euiButtonGroupButton--selected': isSelectedState,
    },
    className
  );

  return (
    <EuiButtonDisplay
      htmlFor={id}
      element={isDisabled ? 'button' : 'label'} // Not sure if this is the best way to handle disabled labels from incurring clicks
      className={buttonClasses}
      color={badColorCombo ? 'text' : color}
      fill={size !== 'compressed' && isSelectedState}
      isDisabled={isDisabled}
      disabled={isDisabled}
      size={size === 'compressed' ? 's' : size}
      onClick={() => onChange(id, value)}
      textProps={{
        className: isIconOnly ? 'euiScreenReaderOnly' : undefined,
      }}
      minWidth={0}
      {...rest}>
      <input
        id={id}
        className="euiScreenReaderOnly"
        name={name}
        checked={isSelectedState}
        disabled={isDisabled}
        value={value}
        type="radio"
        onChange={() => onChange(id, value)}
      />
      {label}
    </EuiButtonDisplay>
  );
};
