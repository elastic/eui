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

import {
  useEuiMemoizedStyles,
  HorizontalAlignment,
  LEFT_ALIGNMENT,
} from '../../services';
import { EuiI18n } from '../i18n';
import { EuiScreenReaderOnly } from '../accessibility';
import { CommonProps, NoArgCallback } from '../common';
import { EuiIcon } from '../icon';
import { EuiInnerText } from '../inner_text';

import type { EuiTableRowCellMobileOptionsShape } from './table_row_cell';
import { resolveWidthAsStyle } from './utils';
import { useEuiTableIsResponsive } from './mobile/responsive_context';
import { EuiTableCellContent } from './_table_cell_content';
import { euiTableHeaderFooterCellStyles } from './table_cells_shared.styles';

export type TableHeaderCellScope = 'col' | 'row' | 'colgroup' | 'rowgroup';

export type EuiTableHeaderCellProps = CommonProps &
  Omit<ThHTMLAttributes<HTMLTableHeaderCellElement>, 'align' | 'scope'> & {
    align?: HorizontalAlignment;
    isSortAscending?: boolean;
    isSorted?: boolean;
    mobileOptions?: Pick<EuiTableRowCellMobileOptionsShape, 'only' | 'show'>;
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
  align,
  description,
  children,
  canSort,
  isSorted,
  isSortAscending,
}: {
  className?: string;
  align: HorizontalAlignment;
  description: EuiTableHeaderCellProps['description'];
  children: EuiTableHeaderCellProps['children'];
  canSort?: boolean;
  isSorted: EuiTableHeaderCellProps['isSorted'];
  isSortAscending?: EuiTableHeaderCellProps['isSortAscending'];
}) => {
  return (
    <EuiTableCellContent
      className={className}
      align={align}
      textOnly={false}
      truncateText={null}
    >
      <EuiInnerText>
        {(ref, innerText) => (
          <EuiI18n
            token="euiTableHeaderCell.titleTextWithDesc"
            default="{innerText}; {description}"
            values={{ innerText, description }}
          >
            {(titleTextWithDesc: string) => (
              <span
                title={description ? titleTextWithDesc : innerText}
                ref={ref}
                className="eui-textTruncate"
              >
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
      {isSorted ? (
        <EuiIcon
          className="euiTableSortIcon"
          type={isSortAscending ? 'sortUp' : 'sortDown'}
          size="m"
        />
      ) : canSort ? (
        <EuiIcon
          className="euiTableSortIcon euiTableSortIcon--sortable"
          type="sortable"
          size="m"
          color="subdued" // Tinted a bit further via CSS
        />
      ) : null}
    </EuiTableCellContent>
  );
};

export const EuiTableHeaderCell: FunctionComponent<EuiTableHeaderCellProps> = ({
  children,
  align = LEFT_ALIGNMENT,
  onSort,
  isSorted,
  isSortAscending,
  className,
  scope,
  mobileOptions,
  width,
  style,
  readOnly,
  description,
  ...rest
}) => {
  const styles = useEuiMemoizedStyles(euiTableHeaderFooterCellStyles);

  const isResponsive = useEuiTableIsResponsive();
  const hideForDesktop = !isResponsive && mobileOptions?.only;
  const hideForMobile = isResponsive && mobileOptions?.show === false;
  if (hideForDesktop || hideForMobile) return null;

  const classes = classNames('euiTableHeaderCell', className);
  const inlineStyles = resolveWidthAsStyle(style, width);

  const CellComponent = children ? 'th' : 'td';
  const cellScope = CellComponent === 'th' ? scope ?? 'col' : undefined; // `scope` is only valid on `th` elements

  const cellContents = (
    <CellContents
      css={styles.euiTableHeaderCell__content}
      align={align}
      description={description}
      canSort={onSort && !readOnly}
      isSorted={isSorted}
      isSortAscending={isSortAscending}
    >
      {children}
    </CellContents>
  );

  if (onSort || isSorted) {
    const buttonClasses = classNames('euiTableHeaderButton', {
      'euiTableHeaderButton-isSorted': isSorted,
    });

    let ariaSortValue: HTMLAttributes<any>['aria-sort'] = 'none';
    if (isSorted) {
      ariaSortValue = isSortAscending ? 'ascending' : 'descending';
    }

    return (
      <CellComponent
        css={styles.euiTableHeaderCell}
        className={classes}
        scope={cellScope}
        role="columnheader"
        aria-sort={ariaSortValue}
        aria-live="polite"
        style={inlineStyles}
        {...rest}
      >
        {onSort && !readOnly ? (
          <button
            type="button"
            css={styles.euiTableHeaderCell__button}
            className={buttonClasses}
            onClick={onSort}
            data-test-subj="tableHeaderSortButton"
          >
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
      css={styles.euiTableHeaderCell}
      className={classes}
      scope={cellScope}
      role="columnheader"
      style={inlineStyles}
      {...rest}
    >
      {cellContents}
    </CellComponent>
  );
};
