/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { useId, useRef } from 'react';

export const useFlyoutId = (id?: string) => {
  const defaultId = useId();
  const componentIdRef = useRef<string>(id || `persistent-${defaultId}`);
  return componentIdRef.current;
};
