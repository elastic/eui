/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { act } from 'react-dom/test-utils';
import { testCustomHook } from '../../../test/test_custom_hook.test_helper';
import { startingStyles } from '../controls';

import {
  RowHeightUtils,
  cellPaddingsMap,
  useRowHeightUtils,
} from './row_heights';

describe('RowHeightUtils', () => {
  const rowHeightUtils = new RowHeightUtils();

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
              true
            )
          ).toEqual(rowHeightOverride);
        });
      });
    });

    describe('auto height', () => {
      const getRowHeightSpy = jest.spyOn(rowHeightUtils, 'getRowHeight');
      beforeEach(() => getRowHeightSpy.mockClear());

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

  describe('styles utils', () => {
    describe('cacheStyles', () => {
      it('stores a styles instance variable based on the grid density', () => {
        Object.entries(cellPaddingsMap).forEach(([densitySize, padding]) => {
          rowHeightUtils.cacheStyles({ cellPadding: densitySize as any });

          // @ts-ignore this var is private, but we're inspecting it for the sake of the unit test
          expect(rowHeightUtils.styles).toEqual({
            paddingTop: padding,
            paddingBottom: padding,
          });
        });
      });

      it('falls back to m-sized cellPadding if gridStyle.cellPadding is undefined', () => {
        rowHeightUtils.cacheStyles({ cellPadding: undefined });

        // @ts-ignore this var is private, but we're inspecting it for the sake of the unit test
        expect(rowHeightUtils.styles).toEqual({
          paddingTop: 6,
          paddingBottom: 6,
        });
      });
    });

    describe('getStylesForCell (returns inline CSS styles based on height config)', () => {
      describe('auto height', () => {
        it('returns empty styles object', () => {
          expect(
            rowHeightUtils.getStylesForCell({ defaultHeight: 'auto' }, 0)
          ).toEqual({});
        });
      });

      describe('lineCount height', () => {
        it('returns line-clamp CSS', () => {
          expect(
            rowHeightUtils.getStylesForCell(
              { defaultHeight: { lineCount: 5 } },
              0
            )
          ).toEqual(expect.objectContaining({ WebkitLineClamp: 5 }));
        });
      });

      describe('numeric heights', () => {
        it('returns default CSS', () => {
          expect(
            rowHeightUtils.getStylesForCell({ defaultHeight: 34 }, 0)
          ).toEqual({ height: '100%', overflow: 'hidden' });
        });
      });
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
      beforeEach(() => {
        rowHeightUtils.cacheStyles({ cellPadding: 'm' });
        jest
          .spyOn(window, 'getComputedStyle')
          .mockReturnValue({ lineHeight: '24px' } as CSSStyleDeclaration);
      });
      const cell = document.createElement('div');

      it('calculates the row height based on the number of lines and cell line height/padding', () => {
        expect(rowHeightUtils.calculateHeightForLineCount(cell, 1)).toEqual(36); // 1 * 24 + 6 + 6
        expect(rowHeightUtils.calculateHeightForLineCount(cell, 3)).toEqual(84); // 3 * 24 + 6 + 6
        expect(rowHeightUtils.calculateHeightForLineCount(cell, 5)).toEqual(
          132
        ); // 5 * 24 + 6 + 6
      });

      it('excludes padding calculations when the excludePadding flag is true', () => {
        // This is primarily used for rowHeight lineCount overrides that use the height cache,
        // which already has padding calculations built in
        expect(
          rowHeightUtils.calculateHeightForLineCount(cell, 1, true)
        ).toEqual(24); // 1 * 24
        expect(
          rowHeightUtils.calculateHeightForLineCount(cell, 3, true)
        ).toEqual(72); // 3 * 24
        expect(
          rowHeightUtils.calculateHeightForLineCount(cell, 5, true)
        ).toEqual(120); // 5 * 24
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

    describe('row height cache', () => {
      describe('setRowHeight', () => {
        const resetRowSpy = jest.spyOn(rowHeightUtils, 'resetRow');
        beforeEach(() => resetRowSpy.mockClear());

        it('setRowHeight', () => {
          rowHeightUtils.setRowHeight(5, 'a', 50, 0);
          rowHeightUtils.setRowHeight(5, 'b', 34, 0);
          rowHeightUtils.setRowHeight(5, 'c', 100, 0);
          rowHeightUtils.setRowHeight(5, 'd', undefined, 0);

          // @ts-ignore this var is private, but we're inspecting it for the sake of the unit test
          expect(rowHeightUtils.heightsCache.get(5)?.get('a')).toEqual(62); // @ts-ignore-line
          expect(rowHeightUtils.heightsCache.get(5)?.get('b')).toEqual(46); // @ts-ignore-line
          expect(rowHeightUtils.heightsCache.get(5)?.get('c')).toEqual(112); // @ts-ignore-line
          expect(rowHeightUtils.heightsCache.get(5)?.get('d')).toEqual(46); // Falls back default row height
          // NB: The cached heights have padding added to them

          expect(resetRowSpy).toHaveBeenCalledTimes(4);
        });

        it('does not continue if the passed height is the same as the cached height', () => {
          rowHeightUtils.setRowHeight(5, 'a', 50, 0);

          expect(resetRowSpy).not.toHaveBeenCalled();
        });

        it('calls rerenderGridBody', () => {
          const rerenderGridBody = jest.fn();
          rowHeightUtils.setRerenderGridBody(rerenderGridBody);
          expect(rerenderGridBody).toHaveBeenCalledTimes(0);
          rowHeightUtils.setRowHeight(1, 'a', 34, 1);
          expect(rerenderGridBody).toHaveBeenCalledTimes(1);
        });
      });

      describe('getRowHeight', () => {
        it('returns the highest height value stored for the specificed row', () => {
          expect(rowHeightUtils.getRowHeight(5)).toEqual(112); // 100 + cell padding
        });

        it('returns 0 if the passed row does not have any existing heights', () => {
          expect(rowHeightUtils.getRowHeight(99)).toEqual(0);
        });
      });

      describe('pruneHiddenColumnHeights', () => {
        const resetRowSpy = jest.spyOn(rowHeightUtils, 'resetRow');
        beforeEach(() => resetRowSpy.mockClear());

        it('checks each row height map and deletes column IDs that are no longer visible', () => {
          rowHeightUtils.pruneHiddenColumnHeights([{ id: 'a' }, { id: 'b' }]);
          expect(rowHeightUtils.getRowHeight(5)).toEqual(62);
          expect(resetRowSpy).toHaveBeenCalled();
        });

        it('does nothing if all cached columns IDs are currently visible', () => {
          rowHeightUtils.pruneHiddenColumnHeights([{ id: 'a' }, { id: 'b' }]);
          expect(resetRowSpy).not.toHaveBeenCalled();
        });

        test('extra getRowHeight branch coverage', () => {
          rowHeightUtils.pruneHiddenColumnHeights([]);
          expect(rowHeightUtils.getRowHeight(5)).toEqual(0);
        });
      });
    });

    describe('grid resetting', () => {
      const mockGrid = { resetAfterRowIndex: jest.fn() } as any;
      beforeEach(() => jest.clearAllMocks());

      describe('setGrid', () => {
        it('stores the react-window grid as an instance variable', () => {
          rowHeightUtils.setGrid(mockGrid);

          // @ts-ignore this var is private, but we're inspecting it for the sake of the unit test
          expect(rowHeightUtils.grid).toEqual(mockGrid);
        });
      });

      describe('resetRow', () => {
        const resetGridSpy = jest.spyOn(rowHeightUtils, 'resetGrid');
        jest.useFakeTimers();

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
          rowHeightUtils.resetGrid();
          expect(mockGrid.resetAfterRowIndex).toHaveBeenCalledWith(99);
        });

        it('invokes resetAfterRowIndex only once with the smallest cached row index', () => {
          rowHeightUtils.setRowHeight(97, 'a', 34, 97);
          rowHeightUtils.setRowHeight(99, 'a', 34, 99);
          rowHeightUtils.resetGrid();
          expect(mockGrid.resetAfterRowIndex).toHaveBeenCalledTimes(1);
          expect(mockGrid.resetAfterRowIndex).toHaveBeenCalledWith(97);
        });
      });
    });
  });
});

describe('useRowHeightUtils', () => {
  const mockArgs = {
    gridRef: null,
    gridStyles: startingStyles,
    columns: [{ id: 'A' }, { id: 'B' }],
    rowHeightOptions: undefined,
  };

  it('instantiates and returns an instance of RowHeightUtils', () => {
    const { return: rowHeightUtils } = testCustomHook(() =>
      useRowHeightUtils(mockArgs)
    );
    expect(rowHeightUtils).toBeInstanceOf(RowHeightUtils);
  });

  it('populates internal RowHeightUtils vars from outside dependencies', () => {
    const args = { ...mockArgs, gridRef: {} as any };
    const { return: rowHeightUtils } = testCustomHook(() =>
      useRowHeightUtils(args)
    );
    // @ts-ignore - intentionally inspecting private var for test
    expect(rowHeightUtils.grid).toEqual(args.gridRef);
    // @ts-ignore - intentionally inspecting private var for test
    expect(rowHeightUtils.rerenderGridBody).toBeInstanceOf(Function);
  });

  it('forces a rerender every time rowHeightsOptions changes', () => {
    const requestAnimationFrameSpy = jest
      .spyOn(window, 'requestAnimationFrame')
      .mockImplementation((cb: any) => cb());

    const { updateHookArgs } = testCustomHook(useRowHeightUtils, mockArgs);
    expect(requestAnimationFrameSpy).toHaveBeenCalledTimes(1);

    updateHookArgs({ rowHeightsOptions: { defaultHeight: 300 } });
    expect(requestAnimationFrameSpy).toHaveBeenCalledTimes(2);

    updateHookArgs({
      rowHeightsOptions: { defaultHeight: 300, rowHeights: { 0: 200 } },
    });
    expect(requestAnimationFrameSpy).toHaveBeenCalledTimes(3);
  });

  it('updates internal cached styles whenever gridStyle.cellPadding changes', () => {
    const { return: rowHeightUtils, updateHookArgs } = testCustomHook(
      useRowHeightUtils,
      mockArgs
    );

    updateHookArgs({ gridStyles: { ...startingStyles, cellPadding: 's' } });
    // @ts-ignore - intentionally inspecting private var for test
    expect(rowHeightUtils.styles).toEqual({
      paddingTop: 4,
      paddingBottom: 4,
    });
  });

  it('prunes columns from the row heights cache if a column is hidden', () => {
    const { return: rowHeightUtils, updateHookArgs } = testCustomHook<
      RowHeightUtils
    >(useRowHeightUtils, mockArgs);

    act(() => {
      rowHeightUtils.setRowHeight(0, 'A', 30, 0);
      rowHeightUtils.setRowHeight(0, 'B', 50, 0);
    });
    // @ts-ignore - intentionally inspecting private var for test
    expect(rowHeightUtils.heightsCache).toMatchInlineSnapshot(`
      Map {
        0 => Map {
          "A" => 42,
          "B" => 62,
        },
      }
    `);

    updateHookArgs({ columns: [{ id: 'A' }] }); // Hiding column B

    // @ts-ignore - intentionally inspecting private var for test
    expect(rowHeightUtils.heightsCache).toMatchInlineSnapshot(`
      Map {
        0 => Map {
          "A" => 42,
        },
      }
    `);
  });
});
