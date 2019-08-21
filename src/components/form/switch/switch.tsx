import React, {
  ButtonHTMLAttributes,
  FunctionComponent,
  ReactNode,
} from 'react';
import classNames from 'classnames';

import { CommonProps, Omit } from '../../common';
import makeId from '../../form/form_row/make_id';
import { EuiIcon } from '../../icon';

export type EuiSwitchProps = CommonProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'onChange'> & {
    label: ReactNode;
    checked: boolean;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    disabled?: boolean;
    compressed?: boolean;
  };

export const EuiSwitch: FunctionComponent<EuiSwitchProps> = ({
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
  const switchId = id || makeId();

  const onClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const event = (e as unknown) as React.ChangeEvent<HTMLInputElement>;
    event.target.checked = !checked;
    onChange(event);
  };

  const classes = classNames(
    'euiSwitch',
    {
      'euiSwitch--compressed': compressed,
    },
    className
  );

  return (
    <div className={classes}>
      <button
        id={switchId}
        aria-checked={checked}
        className="euiSwitch__button"
        role="switch"
        disabled={disabled}
        onClick={onClick}
        {...rest}>
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
      </button>

      <label className="euiSwitch__label" htmlFor={switchId}>
        {label}
      </label>
    </div>
  );
};
