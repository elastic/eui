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

import makeId from './make_id';

describe('makeId', () => {
  const _consoleLog = console.log;
  beforeAll(() => {
    const _consoleLog = console.log;
    console.log = (...args: [any?, ...any[]]) => {
      // swallow the deprecation warning
      if (
        args[0] ===
        'WARNING: makeId is deprecated. Use htmlIdGenerator from @elastic/eui instead.'
      )
        return;
      _consoleLog.apply(console, args);
    };
  });

  afterAll(() => {
    console.log = _consoleLog;
  });

  let ids: Map<string, boolean>;
  beforeEach(() => {
    ids = new Map<string, boolean>();
  });

  test('returns a string of length 8', () => {
    expect(makeId()).toHaveLength(8);
  });

  // Could be slow so adding a [SLOW] tag for use with --testNamePattern=<regex>
  test('returns a random string - [SLOW]', () => {
    for (let i = 0; i < 60000; i += 1) {
      const id: string = makeId();
      expect(ids.has(id)).toBeFalsy();
      ids.set(id, true);
    }
  });
});
