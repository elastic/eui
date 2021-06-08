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

import {
  EuiDataGridStyleCellPaddings,
  EuiDataGridStyleFontSizes,
  EuiDataGridStyle,
} from './data_grid_types';

const cellPaddingsToClassMap: {
  [cellPaddings in EuiDataGridStyleCellPaddings]: string;
} = {
  s: 'euiDataGridRowCell--paddingSmall',
  m: '',
  l: 'euiDataGridRowCell--paddingLarge',
};

const fontSizesToClassMap: { [size in EuiDataGridStyleFontSizes]: string } = {
  s: 'euiDataGridRowCell--fontSizeSmall',
  m: '',
  l: 'euiDataGridRowCell--fontSizeLarge',
};

const fakeCell = document.createElement('div');
let styles: CSSStyleDeclaration;

// So that we use webkit-line-clamp property we should know exactly how many line can be fitted in row height.
// For this we should know paddings and line height. Because of this we should compute styles for cell with grid styles

export const computedStylesForGridCell = (gridStyles: EuiDataGridStyle) => {
  fakeCell.className = `
    euiDataGridRowCell 
    ${cellPaddingsToClassMap[gridStyles.cellPadding!]} 
    ${fontSizesToClassMap[gridStyles.fontSize!]}
  `;
  document.body.appendChild(fakeCell);
  styles = { ...getComputedStyle(fakeCell) };
  document.body.removeChild(fakeCell);
};

function getNumberFromPx(style: string) {
  return parseInt(style.replace('px', ''), 10);
}

export const calculateMaxLines = (height: number) => {
  const paddingTop = getNumberFromPx(styles.paddingTop);
  const paddingBottom = getNumberFromPx(styles.paddingBottom);
  const lineHeight = getNumberFromPx(styles.lineHeight);
  return Math.floor((height - paddingTop - paddingBottom) / lineHeight);
};
