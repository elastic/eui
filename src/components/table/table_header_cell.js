import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import {
  EuiScreenReaderOnly
} from '../accessibility';

import {
  EuiIcon,
} from '../icon';

import {
  LEFT_ALIGNMENT,
  RIGHT_ALIGNMENT,
  CENTER_ALIGNMENT
} from '../../services';

const ALIGNMENT = [
  LEFT_ALIGNMENT,
  RIGHT_ALIGNMENT,
  CENTER_ALIGNMENT
];

export const EuiTableHeaderCell = ({
  children,
  align,
  onSort,
  isSorted,
  isSortAscending,
  className,
  scope,
  isMobileHeader,
  hideForMobile,
  ...rest
}) => {
  const classes = classNames('euiTableHeaderCell', className, {
    'euiTableHeaderCell--isMobileHeader': isMobileHeader,
    'euiTableHeaderCell--hideForMobile': hideForMobile,
  });

  const contentClasses = classNames('euiTableCellContent', className, {
    'euiTableCellContent--alignRight': align === RIGHT_ALIGNMENT,
    'euiTableCellContent--alignCenter': align === CENTER_ALIGNMENT,
  });

  if (onSort) {
    const buttonClasses = classNames('euiTableHeaderButton', {
      'euiTableHeaderButton-isSorted': isSorted,
    });

    let ariaSortValue = 'none';
    if (isSorted) {
      ariaSortValue = isSortAscending ? 'ascending' : 'descending';
    }

    return (
      <th
        className={classes}
        scope={scope}
        role="columnheader"
        aria-sort={ariaSortValue}
        aria-live
        {...rest}
      >
        <button
          type="button"
          className={buttonClasses}
          onClick={onSort}
          data-test-subj="tableHeaderSortButton"
        >
          <span className={contentClasses}>
            <span className="euiTableCellContent__text">{children}</span>
            {isSorted && (
              <EuiIcon
                className="euiTableSortIcon"
                type={isSortAscending ? 'sortUp' : 'sortDown'}
                size="m"
                aria-label={`Sorted in ${ariaSortValue} order`}
              />
            )}
            <EuiScreenReaderOnly>
              <span>{`Click to sort in ${(ariaSortValue === 'descending' || 'none') ? 'ascending' : 'descending'} order`}</span>
            </EuiScreenReaderOnly>
          </span>
        </button>
      </th>
    );
  }

  return (
    <th
      className={classes}
      scope={scope}
      role="columnheader"
      {...rest}
    >
      <div className={contentClasses}>
        <span className="euiTableCellContent__text">{children}</span>
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
  scope: PropTypes.oneOf(['col', 'row', 'colgroup', 'rowgroup']),
  /**
   * Indicates if the column was created to be the row's heading in mobile view
   * (this column will be hidden at larger screens)
   */
  isMobileHeader: PropTypes.bool,
  /**
   * Indicates if the column should not show for mobile users
   * (typically hidden because a custom mobile header utilizes the column's contents)
   */
  hideForMobile: PropTypes.bool,
};

EuiTableHeaderCell.defaultProps = {
  align: LEFT_ALIGNMENT,
  scope: 'col',
};
