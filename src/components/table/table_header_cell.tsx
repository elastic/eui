import React, {
  FunctionComponent,
  HTMLAttributes,
  ThHTMLAttributes,
} from 'react';
import classNames from 'classnames';

import { EuiScreenReaderOnly } from '../accessibility';
import { CommonProps, NoArgCallback } from '../common';
import { EuiIcon } from '../icon';
import { resolveWidthAsStyle } from './utils';

import {
  HorizontalAlignment,
  LEFT_ALIGNMENT,
  RIGHT_ALIGNMENT,
  CENTER_ALIGNMENT,
} from '../../services';

export type TableHeaderCellScope = 'col' | 'row' | 'colgroup' | 'rowgroup';

type Props = CommonProps &
  ThHTMLAttributes<HTMLTableHeaderCellElement> & {
    align?: HorizontalAlignment;
    /**
     * Set `allowNeutralSort` on EuiInMemoryTable to false to force column
     * sorting.  EuiBasicTable always forces column sorting.
     */
    allowNeutralSort?: boolean;
    /**
     * _DEPRECATED: use `mobileOptions.show = false`_ Indicates if the
     * column should not show for mobile users (typically hidden because a
     * custom mobile header utilizes the column's contents)
     */
    hideForMobile?: boolean;
    /**
     * _DEPRECATED: use `mobileOptions.only = true`_ Indicates if the
     * column was created to be the row's heading in mobile view (this
     * column will be hidden at larger screens)
     */
    isMobileHeader?: boolean;
    isSortAscending?: boolean;
    isSorted?: boolean;
    /**
     * Mobile options for displaying differently at small screens
     */
    mobileOptions?: {
      /**
       * If false, will not render the column at all for mobile
       */
      show?: boolean;
      /**
       * Only show for mobile? If true, will not render the column at all
       * for desktop
       */
      only?: boolean;
    };
    onSort?: NoArgCallback<void>;
    scope?: TableHeaderCellScope;
    width?: string | number;
  };

export const EuiTableHeaderCell: FunctionComponent<Props> = ({
  children,
  align = LEFT_ALIGNMENT,
  onSort,
  isSorted,
  isSortAscending,
  allowNeutralSort,
  className,
  scope = 'col',
  mobileOptions = {
    show: true,
  },
  // Soon to be deprecated for {...mobileOptions}
  isMobileHeader,
  hideForMobile,
  style,
  width,
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

  const styleObj = resolveWidthAsStyle(style, width);

  if (onSort) {
    const buttonClasses = classNames('euiTableHeaderButton', {
      'euiTableHeaderButton-isSorted': isSorted,
    });

    let ariaSortValue: HTMLAttributes<any>['aria-sort'] = 'none';
    if (isSorted) {
      ariaSortValue = isSortAscending ? 'ascending' : 'descending';
    }

    function getScreenCasterDirection() {
      if (ariaSortValue === 'ascending') {
        return 'Click to sort in descending order';
      }

      if (allowNeutralSort && ariaSortValue === 'descending') {
        return 'Click to unsort';
      }

      return 'Click to sort in ascending order';
    }

    return (
      <th
        className={classes}
        scope={scope}
        role="columnheader"
        aria-sort={ariaSortValue}
        aria-live="polite"
        style={styleObj}
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
    <th
      className={classes}
      scope={scope}
      role="columnheader"
      style={styleObj}
      {...rest}>
      <div className={contentClasses}>
        <span className="euiTableCellContent__text">{children}</span>
      </div>
    </th>
  );
};
