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
  ReactNode,
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
import { EuiIconTip, EuiToolTip } from '../tool_tip';

import type { EuiTableRowCellMobileOptionsShape } from './table_row_cell';
import type { EuiTableColumnNameTooltipProps } from '../basic_table/table_types';
import { resolveWidthAsStyle } from './utils';
import { useEuiTableIsResponsive } from './mobile/responsive_context';
import { EuiTableCellContent } from './_table_cell_content';
import { euiTableHeaderFooterCellStyles } from './table_cells_shared.styles';
import { HEADER_CELL_SCOPE } from './table_header_cell_shared';

export type TableHeaderCellScope = (typeof HEADER_CELL_SCOPE)[number];

export type EuiTableHeaderCellProps = CommonProps &
  Omit<ThHTMLAttributes<HTMLTableCellElement>, 'align' | 'scope'> & {
    align?: HorizontalAlignment;
    isSortAscending?: boolean;
    isSorted?: boolean;
    mobileOptions?: Pick<EuiTableRowCellMobileOptionsShape, 'only' | 'show'>;
    onSort?: NoArgCallback<void>;
    scope?: TableHeaderCellScope;
    width?: string | number;
    /** Allows adding an icon with a tooltip displayed next to the name */
    tooltipProps?: EuiTableColumnNameTooltipProps;
    description?: string;
    /**
     * Shows the sort indicator but removes the button
     */
    readOnly?: boolean;
    /**
     * Content rendered outside the visible cell content wrapper. Useful for, e.g. screen reader text.
     *
     * Used by EuiBasicTable to render hidden copy markers
     */
    append?: ReactNode;
  };

const CellContents = ({
  className,
  align,
  tooltipProps,
  description,
  children,
  canSort,
  isSorted,
  isSortAscending,
}: {
  className?: string;
  align: HorizontalAlignment;
  tooltipProps?: EuiTableColumnNameTooltipProps;
  description: EuiTableHeaderCellProps['description'];
  children: EuiTableHeaderCellProps['children'];
  canSort?: boolean;
  isSorted: EuiTableHeaderCellProps['isSorted'];
  isSortAscending?: EuiTableHeaderCellProps['isSortAscending'];
}) => {
  const tooltipIcon = tooltipProps ? (
    canSort ? (
      <EuiIcon
        className="euiTableSortIcon"
        type={tooltipProps.icon || 'question'}
        size="m"
        color="subdued"
        {...tooltipProps.iconProps}
      />
    ) : (
      <EuiIconTip
        content={tooltipProps.content}
        type={tooltipProps.icon || 'question'}
        size="m"
        color="subdued"
        position="top"
        iconProps={{ role: 'button', ...tooltipProps.iconProps }}
        {...tooltipProps.tooltipProps}
      />
    )
  ) : null;

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
      {tooltipIcon}
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
  tooltipProps,
  description,
  append,
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

  const canSort = !!(onSort && !readOnly);
  let ariaSortValue: HTMLAttributes<HTMLTableCellElement>['aria-sort'];
  if (isSorted) {
    ariaSortValue = isSortAscending ? 'ascending' : 'descending';
  } else if (canSort) {
    ariaSortValue = 'none';
  }

  const cellContentsProps = {
    css: styles.euiTableHeaderCell__content,
    align,
    tooltipProps,
    description,
    canSort,
    isSorted,
    isSortAscending,
    children,
  };

  return (
    <CellComponent
      css={styles.euiTableHeaderCell}
      className={classes}
      scope={cellScope}
      role="columnheader"
      aria-sort={ariaSortValue}
      style={inlineStyles}
      {...rest}
    >
      {canSort ? (
        <EuiToolTip
          content={tooltipProps?.content}
          {...tooltipProps?.tooltipProps}
          display="block"
        >
          <button
            type="button"
            css={styles.euiTableHeaderCell__button}
            className={classNames('euiTableHeaderButton', {
              'euiTableHeaderButton-isSorted': isSorted,
            })}
            onClick={onSort}
            data-test-subj="tableHeaderSortButton"
          >
            <CellContents {...cellContentsProps} />
          </button>
        </EuiToolTip>
      ) : (
        <CellContents {...cellContentsProps} />
      )}
      {append}
    </CellComponent>
  );
};
