/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import type { MutableRefObject } from 'react';
import { act } from '@testing-library/react';
import { renderHook } from '../../../test/rtl';
import type { ImperativeGridApi } from '../data_grid_types';
import {
  RowHeightUtils,
  RowHeightVirtualizationUtils,
  useRowHeightUtils,
} from './row_heights';

describe('RowHeightUtils', () => {
  const rowHeightUtils = new RowHeightUtils();

  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
    jest.resetAllMocks();
  });

  describe('getRowHeightOption', () => {
    const rowHeightsOptions = {
      rowHeights: {
        1: 50,
      },
      defaultHeight: 100,
    };

    it("returns a row-specific override for the cell's row", () => {
      expect(rowHeightUtils.getRowHeightOption(1, rowHeightsOptions)).toEqual(
        50
      );
    });

    it('returns the defaultHeight if no row-specific override exists', () => {
      expect(rowHeightUtils.getRowHeightOption(2, rowHeightsOptions)).toEqual(
        100
      );
    });

    it('returns undefined if no rowHeightOptions has been set', () => {
      expect(rowHeightUtils.getRowHeightOption(1, undefined)).toEqual(
        undefined
      );
    });
  });

  describe('isRowHeightOverride', () => {
    it('returns true if the passed rowIndex exists in rowHeights', () => {
      expect(
        rowHeightUtils.isRowHeightOverride(1, {
          rowHeights: { 1: 'auto' },
        })
      ).toEqual(true);
    });

    it('returns false otherwise', () => {
      expect(
        rowHeightUtils.isRowHeightOverride(1, {
          rowHeights: { 2: 'auto' },
        })
      ).toEqual(false);
      expect(rowHeightUtils.isRowHeightOverride(1, undefined)).toEqual(false);
      expect(
        rowHeightUtils.isRowHeightOverride(1, { lineHeight: '2em' })
      ).toEqual(false);
    });
  });

  describe('getCalculatedHeight', () => {
    describe('static height numbers', () => {
      it('returns the height number', () => {
        expect(rowHeightUtils.getCalculatedHeight({ height: 100 }, 34)).toEqual(
          100
        );
      });

      it('returns passed numbers', () => {
        expect(rowHeightUtils.getCalculatedHeight(100, 34)).toEqual(100);
      });

      it('does not allow passing in static row heights shorter than the default/min row height', () => {
        expect(rowHeightUtils.getCalculatedHeight(10, 34)).toEqual(34);
        expect(rowHeightUtils.getCalculatedHeight({ height: 10 }, 34)).toEqual(
          34
        );
      });
    });

    describe('lineCounts', () => {
      describe('default heights', () => {
        it('returns the min/defaultHeight set by the data_grid_body state', () => {
          const defaultHeight = 50;
          expect(
            rowHeightUtils.getCalculatedHeight({ lineCount: 3 }, defaultHeight)
          ).toEqual(defaultHeight);
        });
      });

      describe('autoBelowLineCount', () => {
        it('uses the auto height cache', () => {
          const rowIndex = 3;
          const autoRowHeight = 100;
          rowHeightUtils.setRowHeight(rowIndex, 'a', autoRowHeight, 0);

          expect(
            rowHeightUtils.getCalculatedHeight(
              { lineCount: 10 },
              34,
              rowIndex,
              { rowHeights: { [rowIndex]: autoRowHeight } }
            )
          ).toEqual(autoRowHeight);
        });
      });

      describe('row-specific overrides', () => {
        it('returns the height set in the cache', () => {
          const rowIndex = 5;
          const rowHeightOverride = 100;
          rowHeightUtils.setRowHeight(rowIndex, 'a', rowHeightOverride, 0);

          expect(
            rowHeightUtils.getCalculatedHeight(
              { lineCount: 10 },
              34,
              rowIndex,
              { rowHeights: { [rowIndex]: rowHeightOverride } }
            )
          ).toEqual(rowHeightOverride);
        });
      });
    });

    describe('auto height', () => {
      let getRowHeightSpy: jest.SpyInstance;

      beforeEach(() => {
        getRowHeightSpy = jest.spyOn(rowHeightUtils, 'getRowHeight');
      });

      afterEach(() => {
        getRowHeightSpy.mockRestore();
      });

      it('gets the max height for the current row from the heights cache', () => {
        expect(rowHeightUtils.getCalculatedHeight('auto', 34, 1)).toEqual(0); // 0 is expected since the cache is empty
        expect(getRowHeightSpy).toHaveBeenCalled();
      });

      it('returns the default height when no rowIndex is passed', () => {
        expect(rowHeightUtils.getCalculatedHeight('auto', 34)).toEqual(34); // row index is not passed when obtaining the initial defaultHeight for the entire grid
        expect(getRowHeightSpy).not.toHaveBeenCalled();
      });
    });

    // This is mostly just for branch coverage
    describe('invalid row height configs', () => {
      it('returns the default height', () => {
        // @ts-expect-error intentionally incorrect
        expect(rowHeightUtils.getCalculatedHeight({}, 34)).toEqual(34);
        // @ts-expect-error intentionally incorrect
        expect(rowHeightUtils.getCalculatedHeight('invalid', 34)).toEqual(34);
      });
    });
  });

  describe('getHeightType', () => {
    it('returns a string enum based on rowHeightsOptions', () => {
      expect(rowHeightUtils.getHeightType(undefined)).toEqual('default');
      expect(rowHeightUtils.getHeightType('auto')).toEqual('auto');
      expect(rowHeightUtils.getHeightType({ lineCount: 3 })).toEqual(
        'lineCount'
      );
      expect(rowHeightUtils.getHeightType({ height: 100 })).toEqual(
        'numerical'
      );
      expect(rowHeightUtils.getHeightType(100)).toEqual('numerical');
    });

    it("returns the default height type for lineCounts of 1, as they're functionally equivalent", () => {
      expect(rowHeightUtils.getHeightType({ lineCount: 1 })).toEqual('default');
    });

    it('falls back to a default height type for invalid lineCounts', () => {
      expect(rowHeightUtils.getHeightType({ lineCount: 0 })).toEqual('default');
      expect(rowHeightUtils.getHeightType({ lineCount: -1 })).toEqual(
        'default'
      );
    });
  });

  describe('lineCount utils', () => {
    describe('getLineCount', () => {
      it('returns the line count # when passed a row height config option', () => {
        expect(rowHeightUtils.getLineCount({ lineCount: 99 })).toEqual(99);
      });

      it('returns undefined for non-lineCount configs', () => {
        expect(rowHeightUtils.getLineCount(undefined)).toEqual(undefined);
        expect(rowHeightUtils.getLineCount('auto')).toEqual(undefined);
        expect(rowHeightUtils.getLineCount(34)).toEqual(undefined);
        expect(rowHeightUtils.getLineCount({ height: 34 })).toEqual(undefined);
      });
    });

    describe('calculateHeightForLineCount', () => {
      let getComputedStyleSpy: jest.SpyInstance;
      const cell = document.createElement('div');

      beforeEach(() => {
        getComputedStyleSpy = jest
          .spyOn(window, 'getComputedStyle')
          .mockReturnValue({
            lineHeight: '24px',
            paddingTop: '6px',
          } as CSSStyleDeclaration);
      });

      afterEach(() => {
        getComputedStyleSpy.mockRestore();
      });

      it('calculates the row height based on the number of lines and cell line height/padding', () => {
        expect(rowHeightUtils.calculateHeightForLineCount(cell, 1)).toEqual(36); // 1 * 24 + 6 + 6
        expect(rowHeightUtils.calculateHeightForLineCount(cell, 3)).toEqual(84); // 3 * 24 + 6 + 6
        expect(rowHeightUtils.calculateHeightForLineCount(cell, 5)).toEqual(
          132
        ); // 5 * 24 + 6 + 6
      });
    });

    describe('isAutoBelowLineCount', () => {
      it('returns true when the feature flag is enabled and a lineCount above 1 exists', () => {
        expect(
          rowHeightUtils.isAutoBelowLineCount(
            { autoBelowLineCount: true },
            { lineCount: 3 }
          )
        ).toEqual(true);
      });

      it('returns false if the feature flag is not enabled', () => {
        expect(
          rowHeightUtils.isAutoBelowLineCount(
            { autoBelowLineCount: false },
            { lineCount: 3 }
          )
        ).toEqual(false);
        expect(
          rowHeightUtils.isAutoBelowLineCount(undefined, { lineCount: 3 })
        ).toEqual(false);
      });

      it('returns false if height type is not lineCount', () => {
        expect(
          rowHeightUtils.isAutoBelowLineCount({ autoBelowLineCount: true }, 50)
        ).toEqual(false);
        expect(
          rowHeightUtils.isAutoBelowLineCount(
            { autoBelowLineCount: true },
            'auto'
          )
        ).toEqual(false);
      });

      it('returns false if lineCount is 1 (treated as single line/undefined)', () => {
        expect(
          rowHeightUtils.isAutoBelowLineCount(
            { autoBelowLineCount: true },
            { lineCount: 1 }
          )
        ).toEqual(false);
        expect(
          rowHeightUtils.isAutoBelowLineCount(
            { autoBelowLineCount: true },
            undefined
          )
        ).toEqual(false);
      });
    });
  });

  describe('auto height utils', () => {
    describe('isAutoHeight', () => {
      it('returns true when either the specific row height or defaultHeight is set to auto', () => {
        expect(
          rowHeightUtils.isAutoHeight(1, {
            rowHeights: { 1: 'auto' },
          })
        ).toEqual(true);
        expect(
          rowHeightUtils.isAutoHeight(1, {
            defaultHeight: 'auto',
          })
        ).toEqual(true);
      });

      it('returns true if the conditions for `.isAutoBelowLineCount` are met', () => {
        expect(
          rowHeightUtils.isAutoHeight(1, {
            autoBelowLineCount: true,
            defaultHeight: { lineCount: 2 },
          })
        ).toEqual(true);
      });

      it('returns false otherwise', () => {
        expect(
          rowHeightUtils.isAutoHeight(1, {
            rowHeights: { 1: 34 },
            defaultHeight: 'auto',
          })
        ).toEqual(false);
        expect(
          rowHeightUtils.isAutoHeight(1, {
            defaultHeight: 34,
          })
        ).toEqual(false);
      });
    });
  });

  describe('row height cache', () => {
    describe('setRowHeight', () => {
      it('setRowHeight', () => {
        rowHeightUtils.setRowHeight(5, 'a', 50, 0);
        rowHeightUtils.setRowHeight(5, 'b', 34, 0);
        rowHeightUtils.setRowHeight(5, 'c', 100, 0);
        rowHeightUtils.setRowHeight(5, 'd', undefined, 0);

        // @ts-ignore this var is private, but we're inspecting it for the sake of the unit test
        expect(rowHeightUtils.heightsCache.get(5)?.get('a')).toEqual(50); // @ts-ignore-line
        expect(rowHeightUtils.heightsCache.get(5)?.get('b')).toEqual(34); // @ts-ignore-line
        expect(rowHeightUtils.heightsCache.get(5)?.get('c')).toEqual(100); // @ts-ignore-line
        expect(rowHeightUtils.heightsCache.get(5)?.get('d')).toEqual(34); // Falls back default row height
      });
    });

    describe('getRowHeight', () => {
      it('returns the highest height value stored for the specificed row', () => {
        expect(rowHeightUtils.getRowHeight(5)).toEqual(100);
      });

      it('returns 0 if the passed row does not have any existing heights', () => {
        expect(rowHeightUtils.getRowHeight(99)).toEqual(0);
      });
    });

    describe('pruneHiddenColumnHeights', () => {
      it('checks each row height map and deletes column IDs that are no longer visible', () => {
        const didModify = rowHeightUtils.pruneHiddenColumnHeights([
          { id: 'a' },
          { id: 'b' },
        ]);
        expect(rowHeightUtils.getRowHeight(5)).toEqual(50);
        expect(didModify).toEqual(true);
      });

      it('returns false/does nothing if all cached columns IDs are currently visible', () => {
        const didModify = rowHeightUtils.pruneHiddenColumnHeights([
          { id: 'a' },
          { id: 'b' },
        ]);
        expect(didModify).toEqual(false);
      });

      test('extra getRowHeight branch coverage', () => {
        rowHeightUtils.pruneHiddenColumnHeights([]);
        expect(rowHeightUtils.getRowHeight(5)).toEqual(0);
      });
    });
  });
});

