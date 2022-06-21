/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { shallow } from 'enzyme';
import createCache from '@emotion/cache';

import { EuiCacheProvider } from './cache_provider';

describe('EuiProvider', () => {
  const cache = createCache({
    key: 'testing',
  });
  it('adds CacheProvider from Emotion when configured with a cache', () => {
    const component = shallow(
      <EuiCacheProvider cache={cache}>
        <div />
      </EuiCacheProvider>
    );

    expect(component).toMatchSnapshot();
  });

  it('does not add CacheProvider from Emotion when configured without a cache', () => {
    const component = shallow(
      <EuiCacheProvider>
        <div />
      </EuiCacheProvider>
    );

    expect(component).toMatchSnapshot();
  });

  it('renders a Fragment when no children are provided', () => {
    const component = shallow(<EuiCacheProvider cache={cache} />);

    expect(component).toMatchSnapshot();
  });
});
