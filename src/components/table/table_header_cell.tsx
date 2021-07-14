/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

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
import { EuiInnerText } from '../inner_text';

import {
  HorizontalAlignment,
  LEFT_ALIGNMENT,
  RIGHT_ALIGNMENT,
  CENTER_ALIGNMENT,
} from '../../services';
import { EuiI18n } from '../i18n';

export type TableHeaderCellScope = 'col' | 'row' | 'colgroup' | 'rowgroup';

export type EuiTableHeaderCellProps = CommonProps &
  Omit<ThHTMLAttributes<HTMLTableHeaderCellElement>, 'align' | 'scope'> & {
    align?: HorizontalAlignment;
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
    description?: string;
    /**
     * Shows the sort indicator but removes the button
     */
    readOnly?: boolean;
  };

const CellContents = ({
  className,
  description,
  children,
  isSorted,
  isSortAscending,
  showSortMsg,
}: {
  className: string;
  description: EuiTableHeaderCellProps['description'];
  children: EuiTableHeaderCellProps['children'];
  isSorted: EuiTableHeaderCellProps['isSorted'];
  isSortAscending?: EuiTableHeaderCellProps['isSortAscending'];
  showSortMsg: boolean;
}) => {
  return (
    <span className={className}>
      <EuiInnerText>
        {(ref, innerText) => (
          <EuiI18n
            token="euiTableHeaderCell.titleTextWithDesc"
            default="{innerText}; {description}"
            values={{ innerText, description }}>
            {(titleTextWithDesc: string) => (
              <span
                title={description ? titleTextWithDesc : innerText}
                ref={ref}
                className="euiTableCellContent__text">
                {children}
              </span>
            )}
          </EuiI18n>
        )}
      </EuiInnerText>
      {description && (
        <EuiScreenReaderOnly>
          <span>{description}</span>
        </EuiScreenReaderOnly>
      )}
      {showSortMsg && isSorted && (
        <EuiIcon
          className="euiTableSortIcon"
          type={isSortAscending ? 'sortUp' : 'sortDown'}
          size="m"
        />
      )}
    </span>
  );
};

export const EuiTableHeaderCell: FunctionComponent<EuiTableHeaderCellProps> = ({
  children,
  align = LEFT_ALIGNMENT,
  onSort,
  isSorted,
  isSortAscending,
  className,
  scope = 'col',
  mobileOptions = {
    show: true,
  },
  width,
  style,
  readOnly,
  // Soon to be deprecated for {...mobileOptions}
  isMobileHeader,
  hideForMobile,
  description,
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

  const CellComponent = children ? 'th' : 'td';

  if (onSort || isSorted) {
    const buttonClasses = classNames('euiTableHeaderButton', {
      'euiTableHeaderButton-isSorted': isSorted,
    });

    let ariaSortValue: HTMLAttributes<any>['aria-sort'] = 'none';
    if (isSorted) {
      ariaSortValue = isSortAscending ? 'ascending' : 'descending';
    }

    const cellContents = (
      <CellContents
        className={contentClasses}
        description={description}
        showSortMsg={true}
        children={children}
        isSorted={isSorted}
        isSortAscending={isSortAscending}
      />
    );

    return (
      <CellComponent
        className={classes}
        scope={scope}
        role="columnheader"
        aria-sort={ariaSortValue}
        aria-live="polite"
        style={styleObj}
        {...rest}>
        {onSort && !readOnly ? (
          <button
            type="button"
            className={buttonClasses}
            onClick={onSort}
            data-test-subj="tableHeaderSortButton">
            {cellContents}
          </button>
        ) : (
          cellContents
        )}
      </CellComponent>
    );
  }

  return (
    <CellComponent
      className={classes}
      scope={scope}
      role="columnheader"
      style={styleObj}
      {...rest}>
      <CellContents
        className={contentClasses}
        description={description}
        showSortMsg={false}
        children={children}
        isSorted={isSorted}
        isSortAscending={isSortAscending}
      />
    </CellComponent>
  );
};
