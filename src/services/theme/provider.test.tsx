/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { FunctionComponent, useContext, useEffect } from 'react';
import { render } from '@testing-library/react'; // Note - don't use the EUI custom RTL `render`, as it auto-wraps an `EuiProvider`
import { css } from '@emotion/react';

import { EuiProvider } from '../../components/provider';
import { EuiNestedThemeContext } from './context';
import { EuiThemeProvider } from './provider';

describe('EuiThemeProvider', () => {
  describe('colorMode', () => {
    it('sets `colorMode`', () => {
      const { getByText } = render(
        <>
          <EuiThemeProvider colorMode="light">
            <div css={({ euiTheme }) => ({ color: euiTheme.colors.fullShade })}>
              Light mode
            </div>
            <EuiThemeProvider colorMode="inverse">
              <div
                css={({ euiTheme }) => ({ color: euiTheme.colors.fullShade })}
              >
                Inverse of light mode
              </div>
            </EuiThemeProvider>
          </EuiThemeProvider>
          <EuiThemeProvider colorMode="dark">
            <div css={({ euiTheme }) => ({ color: euiTheme.colors.fullShade })}>
              Dark mode
            </div>
            <EuiThemeProvider colorMode="inverse">
              <div
                css={({ euiTheme }) => ({ color: euiTheme.colors.fullShade })}
              >
                Inverse of dark mode
              </div>
            </EuiThemeProvider>
          </EuiThemeProvider>
        </>
      );

      expect(getByText('Light mode')).toHaveStyleRule('color', '#000');
      expect(getByText('Dark mode')).toHaveStyleRule('color', '#FFF');
      expect(getByText('Inverse of light mode')).toHaveStyleRule(
        'color',
        '#FFF'
      );
      expect(getByText('Inverse of dark mode')).toHaveStyleRule(
        'color',
        '#000'
      );
    });
  });

  describe('modify', () => {
    it('allows overriding theme tokens', () => {
      const { getByText } = render(
        <EuiThemeProvider
          modify={{ colors: { LIGHT: { primary: 'hotpink' } } }}
        >
          <div css={({ euiTheme }) => ({ color: euiTheme.colors.primary })}>
            Modified
          </div>
        </EuiThemeProvider>
      );

      expect(getByText('Modified')).toHaveStyleRule('color', 'hotpink');
    });
  });

  describe('nested EuiThemeProviders', () => {
    it('renders with a span wrapper that sets the inherited text color', () => {
      const { container } = render(
        <EuiProvider>
          Top-level provider{' '}
          <EuiThemeProvider colorMode="dark">
            Nested
            <EuiThemeProvider colorMode="light">
              Double nested
              <EuiThemeProvider colorMode="inverse">
                Triple nested
              </EuiThemeProvider>
            </EuiThemeProvider>
          </EuiThemeProvider>
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

  describe('CSS variables', () => {
    const MockEuiComponent: FunctionComponent<{ global?: boolean }> = ({
      global,
    }) => {
      const {
        globalCSSVariables,
        setGlobalCSSVariables,
        setNearestThemeCSSVariables,
      } = useContext(EuiNestedThemeContext);

      useEffect(() => {
        if (global) {
          setGlobalCSSVariables({ '--hello': 'global-world' });
        } else {
          setNearestThemeCSSVariables({ '--hello': 'world' });
        }
      }, [global, setGlobalCSSVariables, setNearestThemeCSSVariables]);

      // Our current version of jsdom doesn't yet support :root (currently on v11,
      // need to be on at least v20), so we'll mock something to assert on in the interim
      return <>{JSON.stringify(globalCSSVariables)}</>;
    };

    const getThemeProvider = (container: HTMLElement) =>
      container.querySelector('.euiThemeProvider')!;
    const getThemeClassName = (container: HTMLElement) =>
      getThemeProvider(container).className;

    it('allows child components to set non-global theme CSS variables', () => {
      const { container } = render(
        <EuiProvider>
          <EuiThemeProvider>
            <MockEuiComponent />
          </EuiThemeProvider>
        </EuiProvider>
      );
      expect(getThemeClassName(container)).toContain('euiCSSVariables');
      expect(container.firstChild).toHaveStyleRule('--hello', 'world');
      expect(container.firstChild).toMatchSnapshot();
    });

    it('sets global CSS variables when the nearest theme provider is the top-level one', () => {
      const { container } = render(
        <EuiProvider>
          <MockEuiComponent />
        </EuiProvider>
      );
      expect(container.textContent).toContain('{"--hello":"world"}');
    });

    it('allows child components to set global CSS variables from any nested theme provider', () => {
      const { container } = render(
        <EuiProvider>
          <EuiThemeProvider>
            <MockEuiComponent global={true} />
          </EuiThemeProvider>
        </EuiProvider>
      );
      expect(getThemeClassName(container)).not.toContain('euiCSSVariables');
      expect(container.textContent).toContain('{"--hello":"global-world"}');
    });

    it('can set both global and nearest theme variables without conflicting', () => {
      const { container } = render(
        <EuiProvider>
          <MockEuiComponent />
          <EuiThemeProvider>
            <MockEuiComponent />
            <MockEuiComponent global={true} />
          </EuiThemeProvider>
        </EuiProvider>
      );
      expect(getThemeClassName(container)).toContain('euiCSSVariables');
      expect(getThemeProvider(container)).toHaveStyleRule('--hello', 'world');
      expect(container.textContent).toContain('{"--hello":"global-world"}');
    });
  });
});
