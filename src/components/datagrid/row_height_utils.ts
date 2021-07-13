/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { CSSProperties } from 'react';
import { isObject, isNumber } from '../../services/predicate';
import {
  EuiDataGridStyleCellPaddings,
  EuiDataGridStyleFontSizes,
  EuiDataGridStyle,
  EuiDataGridRowHeightOption,
  EuiDataGridRowHeightsOptions,
} from './data_grid_types';

const cellPaddingsToClassMap: Record<EuiDataGridStyleCellPaddings, string> = {
  s: 'euiDataGridRowCell--paddingSmall',
  m: '',
  l: 'euiDataGridRowCell--paddingLarge',
};

const fontSizesToClassMap: Record<EuiDataGridStyleFontSizes, string> = {
  s: 'euiDataGridRowCell--fontSizeSmall',
  m: '',
  l: 'euiDataGridRowCell--fontSizeLarge',
};

function getNumberFromPx(style?: string) {
  return style ? parseInt(style.replace('px', ''), 10) : 0;
}

// So that we use lineCount options we should know exactly row height which allow to show defined line count.
// For this we should know paddings and line height. Because of this we should compute styles for cell with grid styles
export class RowHeightUtils {
  private styles: {
    paddingTop?: string;
    paddingBottom?: string;
    lineHeight?: string;
  } = {};
  private fakeCell = document.createElement('div');

  computeStylesForGridCell(gridStyles: EuiDataGridStyle) {
    this.fakeCell.className = `
      euiDataGridRowCell
      ${cellPaddingsToClassMap[gridStyles.cellPadding!]}
      ${fontSizesToClassMap[gridStyles.fontSize!]}
    `;
    document.body.appendChild(this.fakeCell);
    const allStyles = getComputedStyle(this.fakeCell);
    this.styles = {
      paddingTop: allStyles.paddingTop,
      paddingBottom: allStyles.paddingBottom,
      lineHeight: allStyles.lineHeight,
    };
    document.body.removeChild(this.fakeCell);
  }

  calculateHeightForLineCount(lineCount: number) {
    const paddingTop = getNumberFromPx(this.styles.paddingTop);
    const paddingBottom = getNumberFromPx(this.styles.paddingBottom);
    const lineHeight = getNumberFromPx(this.styles.lineHeight);
    return Math.ceil(lineCount * lineHeight + paddingTop + paddingBottom);
  }

  getCalculatedHeight(
    heightOption: EuiDataGridRowHeightOption,
    defaultHeight: number
  ) {
    if (isObject(heightOption)) {
      if (heightOption.lineCount) {
        return this.calculateHeightForLineCount(heightOption.lineCount);
      }

      if (heightOption.height) {
        return Math.max(heightOption.height, defaultHeight);
      }
    }

    if (heightOption && isNumber(heightOption)) {
      return Math.max(heightOption, defaultHeight);
    }

    return defaultHeight;
  }
}

export const getStylesForCell = (
  rowHeightsOptions: EuiDataGridRowHeightsOptions,
  rowIndex: number
): CSSProperties => {
  let initialHeight =
    rowHeightsOptions.rowHeights && rowHeightsOptions.rowHeights[rowIndex];

  if (!initialHeight) {
    initialHeight = rowHeightsOptions.defaultHeight;
  }

  if (isObject(initialHeight) && initialHeight.lineCount) {
    return {
      WebkitLineClamp: initialHeight.lineCount,
      display: '-webkit-box',
      WebkitBoxOrient: 'vertical',
      height: '100%',
      overflow: 'hidden',
      flexGrow: 1,
      wordBreak: 'break-all',
    };
  }

  return {
    height: '100%',
    overflow: 'hidden',
    flexGrow: 1,
    wordBreak: 'break-all',
  };
};
