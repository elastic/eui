/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, {
  Component,
  ChangeEventHandler,
  ReactNode,
  InputHTMLAttributes,
  LabelHTMLAttributes,
} from 'react';
import classNames from 'classnames';

import { keysOf, CommonProps } from '../../common';

const typeToClassNameMap = {
  inList: 'euiCheckbox--inList',
};

export const TYPES = keysOf(typeToClassNameMap);

export type EuiCheckboxType = keyof typeof typeToClassNameMap;

export interface EuiCheckboxProps
  extends CommonProps,
    InputHTMLAttributes<HTMLInputElement> {
  id: string;
  checked?: boolean;
  onChange: ChangeEventHandler<HTMLInputElement>; // overriding to make it required
  inputRef?: (element: HTMLInputElement) => void;
  label?: ReactNode;
  type?: EuiCheckboxType;
  disabled?: boolean;
  /**
   * when `true` creates a shorter height checkbox row
   */
  compressed?: boolean;
  indeterminate?: boolean;
  /**
   * Object of props passed to the <label/>
   */
  labelProps?: CommonProps & LabelHTMLAttributes<HTMLLabelElement>;
}

export class EuiCheckbox extends Component<EuiCheckboxProps> {
  static defaultProps = {
    checked: false,
    disabled: false,
    indeterminate: false,
    compressed: false,
  };

  inputRef?: HTMLInputElement = undefined;

  componentDidMount() {
    this.invalidateIndeterminate();
  }

  componentDidUpdate() {
    this.invalidateIndeterminate();
  }

  render() {
    const {
      className,
      id,
      checked,
      label,
      onChange,
      type,
      disabled,
      compressed,
      indeterminate,
      inputRef,
      labelProps,
      ...rest
    } = this.props;

    const classes = classNames(
      'euiCheckbox',
      type && typeToClassNameMap[type],
      {
        'euiCheckbox--noLabel': !label,
        'euiCheckbox--compressed': compressed,
      },
      className
    );
    const labelClasses = classNames(
      'euiCheckbox__label',
      labelProps?.className
    );
    let optionalLabel;

    if (label) {
      optionalLabel = (
        <label {...labelProps} className={labelClasses} htmlFor={id}>
          {label}
        </label>
      );
    }

    return (
      <div className={classes}>
        <input
          className="euiCheckbox__input"
          type="checkbox"
          id={id}
          checked={checked}
          onChange={onChange}
          disabled={disabled}
          ref={this.setInputRef}
          {...rest}
        />

        <div className="euiCheckbox__square" />

        {optionalLabel}
      </div>
    );
  }

  setInputRef = (input: HTMLInputElement) => {
    this.inputRef = input;

    if (this.props.inputRef) {
      this.props.inputRef(input);
    }

    this.invalidateIndeterminate();
  };

  invalidateIndeterminate() {
    if (this.inputRef) {
      this.inputRef.indeterminate = this.props.indeterminate!;
    }
  }
}
