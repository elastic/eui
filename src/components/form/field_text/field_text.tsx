import React, { InputHTMLAttributes, Ref, FunctionComponent } from 'react';
import { CommonProps } from '../../common';
import classNames from 'classnames';

import {
  EuiFormControlLayout,
  EuiFormControlLayoutProps,
} from '../form_control_layout';

import { EuiValidatableControl } from '../validatable_control';

export type EuiFieldTextProps = InputHTMLAttributes<HTMLInputElement> &
  CommonProps & {
    icon?: EuiFormControlLayoutProps['icon'];
    isInvalid?: boolean;
    fullWidth?: boolean;
    isLoading?: boolean;
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
  ...rest
}) => {
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

  return (
    <EuiFormControlLayout
      icon={icon}
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
};
