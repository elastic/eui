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
import createCache from '@emotion/cache';

import { EuiProvider } from './provider';

describe('EuiProvider', () => {
  it('renders children', () => {
    const { container } = render(
      <EuiProvider>
        <main>Hello world</main>
      </EuiProvider>
    );

    expect(container.firstChild).toMatchInlineSnapshot(`
      <main>
        Hello world
      </main>
    `);
  });

  describe('global styles and reset CSS', () => {
    it('renders by default', () => {
      render(<EuiProvider />);

      const globalStyleElement = document.querySelector(
        'style[data-emotion="css-global"]'
      );
      expect(globalStyleElement).not.toEqual(null);
    });

    it('does not render when `theme` is null', () => {
      render(<EuiProvider theme={null} />);

      const globalStyleElement = document.querySelector(
        'style[data-emotion="css-global"]'
      );
      expect(globalStyleElement).toEqual(null);
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

  describe('EuiThemeProvider prop passing', () => {
    const modify = {
      colors: {
        LIGHT: { lightShade: '#aaa' },
        DARK: { lightShade: '#333' },
      },
    };

    it('passes `modify`', () => {
      const { getByText } = render(
        <EuiProvider modify={modify}>
          <div css={({ euiTheme }) => ({ color: euiTheme.colors.lightShade })}>
            Modified
          </div>
        </EuiProvider>
      );

      expect(getByText('Modified')).toHaveStyleRule('color', '#aaa');
    });

    it('passes `colorMode`', () => {
      const { getByText } = render(
        <EuiProvider modify={modify} colorMode="dark">
          <div css={({ euiTheme }) => ({ color: euiTheme.colors.lightShade })}>
            Dark mode
          </div>
        </EuiProvider>
      );

      expect(getByText('Dark mode')).toHaveStyleRule('color', '#333');
    });
  });
});
