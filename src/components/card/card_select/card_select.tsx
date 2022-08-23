/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { FunctionComponent, ReactNode } from 'react';

import { EuiI18n } from '../../i18n';
import { EuiButton, Props } from '../../button/button';
import { euiCardSelectStyles } from './card_select.styles';

export type EuiCardSelectProps = Props;

export const EuiCardSelect: FunctionComponent<EuiCardSelectProps> = ({
  isSelected = false,
  isDisabled,
  disabled,
  color,
  children,
  ...rest
}) => {
  const styles = euiCardSelectStyles();
  const baseCSS = [styles.euiCardSelect];

  const child = euiCardSelectableText(
    isSelected,
    isDisabled || disabled,
    children
  );

  return (
    <EuiButton
      css={baseCSS}
      color={euiCardSelectableColor(color, isSelected)}
      size="m"
      isDisabled={isDisabled || disabled}
      iconType={isSelected ? 'check' : undefined}
      role="switch"
      aria-checked={isSelected}
      fullWidth
      {...rest}
    >
      {child}
    </EuiButton>
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
  color: Props['color'],
  isSelected: boolean | undefined
): Props['color'] {
  let calculatedColor;
  if (color) {
    calculatedColor = color;
  } else if (isSelected) {
    calculatedColor = 'success';
  } else {
    calculatedColor = 'text';
  }

  return calculatedColor as Props['color'];
}
