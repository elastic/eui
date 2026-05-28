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
  useEffect,
  useCallback,
  useRef,
} from 'react';
import classNames from 'classnames';

import {
  useEuiMemoizedStyles,
  HorizontalAlignment,
  LEFT_ALIGNMENT,
} from '../../services';
import { useGeneratedHtmlId } from '../../services/accessibility/html_id_generator';
import { EuiI18n } from '../i18n';
import { EuiScreenReaderOnly } from '../accessibility';
import { CommonProps, NoArgCallback } from '../common';
import { EuiIcon } from '../icon';
import { EuiInnerText } from '../inner_text';
import { EuiIconTip, EuiToolTip } from '../tool_tip';

import type { EuiTableRowCellMobileOptionsShape } from './table_row_cell';
import type { EuiTableColumnNameTooltipProps } from '../basic_table/table_types';
import { resolveWidthPropsAsStyle } from './utils';
import { useEuiTableIsResponsive } from './mobile/responsive_context';
import { EuiTableCellContent } from './_table_cell_content';
import {
  euiTableHeaderFooterCellStyles,
  _useEuiTableStickyCellStyles,
} from './table_cells_shared.styles';
import { HEADER_CELL_SCOPE } from './table_header_cell_shared';
import type {
  EuiTableSharedWidthProps,
  EuiTableStickyCellOptions,
} from './types';
import { useEuiTableColumnDataStore } from './store/provider';
import { useEuiTableWithinStickyHeader } from './sticky_header';
import { EuiTableStoreRenderHeaderCell } from './store/store';

export type TableHeaderCellScope = (typeof HEADER_CELL_SCOPE)[number];

export type EuiTableHeaderCellProps = CommonProps &
  Omit<ThHTMLAttributes<HTMLTableCellElement>, 'align' | 'scope' | 'width'> &
  EuiTableSharedWidthProps & {
    align?: HorizontalAlignment;
    isSortAscending?: boolean;
    isSorted?: boolean;
    mobileOptions?: Pick<EuiTableRowCellMobileOptionsShape, 'only' | 'show'>;
    onSort?: NoArgCallback<void>;
    scope?: TableHeaderCellScope;
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
    /**
     * Whether the cell should stick to a side of the table.
     *
     * This option is not applied in the responsive cards layout - see
     * {@link EuiTableProps#responsiveBreakpoint|`responsiveBreakpoint`}.
     *
     * Currently, it can only be used when the cell is in the first or the last
     * column of a table.
     *
     * When set to `true` and `hasBackground: false` is set on the table,
     * `--euiTableCellStickyBackgroundColor` CSS variable should be set to match
     * the background color of the element containing the table.
     * Otherwise, the sticky cell will use the default `backgroundBasePlain`
     * background color.
     * @internal
     * @beta
     * @default false
     */
    sticky?: EuiTableStickyCellOptions;
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
  minWidth,
  maxWidth,
  style: _style,
  readOnly,
  tooltipProps,
  description,
  append,
  sticky,
  ...rest
}) => {
  const selfRef = useRef<HTMLTableCellElement>(null);

  const internalCellId = useGeneratedHtmlId();
  const store = useEuiTableColumnDataStore();
  const isWithinStickyHeader = useEuiTableWithinStickyHeader();

  const styles = useEuiMemoizedStyles(euiTableHeaderFooterCellStyles);
  const stickyStyles = _useEuiTableStickyCellStyles(sticky);

  const isResponsive = useEuiTableIsResponsive();
  const hideForDesktop = !isResponsive && mobileOptions?.only;
  const hideForMobile = isResponsive && mobileOptions?.show === false;

  const renderHeaderCellRef = useRef<EuiTableStoreRenderHeaderCell>();
  renderHeaderCellRef.current = (extraProps) => {
    if (hideForDesktop || hideForMobile) return null;

    const classes = classNames('euiTableHeaderCell', className);
    const cssStyles = [
      styles.euiTableHeaderCell,
      !isResponsive && stickyStyles,
    ];
    const inlineWidthStyles = resolveWidthPropsAsStyle(_style, {
      width,
      minWidth,
      maxWidth,
    });

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
        css={cssStyles}
        className={classes}
        scope={cellScope}
        role="columnheader"
        aria-sort={ariaSortValue}
        data-sticky={(!isResponsive && sticky?.side) || undefined}
        style={{ ..._style, ...inlineWidthStyles }}
        {...rest}
        {...extraProps}
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

  const handleResize = useCallback<ResizeObserverCallback>(
    (entries) => {
      const entry = entries[0];
      if (!entry) {
        return;
      }

      store.updateColumnWidth(internalCellId, entry.contentRect.width);
    },
    [store, internalCellId]
  );

  useEffect(() => {
    // Don't register the column inside the sticky header as the original
    // column is already registered. This would cause an infinite loop.
    if (
      isWithinStickyHeader ||
      !selfRef.current ||
      !renderHeaderCellRef.current
    ) {
      return;
    }

    const unregisterColumn = store.registerColumn(internalCellId, {
      renderHeaderCellRef,
      // getBoundingClientRect is not the cheapest, but we call it only once
      currentWidth: selfRef.current.getBoundingClientRect().width,
    });

    // ResizeObserver is available in all supported browsers,
    // but jsdom and jest don't provide a polyfill for it.
    let resizeObserver: ResizeObserver | undefined;
    if (typeof window.ResizeObserver !== 'undefined') {
      resizeObserver = new ResizeObserver(handleResize);

      // Note: This _could_ be optimized by using a single ResizeObserver
      // for the whole EuiTable, but it would need to be changed back to this
      // if/when we implement resizable columns
      resizeObserver.observe(selfRef.current);
    }

    return () => {
      unregisterColumn();

      resizeObserver?.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [store, internalCellId, isWithinStickyHeader]);

  // Notify the store on every render so the sticky header stays in sync.
  // React's reconciliation will efficiently handle any duplicate renders.
  useEffect(() => {
    // Don't update the store if the component is rendered within EuiTableStickyHeader
    if (isWithinStickyHeader) {
      return;
    }

    // Don't update the store if the element doesn't exist. The render function
    // in `renderHeaderCellRef` sometimes renders null - e.g., in mobile layout
    if (!selfRef.current) {
      return;
    }

    store.updateColumn(internalCellId, {
      renderHeaderCellRef,
    });
  });

  return renderHeaderCellRef.current({ ref: selfRef });
};
