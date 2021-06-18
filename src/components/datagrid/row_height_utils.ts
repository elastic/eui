/*
 * Licensed to Elasticsearch B.V. under one or more contributor
 * license agreements. See the NOTICE file distributed with
 * this work for additional information regarding copyright
 * ownership. Elasticsearch B.V. licenses this file to you under
 * the Apache License, Version 2.0 (the "License"); you may
 * not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

import { CSSProperties } from 'react';
import { isObject } from '../../services/predicate';
import {
  EuiDataGridStyleCellPaddings,
  EuiDataGridStyleFontSizes,
  EuiDataGridStyle,
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

const fakeCell = document.createElement('div');

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

  computeStylesForGridCell(gridStyles: EuiDataGridStyle) {
    fakeCell.className = `
      euiDataGridRowCell 
      ${cellPaddingsToClassMap[gridStyles.cellPadding!]} 
      ${fontSizesToClassMap[gridStyles.fontSize!]}
    `;
    document.body.appendChild(fakeCell);
    const allStyles = getComputedStyle(fakeCell);
    this.styles = {
      paddingTop: allStyles.paddingTop,
      paddingBottom: allStyles.paddingBottom,
      lineHeight: allStyles.lineHeight,
    };
    document.body.removeChild(fakeCell);
  }

  calculateHeightForLineCount(lineCount: number) {
    const paddingTop = getNumberFromPx(this.styles.paddingTop);
    const paddingBottom = getNumberFromPx(this.styles.paddingBottom);
    const lineHeight = getNumberFromPx(this.styles.lineHeight);
    return Math.ceil(lineCount * lineHeight + paddingTop + paddingBottom);
  }
}

export const getStylesForCell = (
  rowHeightsOptions: EuiDataGridRowHeightsOptions,
  rowIndex: number
): CSSProperties => {
  const initialHeight = rowHeightsOptions.rowHeights
    ? rowHeightsOptions.rowHeights[rowIndex]
    : undefined;

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
