import React, { Component, KeyboardEvent, ReactNode } from 'react';
import classNames from 'classnames';

import { ENTER, SPACE } from '../../../services/key_codes';
import { RefCallback } from '../../common';
import { EuiComboBoxOptionOption } from '../index';

export interface EuiComboBoxOptionProps<T> {
  children?: ReactNode;
  className?: string;
  disabled?: boolean;
  isFocused: boolean;
  onClick: (option: EuiComboBoxOptionOption<T>) => void;
  onEnterKey: (option: EuiComboBoxOptionOption<T>) => void;
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

  onKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
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
