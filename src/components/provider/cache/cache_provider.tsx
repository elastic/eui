/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { PropsWithChildren } from 'react';
import { EmotionCache } from '@emotion/css';
import { CacheProvider } from '@emotion/react';

export interface EuiCacheProviderProps {
  cache?: false | EmotionCache;
}

export const EuiCacheProvider = ({
  cache,
  children,
}: PropsWithChildren<EuiCacheProviderProps>) => {
  return children && cache ? (
    <CacheProvider value={cache}>{children}</CacheProvider>
  ) : (
    <>{children}</>
  );
};
