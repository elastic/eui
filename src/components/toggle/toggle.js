import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const typeToInputTypeMap = {
  'single': 'checkbox',
  'multi': 'radio',
};

export const TYPES = Object.keys(typeToInputTypeMap);;

export const EuiToggle = ({
  id,
  label,
  checked,
  disabled,
  onChange,
  children,
  type,
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
    <div
      className={classes}
      {...rest}
    >
      <input
        className="euiToggle__input"
        id={id}
        type={typeToInputTypeMap[type]}
        checked={checked}
        disabled={disabled}
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
  disabled: PropTypes.bool,

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
};

EuiToggle.defaultProps = {
  type: 'single',
};
