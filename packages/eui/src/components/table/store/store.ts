/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { EuiTableHeaderCellProps } from '../table_header_cell';

/**
 * @internal
 */
export interface EuiTableStoreColumnData extends EuiTableHeaderCellProps {
  currentWidth?: number;
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

/**
 * @internal
 */
export interface EuiTableStore {
  registerColumn: EuiTableStoreRegisterColumnFunc;
  updateColumn: EuiTableStoreUpdateColumnFunc;
  subscribe: EuiTableStoreSubscribeFunc;
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
    a.width === b.width &&
    a.minWidth === b.minWidth &&
    a.maxWidth === b.maxWidth
  );
};

export const createEuiTableStore = (): EuiTableStore => {
  const columns = new Map<string, EuiTableStoreColumnData>();
  const subscribers = new Set<EuiTableStoreSubscriber>();

  const notifySubscribers = () => {
    console.log('notifySubscribers()');

    for (const subscriber of subscribers) {
      subscriber(columns);
    }
  };

  const registerColumn: EuiTableStoreRegisterColumnFunc = (id, data) => {
    // TODO: Check if this is actually an update to already registered column and notify only if there are changes

    console.log(`registering column ${id}`, data);

    // if (columns.has(id)) {
    //   throw new Error(`[EuiTableStore] Column '${id}' already registered`);
    // }

    columns.set(id, data);
    notifySubscribers();

    return () => {
      console.log(`unregistering column ${id}`);

      columns.delete(id);
      notifySubscribers();
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
    notifySubscribers();
  };

  const subscribe: EuiTableStoreSubscribeFunc = (subscriber) => {
    subscribers.add(subscriber);

    return () => {
      subscribers.delete(subscriber);
    };
  };

  return {
    getColumns: () => columns,
    registerColumn,
    updateColumn,
    subscribe,
  };
};
