import React, {
  ButtonHTMLAttributes,
  FunctionComponent,
  ReactNode,
  useState,
} from 'react';
import classNames from 'classnames';

import { CommonProps, Omit } from '../../common';
import makeId from '../../form/form_row/make_id';
import { EuiIcon } from '../../icon';

export type EuiSwitchEvent = React.BaseSyntheticEvent<
  React.MouseEvent<HTMLButtonElement>,
  HTMLButtonElement,
  EventTarget & {
    checked: boolean;
  }
>;

export type EuiSwitchProps = CommonProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'onChange'> & {
    label: ReactNode;
    checked: boolean;
    onChange: (event: EuiSwitchEvent) => void;
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
  const [switchId] = useState(id || makeId());

  const onClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const event = (e as unknown) as EuiSwitchEvent;
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
