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
