/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { FunctionComponent, ComponentProps, ReactNode } from 'react';
import classNames from 'classnames';

import { useEuiMemoizedStyles } from '../../../services';
import { EuiContextMenuItem } from '../../context_menu';
import { euiSuperSelectItemStyles } from './super_select.styles';

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
type EuiSuperSelectItemProps = ComponentProps<typeof EuiContextMenuItem> & {
  hasDividers?: boolean;
};

// Internal subcomponent util, primarily for easier usage of hooks
export const EuiSuperSelectItem: FunctionComponent<EuiSuperSelectItemProps> = ({
  children,
  className,
  hasDividers,
  ...rest
}) => {
  const classes = classNames('euiSuperSelect__item', className);
  const styles = useEuiMemoizedStyles(euiSuperSelectItemStyles);
  const cssStyles = [
    styles.euiSuperSelect__item,
    hasDividers && styles.hasDividers,
  ];

  return (
    <EuiContextMenuItem
      css={cssStyles}
      className={classes}
      role="option"
      {...rest}
    >
      {children}
    </EuiContextMenuItem>
  );
};
