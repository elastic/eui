/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { useEffect, useRef } from 'react';

export const useUpdateEffect = (effect: Function, deps: unknown[]) => {
  // use ref instead of a state to avoid causing an unnecessary re-render
  const hasMounted = useRef<boolean>(false);

  useEffect(() => {
    // don't invoke the effect on initial mount
    if (hasMounted.current === true) {
      return effect();
    } else {
      hasMounted.current = true;
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
};
