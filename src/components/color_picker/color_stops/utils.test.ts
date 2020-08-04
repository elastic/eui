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

import { addStop, addDefinedStop, removeStop, isInvalid } from './utils';

const colorStops = [
  { stop: 0, color: '#FF0000' },
  { stop: 25, color: '#00FF00' },
  { stop: 35, color: '#0000FF' },
];

describe('isInvalid', () => {
  test('Should not mark valid colorStops as invalid', () => {
    expect(isInvalid(colorStops)).toBe(false);
  });

  test('Should mark colorStops missing color as invalid', () => {
    const colorStops = [{ stop: 0, color: '' }];
    expect(isInvalid(colorStops)).toBe(true);
  });

  test('Should mark colorStops with invalid color as invalid', () => {
    const colorStops = [{ stop: 0, color: 'not color' }];
    expect(isInvalid(colorStops)).toBe(true);
  });

  test('Should mark colorStops missing stop as invalid', () => {
    const colorStops = [{ stop: null, color: '#FF0000' }];
    // @ts-ignore Intentionally wrong
    expect(isInvalid(colorStops)).toBe(true);
  });

  test('Should mark colorStops with invalid stop as invalid', () => {
    const colorStops = [{ stop: 'I am not a number', color: '#FF0000' }];
    // @ts-ignore Intentionally wrong
    expect(isInvalid(colorStops)).toBe(true);
  });
});

describe('addStop', () => {
  test('Should add stop when there is only a single stop', () => {
    const colorStops = [{ stop: 0, color: '#FF0000' }];
    expect(addStop(colorStops, '#FF0000', 100)).toEqual([
      { stop: 0, color: '#FF0000' },
      { stop: 1, color: '#FF0000' },
    ]);
  });

  test('Should add stop to end of list', () => {
    expect(addStop(colorStops, '#FF0000', 100)).toEqual([
      { stop: 0, color: '#FF0000' },
      { stop: 25, color: '#00FF00' },
      { stop: 35, color: '#0000FF' },
      { stop: 45, color: '#FF0000' },
    ]);
  });

  test('Should add stop below the max if max is taken', () => {
    expect(
      addStop(
        [
          { stop: 0, color: '#FF0000' },
          { stop: 100, color: '#FF0000' },
        ],
        '#FF0000',
        100
      )
    ).toEqual([
      { stop: 0, color: '#FF0000' },
      { stop: 100, color: '#FF0000' },
      { stop: 99, color: '#FF0000' },
    ]);
  });
});

describe('addDefinedStop', () => {
  const colorStops = [{ stop: 0, color: '#FF0000' }];
  test('Should add stop', () => {
    expect(addDefinedStop(colorStops, 1)).toEqual([
      { stop: 0, color: '#FF0000' },
      { stop: 1, color: '#6092C0' },
    ]);
  });

  test('Should add stop with a specified color', () => {
    expect(addDefinedStop(colorStops, 1, '#FFFFFF')).toEqual([
      { stop: 0, color: '#FF0000' },
      { stop: 1, color: '#FFFFFF' },
    ]);
  });
});

describe('removeStop', () => {
  test('Should not remove only stop', () => {
    const colorStops = [{ stop: 0, color: '#FF0000' }];
    expect(removeStop(colorStops, 0)).toEqual(colorStops);
  });

  test('Should remove stop at index', () => {
    const colorStops = [
      { stop: 0, color: '#FF0000' },
      { stop: 25, color: '#00FF00' },
      { stop: 35, color: '#0000FF' },
    ];
    expect(removeStop(colorStops, 1)).toEqual([
      { stop: 0, color: '#FF0000' },
      { stop: 35, color: '#0000FF' },
    ]);
  });
});
