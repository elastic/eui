/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, {
  createRef,
  RefObject,
  useEffect,
  useRef,
  useState,
} from 'react';
import { useEuiTableColumnDataStore } from '../store/provider';
import { EuiTableHeader } from '../table_header';
import { EuiTableWithinStickyHeaderProvider } from './context';
import { useEuiMemoizedStyles } from '../../../services';
import { euiTableStyles } from '../table.styles';
import type { EuiTableProps } from '../table';
import { euiTableStickyHeaderStyles } from './sticky_header.styles';

interface EuiTableStickyHeaderProps
  extends Pick<EuiTableProps, 'scrollableInline' | 'compressed'> {
  tableRef: RefObject<HTMLTableElement>;
  tableWrapperRef: RefObject<HTMLDivElement>;
  isResponsive: boolean;
}

export const EuiTableStickyHeader = ({
  tableRef,
  tableWrapperRef,
  compressed,
  scrollableInline,
  isResponsive,
}: EuiTableStickyHeaderProps) => {
  const store = useEuiTableColumnDataStore();
  const originalStyles = useEuiMemoizedStyles(euiTableStyles);
  const columnRefs = useRef(new Map<string, RefObject<HTMLTableCellElement>>());
  const stickyTableWrapperRef = useRef<HTMLDivElement>(null);
  const stickyTableRef = useRef<HTMLTableElement>(null);
  const [columns, setColumns] = useState(() =>
    Array.from(store.getColumns().entries())
  );

  useEffect(() => {
    const unsubscribe = store.subscribe((columns) => {
      setColumns(Array.from(columns.entries()));

      columns.forEach((_, key) => {
        columnRefs.current.set(key, createRef<HTMLTableCellElement>());
      });
    });

    const unsubscribeColumnWidths = store.subscribeToColumnWidths((columns) => {
      columns.forEach((width, name) => {
        const ref = columnRefs.current.get(name);
        if (ref?.current) {
          ref.current.style.width = `${width}px`;
        }
      });
    });

    return () => {
      unsubscribe();
      unsubscribeColumnWidths();
    };
  }, [store]);

  useEffect(() => {
    if (
      !scrollableInline ||
      !tableWrapperRef.current ||
      !stickyTableRef.current ||
      !tableRef.current
    ) {
      return;
    }

    const tableWrapper = tableWrapperRef.current;

    const handleScroll = () => {
      if (stickyTableWrapperRef.current) {
        stickyTableWrapperRef.current.scrollLeft = tableWrapper.scrollLeft;
      }
    };

    const handleResize: ResizeObserverCallback = (entries) => {
      const element = entries[0].target;
      if (!element) {
        return;
      }

      if (stickyTableRef.current) {
        stickyTableRef.current.style.minWidth = `${element.clientWidth}px`;
      }
    };

    // Initial width sync
    stickyTableRef.current.style.minWidth = `${
      tableRef.current.getBoundingClientRect().width
    }px`;

    // Use ResizeObserver to keep table width in sync
    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(tableRef.current);

    tableWrapper.addEventListener('scroll', handleScroll, {
      passive: true,
    });

    return () => {
      tableWrapper.removeEventListener('scroll', handleScroll);
      resizeObserver.disconnect();
    };
  }, [scrollableInline, tableRef, tableWrapperRef]);

  const tableStyles = [
    originalStyles.euiTable,
    scrollableInline && originalStyles.euiTableScrollableInline,
    (!compressed || isResponsive) && originalStyles.uncompressed,
    compressed && !isResponsive && originalStyles.compressed,
    // Forced fixed layout since all column widths come synced from the main table
    originalStyles.layout.fixed,
    originalStyles.hasBackground,
  ];

  const styles = useEuiMemoizedStyles(euiTableStickyHeaderStyles);

  if (isResponsive) {
    return null;
  }

  return (
    <EuiTableWithinStickyHeaderProvider>
      <div css={styles.wrapper} ref={stickyTableWrapperRef}>
        <table css={tableStyles} ref={stickyTableRef}>
          <EuiTableHeader css={styles.header}>
            {columns.map(([name, data], index) =>
              data.renderHeaderCellRef.current?.({
                ref: columnRefs.current.get(name),
                key: `${name}-${index}`,
              })
            )}
          </EuiTableHeader>
        </table>
      </div>
    </EuiTableWithinStickyHeaderProvider>
  );
};
