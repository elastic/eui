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

import classNames from 'classnames';
import React, { FunctionComponent, HTMLAttributes } from 'react';
import { EuiScreenReaderOnly } from '../../accessibility';
import { EuiButtonGroupMultiButton } from './button_group_multi_button';
import {
  EuiButtonGroupProps,
  EuiButtonSingleGroupOptionProps,
} from './types';
import { colorToClassNameMap } from '../button';

type Props = Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> &
  EuiButtonGroupProps;

const groupSizeToClassNameMap = {
  s: '--small',
  m: '--medium',
  compressed: '--compressed',
};

export const EuiButtonGroup: FunctionComponent<Props> = ({
  className,
  buttonSize = 's',
  color = 'text',
  idSelected = '',
  idToSelectedMap = {},
  isDisabled = false,
  isFullWidth = false,
  isIconOnly = false,
  legend,
  name,
  onChange,
  options = [],
  type = 'single',
  ...rest
}) => {
  // Compressed style can't support `ghost` color because it's more like a form field than a button
  const badColorCombo = buttonSize === 'compressed' && color === 'ghost';
  const resolvedColor = badColorCombo ? 'text' : color;
  if (badColorCombo) {
    console.warn(
      'EuiButtonGroup of compressed size does not support the ghost color. It will render as text instead.'
    );
  }

  const classes = classNames(
    'euiButtonGroup',
    `euiButtonGroup${groupSizeToClassNameMap[buttonSize]}`,
    `euiButtonGroup${colorToClassNameMap[resolvedColor]}`,
    {
      'euiButtonGroup--fullWidth': isFullWidth,
      'euiButtonGroup--isDisabled': isDisabled,
    },
    className
  );

  const fieldsetClasses = classNames('euiButtonGroup__fieldset', {
    'euiButtonGroup__fieldset--fullWidth': isFullWidth,
  });

  const typeIsSingle = type === 'single';

  return (
    <fieldset className={fieldsetClasses}>
      <EuiScreenReaderOnly>
        <legend>{legend}</legend>
      </EuiScreenReaderOnly>

      <div className={classes} {...rest}>
        {options.map((option, index) => {
          return (
            <EuiButtonGroupMultiButton
              key={index}
              name={name}
              isDisabled={isDisabled}
              {...(option as EuiButtonSingleGroupOptionProps)}
              type={typeIsSingle ? 'label' : 'button'}
              isSelected={typeIsSingle ? option.id === idSelected : idToSelectedMap[option.id]}
              color={resolvedColor}
              size={buttonSize}
              isIconOnly={isIconOnly}
              onChange={onChange}
            />
          );
        })}
      </div>
    </fieldset>
  );
};
