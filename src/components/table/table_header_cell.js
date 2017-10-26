import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import {
  EuiIcon,
} from '..';

import {
  LEFT_ALIGNMENT,
  RIGHT_ALIGNMENT,
} from '../../services';

const ALIGNMENT = [
  LEFT_ALIGNMENT,
  RIGHT_ALIGNMENT,
];

export const EuiTableHeaderCell = ({
  children,
  align,
  onSort,
  isSorted,
  isSortAscending,
  className,
  ariaLabel,
  ...rest
}) => {
  const classes = classNames('euiTableHeaderCell', className);

  const contentClasses = classNames('euiTableCellContent', className, {
    'euiTableCellContent--alignRight': align === RIGHT_ALIGNMENT,
  });

  if (onSort) {
    const sortIcon = (
      <EuiIcon
        className="euiTableSortIcon"
        type={isSortAscending ? 'sortUp' : 'sortDown'}
        size="medium"
      />
    );

    const buttonClasses = classNames('euiTableHeaderButton', {
      'euiTableHeaderButton-isSorted': isSorted,
    });

    const columnTitle = ariaLabel || children;
    const statefulAriaLabel = `Sort ${columnTitle} ${isSortAscending ? 'descending' : 'ascending'}`;

    return (
      <th
        className={classes}
        {...rest}
      >
        <button
          type="button"
          className={buttonClasses}
          onClick={onSort}
          aria-label={statefulAriaLabel}
        >
          <span className={contentClasses}>
            {children}
            {sortIcon}
          </span>
        </button>
      </th>
    );
  }

  return (
    <th
      className={classes}
      aria-label={ariaLabel}
      {...rest}
    >
      <div className={contentClasses}>
        {children}
      </div>
    </th>
  );
};

EuiTableHeaderCell.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  align: PropTypes.oneOf(ALIGNMENT),
  onSort: PropTypes.func,
  isSorted: PropTypes.bool,
  isSortAscending: PropTypes.bool,
};

EuiTableHeaderCell.defaultProps = {
  align: LEFT_ALIGNMENT,
};
