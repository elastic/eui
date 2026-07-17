/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { useId, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';

const useEuiTableStoreUniqueColumnIdFallback = () => {
  const ref = useRef(uuidv4());
  return ref.current;
};

/**
 * Returns a stable unique column ID to be used when registering columns.
 * It uses `React.useId()` when available and falls back to UUID v4 on React 17.
 *
 * This is needed so that static `uuid` mocks don't break column registration
 * (at least in React 18+; in older versions this function would need
 * to be mocked to return something unique, but stable).
 * @internal
 */
export const useEuiTableStoreUniqueColumnId =
  'useId' in React ? useId : useEuiTableStoreUniqueColumnIdFallback;
