import React, { FC, FormHTMLAttributes, ReactNode } from 'react';
import classNames from 'classnames';
import { EuiCallOut } from '../call_out';
import { EuiI18n } from '../i18n';
import { CommonProps } from '../common';

export type EuiFormProps = CommonProps &
  FormHTMLAttributes<HTMLFormElement> & {
    isInvalid?: boolean;
    error?: ReactNode | ReactNode[];
  };

export const EuiForm: FC<EuiFormProps> = ({
  children,
  className,
  isInvalid,
  error,
  ...rest
}) => {
  const classes = classNames('euiForm', className);

  let optionalErrors: JSX.Element | null = null;

  if (error) {
    const errorTexts = Array.isArray(error) ? error : [error];
    optionalErrors = (
      <ul>
        {errorTexts.map((error, index) => (
          <li className="euiForm__error" key={index}>
            {error}
          </li>
        ))}
      </ul>
    );
  }

  let optionalErrorAlert;

  if (isInvalid) {
    optionalErrorAlert = (
      <EuiI18n
        token="euiForm.addressFormErrors"
        default="Please address the errors in your form.">
        {(addressFormErrors: string) => (
          <EuiCallOut
            className="euiForm__errors"
            title={addressFormErrors}
            color="danger">
            {optionalErrors}
          </EuiCallOut>
        )}
      </EuiI18n>
    );
  }

  return (
    <form className={classes} {...rest}>
      {optionalErrorAlert}
      {children}
    </form>
  );
};
