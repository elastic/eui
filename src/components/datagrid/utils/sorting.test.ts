/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { renderHook } from '@testing-library/react';
import { useSorting, type useSortingArgs } from './sorting';

function getDefaultArgs(): useSortingArgs {
  return {
    sorting: {
      columns: [{ id: '1', direction: 'asc' }],
      onSort: jest.fn(),
    },
    schema: { '1': { columnType: 'number' } },
    schemaDetectors: [],
    startRow: 0,
    inMemoryValues: { '0': { '1': '0' }, '1': { '1': '1' } },
    inMemory: { level: 'sorting' },
  };
}

function testUseSorting(args: useSortingArgs) {
  return renderHook(() => useSorting(args)).result.current;
}

describe('useSorting', () => {
  it('returns null if no sorting object is provided', () => {
    expect(
      testUseSorting({ ...getDefaultArgs(), schema: {}, inMemoryValues: {} })
        .sortedRowMap
    ).toEqual([]);
  });

  it('should pass all arguments to custom comparator fn', () => {
    const customComparator = jest.fn();
    testUseSorting({
      ...getDefaultArgs(),
      schemaDetectors: [
        {
          type: 'number',
          detector: () => 1,
          comparator: customComparator,
          icon: 'empty',
          sortTextAsc: 'ASC',
          sortTextDesc: 'DESC',
        },
      ],
    });

    expect(customComparator).toHaveBeenCalledWith('1', '0', 'asc', {
      aIndex: 1,
      bIndex: 0,
    });
  });
});
