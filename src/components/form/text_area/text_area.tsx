/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { TextareaHTMLAttributes, Ref, FunctionComponent } from 'react';
import { CommonProps } from '../../common';
import classNames from 'classnames';

import { EuiFormControlLayout } from '../form_control_layout';
import { EuiValidatableControl } from '../validatable_control';
import { useFormContext } from '../eui_form_context';

export type EuiTextAreaProps = TextareaHTMLAttributes<HTMLTextAreaElement> &
  CommonProps & {
    isLoading?: boolean;
    isInvalid?: boolean;
    /**
     * Expand to fill 100% of the parent.
     * Defaults to `fullWidth` prop of `<EuiForm>`.
     * @default false
     */
    fullWidth?: boolean;
    compressed?: boolean;

    /**
     * Which direction, if at all, should the textarea resize
     * @default vertical
     */
    resize?: keyof typeof resizeToClassNameMap;

    inputRef?: Ref<HTMLTextAreaElement>;
  };

const resizeToClassNameMap = {
  vertical: 'euiTextArea--resizeVertical',
  horizontal: 'euiTextArea--resizeHorizontal',
  both: 'euiTextArea--resizeBoth',
  none: 'euiTextArea--resizeNone',
};

export const RESIZE = Object.keys(resizeToClassNameMap);

export const EuiTextArea: FunctionComponent<EuiTextAreaProps> = (props) => {
  const { defaultFullWidth } = useFormContext();
  const {
    children,
    className,
    compressed,
    fullWidth = defaultFullWidth,
    id,
    inputRef,
    isLoading,
    isInvalid,
    name,
    placeholder,
    resize = 'vertical',
    rows,
    ...rest
  } = props;

  const classes = classNames(
    'euiTextArea',
    resizeToClassNameMap[resize],
    {
      'euiTextArea--fullWidth': fullWidth,
      'euiTextArea--compressed': compressed,
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

  return (
    <EuiFormControlLayout
      fullWidth={fullWidth}
      isLoading={isLoading}
      isInvalid={isInvalid}
      className="euiFormControlLayout--euiTextArea"
    >
      <EuiValidatableControl isInvalid={isInvalid}>
        <textarea
          className={classes}
          {...rest}
          rows={definedRows}
          name={name}
          id={id}
          ref={inputRef}
          placeholder={placeholder}
        >
          {children}
        </textarea>
      </EuiValidatableControl>
    </EuiFormControlLayout>
  );
};
