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
  tableWrapperRef: RefObject<HTMLDivElement>;
  isResponsive: boolean;
}

export const EuiTableStickyHeader = ({
  tableWrapperRef,
  compressed,
  scrollableInline,
  isResponsive,
}: EuiTableStickyHeaderProps) => {
  const store = useEuiTableColumnDataStore();
  const [columns, setColumns] = useState(() =>
    Array.from(store.getColumns().entries())
  );
  const columnRefs = useRef(new Map<string, RefObject<HTMLTableCellElement>>());
  const stickyHeaderWrapperRef = useRef<HTMLDivElement>(null);

  const originalStyles = useEuiMemoizedStyles(euiTableStyles);

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
      !stickyHeaderWrapperRef.current
    ) {
      return;
    }

    const tableWrapper = tableWrapperRef.current;
    const stickyWrapper = stickyHeaderWrapperRef.current;
    const mainTable = tableWrapper.querySelector('table');
    const stickyTable = stickyWrapper.querySelector('table');

    const syncScrollPosition = () => {
      stickyWrapper.scrollLeft = tableWrapper.scrollLeft;
    };

    const syncTableWidth = () => {
      if (mainTable && stickyTable) {
        // Match the sticky table's width to the main table's actual width
        const tableWidth = mainTable.getBoundingClientRect().width;
        stickyTable.style.minWidth = `${tableWidth}px`;
      }
    };

    // Sync table width initially and when it resizes
    syncTableWidth();

    // Use ResizeObserver to keep table width in sync
    const resizeObserver = new ResizeObserver(syncTableWidth);
    if (mainTable) {
      resizeObserver.observe(mainTable);
    }

    tableWrapper.addEventListener('scroll', syncScrollPosition, {
      passive: true,
    });

    return () => {
      tableWrapper.removeEventListener('scroll', syncScrollPosition);
      resizeObserver.disconnect();
    };
  }, [scrollableInline, tableWrapperRef]);

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
      <div css={styles.wrapper} ref={stickyHeaderWrapperRef}>
        <table css={tableStyles}>
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
