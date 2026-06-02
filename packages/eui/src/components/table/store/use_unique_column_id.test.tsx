/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { v4 as uuidv4 } from 'uuid';

jest.mock('uuid', () => ({
  v4: jest.fn(() => {
    return jest.requireActual('uuid').v4();
  }),
}));

import { testOnReactVersion } from '../../../test/internal';
import { renderHook } from '../../../test/rtl';
import { useEuiTableStoreUniqueColumnId } from './use_unique_column_id';

describe('useEuiTableStoreUniqueColumnId()', () => {
  testOnReactVersion(['18'])('returns a unique id', () => {
    const { result } = renderHook(useEuiTableStoreUniqueColumnId);
    expect(result.current).toEqual(':r0:');
  });

  testOnReactVersion(['17'])('returns a unique id', () => {
    (uuidv4 as jest.MockedFunction<() => string>).mockReturnValue('uuid.v4()');

    const { result } = renderHook(useEuiTableStoreUniqueColumnId);
    expect(result.current).toEqual('uuid.v4()');
  });
});
