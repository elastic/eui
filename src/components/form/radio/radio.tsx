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
  ChangeEventHandler,
  HTMLAttributes,
  LabelHTMLAttributes,
  ReactNode,
} from 'react';
import classNames from 'classnames';
import { CommonProps, ExclusiveUnion } from '../../common';

export interface RadioProps {
  autoFocus?: boolean;
  /**
   * When `true` creates a shorter height radio row
   */
  compressed?: boolean;
  name?: string;
  value?: string;
  checked?: boolean;
  disabled?: boolean;
  onChange: ChangeEventHandler<HTMLInputElement>;
  /**
   * Object of props passed to the <label/>
   */
  labelProps?: CommonProps & LabelHTMLAttributes<HTMLLabelElement>;
}

interface idWithLabel extends RadioProps {
  label: ReactNode;
  id: string;
}

interface withId extends RadioProps {
  id: string;
}

export type EuiRadioProps = CommonProps &
  Omit<HTMLAttributes<HTMLDivElement>, 'onChange' | 'id'> &
  ExclusiveUnion<ExclusiveUnion<RadioProps, idWithLabel>, withId>;

export const EuiRadio: FunctionComponent<EuiRadioProps> = ({
  className,
  id,
  name,
  checked,
  label,
  value,
  onChange,
  disabled,
  compressed,
  autoFocus,
  labelProps,
  ...rest
}) => {
  const classes = classNames(
    'euiRadio',
    {
      'euiRadio--noLabel': !label,
      'euiRadio--compressed': compressed,
    },
    className
  );
  const labelClasses = classNames('euiRadio__label', labelProps?.className);
  let optionalLabel;

  if (label) {
    optionalLabel = (
      <label {...labelProps} className={labelClasses} htmlFor={id}>
        {label}
      </label>
    );
  }

  return (
    <div className={classes} {...rest}>
      <input
        className="euiRadio__input"
        type="radio"
        id={id}
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
        disabled={disabled}
        autoFocus={autoFocus}
      />
      <div className="euiRadio__circle" />

      {optionalLabel}
    </div>
  );
};
