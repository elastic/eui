import React, {
  FunctionComponent,
  ChangeEventHandler,
  HTMLAttributes,
  ReactNode,
} from 'react';
import classNames from 'classnames';
import { CommonProps, Omit } from '../../common';

export interface RadioProps {
  autoFocus?: boolean;
  /**
   * When `true` creates a shorter height radio row
   */
  compressed?: boolean;
  label?: ReactNode;
  name?: string;
  value?: string;
  checked?: boolean;
  disabled?: boolean;
  onChange: ChangeEventHandler<HTMLInputElement>;
}

export interface EuiRadioProps
  extends CommonProps,
    Omit<HTMLAttributes<HTMLDivElement>, 'onChange'>,
    RadioProps {}

export const EuiRadio: FunctionComponent<EuiRadioProps> = ({
  className,
  id,
  name,
  checked,
  label,
  value,
  onChange,
  disabled,
  compressed,
  autoFocus,
  ...rest
}) => {
  const classes = classNames(
    'euiRadio',
    {
      'euiRadio--noLabel': !label,
      'euiRadio--compressed': compressed,
    },
    className
  );

  let optionalLabel;

  if (label) {
    optionalLabel = (
      <label className="euiRadio__label" htmlFor={id}>
        {label}
      </label>
    );
  }

  return (
    <div className={classes} {...rest}>
      <input
        className="euiRadio__input"
        type="radio"
        id={id}
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
        disabled={disabled}
        autoFocus={autoFocus}
      />

      <div className="euiRadio__circle" />

      {optionalLabel}
    </div>
  );
};
