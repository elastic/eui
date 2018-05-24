import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const typeToInputTypeMap = {
  'single': 'radio',
  'multi': 'checkbox',
};

export const TYPES = Object.keys(typeToInputTypeMap);;

export const EuiToggle = ({
  id,
  label,
  checked,
  isDisabled,
  onChange,
  children,
  type,
  name,
  value,
  className,
  inputClassName,
  ...rest,
}) => {
  const classes = classNames(
    'euiToggle',
    {
      'euiToggle--checked': checked,
    },
    className
  );

  const inputClasses = classNames(
    'euiToggle__input',
    inputClassName,
  );

  return (
    <div
      className={classes}
      {...rest}
    >
      <input
        className={inputClasses}
        id={id}
        name={name}
        value={value}
        type={typeToInputTypeMap[type]}
        checked={checked}
        disabled={isDisabled}
        onChange={onChange}
        aria-label={label}
      />

      {children}

    </div>
  );
};

EuiToggle.propTypes = {
  id: PropTypes.string,

  /**
   * Initial state of the toggle
   */
  checked: PropTypes.bool,

  /**
   * For handling the onChange event of the input
   */
  onChange: PropTypes.func,
  isDisabled: PropTypes.bool,

  /**
   * Use your own logic to pass the child you want according to
   * the checked state of your component.
   */
  children: PropTypes.node,

  /**
   * Determines the input type based on multiple or single item(s).
   */
  type: PropTypes.oneOf(TYPES),

  /**
   * What would typically be the input's label. Required for accessibility.
   */
  label: PropTypes.string.isRequired,
  inputClassName: PropTypes.string,
};

EuiToggle.defaultProps = {
  type: 'multi',
};
