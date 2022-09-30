/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, {
  ReactNode,
  HTMLAttributes,
  FormHTMLAttributes,
  useCallback,
  forwardRef,
} from 'react';
import classNames from 'classnames';
import { EuiCallOut } from '../call_out';
import { EuiI18n } from '../i18n';
import { CommonProps, ExclusiveUnion } from '../common';

import { FormContext, FormContextValue } from './eui_form_context';

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
    /**
     * When set to `true`, all the rows/controls in this form will
     * default to taking up 100% of the width of their continer. You
     * can specify `fullWidth={false}` on individual rows/controls to
     * disable this behavior for specific components.
     * @default false
     */
    fullWidth?: boolean;
  };

export const EuiForm = forwardRef<HTMLElement, EuiFormProps>(
  (
    {
      children,
      className,
      isInvalid,
      error,
      component = 'div',
      invalidCallout = 'above',
      fullWidth,
      ...rest
    },
    ref
  ) => {
    const formContext = React.useMemo(
      (): FormContextValue => ({
        defaultFullWidth: fullWidth ?? false,
      }),
      [fullWidth]
    );

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
          default="Please address the highlighted errors."
        >
          {(addressFormErrors: string) => (
            <EuiCallOut
              tabIndex={-1}
              ref={handleFocus}
              className="euiForm__errors"
              title={addressFormErrors}
              color="danger"
              role="alert"
              aria-live="assertive"
            >
              {optionalErrors}
            </EuiCallOut>
          )}
        </EuiI18n>
      );
    }

    const Element = component;

    return (
      <Element
        // @ts-expect-error Element is a <div> or <form>, but TypeScript wants to support both
        ref={ref}
        className={classes}
        {...(rest as HTMLAttributes<HTMLElement>)}
      >
        <FormContext.Provider value={formContext}>
          {optionalErrorAlert}
          {children}
        </FormContext.Provider>
      </Element>
    );
  }
);
EuiForm.displayName = 'EuiForm';