describe('RowHeightVirtualizationUtils', () => {
  const gridRef: MutableRefObject<ImperativeGridApi | null> = {
    current: {
      resetAfterIndices: jest.fn(),
      resetAfterColumnIndex: jest.fn(),
      resetAfterRowIndex: jest.fn(),
      scrollTo: jest.fn(),
      scrollToItem: jest.fn(),
    },
  };
  const outerGridElementRef = { current: null };
  const gridItemsRenderedRef = { current: null };
  const rerenderGridBodyRef = { current: jest.fn() };
  const rowHeightUtils = new RowHeightVirtualizationUtils(
    gridRef,
    outerGridElementRef,
    gridItemsRenderedRef,
    rerenderGridBodyRef
  );

  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
    jest.resetAllMocks();
  });

  describe('row resetting', () => {
    let resetRowSpy: jest.SpyInstance;

    beforeEach(() => {
      resetRowSpy = jest.spyOn(rowHeightUtils, 'resetRow');
    });

    afterEach(() => {
      resetRowSpy.mockRestore();
    });

    describe('setRowHeight', () => {
      it('calls resetRow', () => {
        rowHeightUtils.setRowHeight(5, 'a', 50, 0);
        expect(resetRowSpy).toHaveBeenCalledTimes(1);
      });

      it('does not continue if the passed height is the same as the cached height', () => {
        rowHeightUtils.setRowHeight(5, 'a', 50, 0);
        expect(resetRowSpy).not.toHaveBeenCalled();
      });

      it('calls rerenderGridBody', () => {
        expect(rerenderGridBodyRef.current).toHaveBeenCalledTimes(0);
        rowHeightUtils.setRowHeight(1, 'a', 34, 1);
        expect(rerenderGridBodyRef.current).toHaveBeenCalledTimes(1);
      });
    });

    describe('pruneHiddenColumnHeights', () => {
      it('does nothing if all cached columns IDs are currently visible', () => {
        rowHeightUtils.pruneHiddenColumnHeights([{ id: 'a' }]);
        expect(resetRowSpy).not.toHaveBeenCalled();
      });

      it('checks each row height map and deletes column IDs that are no longer visible', () => {
        rowHeightUtils.pruneHiddenColumnHeights([{ id: 'b' }]);
        expect(resetRowSpy).toHaveBeenCalled();
      });
    });
  });

  describe('grid resetting', () => {
    describe('resetRow', () => {
      let resetGridSpy: jest.SpyInstance;

      beforeEach(() => {
        resetGridSpy = jest.spyOn(rowHeightUtils, 'resetGrid');
      });

      afterEach(() => {
        resetGridSpy.mockRestore();
      });

      it('sets this.lastUpdatedRow and resets the grid', () => {
        rowHeightUtils.resetRow(0);
        // @ts-ignore this var is private, but we're inspecting it for the sake of the unit test
        expect(rowHeightUtils.lastUpdatedRow).toEqual(0);

        jest.runAllTimers();

        expect(resetGridSpy).toHaveBeenCalled();
        // @ts-ignore this var is private, but we're inspecting it for the sake of the unit test
        expect(rowHeightUtils.lastUpdatedRow).toEqual(Infinity);
      });
    });

    describe('resetGrid', () => {
      it('invokes grid.resetAfterRowIndex with the last visible row', () => {
        rowHeightUtils.setRowHeight(99, 'a', 34, 99);

        jest.runAllTimers();

        expect(gridRef.current?.resetAfterRowIndex).toHaveBeenCalledWith(99);
      });

      it('invokes resetAfterRowIndex only once with the smallest cached row index', () => {
        rowHeightUtils.setRowHeight(97, 'a', 35, 97);
        rowHeightUtils.setRowHeight(99, 'a', 36, 99);

        jest.runAllTimers();

        expect(gridRef.current?.resetAfterRowIndex).toHaveBeenCalledTimes(1);
        expect(gridRef.current?.resetAfterRowIndex).toHaveBeenCalledWith(97);
      });
    });
  });

  describe('layout shift compensation', () => {
    it('can compensate vertical shifts of the start anchor row', () => {
      const rowHeightUtils = new RowHeightVirtualizationUtils(
        gridRef,
        {
          current: {
            scrollTop: 100,
          } as any,
        },
        {
          current: {
            overscanRowStartIndex: 1,
            overscanRowStopIndex: 12,
            overscanColumnStartIndex: 0,
            overscanColumnStopIndex: 1,
            visibleRowStartIndex: 2,
            visibleRowStopIndex: 11,
            visibleColumnStartIndex: 0,
            visibleColumnStopIndex: 1,
          },
        },
        rerenderGridBodyRef
      );

      // the center row shifted by 10 pixels
      rowHeightUtils.compensateForLayoutShift(4, 10, 'start');

      // no scrolling should have taken place
      expect(gridRef.current?.scrollTo).toHaveBeenCalledTimes(0);

      // the anchor row shifted by 23 pixels
      rowHeightUtils.compensateForLayoutShift(2, 23, 'start');

      // the grid should have scrolled accordingly
      expect(gridRef.current?.scrollTo).toHaveBeenCalledWith(
        expect.objectContaining({
          scrollTop: 123,
        })
      );
    });

    it('can compensate vertical shifts of the center anchor row', () => {
      const rowHeightUtils = new RowHeightVirtualizationUtils(
        gridRef,
        {
          current: {
            scrollTop: 100,
          } as any,
        },
        {
          current: {
            overscanRowStartIndex: 1,
            overscanRowStopIndex: 12,
            overscanColumnStartIndex: 0,
            overscanColumnStopIndex: 1,
            visibleRowStartIndex: 2,
            visibleRowStopIndex: 11,
            visibleColumnStartIndex: 0,
            visibleColumnStopIndex: 1,
          },
        },
        rerenderGridBodyRef
      );

      // the topmost visible row shifted by 10 pixels
      rowHeightUtils.compensateForLayoutShift(2, 10, 'center');

      // no scrolling should have taken place
      expect(gridRef.current?.scrollTo).toHaveBeenCalledTimes(0);

      // the anchor row shifted by 23 pixels
      rowHeightUtils.compensateForLayoutShift(4, 23, 'center');

      // the grid should have scrolled accordingly
      expect(gridRef.current?.scrollTo).toHaveBeenCalledWith(
        expect.objectContaining({
          scrollTop: 123,
        })
      );
    });

    it("doesn't compensate vertical shifts when no anchor row is specified", () => {
      const rowHeightUtils = new RowHeightVirtualizationUtils(
        gridRef,
        {
          current: {
            scrollTop: 100,
          } as any,
        },
        {
          current: {
            overscanRowStartIndex: 1,
            overscanRowStopIndex: 12,
            overscanColumnStartIndex: 0,
            overscanColumnStopIndex: 1,
            visibleRowStartIndex: 2,
            visibleRowStopIndex: 11,
            visibleColumnStartIndex: 0,
            visibleColumnStopIndex: 1,
          },
        },
        rerenderGridBodyRef
      );

      // the topmost visible row shifted by 23 pixels, but no anchor has been specified
      rowHeightUtils.compensateForLayoutShift(2, 23, undefined);

      // no scrolling should have taken place
      expect(gridRef.current?.scrollTo).toHaveBeenCalledTimes(0);
    });
  });
});

