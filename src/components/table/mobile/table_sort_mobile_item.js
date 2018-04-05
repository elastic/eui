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
  hideForMobile,
  ...rest
}) => {

  let sortIcon = 'empty';
  if (isSorted) {
    sortIcon = isSortAscending ? 'sortUp' : 'sortDown';
  }

  const buttonClasses = classNames('euiTableSortMobileItem', className, {
    'euiTableSortMobileItem-isSorted': isSorted,
    'euiTableSortMobileItem--hideForMobile': hideForMobile,
  });

    const columnTitle = ariaLabel ? ariaLabel : children;
    const statefulAriaLabel = `Sort ${columnTitle} ${isSortAscending ? 'descending' : 'ascending'}`;

  return (
    <EuiContextMenuItem
      className={buttonClasses}
      icon={sortIcon}
      onClick={onSort}
      aria-label={statefulAriaLabel}
      {...rest}
    >
      {children}
    </EuiContextMenuItem>
  );

};

EuiTableSortMobileItem.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  onSort: PropTypes.func,
  isSorted: PropTypes.bool,
  isSortAscending: PropTypes.bool,
  hideForMobile: PropTypes.bool,
};
