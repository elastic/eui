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

import React, { InputHTMLAttributes, Ref, FunctionComponent } from 'react';
import { CommonProps } from '../../common';
import classNames from 'classnames';

import {
  EuiFormControlLayout,
  EuiFormControlLayoutProps,
} from '../form_control_layout';

import { EuiValidatableControl } from '../validatable_control';

export type EuiFieldPasswordProps = InputHTMLAttributes<HTMLInputElement> &
  CommonProps & {
    isInvalid?: boolean;
    fullWidth?: boolean;
    isLoading?: boolean;
    compressed?: boolean;
    inputRef?: Ref<HTMLInputElement>;

    /**
     * Creates an input group with element(s) coming before input.
     * `string` | `ReactElement` or an array of these
     */
    prepend?: EuiFormControlLayoutProps['prepend'];

    /**
     * Creates an input group with element(s) coming after input.
     * `string` | `ReactElement` or an array of these
     */
    append?: EuiFormControlLayoutProps['append'];
  };

export const EuiFieldPassword: FunctionComponent<EuiFieldPasswordProps> = ({
  className,
  id,
  name,
  placeholder,
  value,
  isInvalid,
  fullWidth,
  isLoading,
  compressed,
  inputRef,
  prepend,
  append,
  ...rest
}) => {
  const classes = classNames(
    'euiFieldPassword',
    {
      'euiFieldPassword--fullWidth': fullWidth,
      'euiFieldPassword--compressed': compressed,
      'euiFieldPassword-isLoading': isLoading,
      'euiFieldPassword--inGroup': prepend || append,
    },
    className
  );

  return (
    <EuiFormControlLayout
      icon="lock"
      fullWidth={fullWidth}
      isLoading={isLoading}
      compressed={compressed}
      prepend={prepend}
      append={append}>
      <EuiValidatableControl isInvalid={isInvalid}>
        <input
          type="password"
          id={id}
          name={name}
          placeholder={placeholder}
          className={classes}
          value={value}
          ref={inputRef}
          {...rest}
        />
      </EuiValidatableControl>
    </EuiFormControlLayout>
  );
};

EuiFieldPassword.defaultProps = {
  value: undefined,
  fullWidth: false,
  isLoading: false,
  compressed: false,
};