describe('useRowHeightUtils', () => {
  const mockArgs: Parameters<typeof useRowHeightUtils>[0] = {
    columns: [{ id: 'A' }, { id: 'B' }],
  };
  const mockVirtualizationArgs = {
    ...mockArgs,
    virtualization: {
      gridRef: {
        current: {
          resetAfterIndices: jest.fn(),
          resetAfterColumnIndex: jest.fn(),
          resetAfterRowIndex: jest.fn(),
          scrollTo: jest.fn(),
          scrollToItem: jest.fn(),
        },
      } as MutableRefObject<ImperativeGridApi | null>,
      outerGridElementRef: { current: null },
      gridItemsRenderedRef: { current: null },
    },
  };

  let requestAnimationFrameSpy: jest.SpyInstance;

  beforeEach(() => {
    requestAnimationFrameSpy = jest
      .spyOn(window, 'requestAnimationFrame')
      .mockImplementation((cb: any) => cb());
  });

  afterEach(() => {
    requestAnimationFrameSpy.mockRestore();
  });

  it('instantiates and returns an instance of RowHeightUtils', () => {
    const { result } = renderHook(useRowHeightUtils, {
      initialProps: mockArgs,
    });
    expect(result.current).toBeInstanceOf(RowHeightUtils);
  });

  it('instantiates and returns an instance of RowHeightVirtualizationUtils if a `virtualization` obj is passed', () => {
    const { result } = renderHook(useRowHeightUtils, {
      initialProps: mockVirtualizationArgs,
    });
    expect(result.current).toBeInstanceOf(RowHeightVirtualizationUtils);
  });

  it('forces a rerender every time rowHeightsOptions changes', () => {
    const { rerender } = renderHook(useRowHeightUtils, {
      initialProps: mockArgs,
    });
    expect(requestAnimationFrameSpy).toHaveBeenCalledTimes(1);

    rerender({ ...mockArgs, rowHeightsOptions: { defaultHeight: 300 } });
    expect(requestAnimationFrameSpy).toHaveBeenCalledTimes(2);

    rerender({
      ...mockArgs,
      rowHeightsOptions: { defaultHeight: 300, rowHeights: { 0: 200 } },
    });
    expect(requestAnimationFrameSpy).toHaveBeenCalledTimes(3);
  });

  it('prunes columns from the row heights cache if a column is hidden', () => {
    const { result, rerender } = renderHook(useRowHeightUtils, {
      initialProps: mockArgs,
    });

    act(() => {
      result.current.setRowHeight(0, 'A', 30, 0);
      result.current.setRowHeight(0, 'B', 50, 0);
    });
    // @ts-ignore - intentionally inspecting private var for test
    expect(result.current.heightsCache).toMatchInlineSnapshot(`
      Map {
        0 => Map {
          "A" => 30,
          "B" => 50,
        },
      }
    `);

    rerender({ ...mockArgs, columns: [{ id: 'A' }] }); // Hiding column B

    // @ts-ignore - intentionally inspecting private var for test
    expect(result.current.heightsCache).toMatchInlineSnapshot(`
      Map {
        0 => Map {
          "A" => 30,
        },
      }
    `);
  });
});
