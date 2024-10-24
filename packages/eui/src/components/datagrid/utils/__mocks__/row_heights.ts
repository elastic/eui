/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import {
  RowHeightUtilsType,
  RowHeightUtils as ActualRowHeightUtils,
  RowHeightVirtualizationUtils as ActualRowHeightVirtualizationUtils,
} from '../row_heights';

// Note: for test expedience purposes, this mock always returns the
// full virtualization height utils w/ all APIs
type RowHeightUtilsPublicAPI = Pick<
  ActualRowHeightVirtualizationUtils,
  keyof ActualRowHeightVirtualizationUtils
>;

export const RowHeightUtils = jest.fn().mockImplementation(() => {
  const rowHeightUtils = new ActualRowHeightUtils();

  const rowHeightUtilsMock: RowHeightUtilsPublicAPI = {
    getHeightType: jest.fn(rowHeightUtils.getHeightType),
    isAutoBelowLineCount: jest.fn(() => false),
    isAutoHeight: jest.fn(() => false),
    setRowHeight: jest.fn(),
    pruneHiddenColumnHeights: jest.fn(),
    getRowHeight: jest.fn(() => 32),
    getRowHeightOption: jest.fn(rowHeightUtils.getRowHeightOption),
    getCalculatedHeight: jest.fn(rowHeightUtils.getCalculatedHeight),
    getLineCount: jest.fn(rowHeightUtils.getLineCount),
    calculateHeightForLineCount: jest.fn(() => 50),
    isRowHeightOverride: jest.fn(rowHeightUtils.isRowHeightOverride),
    resetRow: jest.fn(),
    resetGrid: jest.fn(),
    compensateForLayoutShift: jest.fn(),
  };

  return rowHeightUtilsMock as unknown as RowHeightUtilsType;
});
