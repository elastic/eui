/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { testCustomHook } from '../../../test/test_custom_hook.test_helper';
import { useCellLocationCheck, useVisibleRowIndex } from './ref';

// see ref.spec.tsx for E2E useImperativeGridRef tests

describe('useCellLocationCheck', () => {
  const {
    return: { checkCellExists },
  } = testCustomHook(() => useCellLocationCheck(10, 5));

  it("throws an error if the passed rowIndex is higher than the grid's rowCount", () => {
    expect(() => {
      checkCellExists({ rowIndex: 12, colIndex: 0 });
    }).toThrow(
      'Row 12 is not a valid row. The maximum visible row index is 9.'
    );
  });

  it("throws an error if the passed colIndex is higher than the grid's visibleColCount", () => {
    expect(() => {
      checkCellExists({ rowIndex: 1, colIndex: 5 });
    }).toThrow(
      'Column 5 is not a valid column. The maximum visible column index is 4.'
    );
  });

  it('does not throw if the rowIndex and colIndex are within grid bounds', () => {
    expect(() => {
      checkCellExists({ rowIndex: 0, colIndex: 0 });
    }).not.toThrow();
  });
});

describe('useVisibleRowIndex', () => {
  describe('if the grid is not sorted or paginated', () => {
    const pagination = undefined;
    const sortedRowMap: number[] = [];

    it('returns the passed rowIndex as-is', () => {
      const {
        return: { getVisibleRowIndex },
      } = testCustomHook(() => useVisibleRowIndex(pagination, sortedRowMap));

      expect(getVisibleRowIndex(5)).toEqual(5);
    });
  });

  describe('if the grid is sorted', () => {
    const pagination = undefined;
    const sortedRowMap = [3, 4, 1, 2, 0];

    it('returns the visibleRowIndex of the passed rowIndex (which is the index of the sortedRowMap)', () => {
      const {
        return: { getVisibleRowIndex },
      } = testCustomHook(() => useVisibleRowIndex(pagination, sortedRowMap));

      expect(getVisibleRowIndex(0)).toEqual(4);
      expect(getVisibleRowIndex(1)).toEqual(2);
      expect(getVisibleRowIndex(2)).toEqual(3);
      expect(getVisibleRowIndex(3)).toEqual(0);
      expect(getVisibleRowIndex(4)).toEqual(1);
    });
  });

  describe('if the grid is paginated', () => {
    const pagination = {
      pageSize: 20,
      pageIndex: 0,
      onChangePage: jest.fn(),
      onChangeItemsPerPage: jest.fn(),
    };
    const sortedRowMap: number[] = [];

    beforeEach(() => jest.clearAllMocks());

    it('calculates what page the row should be on, paginates to that page, and returns the index of the row on that page', () => {
      const {
        return: { getVisibleRowIndex },
      } = testCustomHook(() => useVisibleRowIndex(pagination, sortedRowMap));

      expect(getVisibleRowIndex(20)).toEqual(0); // First item on 2nd page
      expect(pagination.onChangePage).toHaveBeenLastCalledWith(1);

      expect(getVisibleRowIndex(75)).toEqual(15); // 16th item on 4th page
      expect(pagination.onChangePage).toHaveBeenLastCalledWith(3);
    });

    it('does not paginate if the user is already on the correct page', () => {
      const {
        return: { getVisibleRowIndex },
      } = testCustomHook(() => useVisibleRowIndex(pagination, sortedRowMap));

      expect(getVisibleRowIndex(5)).toEqual(5);
      expect(pagination.onChangePage).not.toHaveBeenCalled();
    });
  });
});
