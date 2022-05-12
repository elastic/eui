/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { useState } from 'react';
import { useUpdateEffect } from './useUpdateEffect';

export function useDependentState<T>(
  valueFn: (previousState: undefined | T) => T,
  deps: unknown[]
) {
  const [state, setState] = useState<T>(valueFn as () => T);

  // don't call setState on initial mount
  useUpdateEffect(() => {
    setState(valueFn);
  }, deps);

  return [state, setState] as const;
}
