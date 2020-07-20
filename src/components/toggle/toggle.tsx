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

import React, { ChangeEventHandler, HTMLAttributes } from 'react';
import classNames from 'classnames';
import { CommonProps } from '../common';

const typeToInputTypeMap = {
  single: 'radio',
  multi: 'checkbox',
};

export const TYPES = Object.keys(typeToInputTypeMap);

export type ToggleType = keyof typeof typeToInputTypeMap;

export type EuiToggleProps = HTMLAttributes<HTMLDivElement> &
  CommonProps & {
    id?: string;
    /**
     * Initial state of the toggle
     */
    checked?: boolean;
    /**
     * For handling the onChange event of the input
     */
    onChange?: ChangeEventHandler<HTMLInputElement>;
    isDisabled?: boolean;
    name?: string;
    /**
     * Determines the input type based on multiple or single item(s)
     */
    type?: ToggleType;
    /**
     * What would typically be the input's label. Required for accessibility.
     */
    label: string;
    /**
     * Additional classNames for the input itself
     */
    inputClassName?: string;
    value?: string | number;
  };

export const EuiToggle: React.SFC<EuiToggleProps> = ({
  id,
  className,
  checked,
  children,
  inputClassName,
  isDisabled,
  label,
  name,
  onChange,
  title,
  type,
  value,
  'data-test-subj': dataTestSubj,
  ...rest
}) => {
  const classes = classNames(
    'euiToggle',
    { 'euiToggle--checked': checked },
    className
  );

  const inputClasses = classNames('euiToggle__input', inputClassName);

  return (
    <div className={classes} {...rest}>
      <input
        id={id}
        className={inputClasses}
        aria-label={label}
        checked={checked}
        disabled={isDisabled}
        name={name}
        onChange={onChange}
        title={title}
        type={type ? typeToInputTypeMap[type] : undefined}
        value={value}
        data-test-subj={dataTestSubj}
      />

      {children}
    </div>
  );
};

EuiToggle.defaultProps = {
  type: 'multi',
};
