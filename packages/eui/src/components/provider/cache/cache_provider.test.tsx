/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { render } from '../../../test/rtl';
import createCache, { type EmotionCache } from '@emotion/cache';
import { withEmotionCache } from '@emotion/react';

import { EuiCacheProvider } from './cache_provider';

describe('EuiProvider', () => {
  const cache = createCache({
    key: 'testing',
  });

  it('renders', () => {
    const { container } = render(<EuiCacheProvider />);

    expect(container).toBeInTheDocument();
  });

  it('customizes CacheProvider when configured with a cache', () => {
    let cacheContext: EmotionCache;

    const SpyComponent = withEmotionCache((_, context) => {
      cacheContext = context;
      return <div />;
    });

    render(
      <EuiCacheProvider cache={cache}>
        <SpyComponent />
      </EuiCacheProvider>
    );

    expect(cacheContext!.key).toEqual('testing');
  });
});
