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

import { times } from './utils';
import { isArray } from './predicate';

describe('times', () => {
  it('should invoke iteratee n times', () => {
    let count = 0;
    times(3, () => {
      count++;
    });

    expect(count).toEqual(3);
  });

  it('should return an array of results', () => {
    const results = times(3, (index) => ({
      index,
      foo: 'bar',
    }));
    const expected = [
      { index: 0, foo: 'bar' },
      { index: 1, foo: 'bar' },
    ];

    expect(isArray).toBeTruthy();
    expect(results.length).toEqual(3);
    expect(results[0]).toEqual(expected[0]);
    expect(results[1]).toEqual(expected[1]);
  });

  it('should return an array of indexes', () => {
    const results = times(3);

    expect(results).toEqual([0, 1, 2]);
  });
});
