import React, {
  FunctionComponent,
  ReactNode,
  HTMLAttributes,
  FormEvent,
} from 'react';
import classNames from 'classnames';
import { EuiCallOut } from '../call_out';
import { EuiI18n } from '../i18n';
import { CommonProps } from '../common';

export type EuiFormProps = CommonProps &
  HTMLAttributes<HTMLFormElement> &
  HTMLAttributes<HTMLDivElement> & {
    isInvalid?: boolean;
    /**
     * Which HTML element to render
     */
    component?: 'form' | 'div';
    error?: ReactNode | ReactNode[];
  };

export const EuiForm: FunctionComponent<EuiFormProps> = ({
  children,
  className,
  isInvalid,
  error,
  component = 'div',
  onSubmit,
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

  const relObj: {
    onSubmit?:
      | (((event: FormEvent<HTMLFormElement>) => void) &
          ((event: FormEvent<HTMLDivElement>) => void))
      | undefined;
  } = {};

  if (component === 'form') {
    relObj.onSubmit = onSubmit;
  }
  const Element = component;

  return (
    <Element className={classes} {...relObj} {...rest}>
      {optionalErrorAlert}
      {children}
    </Element>
  );
};
