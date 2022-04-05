/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, {
  Fragment,
  FunctionComponent,
  ButtonHTMLAttributes,
  ReactNode,
} from 'react';
import classNames from 'classnames';

import { CommonProps } from '../../common';

import { EuiScreenReaderOnly } from '../../accessibility';
import {
  EuiFormControlLayout,
  EuiFormControlLayoutProps,
} from '../form_control_layout';
import { EuiI18n } from '../../i18n';
import { getFormControlClassNameForIconCount } from '../form_control_layout/_num_icons';

export interface EuiSuperSelectOption<T> {
  value: T;
  inputDisplay?: ReactNode;
  dropdownDisplay?: ReactNode;
  disabled?: boolean;
  'data-test-subj'?: string;
}

export interface EuiSuperSelectControlProps<T>
  extends CommonProps,
    Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'value'> {
  compressed?: boolean;
  fullWidth?: boolean;
  isInvalid?: boolean;
  isLoading?: boolean;
  readOnly?: boolean;

  name?: string;
  value?: T;

  options?: Array<EuiSuperSelectOption<T>>;

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
   * Creates a semantic label ID for the `div[role="listbox"]` that's opened on click or keypress.
   * __Generated and passed down by `EuiSuperSelect`.__
   */
  screenReaderId?: string;
}

export const EuiSuperSelectControl: <T extends string>(
  props: EuiSuperSelectControlProps<T>
) => ReturnType<FunctionComponent<EuiSuperSelectControlProps<T>>> = ({
  className,
  options = [],
  id,
  name,
  fullWidth = false,
  isLoading = false,
  isInvalid = false,
  readOnly,
  defaultValue,
  compressed = false,
  value,
  prepend,
  append,
  screenReaderId,
  disabled,
  ...rest
}) => {
  const numIconsClass = getFormControlClassNameForIconCount({
    isInvalid,
    isLoading,
    isDropdown: true,
  });

  const classes = classNames(
    'euiSuperSelectControl',
    numIconsClass,
    {
      'euiSuperSelectControl--fullWidth': fullWidth,
      'euiSuperSelectControl--compressed': compressed,
      'euiSuperSelectControl--inGroup': prepend || append,
      'euiSuperSelectControl-isLoading': isLoading,
      'euiSuperSelectControl-isInvalid': isInvalid,
    },
    className
  );

  // React HTML input can not have both value and defaultValue properties.
  // https://reactjs.org/docs/uncontrolled-components.html#default-values
  let selectDefaultValue;
  if (value == null) {
    selectDefaultValue = defaultValue || '';
  }

  let selectedValue;
  if (value) {
    const selectedOption = options.find((option) => option.value === value);
    selectedValue = selectedOption
      ? selectedOption.inputDisplay
      : selectedValue;
  }

  return (
    <Fragment>
      <input
        type="hidden"
        id={id}
        name={name}
        defaultValue={selectDefaultValue}
        value={value}
        readOnly={readOnly}
      />

      <EuiFormControlLayout
        isDropdown
        fullWidth={fullWidth}
        isLoading={isLoading}
        isInvalid={isInvalid}
        isDisabled={disabled}
        readOnly={readOnly}
        compressed={compressed}
        prepend={prepend}
        append={append}
      >
        {/*
          This is read when the user tabs in. The comma is important,
          otherwise the screen reader often combines the text.
        */}
        <EuiScreenReaderOnly>
          <span id={screenReaderId}>
            <EuiI18n
              token="euiSuperSelectControl.selectAnOption"
              default="Select an option: {selectedValue}, is selected"
              values={{ selectedValue }}
            />
          </span>
        </EuiScreenReaderOnly>
        <button
          type="button"
          className={classes}
          aria-haspopup="listbox"
          disabled={disabled || readOnly}
          // @ts-ignore Using as a selector only for mixin use
          readOnly={readOnly}
          {...rest}
        >
          {selectedValue}
        </button>
      </EuiFormControlLayout>
    </Fragment>
  );
};
