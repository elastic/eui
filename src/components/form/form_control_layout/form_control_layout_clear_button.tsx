import React, { FunctionComponent, ButtonHTMLAttributes } from 'react';

import classNames from 'classnames';
import { CommonProps } from '../../common';
import { EuiIcon } from '../../icon';
import { EuiI18n } from '../../i18n';

export type EuiFormControlLayoutClearButtonProps = CommonProps &
  ButtonHTMLAttributes<HTMLButtonElement>;

export const EuiFormControlLayoutClearButton: FunctionComponent<
  EuiFormControlLayoutClearButtonProps
> = ({ className, onClick, ...rest }) => {
  const classes = classNames('euiFormControlLayoutClearButton', className);

  return (
    <EuiI18n
      token="euiFormControlLayoutClearButton.label"
      default="Clear input">
      {(label: string) => (
        <button
          type="button"
          className={classes}
          onClick={onClick}
          aria-label={label}
          {...rest}>
          <EuiIcon
            className="euiFormControlLayoutClearButton__icon"
            type="cross"
          />
        </button>
      )}
    </EuiI18n>
  );
};
