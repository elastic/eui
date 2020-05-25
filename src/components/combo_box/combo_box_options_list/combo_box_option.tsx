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
  HTMLAttributes,
  KeyboardEventHandler,
  ReactNode,
  RefCallback,
} from 'react';
import classNames from 'classnames';

import { ENTER, SPACE } from '../../../services/key_codes';
import { EuiComboBoxOptionOption, OptionHandler } from '../types';
import { CommonProps } from '../../common';

export interface EuiComboBoxOptionProps<T>
  extends CommonProps,
    Omit<HTMLAttributes<HTMLButtonElement>, 'onClick'> {
  children?: ReactNode;
  className?: string;
  disabled?: boolean;
  isFocused: boolean;
  onClick: OptionHandler<T>;
  onEnterKey: OptionHandler<T>;
  option: EuiComboBoxOptionOption<T>;
  optionRef?: RefCallback<HTMLButtonElement>;
}

export class EuiComboBoxOption<T> extends Component<EuiComboBoxOptionProps<T>> {
  onClick = () => {
    const { onClick, option, disabled } = this.props;

    if (disabled) {
      return;
    }

    onClick(option);
  };

  onKeyDown: KeyboardEventHandler<HTMLButtonElement> = event => {
    if (event.keyCode === ENTER || event.keyCode === SPACE) {
      event.preventDefault();
      event.stopPropagation();
      const { onEnterKey, option, disabled } = this.props;

      if (disabled) {
        return;
      }

      onEnterKey(option);
    }
  };

  render() {
    const {
      children,
      className,
      disabled,
      isFocused,
      onClick, // eslint-disable-line no-unused-vars
      onEnterKey, // eslint-disable-line no-unused-vars
      option,
      optionRef,
      ...rest
    } = this.props;

    const classes = classNames('euiComboBoxOption', className, {
      'euiComboBoxOption-isDisabled': disabled,
      'euiComboBoxOption-isFocused': isFocused,
    });

    const { label } = option;

    return (
      <button
        aria-disabled={disabled}
        aria-selected={isFocused}
        className={classes}
        onClick={this.onClick}
        onKeyDown={this.onKeyDown}
        ref={optionRef}
        role="option"
        title={label}
        type="button"
        {...rest}>
        {children}
      </button>
    );
  }
}
