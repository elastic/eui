/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { MutableRefObject, ReactNode, RefAttributes } from 'react';
import {
  createPublisher,
  type PublisherSubscribeFunc,
} from '../../../utils/publisher';

/**
 * @internal
 */
export type EuiTableStoreRenderHeaderCell = (
  extraProps: RefAttributes<HTMLTableCellElement>
) => ReactNode;

/**
 * @internal
 */
export interface EuiTableStoreColumnData {
  currentWidth?: number;
  renderHeaderCellRef: MutableRefObject<
    EuiTableStoreRenderHeaderCell | undefined
  >;
}

type EuiTableStoreColumnsMap = ReadonlyMap<string, EuiTableStoreColumnData>;

type EuiTableStoreColumnWidthsMap = ReadonlyMap<string, number>;

/**
 * @internal
 */
export interface EuiTableStore {
  /**
   * Register a table column with the store.
   * Registration must be performed on the first render of the column
   * to keep things in sync.
   *
   * @returns {Function} A function that unregisters the column from the store.
   */
  registerColumn: (id: string, data: EuiTableStoreColumnData) => () => void;

  /**
   * Update a table column with new data.
   */
  updateColumn: (id: string, data: EuiTableStoreColumnData) => void;

  /**
   * Update the current width of a column.
   */
  updateColumnWidth: (id: string, width: number) => void;

  /**
   * Subscribe to changes in table columns.
   *
   * @returns {Function} A function that unsubscribes the subscriber from the store.
   */
  subscribe: PublisherSubscribeFunc<EuiTableStoreColumnsMap>;

  /**
   * Subscribe to changes in table column widths.
   *
   * @returns {Function} A function that unsubscribes the subscriber from the store.
   */
  subscribeToColumnWidths: PublisherSubscribeFunc<EuiTableStoreColumnWidthsMap>;

  /**
   * Get all registered columns as a readonly map.
   */
  getColumns: () => EuiTableStoreColumnsMap;

  /**
   * Get all column widths as a readonly map.
   */
  getColumnWidths: () => EuiTableStoreColumnWidthsMap;
}

export const createEuiTableStore = (): EuiTableStore => {
  const columns = new Map<string, EuiTableStoreColumnData>();
  const columnsPublisher = createPublisher<EuiTableStoreColumnsMap>();

  const columnWidths = new Map<string, number>();
  const columnWidthsPublisher = createPublisher<EuiTableStoreColumnWidthsMap>();

  const registerColumn: EuiTableStore['registerColumn'] = (id, data) => {
    if (columns.has(id)) {
      throw new Error(`[EuiTableStore] Column '${id}' already registered`);
    }

    columns.set(id, data);
    // Initialize column in the columnWidths map to keep both maps in sync
    columnWidths.set(id, data.currentWidth ?? 0);

    columnsPublisher.notify(columns);

    return () => {
      columns.delete(id);
      columnWidths.delete(id);

      columnsPublisher.notify(columns);
    };
  };

  const updateColumn: EuiTableStore['updateColumn'] = (id, data) => {
    const currentData = columns.get(id);
    if (!currentData) {
      throw new Error(`[EuiTableStore] Column '${id}' not found`);
    }

    columns.set(id, data);
    columnsPublisher.notify(columns);
  };

  const updateColumnWidth: EuiTableStore['updateColumnWidth'] = (
    id: string,
    width: number
  ) => {
    const currentWidth = columnWidths.get(id);
    if (currentWidth === undefined) {
      throw new Error(`[EuiTableStore] No width stored for column '${id}'`);
    }

    if (currentWidth === width) {
      return;
    }

    columnWidths.set(id, width);
    columnWidthsPublisher.notify(columnWidths);
  };

  return {
    registerColumn,
    updateColumn,
    updateColumnWidth,
    subscribe: columnsPublisher.subscribe,
    subscribeToColumnWidths: columnWidthsPublisher.subscribe,
    getColumns: () => columns,
    getColumnWidths: () => columnWidths,
  };
};
