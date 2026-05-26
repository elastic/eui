/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { ReactNode, useEffect, useMemo, useState } from 'react';
import { css } from '@emotion/react';
import { useEuiTableColumnDataStore } from '../store/provider';
import { EuiTableHeader } from '../table_header';
import {
  EuiTableHeaderCell,
  EuiTableHeaderCellProps,
} from '../table_header_cell';
import { EuiTableStoreColumnData } from '../store/store';
import { EuiTableWithinStickyHeaderProvider } from './context';
import { useEuiMemoizedStyles } from '../../../services';
import { euiTableStyles } from '../table.styles';

export const EuiTableStickyHeader = () => {
  const store = useEuiTableColumnDataStore();
  const [columns, setColumns] = useState<EuiTableStoreColumnData[]>(() => [
    ...store.getColumns().values(),
  ]);

  const styles = useEuiMemoizedStyles(euiTableStyles);

  useEffect(() => {
    return store.subscribe((columns) => {
      setColumns([...columns.values()]);
    });
  }, [store]);

  const headerCells = useMemo(() => {
    console.log('useMemo', columns);

    const cells: ReactNode[] = [];

    columns.forEach((columnData) => {
      const { currentWidth, ..._props } = columnData;
      const props: EuiTableHeaderCellProps = {
        ..._props,
      };

      if (currentWidth !== undefined) {
        props.width = columnData.currentWidth;
        props.minWidth = columnData.currentWidth;
        props.maxWidth = columnData.currentWidth;
      }

      cells.push(<EuiTableHeaderCell {...props} />);
    });
    return cells;
  }, [columns]);

  const tableStyles = [
    css`
      position: fixed;
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
        <EuiTableHeader>{headerCells}</EuiTableHeader>
      </table>
    </EuiTableWithinStickyHeaderProvider>
  );
};
