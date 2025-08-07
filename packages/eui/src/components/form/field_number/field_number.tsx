/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, {
  InputHTMLAttributes,
  Ref,
  FunctionComponent,
  useState,
  useEffect,
  useCallback,
  useRef,
} from 'react';
import classNames from 'classnames';

import { useCombinedRefs, useEuiMemoizedStyles } from '../../../services';
import { CommonProps } from '../../common';

import { EuiValidatableControl } from '../validatable_control';
import {
  EuiFormControlLayout,
  EuiFormControlLayoutProps,
} from '../form_control_layout';
import { useFormContext } from '../eui_form_context';

import { euiFieldNumberStyles } from './field_number.styles';

export type EuiFieldNumberProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'min' | 'max' | 'readOnly' | 'step'
> &
  CommonProps & {
    icon?: EuiFormControlLayoutProps['icon'];
    isInvalid?: boolean;
    /**
     * Expand to fill 100% of the parent.
     * Defaults to `fullWidth` prop of `<EuiForm>`.
     * @default false
     */
    fullWidth?: boolean;
    /**
     * @default false
     */
    isLoading?: boolean;
    readOnly?: boolean;
    min?: number;
    max?: number;
    /**
     * Specifies the granularity that the value must adhere to.
     * Accepts a `number`, e.g. `1` for integers, or `0.5` for decimal steps.
     * Defaults to `"any"` for no stepping, which allows any decimal value(s).
     * @default "any"
     */
    step?: number | 'any';
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
     * @default false
     */
    compressed?: boolean;
  };

export const EuiFieldNumber: FunctionComponent<EuiFieldNumberProps> = (
  props
) => {
  const { defaultFullWidth } = useFormContext();
  const {
    className,
    icon,
    id,
    placeholder,
    name,
    min,
    max,
    step = 'any',
    value,
    isInvalid,
    fullWidth = defaultFullWidth,
    isLoading = false,
    compressed = false,
    prepend,
    append,
    inputRef,
    readOnly,
    controlOnly,
    onKeyUp,
    ...rest
  } = props;

  const _inputRef = useRef<HTMLInputElement | null>(null);
  const combinedRefs = useCombinedRefs([_inputRef, inputRef]);

  // Attempt to determine additional invalid state. The native number input
  // will set :invalid state automatically, but we need to also set
  // `aria-invalid` as well as display an icon. We also want to *not* set this on
  // EuiValidatableControl, in order to not override custom validity messages
  const [isNativelyInvalid, setIsNativelyInvalid] = useState<
    true | undefined
  >();

  const checkNativeValidity = useCallback((inputEl: HTMLInputElement) => {
    // Prefer `undefined` over `false` so that the `aria-invalid` prop unsets completely
    const isInvalid = !inputEl.validity.valid || undefined;
    setIsNativelyInvalid(isInvalid);
  }, []);

  // Re-check validity whenever props that might affect validity are updated
  useEffect(() => {
    if (_inputRef.current) {
      checkNativeValidity(_inputRef.current);
    }
  }, [isInvalid, value, min, max, step, checkNativeValidity]);

  const classes = classNames('euiFieldNumber', className, {
    'euiFieldNumber-isLoading': isLoading,
  });

  const styles = useEuiMemoizedStyles(euiFieldNumberStyles);
  const cssStyles = [
    styles.euiFieldNumber,
    compressed ? styles.compressed : styles.uncompressed,
    fullWidth ? styles.fullWidth : styles.formWidth,
    !controlOnly && (prepend || append) && styles.inGroup,
    controlOnly && styles.controlOnly,
  ];

  const control = (
    <EuiValidatableControl isInvalid={isInvalid}>
      <input
        type="number"
        id={id}
        name={name}
        min={min}
        max={max}
        step={step}
        value={value}
        placeholder={placeholder}
        readOnly={readOnly}
        className={classes}
        css={cssStyles}
        ref={combinedRefs}
        aria-invalid={isInvalid || isNativelyInvalid}
        onKeyUp={(e) => {
          // Note that we can't use `onChange` because browsers don't emit change events
          // for invalid text - see https://github.com/facebook/react/issues/16554
          onKeyUp?.(e);
          checkNativeValidity(e.currentTarget);
        }}
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
      isInvalid={isInvalid || isNativelyInvalid}
      isDisabled={rest.disabled}
      compressed={compressed}
      readOnly={readOnly}
      prepend={prepend}
      append={append}
      inputId={id}
    >
      {control}
    </EuiFormControlLayout>
  );
};
