/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { act } from '@testing-library/react';
import { testCustomHook } from '../../../test/internal';
import {
  useDefaultColumnWidth,
  doesColumnHaveAnInitialWidth,
  useColumnWidths,
} from './col_widths';

// Allows us to unit test useDefaultColumnWidth without running into the IS_JEST_ENVIRONMENT early return
jest.mock('../../../utils', () => ({ IS_JEST_ENVIRONMENT: false }));

describe('useDefaultColumnWidth', () => {
  it('returns null if grid has not yet been initialized (gridWidth = 0)', () => {
    expect(
      testCustomHook(() => useDefaultColumnWidth(0, [], [], [])).return
    ).toEqual(null);
  });

  it('returns a static default column width of 100px if all columns have initialWidths', () => {
    const columns = [
      { id: 'A', initialWidth: 200 },
      { id: 'B', initialWidth: 150 },
    ];
    expect(
      testCustomHook(() => useDefaultColumnWidth(500, [], [], columns)).return
    ).toEqual(100);
  });

  it('returns the grid width divided by the number of columns without initialWidths', () => {
    const columns = [{ id: 'A' }, { id: 'B' }, { id: 'C' }, { id: 'D' }];
    expect(
      testCustomHook(() => useDefaultColumnWidth(500, [], [], columns)).return
    ).toEqual(125); // 500 / 4
  });

  it('accounts for leading/trailing control columns affecting the available grid width', () => {
    const controlColumns = [{ id: 'controlColumn', width: 50 }] as any;
    const columns = [{ id: 'A' }, { id: 'B' }, { id: 'C' }, { id: 'D' }];
    expect(
      testCustomHook(() =>
        useDefaultColumnWidth(1000, controlColumns, controlColumns, columns)
      ).return
    ).toEqual(225); // 1000 - (50 * 2) / 4
  });

  it('returns a minimum column width of 100px regardless of grid width / number of columns', () => {
    const columns = [{ id: 'A' }, { id: 'B' }, { id: 'C' }, { id: 'D' }];
    expect(
      testCustomHook(() => useDefaultColumnWidth(200, [], [], columns)).return
    ).toEqual(100); // Would be 200 / 4 = 50 without a minumum
  });
});

describe('doesColumnHaveAnInitialWidth', () => {
  it('returns true if the column object has an initialWidth property', () => {
    expect(
      doesColumnHaveAnInitialWidth({ id: 'someColumn', initialWidth: 100 })
    ).toEqual(true);
  });

  it('returns false if initialWidth is missing', () => {
    expect(doesColumnHaveAnInitialWidth({ id: 'someColumn' })).toEqual(false);
  });

  it('returns false if initialWidth is undefined', () => {
    expect(
      doesColumnHaveAnInitialWidth({
        id: 'someColumn',
        initialWidth: undefined,
      })
    ).toEqual(false);
  });
});

describe('useColumnWidths', () => {
  const args = {
    leadingControlColumns: [{ id: 'a', width: 50 }] as any,
    columns: [{ id: 'b', initialWidth: 75 }, { id: 'c ' }],
    trailingControlColumns: [{ id: 'd', width: 25 }] as any,
    defaultColumnWidth: 150,
    onColumnResize: jest.fn(),
  };
  type ReturnedValues = ReturnType<typeof useColumnWidths>;

  describe('columnWidths', () => {
    it('returns a map of column `id`s to `initialWidth`s', () => {
      const {
        return: { columnWidths },
      } = testCustomHook(() => useColumnWidths(args));
      expect(columnWidths).toEqual({ b: 75 });
    });

    it('recomputes column widths on columns change', () => {
      const { updateHookArgs, getUpdatedState } =
        testCustomHook<ReturnedValues>(useColumnWidths, args);

      updateHookArgs({
        columns: [{ id: 'c', initialWidth: 125 }],
      });
      expect(getUpdatedState().columnWidths).toEqual({ c: 125 });
    });
  });

  describe('setColumnWidth', () => {
    it("sets a single column's width in the columnWidths map", () => {
      const {
        return: { setColumnWidth },
        getUpdatedState,
      } = testCustomHook<ReturnedValues>(() => useColumnWidths(args));

      act(() => setColumnWidth('c', 125));
      expect(getUpdatedState().columnWidths).toEqual({ b: 75, c: 125 });
      expect(args.onColumnResize).toHaveBeenCalledWith({
        columnId: 'c',
        width: 125,
      });
    });
  });

  describe('getColumnWidth', () => {
    describe('leading control columns', () => {
      it('returns the width property of the column', () => {
        const {
          return: { getColumnWidth },
        } = testCustomHook(() => useColumnWidths({ ...args }));
        expect(getColumnWidth(0)).toEqual(50);
      });
    });

    describe('trailing control columns', () => {
      it('returns the width property of the column', () => {
        const {
          return: { getColumnWidth },
        } = testCustomHook(() => useColumnWidths({ ...args }));
        expect(getColumnWidth(3)).toEqual(25);
      });
    });

    describe('normal data columns', () => {
      it('returns the initialWidth property of the column if present and not overridden by user settings', () => {
        const {
          return: { getColumnWidth },
        } = testCustomHook(() => useColumnWidths({ ...args }));
        expect(getColumnWidth(1)).toEqual(75);
      });

      it('returns the defaultColumnWidth if no column initialWidth or user width was set', () => {
        const {
          return: { getColumnWidth },
        } = testCustomHook(() => useColumnWidths({ ...args }));
        expect(getColumnWidth(2)).toEqual(150);
      });

      it('returns a static 100px width if no default column width was passed', () => {
        const {
          return: { getColumnWidth },
        } = testCustomHook(() =>
          useColumnWidths({ ...args, defaultColumnWidth: null })
        );
        expect(getColumnWidth(2)).toEqual(100);
      });
    });

    describe('when all columns are hidden', () => {
      it('does not error & falls back to the static default width', () => {
        const {
          return: { getColumnWidth },
        } = testCustomHook(() =>
          useColumnWidths({
            ...args,
            leadingControlColumns: [],
            trailingControlColumns: [],
            columns: [],
            defaultColumnWidth: null,
          })
        );
        expect(getColumnWidth(0)).toEqual(100);
      });
    });
  });
});
