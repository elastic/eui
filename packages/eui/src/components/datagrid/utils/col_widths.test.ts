/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { renderHook, renderHookAct } from '../../../test/rtl';
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
      renderHook(() => useDefaultColumnWidth(0, [], [], [])).result.current
    ).toEqual(null);
  });

  it('returns a static default column width of 100px if all columns have initialWidths', () => {
    const columns = [
      { id: 'A', initialWidth: 200 },
      { id: 'B', initialWidth: 150 },
    ];
    expect(
      renderHook(() => useDefaultColumnWidth(500, [], [], columns)).result
        .current
    ).toEqual(100);
  });

  it('returns the grid width divided by the number of columns without initialWidths', () => {
    const columns = [{ id: 'A' }, { id: 'B' }, { id: 'C' }, { id: 'D' }];
    expect(
      renderHook(() => useDefaultColumnWidth(500, [], [], columns)).result
        .current
    ).toEqual(125); // 500 / 4
  });

  it('accounts for leading/trailing control columns affecting the available grid width', () => {
    const controlColumns = [{ id: 'controlColumn', width: 50 }] as any;
    const columns = [{ id: 'A' }, { id: 'B' }, { id: 'C' }, { id: 'D' }];
    expect(
      renderHook(() =>
        useDefaultColumnWidth(1000, controlColumns, controlColumns, columns)
      ).result.current
    ).toEqual(225); // 1000 - (50 * 2) / 4
  });

  it('returns a minimum column width of 100px regardless of grid width / number of columns', () => {
    const columns = [{ id: 'A' }, { id: 'B' }, { id: 'C' }, { id: 'D' }];
    expect(
      renderHook(() => useDefaultColumnWidth(200, [], [], columns)).result
        .current
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
    columns: [{ id: 'b', initialWidth: 75 }, { id: 'c' }],
    trailingControlColumns: [{ id: 'd', width: 25 }] as any,
    defaultColumnWidth: 150,
    onColumnResize: jest.fn(),
  };

  describe('columnWidths', () => {
    it('returns a map of column `id`s to `initialWidth`s', () => {
      const { columnWidths } = renderHook(() => useColumnWidths(args)).result
        .current;

      expect(columnWidths).toEqual({ b: 75 });
    });

    describe('when `columns` updates', () => {
      it('adds new `initialWidth`s', () => {
        const { rerender, result } = renderHook(useColumnWidths, {
          initialProps: args,
        });
        rerender({
          ...args,
          columns: [{ id: 'f', initialWidth: 100 }],
        });

        expect(result.current.columnWidths).toEqual({ b: 75, f: 100 });
      });

      it('does not remove column widths that have been hidden', () => {
        const { rerender, result } = renderHook(useColumnWidths, {
          initialProps: args,
        });

        rerender({
          ...args,
          columns: [{ id: 'c' }],
        });
        expect(result.current.columnWidths).toEqual({ b: 75 });
      });

      it('does not override column widths that have already been set by manual user resize', () => {
        const { rerender, result } = renderHook(useColumnWidths, {
          initialProps: args,
        });

        renderHookAct(() => result.current.setColumnWidth('b', 150));
        rerender({
          ...args,
          columns: [...args.columns],
        });
        expect(result.current.columnWidths).toEqual({ b: 150 });
      });
    });
  });

  describe('setColumnWidth', () => {
    it("sets a single column's width in the columnWidths map", () => {
      const { result } = renderHook(() => useColumnWidths(args));

      renderHookAct(() => result.current.setColumnWidth('c', 125));
      expect(result.current.columnWidths).toEqual({ b: 75, c: 125 });
      expect(args.onColumnResize).toHaveBeenCalledWith({
        columnId: 'c',
        width: 125,
      });
    });
  });

  describe('getColumnWidth', () => {
    describe('leading control columns', () => {
      it('returns the width property of the column', () => {
        const { getColumnWidth } = renderHook(() =>
          useColumnWidths({ ...args })
        ).result.current;

        expect(getColumnWidth(0)).toEqual(50);
      });
    });

    describe('trailing control columns', () => {
      it('returns the width property of the column', () => {
        const { getColumnWidth } = renderHook(() =>
          useColumnWidths({ ...args })
        ).result.current;

        expect(getColumnWidth(3)).toEqual(25);
      });
    });

    describe('normal data columns', () => {
      it('returns the initialWidth property of the column if present and not overridden by user settings', () => {
        const { getColumnWidth } = renderHook(() =>
          useColumnWidths({ ...args })
        ).result.current;

        expect(getColumnWidth(1)).toEqual(75);
      });

      it('returns the defaultColumnWidth if no column initialWidth or user width was set', () => {
        const { getColumnWidth } = renderHook(() =>
          useColumnWidths({ ...args })
        ).result.current;

        expect(getColumnWidth(2)).toEqual(150);
      });

      it('returns a static 100px width if no default column width was passed', () => {
        const { getColumnWidth } = renderHook(() =>
          useColumnWidths({ ...args, defaultColumnWidth: null })
        ).result.current;

        expect(getColumnWidth(2)).toEqual(100);
      });
    });

    describe('when all columns are hidden', () => {
      it('does not error & falls back to the static default width', () => {
        const { getColumnWidth } = renderHook(() =>
          useColumnWidths({
            ...args,
            leadingControlColumns: [],
            trailingControlColumns: [],
            columns: [],
            defaultColumnWidth: null,
          })
        ).result.current;

        expect(getColumnWidth(0)).toEqual(100);
      });
    });
  });
});
