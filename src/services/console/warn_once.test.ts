/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { warnOnce } from './warn_once';

describe('warnOnce', () => {
  let warn: jest.SpyInstance;
  beforeAll(() => {
    warn = jest.spyOn(console, 'warn').mockImplementation(() => {});
  });
  it('should warn only once per id', () => {
    warnOnce('1', 'message');
    warnOnce('1', 'message');
    expect(warn).toBeCalledTimes(1);
    warnOnce('2', 'message');
    expect(warn).toBeCalledTimes(2);
    warnOnce('2', 'message');
    expect(warn).toBeCalledTimes(2);
    warnOnce('1', 'message');
    expect(warn).toBeCalledTimes(2);
  });
  afterAll(() => warn.mockRestore());
});
