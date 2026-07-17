/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import {
  createEuiTableStore,
  type EuiTableStoreColumnData,
  type EuiTableStoreRenderHeaderCell,
} from './store';

// a createRef replacement that returns the expected RefObject-like type
const createMockRenderHeaderCellRef = () => ({
  current: undefined as EuiTableStoreRenderHeaderCell | undefined,
});

describe('createEuiTableStore', () => {
  describe('registerColumn', () => {
    it('registers a column and returns an unregister function', () => {
      const store = createEuiTableStore();
      const columnData: EuiTableStoreColumnData = {
        currentWidth: 100,
        renderHeaderCellRef: createMockRenderHeaderCellRef(),
      };

      const unregister = store.registerColumn('col1', columnData);

      expect(store.getColumns().size).toBe(1);
      expect(store.getColumns().get('col1')).toBe(columnData);
      expect(unregister).toBeInstanceOf(Function);
    });

    it('initializes column width in columnWidths map', () => {
      const store = createEuiTableStore();
      store.registerColumn('col1', {
        currentWidth: 150,
        renderHeaderCellRef: createMockRenderHeaderCellRef(),
      });

      expect(store.getColumnWidths().get('col1')).toBe(150);
    });

    it('initializes column width to 0 when currentWidth is undefined', () => {
      const store = createEuiTableStore();
      store.registerColumn('col1', {
        renderHeaderCellRef: createMockRenderHeaderCellRef(),
      });

      expect(store.getColumnWidths().get('col1')).toBe(0);
    });

    it('throws an error when registering a column with a duplicate column id', () => {
      const store = createEuiTableStore();
      const columnData: EuiTableStoreColumnData = {
        currentWidth: 100,
        renderHeaderCellRef: createMockRenderHeaderCellRef(),
      };

      store.registerColumn('col1', columnData);

      expect(() => {
        store.registerColumn('col1', columnData);
      }).toThrow("[EuiTableStore] Column 'col1' already registered");
    });

    it('notifies subscribers when a column is registered', () => {
      const store = createEuiTableStore();

      const subscriber = jest.fn();
      store.subscribe(subscriber);

      store.registerColumn('col1', {
        currentWidth: 100,
        renderHeaderCellRef: createMockRenderHeaderCellRef(),
      });

      expect(subscriber).toHaveBeenCalledTimes(1);
      expect(subscriber).toHaveBeenCalledWith(store.getColumns());
    });

    describe('unregister', () => {
      it('unregisters a column when the returned function is called', () => {
        const store = createEuiTableStore();

        const unregister = store.registerColumn('col1', {
          currentWidth: 100,
          renderHeaderCellRef: createMockRenderHeaderCellRef(),
        });

        expect(store.getColumns().size).toBe(1);
        expect(store.getColumnWidths().get('col1')).toBe(100);

        unregister();

        expect(store.getColumns().size).toBe(0);
        expect(store.getColumns().get('col1')).toBeUndefined();
        expect(store.getColumnWidths().get('col1')).toBeUndefined();
      });

      it('notifies subscribers when a column is unregistered', () => {
        const store = createEuiTableStore();
        const subscriber = jest.fn();
        store.subscribe(subscriber);

        const unregister = store.registerColumn('col1', {
          currentWidth: 100,
          renderHeaderCellRef: createMockRenderHeaderCellRef(),
        });
        subscriber.mockClear();

        unregister();

        expect(subscriber).toHaveBeenCalledTimes(1);
        expect(subscriber).toHaveBeenCalledWith(store.getColumns());
      });
    });
  });

  describe('updateColumn', () => {
    it('updates a column with new data', () => {
      const store = createEuiTableStore();

      store.registerColumn('col1', {
        currentWidth: 100,
        renderHeaderCellRef: createMockRenderHeaderCellRef(),
      });

      const updatedData: EuiTableStoreColumnData = {
        currentWidth: 200,
        renderHeaderCellRef: createMockRenderHeaderCellRef(),
      };
      store.updateColumn('col1', updatedData);

      expect(store.getColumns().get('col1')).toBe(updatedData);
    });

    it('throws an error when updating a non-existent column', () => {
      const store = createEuiTableStore();

      expect(() => {
        store.updateColumn('nonexistent', {
          currentWidth: 100,
          renderHeaderCellRef: createMockRenderHeaderCellRef(),
        });
      }).toThrow("[EuiTableStore] Column 'nonexistent' not found");
    });

    it('notifies subscribers when a column is updated', () => {
      const store = createEuiTableStore();
      const subscriber = jest.fn();

      store.registerColumn('col1', {
        currentWidth: 100,
        renderHeaderCellRef: createMockRenderHeaderCellRef(),
      });

      store.subscribe(subscriber);
      subscriber.mockClear();

      store.updateColumn('col1', {
        currentWidth: 200,
        renderHeaderCellRef: createMockRenderHeaderCellRef(),
      });

      expect(subscriber).toHaveBeenCalledTimes(1);
      expect(subscriber).toHaveBeenCalledWith(store.getColumns());
    });
  });

  describe('updateColumnWidth', () => {
    it('updates the width of a column', () => {
      const store = createEuiTableStore();

      store.registerColumn('col1', {
        currentWidth: 100,
        renderHeaderCellRef: createMockRenderHeaderCellRef(),
      });
      store.updateColumnWidth('col1', 250);

      expect(store.getColumnWidths().get('col1')).toBe(250);
    });

    it('throws an error when updating width for a non-existent column', () => {
      const store = createEuiTableStore();

      expect(() => {
        store.updateColumnWidth('nonexistent', 100);
      }).toThrow("[EuiTableStore] No width stored for column 'nonexistent'");
    });

    it('notifies width subscribers when the width changes', () => {
      const store = createEuiTableStore();
      const widthSubscriber = jest.fn();

      store.registerColumn('col1', {
        currentWidth: 100,
        renderHeaderCellRef: createMockRenderHeaderCellRef(),
      });
      store.subscribeToColumnWidths(widthSubscriber);
      widthSubscriber.mockClear();

      store.updateColumnWidth('col1', 250);

      expect(widthSubscriber).toHaveBeenCalledTimes(1);
      expect(widthSubscriber).toHaveBeenCalledWith(store.getColumnWidths());
    });

    it('does not notify subscribers when the width is the same', () => {
      const store = createEuiTableStore();
      const widthSubscriber = jest.fn();

      store.registerColumn('col1', {
        currentWidth: 100,
        renderHeaderCellRef: createMockRenderHeaderCellRef(),
      });
      store.subscribeToColumnWidths(widthSubscriber);
      widthSubscriber.mockClear();

      store.updateColumnWidth('col1', 100);

      expect(widthSubscriber).not.toHaveBeenCalled();
    });
  });

  describe('subscribe', () => {
    it('subscribes to column changes', () => {
      const store = createEuiTableStore();
      const subscriber = jest.fn();

      store.subscribe(subscriber);

      store.registerColumn('col1', {
        currentWidth: 100,
        renderHeaderCellRef: createMockRenderHeaderCellRef(),
      });

      expect(subscriber).toHaveBeenCalledWith(store.getColumns());
    });

    it('returns an unsubscribe function', () => {
      const store = createEuiTableStore();
      const subscriber = jest.fn();

      const unsubscribe = store.subscribe(subscriber);
      expect(unsubscribe).toBeInstanceOf(Function);

      const columnData: EuiTableStoreColumnData = {
        currentWidth: 100,
        renderHeaderCellRef: createMockRenderHeaderCellRef(),
      };

      store.registerColumn('col1', columnData);
      expect(subscriber).toHaveBeenCalledTimes(1);

      subscriber.mockClear();
      unsubscribe();

      store.registerColumn('col2', columnData);
      expect(subscriber).not.toHaveBeenCalled();
    });

    it('supports multiple subscribers', () => {
      const store = createEuiTableStore();
      const subscriber1 = jest.fn();
      const subscriber2 = jest.fn();

      store.subscribe(subscriber1);
      store.subscribe(subscriber2);

      store.registerColumn('col1', {
        currentWidth: 100,
        renderHeaderCellRef: createMockRenderHeaderCellRef(),
      });

      expect(subscriber1).toHaveBeenCalledWith(store.getColumns());
      expect(subscriber2).toHaveBeenCalledWith(store.getColumns());
    });
  });

  describe('subscribeToColumnWidths', () => {
    it('subscribes to column width changes', () => {
      const store = createEuiTableStore();
      const subscriber = jest.fn();

      store.registerColumn('col1', {
        currentWidth: 100,
        renderHeaderCellRef: createMockRenderHeaderCellRef(),
      });

      store.subscribeToColumnWidths(subscriber);
      subscriber.mockClear();

      store.updateColumnWidth('col1', 250);

      expect(subscriber).toHaveBeenCalledWith(store.getColumnWidths());
    });

    it('returns an unsubscribe function', () => {
      const store = createEuiTableStore();
      const subscriber = jest.fn();

      store.registerColumn('col1', {
        currentWidth: 100,
        renderHeaderCellRef: createMockRenderHeaderCellRef(),
      });

      const unsubscribe = store.subscribeToColumnWidths(subscriber);
      expect(unsubscribe).toBeInstanceOf(Function);

      store.updateColumnWidth('col1', 250);
      expect(subscriber).toHaveBeenCalledTimes(1);

      subscriber.mockClear();
      unsubscribe();

      store.updateColumnWidth('col1', 300);
      expect(subscriber).not.toHaveBeenCalled();
    });

    it('supports multiple subscribers', () => {
      const store = createEuiTableStore();
      const subscriber1 = jest.fn();
      const subscriber2 = jest.fn();

      store.registerColumn('col1', {
        currentWidth: 100,
        renderHeaderCellRef: createMockRenderHeaderCellRef(),
      });

      store.subscribeToColumnWidths(subscriber1);
      store.subscribeToColumnWidths(subscriber2);
      subscriber1.mockClear();
      subscriber2.mockClear();

      store.updateColumnWidth('col1', 250);

      expect(subscriber1).toHaveBeenCalledWith(store.getColumnWidths());
      expect(subscriber2).toHaveBeenCalledWith(store.getColumnWidths());
    });
  });

  describe('getColumns', () => {
    it('returns an empty map when no columns are registered', () => {
      const store = createEuiTableStore();
      const columns = store.getColumns();

      expect(columns.size).toBe(0);
    });

    it('returns all registered columns', () => {
      const store = createEuiTableStore();
      const columnData1: EuiTableStoreColumnData = {
        currentWidth: 100,
        renderHeaderCellRef: createMockRenderHeaderCellRef(),
      };
      const columnData2: EuiTableStoreColumnData = {
        currentWidth: 200,
        renderHeaderCellRef: createMockRenderHeaderCellRef(),
      };

      store.registerColumn('col1', columnData1);
      store.registerColumn('col2', columnData2);

      const columns = store.getColumns();
      expect(columns.size).toBe(2);
      expect(columns.get('col1')).toBe(columnData1);
      expect(columns.get('col2')).toBe(columnData2);
    });
  });

  describe('getColumnWidths', () => {
    it('returns an empty map when no columns are registered', () => {
      const store = createEuiTableStore();
      const widths = store.getColumnWidths();

      expect(widths.size).toBe(0);
    });

    it('returns all column widths', () => {
      const store = createEuiTableStore();

      store.registerColumn('col1', {
        currentWidth: 100,
        renderHeaderCellRef: createMockRenderHeaderCellRef(),
      });
      store.registerColumn('col2', {
        currentWidth: 200,
        renderHeaderCellRef: createMockRenderHeaderCellRef(),
      });

      const widths = store.getColumnWidths();
      expect(widths.size).toBe(2);
      expect(widths.get('col1')).toBe(100);
      expect(widths.get('col2')).toBe(200);
    });

    it('returns updated widths after updateColumnWidth is called', () => {
      const store = createEuiTableStore();

      store.registerColumn('col1', {
        currentWidth: 100,
        renderHeaderCellRef: createMockRenderHeaderCellRef(),
      });
      store.updateColumnWidth('col1', 250);

      const widths = store.getColumnWidths();
      expect(widths.get('col1')).toBe(250);
    });
  });

  it('handles multiple columns being registered, updated, and unregistered', () => {
    const store = createEuiTableStore();
    const subscriber = jest.fn();
    const widthSubscriber = jest.fn();

    store.subscribe(subscriber);
    store.subscribeToColumnWidths(widthSubscriber);

    const col1Data: EuiTableStoreColumnData = {
      currentWidth: 100,
      renderHeaderCellRef: createMockRenderHeaderCellRef(),
    };
    const col2Data: EuiTableStoreColumnData = {
      currentWidth: 200,
      renderHeaderCellRef: createMockRenderHeaderCellRef(),
    };
    const col3Data: EuiTableStoreColumnData = {
      currentWidth: 150,
      renderHeaderCellRef: createMockRenderHeaderCellRef(),
    };

    const unregister1 = store.registerColumn('col1', col1Data);
    const unregister2 = store.registerColumn('col2', col2Data);
    store.registerColumn('col3', col3Data);

    expect(store.getColumns().size).toBe(3);
    expect(store.getColumnWidths().size).toBe(3);

    const updatedCol1Data: EuiTableStoreColumnData = {
      currentWidth: 120,
      renderHeaderCellRef: createMockRenderHeaderCellRef(),
    };
    store.updateColumn('col1', updatedCol1Data);
    expect(store.getColumns().get('col1')).toBe(updatedCol1Data);

    store.updateColumnWidth('col2', 250);
    expect(store.getColumnWidths().get('col2')).toBe(250);

    unregister1();
    expect(store.getColumns().size).toBe(2);
    expect(store.getColumnWidths().size).toBe(2);

    unregister2();
    expect(store.getColumns().size).toBe(1);
    expect(store.getColumnWidths().size).toBe(1);
    expect(store.getColumns().has('col3')).toBe(true);
    expect(store.getColumnWidths().has('col3')).toBe(true);
  });

  it('keeps columns and columnWidths maps in sync', () => {
    const store = createEuiTableStore();
    const unregister = store.registerColumn('col1', {
      currentWidth: 100,
      renderHeaderCellRef: createMockRenderHeaderCellRef(),
    });

    expect(store.getColumns().has('col1')).toBe(true);
    expect(store.getColumnWidths().has('col1')).toBe(true);

    unregister();

    expect(store.getColumns().has('col1')).toBe(false);
    expect(store.getColumnWidths().has('col1')).toBe(false);
  });
});
