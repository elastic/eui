import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export const EuiRadio = ({
  className,
  id,
  checked,
  label,
  onChange,
  disabled,
  ...rest
}) => {
  const classes = classNames(
    'euiRadio',
    className
  );

  let optionalLabel;

  if (label) {
    optionalLabel = (
      <label
        className="euiRadio__label"
        htmlFor={id}
      >
        {label}
      </label>
    );
  }

  return (
    <div
      className={classes}
      {...rest}
    >
      <input
        className="euiRadio__input"
        type="radio"
        id={id}
        checked={checked}
        onChange={onChange}
        disabled={disabled}
      />

      <div className="euiRadio__circle">
        <div className="euiRadio__check" />
      </div>

      {optionalLabel}
    </div>
  );
};

EuiRadio.propTypes = {
  className: PropTypes.string,
  id: PropTypes.string.isRequired,
  checked: PropTypes.bool.isRequired,
  label: PropTypes.node,
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
};

EuiRadio.defaultProps = {
  checked: false,
  disabled: false,
};
