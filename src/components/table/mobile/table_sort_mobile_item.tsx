/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { FunctionComponent } from 'react';
import classNames from 'classnames';
import { CommonProps } from '../../common';

import { EuiContextMenuItem } from '../../context_menu';

export interface EuiTableSortMobileItemProps extends CommonProps {
  /**
   * Callback to know when an item has been clicked
   */
  onSort?: () => void;
  /**
   * Indicates current option is the sorted on column
   */
  isSorted?: boolean;
  /**
   * Indicates which direction the current column is sorted on
   */
  isSortAscending?: boolean;

  ariaLabel?: string;
}

export const EuiTableSortMobileItem: FunctionComponent<EuiTableSortMobileItemProps> = ({
  children,
  onSort,
  isSorted,
  isSortAscending,
  className,
  ariaLabel,
  ...rest
}) => {
  let sortIcon = 'empty';
  if (isSorted) {
    sortIcon = isSortAscending ? 'sortUp' : 'sortDown';
  }

  const buttonClasses = classNames('euiTableSortMobileItem', className, {
    'euiTableSortMobileItem-isSorted': isSorted,
  });

  const columnTitle = ariaLabel ? ariaLabel : children;
  const statefulAriaLabel = `Sort ${columnTitle} ${
    isSortAscending ? 'descending' : 'ascending'
  }`;

  return (
    <EuiContextMenuItem
      className={buttonClasses}
      icon={sortIcon}
      onClick={onSort}
      aria-label={statefulAriaLabel}
      {...rest}>
      {children}
    </EuiContextMenuItem>
  );
};
