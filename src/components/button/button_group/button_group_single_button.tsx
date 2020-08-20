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
import { EuiScreenReaderOnly } from '../../accessibility';
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
  isGroupDisabled,
  isIconOnly,
  size,
  name,
  color,
  onChange,
  ...rest
}) => {
  const isSelectedState = id === idSelected;
  const badColorCombo = size === 'compressed' && color === 'ghost';
  if (badColorCombo) {
    console.warn(
      'EuiButtonGroup of compressed size does not support the ghost color. It will render as text instead.'
    );
  }

  const buttonClasses = classNames(
    'euiButtonGroup__toggle',
    {
      'euiButtonGroup__button--selected': isSelectedState,
    },
    className
  );

  return (
    <EuiButtonDisplay
      element="label"
      htmlFor={id}
      className={buttonClasses}
      color={badColorCombo ? 'text' : color}
      fill={size !== 'compressed' && isSelectedState}
      isDisabled={isDisabled || isGroupDisabled}
      aria-pressed={isSelectedState}
      size={size === 'compressed' ? 's' : size}
      onClick={() => onChange(id, value)}
      {...rest}>
      <input
        id={id}
        className="euiButtonGroup__input"
        name={name}
        checked={isSelectedState}
        disabled={isGroupDisabled || isDisabled}
        value={value}
        type="radio"
      />
      {isIconOnly ? (
        <EuiScreenReaderOnly>
          <span>{label}</span>
        </EuiScreenReaderOnly>
      ) : (
        <>{label}</>
      )}
    </EuiButtonDisplay>
  );
};
