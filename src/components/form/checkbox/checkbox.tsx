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

import React, {
  Component,
  ChangeEventHandler,
  ReactNode,
  InputHTMLAttributes,
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
      ...rest
    } = this.props;

    const { indeterminate, ...inputProps } = rest; // `indeterminate` is set dynamically later

    const classes = classNames(
      'euiCheckbox',
      type && typeToClassNameMap[type],
      {
        'euiCheckbox--noLabel': !label,
        'euiCheckbox--compressed': compressed,
      },
      className
    );

    let optionalLabel;

    if (label) {
      optionalLabel = (
        <label className="euiCheckbox__label" htmlFor={id}>
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
          {...inputProps}
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
