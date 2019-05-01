import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export const EuiRadio = ({
  className,
  id,
  name,
  checked,
  label,
  value,
  onChange,
  disabled,
  compressed,
  autoFocus,
  ...rest
}) => {
  const classes = classNames(
    'euiRadio',
    {
      'euiRadio--noLabel': !label,
      'euiRadio--compressed': compressed,
    },
    className
  );

  let optionalLabel;

  if (label) {
    optionalLabel = (
      <label className="euiRadio__label" htmlFor={id}>
        {label}
      </label>
    );
  }

  return (
    <div className={classes} {...rest}>
      <input
        className="euiRadio__input"
        type="radio"
        id={id}
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
        disabled={disabled}
        autoFocus={autoFocus}
      />

      <div className="euiRadio__circle" />

      {optionalLabel}
    </div>
  );
};

EuiRadio.propTypes = {
  className: PropTypes.string,
  id: PropTypes.string.isRequired,
  checked: PropTypes.bool.isRequired,
  label: PropTypes.node,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  /**
   * when `true` creates a shorter height radio row
   */
  compressed: PropTypes.bool,
  autoFocus: PropTypes.bool,
};

EuiRadio.defaultProps = {
  checked: false,
  disabled: false,
  compressed: false,
};
