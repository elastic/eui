/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';

import { ExclusiveUnion } from '../common';
import { EuiButton, EuiButtonEmpty, EuiButtonEmptyProps } from '../button';
import { Props as EuiButtonProps } from '../button/button';
import { EuiToastColor } from './types';

export type EuiToastActionPrimaryProps = Omit<
  EuiButtonProps,
  'color' | 'size' | 'fill'
>;

export type EuiToastActionSecondaryProps = Omit<
  EuiButtonEmptyProps,
  'color' | 'size' | 'flush'
>;

type EuiToastActionPrimary = EuiToastActionPrimaryProps & {
  actionType: 'primary';
};

type EuiToastActionSecondary = EuiToastActionSecondaryProps & {
  actionType: 'secondary';
};

type EuiToastActionProps = ExclusiveUnion<
  EuiToastActionPrimary,
  EuiToastActionSecondary
>;

export const EuiToastAction = ({
  children,
  actionType = 'primary',
  color = 'primary',
  ...rest
}: EuiToastActionProps & {
  color?: EuiToastColor;
}) => {
  if (actionType === 'primary') {
    return (
      <EuiButton size="s" color={color} {...(rest as EuiButtonProps)}>
        {children}
      </EuiButton>
    );
  } else {
    return (
      <EuiButtonEmpty size="s" color={color} {...(rest as EuiButtonEmptyProps)}>
        {children}
      </EuiButtonEmpty>
    );
  }
};
