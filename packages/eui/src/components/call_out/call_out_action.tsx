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
import { EuiCalloutColor } from './types';

export type EuiCallOutActionPrimaryProps = Omit<
  EuiButtonProps,
  'color' | 'size' | 'fill'
>;

export type EuiCallOutActioSecondaryProps = Omit<
  EuiButtonEmptyProps,
  'color' | 'size' | 'flush'
>;

type EuiCallOutActionPrimary = EuiCallOutActionPrimaryProps & {
  actionType: 'primary';
};

type EuiCallOutActionSecondary = EuiCallOutActioSecondaryProps & {
  actionType: 'secondary';
};

type EuiCallOutActionProps = ExclusiveUnion<
  EuiCallOutActionPrimary,
  EuiCallOutActionSecondary
>;

export const EuiCallOutAction = ({
  children,
  actionType = 'primary',
  color = 'primary',
  ...rest
}: EuiCallOutActionProps & {
  color?: EuiCalloutColor;
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
