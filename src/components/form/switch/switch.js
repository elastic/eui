import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { EuiIcon } from '../../icon';

export const EuiSwitch = ({
  label,
  id,
  name,
  checked,
  disabled,
  compressed,
  onChange,
  className,
  ...rest
}) => {
  const classes = classNames(
    'euiSwitch',
    {
      'euiSwitch--compressed': compressed,
    },
    className
  );

  return (
    <div className={classes}>
      <input
        className="euiSwitch__input"
        name={name}
        id={id}
        type="checkbox"
        checked={checked}
        disabled={disabled}
        onChange={onChange}
        {...rest}
      />

      <span className="euiSwitch__body">
        <span className="euiSwitch__thumb" />
        <span className="euiSwitch__track">
          <EuiIcon
            type="cross"
            size="m"
            className="euiSwitch__icon"
          />

          <EuiIcon
            type="check"
            size="m"
            className="euiSwitch__icon euiSwitch__icon--checked"
          />
        </span>
      </span>

      { label &&
        <label
          className="euiSwitch__label"
          htmlFor={id}
        >
          {label}
        </label>
      }

    </div>
  );
};

EuiSwitch.propTypes = {
  name: PropTypes.string,
  id: PropTypes.string,
  label: PropTypes.node,
  checked: PropTypes.bool,
  onChange: PropTypes.func,
  disabled: PropTypes.bool,
  compressed: PropTypes.bool
};
