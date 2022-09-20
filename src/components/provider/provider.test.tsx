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

import { EuiProvider } from './provider';

describe('EuiProvider', () => {
  it('is rendered', () => {
    const component = shallow(<EuiProvider />);

    expect(component).toMatchSnapshot();
  });

  describe('using `null` theme option', () => {
    it('does not add global styles', () => {
      const component = shallow(<EuiProvider theme={null} />);

      expect(component).toMatchSnapshot();
    });
  });

  describe('providing an @emotion cache config', () => {
    const defaultCache = createCache({
      key: 'default',
    });
    const globalCache = createCache({
      key: 'global',
    });
    const utilityCache = createCache({
      key: 'utility',
    });

    it('provides a default cache from Emotion when configured without a cache', () => {
      const component = shallow(<EuiProvider />);

      expect(component).toMatchSnapshot();
      expect(component.prop('cache').key).toEqual('css');
      expect(component.prop('cache').compat).toEqual(true);
    });
    it('applies the cache to all styles', () => {
      const component = shallow(<EuiProvider cache={defaultCache} />);

      expect(component).toMatchSnapshot();
    });

    it('applies the cache to global styles', () => {
      const component = shallow(
        <EuiProvider cache={{ global: globalCache }} />
      );

      expect(component).toMatchSnapshot();
    });

    it('applies the cache to utility styles', () => {
      const component = shallow(
        <EuiProvider cache={{ utility: utilityCache }} />
      );

      expect(component).toMatchSnapshot();
    });

    it('applies the cache to each location separately', () => {
      const component = shallow(
        <EuiProvider
          cache={{
            default: defaultCache,
            global: globalCache,
            utility: utilityCache,
          }}
        />
      );

      expect(component).toMatchSnapshot();
    });
  });

  describe('changing color modes', () => {
    it('propagates `colorMode`', () => {
      const component = shallow(<EuiProvider colorMode="dark" />);

      expect(component).toMatchSnapshot();
    });
  });

  describe('applying modifications', () => {
    it('propagates `modify`', () => {
      const component = shallow(
        <EuiProvider
          modify={{
            colors: {
              LIGHT: { lightShade: '#d3e6df' },
              DARK: { lightShade: '#394c4b' },
            },
          }}
        />
      );

      expect(component).toMatchSnapshot();
    });
  });
});
