/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
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
      {...rest}
    >
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
