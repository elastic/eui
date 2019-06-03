import React, { ChangeEventHandler, HTMLAttributes } from 'react';
import classNames from 'classnames';
import { CommonProps } from '../common';

const typeToInputTypeMap = {
  single: 'radio',
  multi: 'checkbox',
};

export const TYPES = Object.keys(typeToInputTypeMap);

export type ToggleType = keyof typeof typeToInputTypeMap;

export type EuiToggleProps = HTMLAttributes<HTMLDivElement> &
  CommonProps & {
    id?: string;
    /**
     * Initial state of the toggle
     */
    checked?: boolean;
    /**
     * For handling the onChange event of the input
     */
    onChange?: ChangeEventHandler<HTMLInputElement>;
    isDisabled?: boolean;
    name?: string;
    /**
     * Determines the input type based on multiple or single item(s)
     */
    type?: ToggleType;
    /**
     * What would typically be the input's label. Required for accessibility.
     */
    label: string;
    /**
     * Additional classNames for the input itself
     */
    inputClassName?: string;
    value?: string | number;
  };

export const EuiToggle: React.SFC<EuiToggleProps> = ({
  id,
  className,
  checked,
  children,
  inputClassName,
  isDisabled,
  label,
  name,
  onChange,
  title,
  type,
  value,
  ...rest
}) => {
  const classes = classNames(
    'euiToggle',
    { 'euiToggle--checked': checked },
    className
  );

  const inputClasses = classNames('euiToggle__input', inputClassName);

  return (
    <div className={classes} {...rest}>
      <input
        id={id}
        className={inputClasses}
        aria-label={label}
        checked={checked}
        disabled={isDisabled}
        name={name}
        onChange={onChange}
        title={title}
        type={type ? typeToInputTypeMap[type] : undefined}
        value={value}
      />

      {children}
    </div>
  );
};

EuiToggle.defaultProps = {
  type: 'multi',
};
