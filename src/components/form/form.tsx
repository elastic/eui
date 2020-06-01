/*
 * Licensed to Elasticsearch B.V. under one or more contributor
 * license agreements. See the NOTICE file distributed with
 * this work for additional information regarding copyright
 * ownership. Elasticsearch B.V. licenses this file to you under
 * the Apache License, Version 2.0 (the "License"); you may
 * not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

import React, {
  FunctionComponent,
  ReactNode,
  HTMLAttributes,
  FormHTMLAttributes,
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
  };

export const EuiForm: FunctionComponent<EuiFormProps> = ({
  children,
  className,
  isInvalid,
  error,
  component = 'div',
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

  const Element = component;

  return (
    <Element className={classes} {...rest as HTMLAttributes<HTMLElement>}>
      {optionalErrorAlert}
      {children}
    </Element>
  );
};
