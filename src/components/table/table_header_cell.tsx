/*
 * Licensed to Elasticsearch B.V. under one or more contributor
 * license agreements. See the NOTICE file distributed with
 * this work for additional information regarding copyright
 * ownership. Elasticsearch B.V. licenses this file to you under
 * the Apache License, Version 2.0 (the "License"); you may
 * not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
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

export const EuiTableHeaderCell: FunctionComponent<EuiTableHeaderCellProps> = ({
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
  width,
  // Soon to be deprecated for {...mobileOptions}
  isMobileHeader,
  hideForMobile,
  style,
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
        return (
          <EuiI18n
            token="euiTableHeaderCell.clickForDescending"
            default="Click to sort in descending order"
          />
        );
      }

      if (allowNeutralSort && ariaSortValue === 'descending') {
        return (
          <EuiI18n
            token="euiTableHeaderCell.clickForUnsort"
            default="Click to unsort"
          />
        );
      }

      return (
        <EuiI18n
          token="euiTableHeaderCell.clickForAscending"
          default="Click to sort in ascending order"
        />
      );
    }

    return (
      <CellComponent
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
            <EuiInnerText>
              {(ref, innerText) => (
                <EuiI18n
                  token="euiTableHeaderCell.titleTextWithSort"
                  default="{innerText}; Sorted in {ariaSortValue} order"
                  values={{ innerText, ariaSortValue }}>
                  {(titleTextWithSort: string) => (
                    <span
                      title={isSorted ? titleTextWithSort : innerText}
                      ref={ref}
                      className="euiTableCellContent__text">
                      {children}
                    </span>
                  )}
                </EuiI18n>
              )}
            </EuiInnerText>

            {isSorted && (
              <EuiI18n
                token="euiTableHeaderCell.sortedAriaLabel"
                default="Sorted in {ariaSortValue} order"
                values={{ ariaSortValue }}>
                {(sortedAriaLabel: string) => (
                  <EuiIcon
                    className="euiTableSortIcon"
                    type={isSortAscending ? 'sortUp' : 'sortDown'}
                    size="m"
                    aria-label={sortedAriaLabel}
                  />
                )}
              </EuiI18n>
            )}
            <EuiScreenReaderOnly>
              <span>{getScreenCasterDirection()}</span>
            </EuiScreenReaderOnly>
          </span>
        </button>
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
      <div className={contentClasses}>
        <EuiInnerText>
          {(ref, innerText) => (
            <span
              title={innerText}
              ref={ref}
              className="euiTableCellContent__text">
              {children}
            </span>
          )}
        </EuiInnerText>
      </div>
    </CellComponent>
  );
};
