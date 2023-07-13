/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { render } from '@testing-library/react'; // Note - don't use the EUI custom RTL `render`, as it auto-wraps an `EuiProvider`
import { cache as emotionCache } from '@emotion/css';
import createCache from '@emotion/cache';

import { setEuiDevProviderWarning } from '../../services';
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

    const getStyleByCss = (content: string) => {
      return Array.from(document.querySelectorAll('style[data-emotion]')).find(
        (el) => el?.textContent?.includes(content)
      ) as HTMLStyleElement;
    };

    it('uses a default cache from Emotion when configured without a cache', () => {
      render(<EuiProvider />);

      expect(emotionCache.key).toEqual('css');
      expect(getStyleByCss('html').dataset.emotion).toEqual('css-global');
      expect(getStyleByCss('.eui-displayBlock').dataset.emotion).toEqual(
        'css-global'
      );
    });

    it('applies the cache to all styles', () => {
      render(<EuiProvider cache={defaultCache} />);

      expect(getStyleByCss('html').dataset.emotion).toEqual('default-global');
      expect(getStyleByCss('.eui-displayBlock').dataset.emotion).toEqual(
        'default-global'
      );
    });

    it('applies the cache to global styles', () => {
      render(<EuiProvider cache={{ global: globalCache }} />);

      expect(getStyleByCss('html').dataset.emotion).toEqual('global-global');
      expect(getStyleByCss('.eui-displayBlock').dataset.emotion).toEqual(
        'css-global'
      );
    });

    it('applies the cache to utility styles', () => {
      render(<EuiProvider cache={{ utility: utilityCache }} />);

      expect(getStyleByCss('html').dataset.emotion).toEqual('css-global');
      expect(getStyleByCss('.eui-displayBlock').dataset.emotion).toEqual(
        'utility-global'
      );
    });

    it('applies the cache to each location separately', () => {
      render(
        <EuiProvider
          cache={{
            default: defaultCache,
            global: globalCache,
            utility: utilityCache,
          }}
        >
          <div css={{ color: 'red', label: 'test' }} />
        </EuiProvider>
      );

      expect(getStyleByCss('.default-').dataset.emotion).toEqual('default');
      expect(getStyleByCss('html').dataset.emotion).toEqual('global-global');
      expect(getStyleByCss('.eui-displayBlock').dataset.emotion).toEqual(
        'utility-global'
      );
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

  describe('nested EuiProviders', () => {
    it('emits a log/error/warning per `euiDevProviderWarning` levels', () => {
      const warnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {}); // Silence warning
      setEuiDevProviderWarning('warn');

      render(
        <EuiProvider>
          Top-level provider
          <EuiProvider>Nested</EuiProvider>
        </EuiProvider>
      );

      expect(warnSpy).toHaveBeenCalledWith(
        expect.stringContaining(
          '`EuiProvider` should not be nested or used more than once'
        )
      );

      setEuiDevProviderWarning(undefined);
      warnSpy.mockRestore();
    });

    it('returns children as-is without rendering any nested contexts', () => {
      const { container } = render(
        <EuiProvider>
          Top-level provider
          <EuiProvider>
            Nested
            <EuiProvider>Nested again</EuiProvider>
          </EuiProvider>
        </EuiProvider>
      );

      expect(container).toMatchInlineSnapshot(`
        <div>
          Top-level provider
          Nested
          Nested again
        </div>
      `);
    });

    it('does not instantiate any extra logic, including setting cache behavior', () => {
      const ignoredCache = createCache({ key: 'ignore' });

      render(
        <EuiProvider>
          Top-level provider
          <EuiProvider cache={ignoredCache}>Nested</EuiProvider>
        </EuiProvider>
      );

      expect(ignoredCache.compat).not.toEqual(true);
    });
  });
});
