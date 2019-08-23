import React, { FunctionComponent } from 'react';
import classNames from 'classnames';
import { CommonProps } from '../../common';

import { EuiContextMenuItem } from '../../context_menu';

interface Props extends CommonProps {
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

export const EuiTableSortMobileItem: FunctionComponent<Props> = ({
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
