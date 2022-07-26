/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { RowHeightUtils as ActualRowHeightUtils } from '../row_heights';

type RowHeightUtilsPublicAPI = Pick<
  ActualRowHeightUtils,
  keyof ActualRowHeightUtils
>;

export const RowHeightUtils = jest
  .fn<
    ActualRowHeightUtils,
    ConstructorParameters<typeof ActualRowHeightUtils>
  >()
  .mockImplementation((...args) => {
    const rowHeightUtils = new ActualRowHeightUtils(...args);

    const rowHeightUtilsMock: RowHeightUtilsPublicAPI = {
      cacheStyles: jest.fn(),
      getStylesForCell: jest.fn(() => ({
        wordWrap: 'break-word',
        wordBreak: 'break-word',
        flexGrow: 1,
      })),
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
    };

    return (rowHeightUtilsMock as any) as ActualRowHeightUtils;
  });
