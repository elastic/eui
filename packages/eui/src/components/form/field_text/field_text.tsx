/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { InputHTMLAttributes, Ref, FunctionComponent } from 'react';
import classNames from 'classnames';

import { useEuiMemoizedStyles } from '../../../services';
import { CommonProps } from '../../common';
import {
  EuiFormControlLayout,
  EuiFormControlLayoutProps,
} from '../form_control_layout';
import { EuiValidatableControl } from '../validatable_control';
import { useFormContext } from '../eui_form_context';

import { euiFieldTextStyles } from './field_text.styles';

export type EuiFieldTextProps = InputHTMLAttributes<HTMLInputElement> &
  CommonProps & {
    icon?: EuiFormControlLayoutProps['icon'];
    isInvalid?: boolean;
    /**
     * Expand to fill 100% of the parent.
     * Defaults to `fullWidth` prop of `<EuiForm>`.
     * @default false
     */
    fullWidth?: boolean;
    isLoading?: boolean;
    /**
     * Prevents user from changing input.
     *
     * Defaults to the value of `disabled` unless explicity defined otherwise.
     */
    readOnly?: boolean;
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

    /**
     * Completely removes form control layout wrapper and ignores
     * icon, prepend, and append. Best used inside EuiFormControlLayoutDelimited.
     */
    controlOnly?: boolean;

    /**
     * when `true` creates a shorter height input
     */
    compressed?: boolean;
  };

export const EuiFieldText: FunctionComponent<EuiFieldTextProps> = (props) => {
  const { defaultFullWidth } = useFormContext();
  const {
    id,
    name,
    placeholder,
    value,
    className,
    icon,
    isInvalid,
    inputRef,
    fullWidth = defaultFullWidth,
    isLoading,
    compressed,
    prepend,
    append,
    disabled,
    readOnly = disabled, // sync to prevent onChange unless explicitly defined
    controlOnly,
    ...rest
  } = props;

  const classes = classNames('euiFieldText', className, {
    'euiFieldText-isLoading': isLoading,
  });

  const styles = useEuiMemoizedStyles(euiFieldTextStyles);
  const cssStyles = [
    styles.euiFieldText,
    compressed ? styles.compressed : styles.uncompressed,
    fullWidth ? styles.fullWidth : styles.formWidth,
    !controlOnly && (prepend || append) && styles.inGroup,
    controlOnly && styles.controlOnly,
  ];

  const control = (
    <EuiValidatableControl isInvalid={isInvalid}>
      <input
        type="text"
        id={id}
        name={name}
        placeholder={placeholder}
        className={classes}
        css={cssStyles}
        value={value}
        ref={inputRef}
        disabled={disabled}
        readOnly={readOnly}
        {...rest}
      />
    </EuiValidatableControl>
  );

  if (controlOnly) return control;

  return (
    <EuiFormControlLayout
      icon={icon}
      fullWidth={fullWidth}
      isLoading={isLoading}
      isInvalid={isInvalid}
      compressed={compressed}
      isDisabled={disabled}
      readOnly={readOnly}
      prepend={prepend}
      append={append}
      inputId={id}
    >
      {control}
    </EuiFormControlLayout>
  );
};
