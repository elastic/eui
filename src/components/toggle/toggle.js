import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export const EuiToggle = ({
  id,
  name,
  checked,
  disabled,
  onChange,
  children,
  className
}) => {
  const classes = classNames(
    'euiToggle',
    {
      'euiToggle--disabled': disabled,
      'euiToggle--checked': checked,
    },
    className
  );

  return (
    <span className={classes}>
      <input
        className="euiToggle__input"
        name={name}
        id={id}
        type="checkbox"
        checked={checked}
        disabled={disabled}
        onChange={onChange}
      />

      {children}
    </span>
  );
};

EuiToggle.propTypes = {
  name: PropTypes.string,
  id: PropTypes.string,
  checked: PropTypes.bool,
  onChange: PropTypes.func,
  disabled: PropTypes.bool,
  children: PropTypes.node,
};
