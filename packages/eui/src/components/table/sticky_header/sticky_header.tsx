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
import { css } from '@emotion/react';
import { useEuiTableColumnDataStore } from '../store/provider';
import { EuiTableHeader } from '../table_header';
import { EuiTableWithinStickyHeaderProvider } from './context';
import { useEuiMemoizedStyles } from '../../../services';
import { euiTableStyles } from '../table.styles';

export const EuiTableStickyHeader = () => {
  const store = useEuiTableColumnDataStore();
  const [columns, setColumns] = useState(() =>
    Array.from(store.getColumns().entries())
  );
  const columnRefs = useRef(new Map<string, RefObject<HTMLTableCellElement>>());

  const styles = useEuiMemoizedStyles(euiTableStyles);

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

  const tableStyles = [
    css`
      position: sticky;
      top: 0;
      z-index: 1;
    `,
    styles.euiTable,
    styles.layout.auto,
    styles.uncompressed,
    styles.hasBackground,
  ];

  return (
    <EuiTableWithinStickyHeaderProvider>
      <table css={tableStyles}>
        <EuiTableHeader>
          {columns.map(([name, data], index) =>
            data.renderHeaderCellRef.current?.({
              ref: columnRefs.current.get(name),
              key: `${name}-${index}`,
            })
          )}
        </EuiTableHeader>
      </table>
    </EuiTableWithinStickyHeaderProvider>
  );
};
