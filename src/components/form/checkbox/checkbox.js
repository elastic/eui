import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const typeToClassNameMap = {
  inList: 'euiCheckbox--inList',
};

export const TYPES = Object.keys(typeToClassNameMap);

export class EuiCheckbox extends Component {
  componentDidMount() {
    this.invalidateIndeterminate(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.invalidateIndeterminate(nextProps);
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

    const classes = classNames(
      'euiCheckbox',
      typeToClassNameMap[type],
      {
        'euiCheckbox--noLabel': !label,
        'euiCheckbox--compressed': compressed
      },
      className
    );

    let optionalLabel;

    if (label) {
      optionalLabel = (
        <label
          className="euiCheckbox__label"
          htmlFor={id}
        >
          {label}
        </label>
      );
    }

    return (
      <div
        className={classes}
      >
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

  setInputRef = (input) => {
    this.inputRef = input;

    if (this.props.inputRef) {
      this.props.inputRef(input);
    }

    if (input) {
      this.invalidateIndeterminate(this.props);
    }
  }

  invalidateIndeterminate({ indeterminate }) {
    this.inputRef.indeterminate = indeterminate;
  }
}

EuiCheckbox.propTypes = {
  className: PropTypes.string,
  id: PropTypes.string.isRequired,
  checked: PropTypes.bool.isRequired,
  label: PropTypes.node,
  onChange: PropTypes.func.isRequired,
  type: PropTypes.oneOf(TYPES),
  disabled: PropTypes.bool,
  /**
   * when `true` creates a shorter height checkbox row
   */
  compressed: PropTypes.bool,
};

EuiCheckbox.defaultProps = {
  checked: false,
  disabled: false,
  compressed: false,
};
