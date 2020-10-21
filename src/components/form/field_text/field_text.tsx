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
import { EuiFormRow } from '../form_row';
import {
  EuiFormRowCommonProps,
  euiFormRowDisplayIsCompressed,
} from '../form_row/form_row';

type EuiFieldTextSupportedRowDisplays =
  | 'row'
  | 'rowCompressed'
  | 'columnCompressed';

export type EuiFieldTextProps = Omit<
  EuiFormRowCommonProps,
  'children' | 'display' | 'hasChildLabel'
> &
  InputHTMLAttributes<HTMLInputElement> &
  CommonProps & {
    icon?: EuiFormControlLayoutProps['icon'];
    isInvalid?: boolean;
    fullWidth?: boolean;
    isLoading?: boolean;
    readOnly?: boolean;
    inputRef?: Ref<HTMLInputElement>;
    placeholder?: HTMLInputElement['placeholder'];

    /**
     * Creates an input group with element(s) coming before input;
     * `string` | `ReactElement` or an array of these
     */
    prepend?: EuiFormControlLayoutProps['prepend'];

    /**
     * Creates an input group with element(s) coming after input;
     * `string` | `ReactElement` or an array of these
     */
    append?: EuiFormControlLayoutProps['append'];

    /**
     * Completely removes form control layout wrapper and ignores
     * icon, prepend, and append and all form row props;
     * Best used inside EuiFormControlLayoutDelimited
     */
    controlOnly?: boolean;

    /**
     * When `true` creates a shorter height input
     */
    compressed?: boolean;

    /**
     * Custom list of supported row displays
     */
    display?: EuiFieldTextSupportedRowDisplays;
  };

export const EuiFieldText: FunctionComponent<EuiFieldTextProps> = ({
  id,
  name,
  placeholder,
  value,
  className,
  icon,
  isInvalid,
  inputRef,
  fullWidth = false,
  isLoading,
  compressed,
  prepend,
  append,
  readOnly,
  controlOnly,
  // FormRowProps
  helpText,
  error,
  label,
  labelAppend,
  hasEmptyLabelSpace,
  describedByIds,
  display = 'row',
  ...rest
}) => {
  // Force compressed if `display` is compressed
  compressed = euiFormRowDisplayIsCompressed(display) || compressed;

  const classes = classNames('euiFieldText', className, {
    'euiFieldText--withIcon': icon,
    'euiFieldText--fullWidth': fullWidth,
    'euiFieldText--compressed': compressed,
    'euiFieldText--inGroup': prepend || append,
    'euiFieldText-isLoading': isLoading,
  });

  const control = (
    <EuiValidatableControl isInvalid={isInvalid}>
      <input
        type="text"
        id={id}
        name={name}
        placeholder={placeholder}
        className={classes}
        value={value}
        ref={inputRef}
        readOnly={readOnly}
        {...rest}
      />
    </EuiValidatableControl>
  );

  if (controlOnly) return control;

  const formControlLayout = (
    <EuiFormControlLayout
      icon={
        isInvalid
          ? {
              type: 'alert',
              color: 'danger',
              side: 'right',
            }
          : icon
      }
      fullWidth={fullWidth}
      isLoading={isLoading}
      compressed={compressed}
      readOnly={readOnly}
      prepend={prepend}
      append={append}
      inputId={id}>
      {control}
    </EuiFormControlLayout>
  );

  if (!label && !error && !helpText && !hasEmptyLabelSpace)
    return formControlLayout;

  const formRowProps = {
    helpText,
    error,
    label,
    labelAppend,
    hasEmptyLabelSpace,
    describedByIds: id ? [id] : undefined,
    display,
    fullWidth,
    isInvalid,
  };

  return <EuiFormRow {...formRowProps}>{formControlLayout}</EuiFormRow>;
};
