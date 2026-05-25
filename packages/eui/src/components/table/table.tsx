/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, {
  FunctionComponent,
  TableHTMLAttributes,
  useRef,
  useState,
  useMemo,
  useCallback,
} from 'react';
import classNames from 'classnames';

import { useEuiMemoizedStyles, type EuiBreakpointSize } from '../../services';
import { CommonProps } from '../common';

import {
  useIsEuiTableResponsive,
  EuiTableIsResponsiveContext,
} from './mobile/responsive_context';
import { EuiTableVariantContext } from './table_context';
import { euiTableStyles } from './table.styles';
import { usePropsWithComponentDefaults } from '../provider/component_defaults';
import { euiContainerCSS } from '../../global_styling';
import { EUI_TABLE_CSS_CONTAINER_NAME } from './const';
import { EuiTableStickyScrollbar } from './sticky_scrollbar';
import {
  EuiTableStickyHeaderContextProvider,
  EuiTableStickyHeaderRenderer,
  type HeaderCellRegistration,
} from './sticky_header';
import { euiTableStickyHeaderStyles } from './sticky_header/sticky_header.styles';

export interface EuiTableProps
  extends CommonProps,
    TableHTMLAttributes<HTMLTableElement> {
  compressed?: boolean;
  /**
   * Named breakpoint. Below this size, the table will collapse
   * into responsive cards.
   *
   * Pass `false` to never collapse to a mobile view, or inversely,
   * `true` to always render mobile-friendly cards.
   *
   * @default m
   */
  responsiveBreakpoint?: EuiBreakpointSize | boolean;
  /**
   * Sets the table-layout CSS property
   * @default 'fixed'
   */
  tableLayout?: 'fixed' | 'auto';
  /**
   * Toggle the table's background
   * @default true
   */
  hasBackground?: boolean;
  /**
   * Allow the table to grow over 100% of the container inline size
   * (width in horizontal writing-mode) and enable scrolling on overflow.
   *
   * This should only be used with [`tableLayout`]{@link EuiTableProps#tableLayout}
   * set to `auto`.
   * @beta
   * @default false
   */
  scrollableInline?: boolean;
  /**
   * Make the horizontal scrollbar visible even if the table is larger
   * than the viewport height. Useful for long tables when the native browser
   * scrollbar is at the bottom of the table and hard to reach.
   *
   * This prop requires [`scrollableInline`](#scrollableInline) to be `true`.
   * @beta
   * @default false
   */
  stickyScrollbar?: boolean;
  /**
   * Enable sticky table header that remains visible when scrolling.
   * The header row will be duplicated and positioned with `position: sticky`.
   *
   * @beta
   * @default false
   */
  stickyHeader?: boolean;
  /**
   * Offset from the top of the viewport for the sticky header.
   * Useful when there are other fixed/sticky elements above the table.
   *
   * @beta
   * @default 0
   */
  stickyHeaderOffset?: number;
}

/**
 * EuiTable is a low-level building block component used to render tabular data
 * in a customized way.
 *
 * It should only be used when confirmed that [EuiBasicTable]{@link EuiBasicTable}
 * and [EuiInMemoryTable]{@link EuiInMemoryTable} are not flexible enough
 * for the purposes of the job.
 *
 * @see {@link https://eui.elastic.co/docs/components/tables/custom/|EuiTable documentation}
 */
export const EuiTable: FunctionComponent<EuiTableProps> = (originalProps) => {
  const {
    children,
    className,
    compressed,
    tableLayout = 'fixed',
    hasBackground = true,
    responsiveBreakpoint,
    scrollableInline = false,
    stickyScrollbar = false,
    stickyHeader = false,
    stickyHeaderOffset = 0,
    ...rest
  } = usePropsWithComponentDefaults('EuiTable', originalProps);
  const tableWrapperRef = useRef<HTMLDivElement>(null);
  const tableRef = useRef<HTMLTableElement>(null);
  const isResponsive = useIsEuiTableResponsive(responsiveBreakpoint);

  // Sticky header registry state
  const [headerRegistry, setHeaderRegistry] = useState<
    Map<string, HeaderCellRegistration>
  >(new Map());

  // Stable callbacks for header cell registration
  const register = useCallback(
    (id: string, order: number, props: any, children?: React.ReactNode) => {
      setHeaderRegistry((prev) => {
        // Bail out if content is unchanged to prevent unnecessary updates
        const existing = prev.get(id);
        if (
          existing &&
          existing.order === order &&
          existing.props === props &&
          existing.children === children
        ) {
          return prev;
        }
        const next = new Map(prev);
        next.set(id, { id, order, props, children });
        return next;
      });
    },
    []
  );

  const deregister = useCallback((id: string) => {
    setHeaderRegistry((prev) => {
      if (!prev.has(id)) return prev; // Bail out if not in registry
      const next = new Map(prev);
      next.delete(id);
      return next;
    });
  }, []);

  // Create context value with stable registry API
  const stickyHeaderContext = useMemo(() => {
    if (!stickyHeader || isResponsive) {
      // Don't provide context if sticky header is disabled or in responsive mode
      return undefined;
    }
    return {
      registry: {
        headerCells: Array.from(headerRegistry.values()).sort(
          (a, b) => a.order - b.order
        ),
        register,
        deregister,
      },
      stickyHeaderOffset,
    };
  }, [
    stickyHeader,
    isResponsive,
    headerRegistry,
    register,
    deregister,
    stickyHeaderOffset,
  ]);

  const classes = classNames('euiTable', className);

  const styles = useEuiMemoizedStyles(euiTableStyles);
  const stickyHeaderStyles = useEuiMemoizedStyles(euiTableStickyHeaderStyles);
  const tableStyles = [
    styles.euiTable,
    scrollableInline && styles.euiTableScrollableInline,
    styles.layout[tableLayout],
    (!compressed || isResponsive) && styles.uncompressed,
    compressed && !isResponsive && styles.compressed,
    hasBackground && styles.hasBackground,
    isResponsive ? styles.mobile : styles.desktop,
    stickyHeader && !isResponsive && stickyHeaderStyles.hiddenOriginalHeader,
  ];
  const cssStyles = [
    euiContainerCSS('normal', EUI_TABLE_CSS_CONTAINER_NAME, true),
    scrollableInline && styles.scrollableWrapper,
  ];

  return (
    <>
      <div css={cssStyles} ref={tableWrapperRef}>
        <EuiTableStickyHeaderContextProvider {...stickyHeaderContext}>
          {stickyHeader && !isResponsive && (
            <EuiTableStickyHeaderRenderer
              tableRef={tableRef}
              tableLayout={tableLayout}
              hasBackground={hasBackground}
              compressed={compressed}
            />
          )}
          <table
            ref={tableRef}
            tabIndex={-1}
            css={tableStyles}
            className={classes}
            {...rest}
          >
            <EuiTableIsResponsiveContext.Provider value={isResponsive}>
              <EuiTableVariantContext.Provider value={{ hasBackground }}>
                {children}
              </EuiTableVariantContext.Provider>
            </EuiTableIsResponsiveContext.Provider>
          </table>
        </EuiTableStickyHeaderContextProvider>
      </div>
      {scrollableInline && stickyScrollbar && (
        <EuiTableStickyScrollbar tableWrapperRef={tableWrapperRef} />
      )}
    </>
  );
};
