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
import { EuiIcon } from '../../icon';
import {
  ButtonGroupOptionProps,
  EuiButtonSingleGroupOptionProps,
} from './types';

type Props = {
  idSelected: string;
} & ButtonGroupOptionProps &
  EuiButtonSingleGroupOptionProps;

export const ButtonGroupSingle: FunctionComponent<Props> = ({
  id,
  value,
  label,
  isDisabled,
  className,
  iconType,
  iconSide = 'left',
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
  const fill = size !== 'compressed' && isSelectedState;
  const wrapperClasses = classNames(
    'euiButton',
    'euiButton--no-hover',
    'euiButtonGroup__toggle',
    {
      'euiButtonGroup__button--selected': isSelectedState,
      'euiButton--disabled': isGroupDisabled || isDisabled,
      'euiButtonGroup__toggle--iconOnly': isIconOnly,
      'euiButton--fill': fill,
      'euiButton--small': size === 'compressed' || size === 's',
      'euiButton--ghost': size !== 'compressed' && color === 'ghost',
    },
    className
  );
  const icon = iconType && <EuiIcon type={iconType} color={color} size="m" />;

  return (
    <div className={wrapperClasses}>
      <input
        id={id}
        className="euiButtonGroup__input"
        name={name}
        onChange={() => onChange(id, value)}
        checked={isSelectedState}
        disabled={isGroupDisabled || isDisabled}
        value={value}
        type="radio"
        {...rest}
      />
      <label htmlFor={id} className="euiButton__content euiButtonGroup__label">
        {isIconOnly ? (
          <>
            <EuiScreenReaderOnly>
              <span>{label}</span>
            </EuiScreenReaderOnly>
            {icon}
          </>
        ) : (
          <>
            {iconSide === 'left' && icon}
            <span className="euiButton__text">{label}</span>
            {iconSide === 'right' && icon}
          </>
        )}
      </label>
    </div>
  );
};
