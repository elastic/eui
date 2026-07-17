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
} from '@testing-library/react';

/* eslint-disable @typescript-eslint/no-var-requires */

/**
 * `@testing-library/react` ships `renderHook`/`act` from v13.1+ (React 18+),
 * so consumers on React 18 never need `@testing-library/react-hooks`.
 * React 17 setups resolve an older `@testing-library/react` without
 * `renderHook` and fall back accordingly.
 */
const rtl = require('@testing-library/react');

let renderHook: typeof renderHookType;
let renderHookAct: typeof actType;

if (typeof rtl.renderHook === 'function') {
  renderHook = rtl.renderHook;
  renderHookAct = rtl.act;
} else {
  renderHook = require('@testing-library/react-hooks/dom').renderHook;
  renderHookAct = require('@testing-library/react-hooks/dom').act;
}

/* eslint-enable @typescript-eslint/no-var-requires */

export { renderHook, renderHookAct };
