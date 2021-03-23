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

import React, { FunctionComponent, ReactNode, useRef } from 'react';
import classNames from 'classnames';

import {
  EuiRadio,
  EuiRadioProps,
  EuiCheckbox,
  EuiCheckboxProps,
} from '../../form';
import { EuiSplitPanel } from '../../panel';
import { _EuiSplitPanelOuterProps } from '../../panel/split_panel';

interface EuiCheckableCardBaseProps {
  id: string;
  label: ReactNode;
  hasShadow?: _EuiSplitPanelOuterProps['hasShadow'];
  hasBorder?: _EuiSplitPanelOuterProps['hasBorder'];
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
  hasShadow,
  hasBorder = true,
  ...rest
}) => {
  const { id } = rest;
  const labelEl = useRef<HTMLLabelElement>(null);
  const classes = classNames(
    'euiCheckableCard',
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

  const onChangeAffordance = () => {
    if (labelEl.current) {
      labelEl.current.click();
    }
  };

  return (
    <EuiSplitPanel.Outer
      responsive={false}
      hasShadow={hasShadow}
      hasBorder={hasBorder}
      direction="row"
      className={classes}>
      <EuiSplitPanel.Inner
        onClick={disabled ? undefined : onChangeAffordance}
        color={checked ? 'primary' : 'subdued'}
        grow={false}>
        {checkableElement}
      </EuiSplitPanel.Inner>
      <EuiSplitPanel.Inner>
        <label
          ref={labelEl}
          className={labelClasses}
          htmlFor={id}
          aria-describedby={children ? `${id}-details` : undefined}>
          {label}
        </label>
        {children && (
          <div id={`${id}-details`} className="euiCheckableCard__children">
            {children}
          </div>
        )}
      </EuiSplitPanel.Inner>
    </EuiSplitPanel.Outer>
  );
};
