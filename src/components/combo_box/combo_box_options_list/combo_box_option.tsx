import React, {
  Component,
  ReactNode,
  KeyboardEventHandler,
  HTMLAttributes,
} from 'react';
import classNames from 'classnames';

import { ENTER, SPACE } from '../../../services/key_codes';
import { EuiComboBoxOptionOption, OptionHandler, RefCallback } from '../types';
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
