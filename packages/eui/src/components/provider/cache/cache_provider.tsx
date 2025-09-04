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

import { patchCacheForDynamicStyles } from './emotion_dynamic_patch';

export interface EuiCacheProviderProps extends PropsWithChildren {
  cache?: false | EmotionCache;
}

export const EuiCacheProvider = ({
  cache,
  children,
}: EuiCacheProviderProps) => {
  if (
    cache &&
    process.env.NODE_ENV !== 'production' &&
    process.env.NODE_ENV !== 'test'
  ) {
    patchCacheForDynamicStyles(cache);
  }
  return children && cache ? (
    <CacheProvider value={cache}>{children}</CacheProvider>
  ) : (
    <>{children}</>
  );
};
