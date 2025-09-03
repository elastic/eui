/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { PropsWithChildren } from 'react';
import { CacheProvider, type EmotionCache } from '@emotion/react';

export interface EuiCacheProviderProps extends PropsWithChildren {
  cache?: false | EmotionCache;
}

export const EuiCacheProvider = ({
  cache,
  children,
}: EuiCacheProviderProps) => {
  return children && cache ? (
    <CacheProvider value={cache}>{children}</CacheProvider>
  ) : (
    <>{children}</>
  );
};
