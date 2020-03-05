import React, { FunctionComponent, ReactNode, HTMLAttributes } from 'react';
import classNames from 'classnames';
import { EuiCallOut } from '../call_out';
import { EuiI18n } from '../i18n';
import { CommonProps } from '../common';

export type EuiFormProps = CommonProps &
  HTMLAttributes<HTMLDivElement> & {
    isInvalid?: boolean;
    error?: ReactNode | ReactNode[];
  };

export const EuiForm: FunctionComponent<EuiFormProps> = ({
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
    <div className={classes} {...rest}>
      {optionalErrorAlert}
      {children}
    </div>
  );
};
