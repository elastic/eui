/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import type {
  renderHook as renderHookType,
  act as actType,
} from '@testing-library/react-hooks';

let renderHook: typeof renderHookType = () => {
  throw new Error('renderHook not implemented');
};

let renderHookAct: typeof actType = async () => {
  throw new Error('renderHookAct not implemented');
};

if (typeof window !== 'undefined') {
  if (process.env.REACT_VERSION === '18') {
    import('@testing-library/react').then((rtl) => {
      renderHook = rtl.renderHook as any;
      renderHookAct = rtl.act as typeof actType;
    });
  } else {
    import('@testing-library/react-hooks/dom').then((rtl) => {
      renderHook = rtl.renderHook;
      renderHookAct = rtl.act;
    });
  }
}

export { renderHook, renderHookAct };
