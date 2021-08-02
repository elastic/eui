/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { InputHTMLAttributes, Ref, FunctionComponent } from 'react';
import { CommonProps } from '../../common';
import classNames from 'classnames';

import { EuiFormControlLayoutProps } from '../form_control_layout';
import {
  EuiFormControlLayoutUpdated,
  renderSideNode,
} from '../form_control_layout/form_control_layout_updated';

import { EuiValidatableControl } from '../validatable_control';

import {
  EuiFormRow,
  EuiFormRowCommonProps,
  euiFormRowDisplayIsCompressed,
} from '../form_row/form_row';

import { htmlIdGenerator } from '../../../services';

export type _EuiFieldTextSupportedRowDisplays =
  | 'row'
  | 'rowCompressed'
  | 'columnCompressed';

export type EuiFieldTextProps = Omit<
  EuiFormRowCommonProps,
  'children' | 'display' | 'hasChildLabel' | 'describedByIds' | 'inputId'
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
    display?: _EuiFieldTextSupportedRowDisplays;
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
  labelProps,
  hasEmptyLabelSpace,
  display = 'row',
  'aria-describedby': ariaDescribedBy,
  ...rest
}) => {
  // Force an id if one was not passed
  id = id || htmlIdGenerator('euiFieldText')();

  const { finalNodes: prependNodes, finalNodeIDs: prependIDs } = renderSideNode(
    'prepend',
    id,
    prepend
  );
  const { finalNodes: appendNodes, finalNodeIDs: appendIDs } = renderSideNode(
    'append',
    id,
    append
  );

  // console.log(prependIDs);

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
        aria-describedby={
          classNames(ariaDescribedBy, prependIDs, appendIDs) || undefined
        }
        {...rest}
      />
    </EuiValidatableControl>
  );

  if (controlOnly) return control;

  const formControlLayout = (
    <EuiFormControlLayoutUpdated
      icon={icon}
      fullWidth={fullWidth}
      isLoading={isLoading}
      compressed={compressed}
      readOnly={readOnly}
      prepend={prependNodes}
      append={appendNodes}
      inputId={id}>
      {control}
    </EuiFormControlLayoutUpdated>
  );

  if (!label && !error && !helpText && !hasEmptyLabelSpace)
    return formControlLayout;

  const formRowProps = {
    inputId: id,
    helpText,
    error,
    label,
    labelAppend,
    labelProps,
    hasEmptyLabelSpace,
    display,
    fullWidth,
    isInvalid,
  };

  return <EuiFormRow {...formRowProps}>{formControlLayout}</EuiFormRow>;
};
