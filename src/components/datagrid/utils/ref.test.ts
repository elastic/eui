/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { testCustomHook } from '../../../test/test_custom_hook.test_helper';
import { useCellLocationCheck } from './ref';

// TODO: see ref.spec.tsx for E2E useImperativeGridRef tests

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
