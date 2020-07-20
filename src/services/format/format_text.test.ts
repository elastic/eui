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

import { formatText } from './format_text';

describe('formatText', () => {
  test('no config - not nil value', () => {
    expect(formatText('abc')).toBe('abc');
    expect(formatText(1)).toBe('1');
    const now = Date.now();
    expect(formatText(new Date(now))).toBe(new Date(now).toString());
    expect(
      formatText({
        /* simple object */
      })
    ).toBe('[object Object]');
  });

  test('no config - nil value', () => {
    expect(formatText()).toBe('');
    expect(formatText(null)).toBe('');
  });

  test('with config - nil value', () => {
    expect(formatText(undefined, { nil: '-' })).toBe('-');
    expect(formatText(null, { nil: '-' })).toBe('-');
  });
});
