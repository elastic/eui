/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { RowHeightUtils as ActualRowHeightUtils } from '../row_height_utils';

const actual = new ActualRowHeightUtils();

export const mockRowHeightUtils = ({
  cacheStyles: jest.fn(),
  setGrid: jest.fn(),
  getStylesForCell: jest.fn(() => ({
    wordWrap: 'break-word',
    wordBreak: 'break-word',
    flexGrow: 1,
  })),
  isAutoHeight: jest.fn(() => false),
  setRowHeight: jest.fn(),
  pruneHiddenColumnHeights: jest.fn(),
  getRowHeight: jest.fn(() => 32),
  getRowHeightOption: jest.fn(actual.getRowHeightOption),
  getCalculatedHeight: jest.fn(actual.getCalculatedHeight),
  getLineCount: jest.fn(actual.getLineCount),
  calculateHeightForLineCount: jest.fn(() => 50),
} as unknown) as ActualRowHeightUtils;

export const RowHeightUtils = jest.fn(() => mockRowHeightUtils);
