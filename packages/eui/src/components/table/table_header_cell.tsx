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
import { EuiIcon, IconType } from '../icon';
import { EuiInnerText } from '../inner_text';
import { EuiIconTip, EuiIconTipProps, EuiToolTipProps } from '../tool_tip';

import type { EuiTableRowCellMobileOptionsShape } from './table_row_cell';
import { resolveWidthAsStyle } from './utils';
import { useEuiTableIsResponsive } from './mobile/responsive_context';
import { EuiTableCellContent } from './_table_cell_content';
import { euiTableHeaderFooterCellStyles } from './table_cells_shared.styles';
import { HEADER_CELL_SCOPE } from './table_header_cell_shared';

export type TableHeaderCellScope = (typeof HEADER_CELL_SCOPE)[number];

/*
  To discuss
  ==========

  I wonder if we could make this just match the API from EuiIconTip?

  So instead of, as currently implemented:
    ```tsx
    <EuiIconTip
      content={tooltip.content}
      type={tooltip.icon || 'questionInCircle'}
      size="m"
      color="subdued"
      iconProps={tooltip.iconProps}
      {...tooltip.tooltipProps}
    />
    ```

  we could do:
    ```tsx
    <EuiIconTip
      size="m"
      color="subdued"
      {...tooltip}
    />
    ```

  and this type would also just be (or extend?) `EuiIconTipProps`
*/
export type EuiTableHeaderCellTooltip = {
  /** The main content of the tooltip */
  content: ReactNode;
  /**
   * The icon type to display
   * @default 'questionInCircle'
   */
  icon?: IconType;
  /** Additional props for EuiIcon */
  iconProps?: EuiIconTipProps['iconProps'];
  /** Additional props for the EuiToolip */
  tooltipProps?: Omit<EuiToolTipProps, 'children' | 'delay' | 'position'> & {
    delay?: EuiToolTipProps['delay'];
    position?: EuiToolTipProps['position'];
  };
};

export type EuiTableHeaderCellProps = CommonProps &
  Omit<ThHTMLAttributes<HTMLTableHeaderCellElement>, 'align' | 'scope'> & {
    align?: HorizontalAlignment;
    isSortAscending?: boolean;
    isSorted?: boolean;
    mobileOptions?: Pick<EuiTableRowCellMobileOptionsShape, 'only' | 'show'>;
    onSort?: NoArgCallback<void>;
    scope?: TableHeaderCellScope;
    width?: string | number;
    tooltip?: EuiTableHeaderCellTooltip; // should this here be called `tooltip` only?
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
  description,
  children,
  canSort,
  isSorted,
  isSortAscending,
  tooltip,
}: {
  className?: string;
  align: HorizontalAlignment;
  description: EuiTableHeaderCellProps['description'];
  children: EuiTableHeaderCellProps['children'];
  canSort?: boolean;
  isSorted: EuiTableHeaderCellProps['isSorted'];
  isSortAscending?: EuiTableHeaderCellProps['isSortAscending'];
  tooltip?: EuiTableHeaderCellProps['tooltip'];
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
      {tooltip && (
        <EuiIconTip
          content={tooltip.content}
          type={tooltip.icon || 'questionInCircle'}
          size="m"
          color="subdued"
          iconProps={tooltip.iconProps}
          {...tooltip.tooltipProps}
        />
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
  tooltip,
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
    tooltip,
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
      ) : (
        <CellContents {...cellContentsProps} />
      )}
      {append}
    </CellComponent>
  );
};
