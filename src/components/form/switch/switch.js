import React, { Component } from 'react';

import PropTypes from 'prop-types';
import classNames from 'classnames';

import makeId from '../../form/form_row/make_id';
import { EuiIcon } from '../../icon';

export class EuiSwitch extends Component {
  constructor(props) {
    super(props);

    this.state = {
      switchId: props.id || makeId(),
    };
  }

  render() {
    const {
      label,
      id,
      name,
      checked,
      disabled,
      compressed,
      onChange,
      className,
      ...rest
    } = this.props;

    const { switchId } = this.state;

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
          id={switchId}
          type="checkbox"
          checked={checked}
          disabled={disabled}
          onChange={onChange}
          {...rest}
        />

        <span className="euiSwitch__body">
          <span className="euiSwitch__thumb" />
          <span className="euiSwitch__track">
            <EuiIcon type="cross" size="m" className="euiSwitch__icon" />

            <EuiIcon
              type="check"
              size="m"
              className="euiSwitch__icon euiSwitch__icon--checked"
            />
          </span>
        </span>

        {label && (
          <label className="euiSwitch__label" htmlFor={switchId}>
            {label}
          </label>
        )}
      </div>
    );
  }
}

EuiSwitch.propTypes = {
  name: PropTypes.string,
  id: PropTypes.string,
  label: PropTypes.node,
  checked: PropTypes.bool,
  onChange: PropTypes.func,
  disabled: PropTypes.bool,
  compressed: PropTypes.bool,
};
