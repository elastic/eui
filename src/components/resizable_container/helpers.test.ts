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

import { pxToPercent, sizesOnly, getPanelMinSize } from './helpers';

import { EuiResizableContainerRegistry } from './types';

describe('pxToPercent', () => {
  it('should convert px to percent of whole', () => {
    expect(pxToPercent(10, 100)).toEqual(10);
    expect(pxToPercent(0, 1000)).toEqual(0);
    expect(pxToPercent(135.5, 1000)).toEqual(13.55);
    expect(pxToPercent(101, 100)).toEqual(101);
    expect(pxToPercent(10, 0)).toEqual(0);
    expect(pxToPercent(10, -1)).toEqual(0);
    expect(pxToPercent(-1, 100)).toEqual(0);
  });
});

describe('sizesOnly', () => {
  it('reduce to sizes values only', () => {
    const panels = [
      { id: '1', size: 10 },
      { id: '2', size: 20 },
      { id: '3', size: 30 },
      { id: '4', size: 0 },
    ].reduce((out: EuiResizableContainerRegistry['panels'], panel) => {
      out[panel.id] = {
        getSizePx: () => 10,
        minSize: ['0px', '0px'],
        isCollapsed: false,
        prevSize: 0,
        position: 'middle',
        ...panel,
      };
      return out;
    }, {});
    expect(sizesOnly(panels)).toEqual({ '1': 10, '2': 20, '3': 30, '4': 0 });
  });
});

describe('getPanelMinSize', () => {
  it('should return the larger of the two, as a percentage of the whole', () => {
    expect(getPanelMinSize(['10px', '10%'], 100)).toEqual(10);
    expect(getPanelMinSize(['10px', '20%'], 100)).toEqual(20);
    expect(getPanelMinSize(['30px', '29%'], 100)).toEqual(30);
    expect(getPanelMinSize(['99px', '95%'], 100)).toEqual(99);
    expect(getPanelMinSize(['50px', '50%'], 150)).toEqual(50);
  });
});
