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
import React, { FunctionComponent } from 'react';
import { EuiButtonDisplay } from '../button';
import {
  ButtonGroupOptionProps,
  EuiButtonMultiGroupOptionProps,
} from './types';

type Props = {
  idToSelectedMap: { [id: string]: boolean };
} & ButtonGroupOptionProps &
  EuiButtonMultiGroupOptionProps;

export const EuiButtonGroupMultiButton: FunctionComponent<Props> = ({
  className,
  id,
  label,
  idToSelectedMap,
  size,
  color,
  isIconOnly,
  onChange,
  isDisabled,
  ...rest
}) => {
  const isSelectedState = idToSelectedMap[id] || false;
  const badColorCombo = size === 'compressed' && color === 'ghost';

  const buttonClasses = classNames(
    {
      'euiButtonGroupButton-isSelected': isSelectedState,
    },
    className
  );

  return (
    <EuiButtonDisplay
      baseClassName="euiButtonGroupButton"
      element={'button'}
      id={id}
      className={buttonClasses}
      disabled={isDisabled}
      isDisabled={isDisabled}
      color={badColorCombo ? 'text' : color}
      fill={size !== 'compressed' && isSelectedState}
      aria-pressed={isSelectedState}
      size={size === 'compressed' ? 's' : size}
      onClick={() => onChange(id)}
      minWidth={0}
      textProps={{
        className: isIconOnly ? 'euiScreenReaderOnly' : undefined,
      }}
      {...rest}>
      {label}
    </EuiButtonDisplay>
  );
};
