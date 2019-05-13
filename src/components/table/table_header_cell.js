import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { EuiScreenReaderOnly } from '../accessibility';

import { EuiIcon } from '../icon';

import {
  LEFT_ALIGNMENT,
  RIGHT_ALIGNMENT,
  CENTER_ALIGNMENT,
} from '../../services';

const ALIGNMENT = [LEFT_ALIGNMENT, RIGHT_ALIGNMENT, CENTER_ALIGNMENT];

export const EuiTableHeaderCell = ({
  children,
  align,
  onSort,
  isSorted,
  isSortAscending,
  allowNeutralSort,
  className,
  scope,
  mobileOptions,
  // Soon to be deprecated for {...mobileOptions}
  isMobileHeader,
  hideForMobile,
  ...rest
}) => {
  const classes = classNames('euiTableHeaderCell', className, {
    'euiTableHeaderCell--hideForDesktop': mobileOptions.only || isMobileHeader,
    'euiTableHeaderCell--hideForMobile': !mobileOptions.show || hideForMobile,
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

    function getScreenCasterDirection() {
      if (ariaSortValue === 'ascending') {
        return 'Click to sort in descending order';
      } else if (allowNeutralSort && ariaSortValue === 'descending') {
        return 'Click to unsort';
      } else {
        return 'Click to sort in ascending order';
      }
    }

    return (
      <th
        className={classes}
        scope={scope}
        role="columnheader"
        aria-sort={ariaSortValue}
        aria-live
        {...rest}>
        <button
          type="button"
          className={buttonClasses}
          onClick={onSort}
          data-test-subj="tableHeaderSortButton">
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
              <span>{getScreenCasterDirection()}</span>
            </EuiScreenReaderOnly>
          </span>
        </button>
      </th>
    );
  }

  return (
    <th className={classes} scope={scope} role="columnheader" {...rest}>
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
  /**
   * Set `allowNeutralSort` on EuiInMemoryTable to false to force column sorting.
   * EuiBasicTable always forces column sorting.
   */
  allowNeutralSort: PropTypes.bool,
  scope: PropTypes.oneOf(['col', 'row', 'colgroup', 'rowgroup']),
  /**
   * _DEPRECATED: use `mobileOptions.only = true`_
   * Indicates if the column was created to be the row's heading in mobile view
   * (this column will be hidden at larger screens)
   */
  isMobileHeader: PropTypes.bool,
  /**
   * _DEPRECATED: use `mobileOptions.show = false`_
   * Indicates if the column should not show for mobile users
   * (typically hidden because a custom mobile header utilizes the column's contents)
   */
  hideForMobile: PropTypes.bool,
  /**
   * Mobile options for displaying differently at small screens
   */
  mobileOptions: PropTypes.shape({
    /**
     * If false, will not render the column at all for mobile
     */
    show: PropTypes.bool,
    /**
     * Only show for mobile? If true, will not render the column at all for desktop
     */
    only: PropTypes.bool,
  }),
};

EuiTableHeaderCell.defaultProps = {
  align: LEFT_ALIGNMENT,
  scope: 'col',
  mobileOptions: {
    show: true,
  },
};
