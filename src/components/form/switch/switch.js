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
  onChange,
  className,
  ...rest,
}) => {
  const classes = classNames('kuiSwitch', className);

  return (
    <div className={classes} {...rest}>
      <input
        className="kuiSwitch__input"
        name={name}
        id={id}
        type="checkbox"
        checked={checked}
        disabled={disabled}
        onChange={onChange}
      />

      <span className="kuiSwitch__body">
        <span className="kuiSwitch__thumb" />
        <span className="kuiSwitch__track">
          <EuiIcon
            type="cross"
            size="medium"
            className="kuiSwitch__icon"
          />

          <EuiIcon
            type="check"
            size="medium"
            className="kuiSwitch__icon kuiSwitch__icon--checked"
          />
        </span>
      </span>

      <label
        className="kuiSwitch__label"
        htmlFor={id}
      >
        {label}
      </label>
    </div>
  );
};

EuiSwitch.propTypes = {
  name: PropTypes.string,
  id: PropTypes.string,
  label: PropTypes.string,
  checked: PropTypes.bool,
  onChange: PropTypes.func,
};

EuiSwitch.defaultProps = {
  defaultChecked: false,
};
