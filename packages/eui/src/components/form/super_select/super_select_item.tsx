/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { forwardRef, ReactNode } from 'react';
import classNames from 'classnames';

import {
  EuiListItemLayout,
  type EuiListItemLayoutProps,
} from '../../list_item_layout';

// Type exposed to consumers via API
export interface EuiSuperSelectOption<T> {
  value: NonNullable<T>;
  inputDisplay?: ReactNode;
  dropdownDisplay?: ReactNode;
  disabled?: boolean;
  'data-test-subj'?: string;
}

// Actual props used by below component, transmogged by parent EuiSuperSelect
// from consumer props to internal EUI props
type EuiSuperSelectItemProps = EuiListItemLayoutProps & {};

// Internal subcomponent util, primarily for easier usage of hooks
export const EuiSuperSelectItem = forwardRef<
  HTMLElement,
  EuiSuperSelectItemProps
>(({ children, className, ...rest }, ref) => {
  const classes = classNames('euiSuperSelect__item', className);

  return (
    <EuiListItemLayout ref={ref} role="option" className={classes} {...rest}>
      {children}
    </EuiListItemLayout>
  );
});

EuiSuperSelectItem.displayName = 'EuiSuperSelectItem';
