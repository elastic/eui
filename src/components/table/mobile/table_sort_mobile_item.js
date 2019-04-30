import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { EuiContextMenuItem } from '../../context_menu';

export const EuiTableSortMobileItem = ({
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

EuiTableSortMobileItem.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  /**
   * Callback to know when an item has been clicked
   */
  onSort: PropTypes.func,
  /**
   * Indicates current option is the sorted on column
   */
  isSorted: PropTypes.bool,
  /**
   * Indicates which direction the current column is sorted on
   */
  isSortAscending: PropTypes.bool,
};
