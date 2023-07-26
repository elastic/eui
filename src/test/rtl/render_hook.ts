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

/* eslint-disable @typescript-eslint/no-var-requires */

let renderHook: typeof renderHookType;
let renderHookAct: typeof actType;
if (process.env.REACT_VERSION === '18') {
  renderHook = require('@testing-library/react').renderHook;
  renderHookAct = require('@testing-library/react').act;
} else {
  renderHook = require('@testing-library/react-hooks').renderHook;
  renderHookAct = require('@testing-library/react-hooks').act;
}

/* eslint-enable @typescript-eslint/no-var-requires */

export { renderHook, renderHookAct };
