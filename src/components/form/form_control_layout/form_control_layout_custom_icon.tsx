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
  ButtonHTMLAttributes,
  FunctionComponent,
  HTMLAttributes,
} from 'react';
import classNames from 'classnames';

import { EuiIcon, IconType } from '../../icon';
import { CommonProps, ExclusiveUnion } from '../../common';

export type EuiFormControlLayoutCustomIconProps = CommonProps &
  ExclusiveUnion<
    Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'type'>,
    HTMLAttributes<HTMLSpanElement>
  > & {
    type: IconType;
    iconRef?:
      | string
      | ((el: HTMLButtonElement | HTMLSpanElement | null) => void);
  };

export const EuiFormControlLayoutCustomIcon: FunctionComponent<
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
