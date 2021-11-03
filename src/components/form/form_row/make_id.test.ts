/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
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
