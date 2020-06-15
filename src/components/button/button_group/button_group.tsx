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
import { ButtonGroupMulti } from './button_group_multi';
import { ButtonGroupSingle } from './button_group_single';
import { EuiButtonGroupProps } from './types';

type Props = Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> &
  EuiButtonGroupProps;

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
    `euiButtonGroup--${resolvedColor}`,
    {
      'euiButtonGroup--fullWidth': isFullWidth,
      'euiButtonGroup--compressed': buttonSize === 'compressed',
      'euiButtonGroup--disabled': isDisabled,
    },
    className
  );

  const fieldsetClasses = classNames('euiButtonGroup__fieldset', {
    'euiButtonGroup__fieldset--fullWidth': isFullWidth,
  });

  return (
    <fieldset className={fieldsetClasses}>
      <EuiScreenReaderOnly>
        <legend>{legend}</legend>
      </EuiScreenReaderOnly>

      <div className={classes} {...rest}>
        {options.map((option, index) => {
          const optionClasses = classNames(
            'euiButtonGroup__button',
            'euiButton--no-hover',
            {
              'euiButtonGroup__button--iconOnly': isIconOnly,
            },
            option.className
          );

          if (type === 'single') {
            return (
              <ButtonGroupSingle
                key={index}
                {...option}
                idSelected={idSelected}
                size={buttonSize}
                isIconOnly={isIconOnly}
                isGroupDisabled={isDisabled}
                color={resolvedColor}
                onChange={onChange}
                className={optionClasses}
              />
            );
          }

          return (
            <ButtonGroupMulti
              key={index}
              {...option}
              idToSelectedMap={idToSelectedMap}
              color={resolvedColor}
              size={buttonSize}
              isIconOnly={isIconOnly}
              isGroupDisabled={isDisabled}
              onChange={onChange}
              className={optionClasses}
            />
          );
        })}
      </div>
    </fieldset>
  );
};
