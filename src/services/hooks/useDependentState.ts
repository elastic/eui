/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import { useEffect, useState, useRef } from 'react';

export function useDependentState<T>(
  valueFn: (previousState: undefined | T) => T,
  deps: unknown[]
) {
  const [state, setState] = useState<T>(valueFn as () => T);

  // use ref instead of a state to avoid causing an unnecessary re-render
  const hasMounted = useRef<boolean>(false);

  useEffect(() => {
    // don't call setState on initial mount
    if (hasMounted.current === true) {
      setState(valueFn);
    } else {
      hasMounted.current = true;
    }

    // purposefully omitting `updateCount.current` and `valueFn`
    // this means updating only the valueFn has no effect, but allows for more natural feeling hook use
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return [state, setState] as const;
}
