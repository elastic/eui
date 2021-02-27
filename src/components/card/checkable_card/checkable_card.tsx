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

import React, { FunctionComponent, ReactNode } from 'react';
import classNames from 'classnames';

import {
  EuiRadio,
  EuiRadioProps,
  EuiCheckbox,
  EuiCheckboxProps,
} from '../../form';

interface EuiCheckableCardBaseProps {
  id: string;
  label: ReactNode;
}

// if `checkableType` is left out or set to 'radio', use EuiRadioProps
interface EuiCheckableCardAsRadioProps
  extends Omit<EuiRadioProps, 'compressed'> {
  /**
   * Whether the control is a radio button or checkbox
   */
  checkableType?: 'radio';
}

// if `checkableType` is set to 'checkbox', use EuiCheckboxProps
interface EuiCheckableCardAsCheckboxProps
  extends Omit<EuiCheckboxProps, 'compressed'> {
  checkableType: 'checkbox';
}

export type EuiCheckableCardProps = Omit<
  EuiCheckableCardAsCheckboxProps | EuiCheckableCardAsRadioProps,
  'label' | 'id'
> &
  EuiCheckableCardBaseProps;
export const EuiCheckableCard: FunctionComponent<EuiCheckableCardProps> = ({
  children,
  className,
  checkableType = 'radio',
  label,
  checked,
  disabled,
  ...rest
}) => {
  const { id } = rest;
  const classes = classNames(
    'euiCheckableCard',
    'euiCheckableCard--hasShadow', // For matching EuiPanel mixin
    'euiCheckableCard--borderRadiusMedium', // For matching EuiPanel mixin
    {
      'euiCheckableCard-isChecked': checked,
      'euiCheckableCard-isDisabled': disabled,
    },
    className
  );

  let checkableElement;
  if (checkableType === 'radio') {
    checkableElement = (
      <EuiRadio
        checked={checked}
        disabled={disabled}
        {...(rest as EuiRadioProps)}
      />
    );
  } else {
    checkableElement = (
      <EuiCheckbox checked={checked} disabled={disabled} {...rest} />
    );
  }

  const labelClasses = classNames('euiCheckableCard__label', {
    'euiCheckableCard__label-isDisabled': disabled,
  });

  return (
    <div className={classes}>
      <div className="euiCheckableCard__row">
        <div className="euiCheckableCard__control">{checkableElement}</div>
        <label
          className={labelClasses}
          htmlFor={id}
          aria-describedby={children ? `${id}-details` : undefined}>
          {label}
        </label>
      </div>
      {children && (
        <div className="euiCheckableCard__row">
          {/* Empty div for left side background color only */}
          <div className="euiCheckableCard__control" />
          <div id={`${id}-details`} className="euiCheckableCard__children">
            {children}
          </div>
        </div>
      )}
    </div>
  );
};
