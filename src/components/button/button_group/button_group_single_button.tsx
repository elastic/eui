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
  isSelected?: boolean;
  name?: string;
} & ButtonGroupOptionProps &
  EuiButtonSingleGroupOptionProps;

export const EuiButtonGroupSingleButton: FunctionComponent<Props> = ({
  className,
  id,
  isDisabled,
  isIconOnly,
  isSelected,
  label,
  name,
  onChange,
  size,
  value,
  ...rest
}) => {
  const element = isDisabled ? 'button' : 'label';

  let elementProps = {};
  if (element === 'label') {
    elementProps = { ...elementProps, htmlFor: id };
  }

  const buttonClasses = classNames(
    {
      'euiButtonGroupButton-isSelected': isSelected,
      'euiButtonGroupButton-isIconOnly': isIconOnly,
    },
    className
  );

  return (
    <EuiButtonDisplay
      baseClassName="euiButtonGroupButton"
      className={buttonClasses}
      element={element}
      fill={size !== 'compressed' && isSelected}
      isDisabled={isDisabled}
      onClick={() => onChange(id, value)}
      size={size === 'compressed' ? 's' : size}
      textProps={{
        className: isIconOnly ? 'euiScreenReaderOnly' : undefined,
      }}
      {...elementProps}
      {...rest}>
      <input
        id={id}
        className="euiScreenReaderOnly"
        name={name}
        checked={isSelected}
        disabled={isDisabled}
        value={value}
        type="radio"
        onChange={() => onChange(id, value)}
      />
      {label}
    </EuiButtonDisplay>
  );
};
