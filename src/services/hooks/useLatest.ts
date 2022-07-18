/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { MutableRefObject, useRef } from 'react';

/**
 * Wraps the given `value` into a `MutableRefObject` and keeps the `current`
 * value up-to-date on every render cycle.
 */
export function useLatest<Value>(value: Value): MutableRefObject<Value | null> {
  const latestValueRef = useRef(value);
  latestValueRef.current = value;
  return latestValueRef;
}
