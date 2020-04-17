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
  EuiButtonEmpty,
  EuiButtonEmptyColor,
  EuiButtonEmptyProps,
} from '../button/button_empty';

import { EuiI18n } from '../i18n';

export type EuiCardSelectProps = EuiButtonEmptyProps & {
  /**
   * Is in the selected state
   */
  isSelected?: boolean;
  isDisabled?: boolean;
};

export const EuiCardSelect: FunctionComponent<EuiCardSelectProps> = ({
  className,
  isSelected = false,
  isDisabled,
  color,
  children,
  ...rest
}) => {
  const child = euiCardSelectableText(isSelected, isDisabled, children);

  const selectClasses = classNames(
    'euiCardSelect',
    `euiCardSelect--${euiCardSelectableColor(color, isSelected)}`,
    className
  );

  return (
    <EuiButtonEmpty
      className={selectClasses}
      color={color || 'text'}
      size="xs"
      isDisabled={isDisabled}
      iconType={isSelected ? 'check' : undefined}
      role="switch"
      aria-checked={isSelected}
      {...rest}>
      {child}
    </EuiButtonEmpty>
  );
};

function euiCardSelectableText(
  isSelected: boolean | undefined,
  isDisabled: boolean | undefined,
  children: ReactNode
): ReactNode {
  if (children) {
    return children;
  }

  let text;

  if (isSelected) {
    text = <EuiI18n token="euiCardSelect.selected" default="Selected" />;
  } else if (isDisabled) {
    text = <EuiI18n token="euiCardSelect.unavailable" default="Unavailable" />;
  } else {
    text = <EuiI18n token="euiCardSelect.select" default="Select" />;
  }

  return text;
}

export function euiCardSelectableColor(
  color: EuiButtonEmptyColor | undefined,
  isSelected: boolean | undefined
): string {
  let calculatedColor;
  if (color) {
    calculatedColor = color;
  } else if (isSelected) {
    calculatedColor = 'success';
  } else {
    calculatedColor = 'text';
  }

  return calculatedColor;
}
