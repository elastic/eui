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

import React, { TextareaHTMLAttributes, Ref, FunctionComponent } from 'react';
import { CommonProps } from '../../common';
import classNames from 'classnames';
import { EuiValidatableControl } from '../validatable_control';

import {
  EuiFormControlLayout,
  EuiFormControlLayoutProps,
} from '../form_control_layout';

export type EuiTextAreaProps = TextareaHTMLAttributes<HTMLTextAreaElement> &
  CommonProps & {
    isInvalid?: boolean;
    fullWidth?: boolean;
    compressed?: boolean;
    readOnly?: boolean;
    isLoading?: boolean;

    /**
     * Which direction, if at all, should the textarea resize
     */
    resize?: keyof typeof resizeToClassNameMap;

    inputRef?: Ref<HTMLTextAreaElement>;
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

    /**
     * Completely removes form control layout wrapper and ignores
     * icon, prepend, and append. Best used inside EuiFormControlLayoutDelimited.
     */
    controlOnly?: boolean;
  };

const resizeToClassNameMap = {
  vertical: 'euiTextArea--resizeVertical',
  horizontal: 'euiTextArea--resizeHorizontal',
  both: 'euiTextArea--resizeBoth',
  none: 'euiTextArea--resizeNone',
};

export const RESIZE = Object.keys(resizeToClassNameMap);

export const EuiTextArea: FunctionComponent<EuiTextAreaProps> = ({
  children,
  className,
  compressed,
  fullWidth = false,
  id,
  inputRef,
  isInvalid,
  name,
  placeholder,
  resize = 'vertical',
  rows,
  prepend,
  append,
  readOnly,
  controlOnly,
  isLoading,
  ...rest
}) => {
  const classes = classNames(
    'euiTextArea',
    resizeToClassNameMap[resize],
    {
      'euiTextArea--fullWidth': fullWidth,
      'euiTextArea--compressed': compressed,
      'euiTextArea-isLoading': isLoading,
    },
    className
  );

  let definedRows: number;

  if (rows) {
    definedRows = rows;
  } else if (compressed) {
    definedRows = 3;
  } else {
    definedRows = 6;
  }

  const control = (
    <EuiValidatableControl isInvalid={isInvalid}>
      <textarea
        className={classes}
        {...rest}
        rows={definedRows}
        name={name}
        id={id}
        ref={inputRef}
        readOnly={readOnly}
        placeholder={placeholder}>
        {children}
      </textarea>
    </EuiValidatableControl>
  );

  if (controlOnly) return control;

  return (
    <EuiFormControlLayout
      fullWidth={fullWidth}
      isLoading={isLoading}
      compressed={compressed}
      readOnly={readOnly}
      prepend={prepend}
      append={append}
      inputId={id}
      className="euiTextArea__formControlLayout">
      {control}
    </EuiFormControlLayout>
  );
};
