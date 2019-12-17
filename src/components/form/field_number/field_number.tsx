import React, { InputHTMLAttributes, Ref, FunctionComponent } from 'react';
import { CommonProps } from '../../common';
import classNames from 'classnames';

import { EuiFormControlLayout } from '../form_control_layout';

import { EuiValidatableControl } from '../validatable_control';

/*
function numberOrEmptyString(props: any, propName: string, componentName: string) {
  componentName = componentName || 'ANONYMOUS';

  if (props[propName]) {
    const value = props[propName];
    if (typeof value === 'string' && value !== '') {
      return new Error(
        `Invalid prop '${propName}' of type 'string' supplied to '${componentName}',` +
          ` expected empty string or type 'number', you supplied a string with the contents '${value}'.`
      );
    } else if (typeof value !== 'number') {
      return new Error(
        `Invalid prop '${propName}' of type '${typeof value}' supplied to '${componentName}',` +
          " expected empty string or type 'number'."
      );
    }
  }

  // assume all ok
  return null;
}
*/

export type EuiFieldNumberProps = InputHTMLAttributes<HTMLInputElement> &
  CommonProps & {
    value?: number | '';
    icon?: string;
    isInvalid?: boolean;
    fullWidth?: boolean;
    isLoading?: boolean;
    readOnly?: boolean;
    min?: number;
    max?: number;
    step?: number;
    inputRef?: Ref<HTMLInputElement>;

    /**
     * Creates an input group with element(s) coming before input
     */
    prepend?: JSX.Element | JSX.Element[];

    /**
     * Creates an input group with element(s) coming after input
     */
    append?: string;

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

export const EuiFieldNumber: FunctionComponent<EuiFieldNumberProps> = ({
  className,
  icon,
  id,
  placeholder,
  name,
  min,
  max,
  value,
  isInvalid,
  fullWidth,
  isLoading,
  compressed,
  prepend,
  append,
  inputRef,
  readOnly,
  controlOnly,
  ...rest
}) => {
  const classes = classNames('euiFieldNumber', className, {
    'euiFieldNumber--withIcon': icon,
    'euiFieldNumber--fullWidth': fullWidth,
    'euiFieldNumber--compressed': compressed,
    'euiFieldNumber--inGroup': prepend || append,
    'euiFieldNumber-isLoading': isLoading,
  });

  const control = (
    <EuiValidatableControl isInvalid={isInvalid}>
      <input
        type="number"
        id={id}
        min={min}
        max={max}
        name={name}
        value={value}
        placeholder={placeholder}
        readOnly={readOnly}
        className={classes}
        ref={inputRef}
        {...rest}
      />
    </EuiValidatableControl>
  );

  if (controlOnly) {
    return control;
  }

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

EuiFieldNumber.defaultProps = {
  value: undefined,
  fullWidth: false,
  isLoading: false,
  compressed: false,
};
