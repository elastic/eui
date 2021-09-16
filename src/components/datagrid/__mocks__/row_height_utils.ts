/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { EuiDataGridRowHeightOption } from '../data_grid_types';

import { RowHeightUtils } from '../row_height_utils';

export const mockRowHeightUtils = ({
  computeStylesForGridCell: jest.fn(),
  clearHeightsCache: jest.fn(),
  setGrid: jest.fn(),
  getStylesForCell: jest.fn(() => ({
    wordWrap: 'break-word',
    wordBreak: 'break-word',
    flexGrow: 1,
  })),
  isDefinedHeight: jest.fn(() => true),
  isAutoHeight: jest.fn(() => false),
  setRowHeight: jest.fn(),
  getRowHeight: jest.fn(() => 32),
  getFont: jest.fn(() => null),
  getComputedCellStyles: jest.fn(() => {}),
  compareHeights: jest.fn(
    (currentRowHeight: number, cachedRowHeight: number) =>
      currentRowHeight === cachedRowHeight
  ),
  getCalculatedHeight: jest.fn(
    (heightOption: EuiDataGridRowHeightOption, defaultHeight: number) => {
      if (typeof heightOption === 'object') {
        if (heightOption.lineCount) {
          return heightOption.lineCount;
        }

        if (heightOption.height) {
          return heightOption.height;
        }
      }

      if (heightOption) {
        return heightOption;
      }

      return defaultHeight;
    }
  ),
} as unknown) as RowHeightUtils;
