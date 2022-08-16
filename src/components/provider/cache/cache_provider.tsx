/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { PropsWithChildren } from 'react';
import createCache, { EmotionCache } from '@emotion/cache';
import { CacheProvider } from '@emotion/react';

const defaultCache = createCache({ key: 'css' });
defaultCache.compat = true;

export interface EuiCacheProviderProps {
  cache?: EmotionCache;
}

export const EuiCacheProvider = ({
  cache = defaultCache,
  children,
}: PropsWithChildren<EuiCacheProviderProps>) => (
  <CacheProvider value={cache}>{children}</CacheProvider>
);
