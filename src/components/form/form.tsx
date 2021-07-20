/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, {
  FunctionComponent,
  ReactNode,
  HTMLAttributes,
  FormHTMLAttributes,
  useCallback,
} from 'react';
import classNames from 'classnames';
import { EuiCallOut } from '../call_out';
import { EuiI18n } from '../i18n';
import { CommonProps, ExclusiveUnion } from '../common';

export type EuiFormProps = CommonProps &
  ExclusiveUnion<
    { component: 'form' } & FormHTMLAttributes<HTMLFormElement>,
    { component?: 'div' } & HTMLAttributes<HTMLDivElement>
  > & {
    isInvalid?: boolean;
    /**
     * Which HTML element to render `div` or `form`
     */
    component?: 'form' | 'div';
    error?: ReactNode | ReactNode[];
    /**
     * Where to display the callout with the list of errors
     */
    invalidCallout?: 'above' | 'none';
  };

export const EuiForm: FunctionComponent<EuiFormProps> = ({
  children,
  className,
  isInvalid,
  error,
  component = 'div',
  invalidCallout = 'above',
  ...rest
}) => {
  const handleFocus = useCallback((node) => {
    node?.focus();
  }, []);

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

  if (isInvalid && invalidCallout === 'above') {
    optionalErrorAlert = (
      <EuiI18n
        token="euiForm.addressFormErrors"
        default="Please address the highlighted errors.">
        {(addressFormErrors: string) => (
          <EuiCallOut
            tabIndex={-1}
            ref={handleFocus}
            className="euiForm__errors"
            title={addressFormErrors}
            color="danger"
            role="alert"
            aria-live="assertive">
            {optionalErrors}
          </EuiCallOut>
        )}
      </EuiI18n>
    );
  }

  const Element = component;

  return (
    <Element className={classes} {...(rest as HTMLAttributes<HTMLElement>)}>
      {optionalErrorAlert}
      {children}
    </Element>
  );
};
