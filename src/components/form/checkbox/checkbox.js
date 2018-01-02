import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const typeToClassNameMap = {
  inList: 'euiCheckbox--inList',
};

export const TYPES = Object.keys(typeToClassNameMap);

export const EuiCheckbox = ({
  className,
  id,
  checked,
  label,
  onChange,
  type,
  disabled,
  ...rest
}) => {
  const classes = classNames(
    'euiCheckbox',
    typeToClassNameMap[type],
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
        {...rest}
      />

      <div className="euiCheckbox__square">
        <div className="euiCheckbox__check" />
      </div>

      {optionalLabel}
    </div>
  );
};

EuiCheckbox.propTypes = {
  className: PropTypes.string,
  id: PropTypes.string.isRequired,
  checked: PropTypes.bool.isRequired,
  label: PropTypes.node,
  onChange: PropTypes.func.isRequired,
  type: PropTypes.oneOf(TYPES),
  disabled: PropTypes.bool,
};

EuiCheckbox.defaultProps = {
  checked: false,
  disabled: false,
};
