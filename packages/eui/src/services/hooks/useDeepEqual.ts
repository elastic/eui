/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { useState } from 'react';
import isEqual from 'lodash/isEqual';
import { useUpdateEffect } from './useUpdateEffect';

/**
 * This hook is mostly a performance concern for third-party objs/arrays that EUI
 * has no control over and may not be correctly memoized (i.e., will create a new
 * reference on every rerender unless passed through this hook).
 */
export const useDeepEqual = <T = Record<string, any> | any[] | undefined>(
  object: T
): T => {
  const [memoizedObject, setMemoizedObject] = useState(object);

  useUpdateEffect(() => {
    if (!isEqual(object, memoizedObject)) {
      setMemoizedObject(object);
    }
  }, [object]);

  return memoizedObject;
};
