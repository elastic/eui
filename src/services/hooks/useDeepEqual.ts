/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { useRef } from 'react';
import isEqual from 'lodash/isEqual';

/**
 * This hook is mostly a performance concern for third-party objects that EUI
 * has no control over and may not be correctly memoized (i.e., will create a new
 * reference on every rerender unless passed through this hook).
 */
export const useDeepEqual = <T = Record<string, any>>(object: T): T => {
  const ref = useRef(object);

  if (!isEqual(object, ref.current)) {
    ref.current = object;
  }

  return ref.current;
};
