import React, { ButtonHTMLAttributes, FunctionComponent } from 'react';
import classNames from 'classnames';

import { EuiIcon, IconType } from '../../icon';
import { CommonProps } from '../../common';

export interface EuiFormControlLayoutCustomIconProps {
  type: IconType;
  iconRef?: string | ((el: HTMLButtonElement | HTMLSpanElement | null) => void);
}

export const EuiFormControlLayoutCustomIcon: FunctionComponent<
  CommonProps &
    ButtonHTMLAttributes<HTMLButtonElement> &
    EuiFormControlLayoutCustomIconProps
> = ({ className, onClick, type, iconRef, ...rest }) => {
  const classes = classNames('euiFormControlLayoutCustomIcon', className, {
    'euiFormControlLayoutCustomIcon--clickable': onClick,
  });

  if (onClick) {
    return (
      <button
        type="button"
        onClick={onClick}
        className={classes}
        ref={iconRef}
        {...rest}>
        <EuiIcon
          className="euiFormControlLayoutCustomIcon__icon"
          aria-hidden="true"
          type={type}
        />
      </button>
    );
  }

  return (
    <span className={classes} ref={iconRef} {...rest}>
      <EuiIcon
        className="euiFormControlLayoutCustomIcon__icon"
        aria-hidden="true"
        type={type}
      />
    </span>
  );
};
