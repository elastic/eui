/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, {
  SelectHTMLAttributes,
  OptionHTMLAttributes,
  Ref,
  FunctionComponent,
  useCallback,
} from 'react';
import classNames from 'classnames';

import { useEuiMemoizedStyles } from '../../../services';
import { CommonProps } from '../../common';

import { useFormContext } from '../eui_form_context';
import {
  EuiFormControlLayout,
  EuiFormControlLayoutProps,
} from '../form_control_layout';
import { EuiValidatableControl } from '../validatable_control';

import { euiSelectStyles } from './select.styles';

export interface EuiSelectOption
  extends OptionHTMLAttributes<HTMLOptionElement> {
  text: React.ReactNode;
}

export type EuiSelectProps = Omit<
  SelectHTMLAttributes<HTMLSelectElement>,
  'value'
> &
  CommonProps & {
    /**
     * @default []
     */
    options?: EuiSelectOption[];
    isInvalid?: boolean;
    /**
     * Expand to fill 100% of the parent.
     * Defaults to `fullWidth` prop of `<EuiForm>`.
     * @default false
     */
    fullWidth?: boolean;
    isLoading?: boolean;

    /**
     * Simulates no selection by creating an empty, selected, hidden first option
     * @default false
     */
    hasNoInitialSelection?: boolean;
    inputRef?: Ref<HTMLSelectElement>;
    value?: string | number;

    /**
     * when `true` creates a shorter height input
     * @default false
     */
    compressed?: boolean;

    /**
     * Creates an input group with element(s) coming before select.
     * `string` | `ReactElement` or an array of these
     */
    prepend?: EuiFormControlLayoutProps['prepend'];
    /**
     * Creates an input group with element(s) coming after select.
     * `string` | `ReactElement` or an array of these
     */
    append?: EuiFormControlLayoutProps['append'];
  };

export const EuiSelect: FunctionComponent<EuiSelectProps> = (props) => {
  const { defaultFullWidth } = useFormContext();
  const {
    className,
    options = [],
    id,
    name,
    inputRef,
    isInvalid,
    fullWidth = defaultFullWidth,
    isLoading = false,
    hasNoInitialSelection = false,
    defaultValue,
    compressed = false,
    value: _value,
    prepend,
    append,
    onMouseUp,
    disabled,
    ...rest
  } = props;
  // if this is injecting an empty option for `hasNoInitialSelection` then
  // value needs to fallback to an empty string to interact properly with `defaultValue`
  const value = hasNoInitialSelection ? _value ?? '' : _value;

  // React HTML input can not have both value and defaultValue properties.
  // https://reactjs.org/docs/uncontrolled-components.html#default-values
  const selectDefaultValue = value != null ? undefined : defaultValue || '';

  const handleMouseUp = useCallback(
    (e: React.MouseEvent<HTMLSelectElement>) => {
      // Normalizes cross-browser mouse eventing by preventing propagation,
      // notably for use in conjunction with EuiOutsideClickDetector.
      // See https://github.com/elastic/eui/pull/1926 for full discussion on
      // rationale and alternatives should this intervention become problematic.
      e.nativeEvent.stopImmediatePropagation();
      onMouseUp?.(e);
    },
    [onMouseUp]
  );

  const classes = classNames(
    'euiSelect',
    { 'euiSelect-isLoading': isLoading },
    className
  );

  const inGroup = !!(prepend || append);

  const styles = useEuiMemoizedStyles(euiSelectStyles);
  const cssStyles = [
    styles.euiSelect,
    compressed ? styles.compressed : styles.uncompressed,
    fullWidth ? styles.fullWidth : styles.formWidth,
    inGroup && styles.inGroup,
    styles.lineHeight.removePadding,
    inGroup
      ? compressed
        ? styles.lineHeight.inGroup.compressed
        : styles.lineHeight.inGroup.uncompressed
      : compressed
      ? styles.lineHeight.compressed
      : styles.lineHeight.uncompressed,
  ];

  return (
    <EuiFormControlLayout
      isDropdown={true}
      fullWidth={fullWidth}
      isLoading={isLoading}
      isInvalid={isInvalid}
      isDisabled={disabled}
      compressed={compressed}
      prepend={prepend}
      append={append}
      inputId={id}
    >
      <EuiValidatableControl isInvalid={isInvalid}>
        <select
          id={id}
          name={name}
          className={classes}
          css={cssStyles}
          ref={inputRef}
          defaultValue={selectDefaultValue}
          value={value}
          onMouseUp={handleMouseUp}
          disabled={disabled}
          {...rest}
        >
          {hasNoInitialSelection && value === '' && (
            <option value="" disabled hidden style={{ display: 'none' }}>
              &nbsp;
            </option>
          )}
          {options.map((option, index) => {
            const { text, ...rest } = option;
            return (
              <option {...rest} key={index}>
                {text}
              </option>
            );
          })}
        </select>
      </EuiValidatableControl>
    </EuiFormControlLayout>
  );
};
