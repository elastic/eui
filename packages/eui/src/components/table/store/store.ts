/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { MutableRefObject, ReactNode, RefAttributes } from 'react';

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

type EuiTableStoreUnregisterColumnFunc = () => void;

type EuiTableStoreRegisterColumnFunc = (
  id: string,
  data: EuiTableStoreColumnData
) => EuiTableStoreUnregisterColumnFunc;

type EuiTableStoreSubscriber = (columns: EuiTableStoreColumnsMap) => void;

type EuiTableStoreUnsubscribeFunc = () => void;

type EuiTableStoreSubscribeFunc = (
  subscriber: EuiTableStoreSubscriber
) => EuiTableStoreUnsubscribeFunc;

type EuiTableStoreUpdateColumnFunc = (
  id: string,
  data: EuiTableStoreColumnData
) => void;

type EuiTableStoreColumnWidthsSubscriber = (
  columnWidths: ReadonlyMap<string, number>
) => void;

type EuiTableStoreSubscribeToColumnWidthsFunc = (
  subscriber: EuiTableStoreColumnWidthsSubscriber
) => EuiTableStoreUnsubscribeFunc;

/**
 * @internal
 */
export interface EuiTableStore {
  registerColumn: EuiTableStoreRegisterColumnFunc;
  updateColumn: EuiTableStoreUpdateColumnFunc;
  updateColumnWidth: (id: string, width: number) => void;
  subscribe: EuiTableStoreSubscribeFunc;
  subscribeToColumnWidths: EuiTableStoreSubscribeToColumnWidthsFunc;
  getColumns: () => EuiTableStoreColumnsMap;
}

/**
 * Check whether two column data objects are equal.
 */
const isColumnDataEqual = (
  a: EuiTableStoreColumnData,
  b: EuiTableStoreColumnData
): boolean => {
  if (a === b) {
    return true;
  }

  // TODO: Replace with a loop-based solution if the data object grows significantly
  return (
    a.currentWidth === b.currentWidth &&
    a.renderHeaderCellRef === b.renderHeaderCellRef
  );
};

export const createEuiTableStore = (): EuiTableStore => {
  const columns = new Map<string, EuiTableStoreColumnData>();
  const columnWidths = new Map<string, number>();
  const columnsSubscribers = new Set<EuiTableStoreSubscriber>();
  const columnWidthsSubscribers =
    new Set<EuiTableStoreColumnWidthsSubscriber>();

  const notifyColumnsSubscribers = () => {
    for (const subscriber of columnsSubscribers) {
      subscriber(columns);
    }
  };

  const notifyColumnWidthsSubscribers = () => {
    for (const subscriber of columnWidthsSubscribers) {
      subscriber(columnWidths);
    }
  };

  const registerColumn: EuiTableStoreRegisterColumnFunc = (id, data) => {
    if (columns.has(id)) {
      throw new Error(`[EuiTableStore] Column '${id}' already registered`);
    }

    columns.set(id, data);
    columnWidths.set(id, data.currentWidth ?? 0);
    notifyColumnsSubscribers();

    return () => {
      columns.delete(id);
      columnWidths.delete(id);
      notifyColumnsSubscribers();
    };
  };

  const updateColumn: EuiTableStoreUpdateColumnFunc = (id, data) => {
    const currentData = columns.get(id);
    if (!currentData) {
      throw new Error(`[EuiTableStore] Column '${id}' not found`);
    }

    if (isColumnDataEqual(currentData, data)) {
      // Nothing to update or notify subscribers about
      return;
    }

    columns.set(id, data);
    notifyColumnsSubscribers();
  };

  const updateColumnWidth = (id: string, width: number) => {
    const currentWidth = columnWidths.get(id);
    if (currentWidth === undefined) {
      throw new Error(`[EuiTableStore] No width stored for column '${id}'`);
    }

    if (currentWidth === width) {
      return;
    }

    columnWidths.set(id, width);
    notifyColumnWidthsSubscribers();
  };

  const subscribe: EuiTableStoreSubscribeFunc = (subscriber) => {
    columnsSubscribers.add(subscriber);

    return () => {
      columnsSubscribers.delete(subscriber);
    };
  };

  const subscribeToColumnWidths: EuiTableStoreSubscribeToColumnWidthsFunc = (
    subscriber: EuiTableStoreColumnWidthsSubscriber
  ) => {
    columnWidthsSubscribers.add(subscriber);

    return () => columnWidthsSubscribers.delete(subscriber);
  };

  return {
    getColumns: () => columns,
    registerColumn,
    updateColumn,
    updateColumnWidth,
    subscribe,
    subscribeToColumnWidths,
  };
};
