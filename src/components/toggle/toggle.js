import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export const EuiToggle = ({
  id,
  label,
  checked,
  disabled,
  onChange,
  children,
  className,
  ...rest,
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
    <span
      className={classes}
      {...rest}
    >
      <input
        className="euiToggle__input"
        id={id}
        type="checkbox"
        checked={checked}
        disabled={disabled}
        onChange={onChange}
        aria-label={label}
      />

      {children}

    </span>
  );
};

EuiToggle.propTypes = {
  id: PropTypes.string,
  checked: PropTypes.bool,
  onChange: PropTypes.func,
  disabled: PropTypes.bool,

  /**
   * Use your own logic to pass the child you want according to
   * the checked state of your component.
   */
  children: PropTypes.node,

  /**
   * Required for accessibility.
   */
  label: PropTypes.string.isRequired,
};
