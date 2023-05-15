/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { shallow } from 'enzyme';
import { render } from '@testing-library/react'; // Note - don't use the EUI custom RTL `render`, as it auto-wraps an `EuiProvider`
import { css } from '@emotion/react';
import createCache from '@emotion/cache';

import { EuiThemeProvider } from '../../services';
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

  describe('nested EuiThemeProviders', () => {
    it('renders with a span wrapper that sets the inherited text color', () => {
      const { container } = render(
        <EuiProvider>
          Top-level provider{' '}
          <EuiThemeProvider colorMode="inverse">Nested</EuiThemeProvider>
        </EuiProvider>
      );

      expect(container).toMatchSnapshot();
    });

    it('allows customizing the span wrapper with `wrapperProps`', () => {
      const customCss = css`
        display: flex;
      `;

      const { container } = render(
        <EuiProvider>
          Top-level provider{' '}
          <EuiThemeProvider
            colorMode="dark"
            wrapperProps={{
              className: 'test',
              'data-test-subj': 'nested',
              css: customCss,
            }}
          >
            Nested
          </EuiThemeProvider>
        </EuiProvider>
      );

      expect(container).toMatchSnapshot();
      expect(container.querySelector('.test')).toBeTruthy();
    });

    it('allows avoiding the extra span wrapper with `wrapperProps.cloneElement`', () => {
      const { container } = render(
        <EuiProvider>
          Top-level provider{' '}
          <EuiThemeProvider
            colorMode="dark"
            wrapperProps={{ cloneElement: true, className: 'hello' }}
          >
            <div className="world">clone provider color onto div</div>
          </EuiThemeProvider>
        </EuiProvider>
      );

      expect(container).toMatchSnapshot();
      expect(container.querySelector('.hello.world')).toBeTruthy();
    });
  });
});
