import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { ENTER, SPACE } from '../../../services/key_codes';

export class EuiComboBoxOption extends Component {
  static propTypes = {
    option: PropTypes.object.isRequired,
    children: PropTypes.node,
    className: PropTypes.string,
    optionRef: PropTypes.func,
    onClick: PropTypes.func.isRequired,
    onEnterKey: PropTypes.func.isRequired,
    disabled: PropTypes.bool,
    isFocused: PropTypes.bool.isRequired,
  };

  onClick = () => {
    const { onClick, option, disabled } = this.props;

    if (disabled) {
      return;
    }

    onClick(option);
  };

  onKeyDown = e => {
    if (e.keyCode === ENTER || e.keyCode === SPACE) {
      e.preventDefault();
      e.stopPropagation();
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
      optionRef,
      option,
      onClick, // eslint-disable-line no-unused-vars
      onEnterKey, // eslint-disable-line no-unused-vars
      disabled,
      isFocused,
      ...rest
    } = this.props;

    const classes = classNames('euiComboBoxOption', className, {
      'euiComboBoxOption-isDisabled': disabled,
      'euiComboBoxOption-isFocused': isFocused,
    });

    const { label } = option;

    return (
      <button
        role="option"
        type="button"
        aria-selected={isFocused}
        className={classes}
        onClick={this.onClick}
        onKeyDown={this.onKeyDown}
        ref={optionRef}
        aria-disabled={disabled}
        title={label}
        {...rest}>
        {children}
      </button>
    );
  }
}
