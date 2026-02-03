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
import {
  EuiSystemDefaultsProvider,
  useWindowMediaMatcher,
} from '../../components/provider/system_defaults';
jest.mock('../../components/provider/system_defaults/match_media_hook', () => ({
  useWindowMediaMatcher: jest.fn(),
}));
import { useCurrentEuiBreakpoint } from '../breakpoint';
import { EuiNestedThemeContext } from './context';
import { useEuiTheme } from './hooks';

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

      expect(getByText('Light mode')).toHaveStyleRule('color', '#07101F');
      expect(getByText('Dark mode')).toHaveStyleRule('color', '#FFFFFF');
      expect(getByText('Inverse of light mode')).toHaveStyleRule(
        'color',
        '#FFFFFF'
      );
      expect(getByText('Inverse of dark mode')).toHaveStyleRule(
        'color',
        '#07101F'
      );
    });

    it('detects if color mode is forced from the system and overrides any props', () => {
      (useWindowMediaMatcher as jest.Mock).mockImplementation((media) => {
        if (media === '(prefers-color-scheme: dark)') return true;
        if (media === '(forced-colors: active)') return true;
      });

      const { getByText } = render(
        <EuiSystemDefaultsProvider>
          <EuiThemeProvider colorMode="light">
            <div css={({ euiTheme }) => ({ color: euiTheme.colors.fullShade })}>
              Forced dark mode
            </div>
          </EuiThemeProvider>
        </EuiSystemDefaultsProvider>
      );

      expect(getByText('Forced dark mode')).toHaveStyleRule('color', '#FFFFFF');
    });
  });

  describe('highContrastMode', () => {
    const Output = () => {
      const { highContrastMode } = useEuiTheme();
      return <>{String(highContrastMode)}</>;
    };

    afterEach(() => {
      (useWindowMediaMatcher as jest.Mock).mockReset();
    });

    it('always sets the contrast mode to forced if inherited from the system, overriding any application prop', () => {
      (useWindowMediaMatcher as jest.Mock).mockImplementation((media) => {
        if (media === '(forced-colors: active)') return true;
      });

      const { container } = render(
        <EuiSystemDefaultsProvider>
          <EuiThemeProvider highContrastMode={false}>
            <Output />
          </EuiThemeProvider>
        </EuiSystemDefaultsProvider>
      );

      expect(container.textContent).toEqual('forced');
    });

    it("converts true to 'preferred'", () => {
      const { container } = render(
        <EuiSystemDefaultsProvider>
          <EuiThemeProvider highContrastMode={true}>
            <Output />
          </EuiThemeProvider>
        </EuiSystemDefaultsProvider>
      );

      expect(container.textContent).toEqual('preferred');
    });

    it('leaves false as `false`', () => {
      const { container } = render(
        <EuiSystemDefaultsProvider>
          <EuiThemeProvider highContrastMode={false}>
            <Output />
          </EuiThemeProvider>
        </EuiSystemDefaultsProvider>
      );

      expect(container.textContent).toEqual('false');
    });

    it('falls back to the system/parent contrast mode if not specified', () => {
      (useWindowMediaMatcher as jest.Mock).mockImplementation((media) => {
        if (media === '(prefers-contrast: more)') return true;
      });

      const { container } = render(
        <EuiSystemDefaultsProvider>
          <EuiThemeProvider>
            <Output />
          </EuiThemeProvider>
        </EuiSystemDefaultsProvider>
      );

      expect(container.textContent).toEqual('preferred');
    });

    // see high_contrast_overrides.test.tsx for tests that output styles are correctly overridden
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

  describe('conditional CurrentEuiBreakpointProvider', () => {
    const PrintCurrentBreakpoint = () => <>{useCurrentEuiBreakpoint()}</>;
    let resizeListenerCount = 0;

    beforeAll(() => {
      // React 16 and 17 register a bunch of error listeners which we don't need to capture
      window.addEventListener = jest.fn((event: string) => {
        if (event === 'resize') resizeListenerCount++;
      });
    });

    beforeEach(() => {
      // Reset counts
      resizeListenerCount = 0;
    });

    afterAll(() => {
      jest.restoreAllMocks();
    });

    describe('in the top-level global theme provider', () => {
      it('is always rendered regardless of modified breakpoints', () => {
        const { container } = render(
          <EuiProvider>
            <PrintCurrentBreakpoint />
          </EuiProvider>
        );
        expect(container.textContent).toEqual('l');
        expect(resizeListenerCount).toEqual(2);
      });
    });

    describe('in nested child theme providers', () => {
      beforeAll(() => {
        window.innerWidth = 2500;
      });

      afterAll(() => {
        // Reset window width to jsdom's default
        window.innerWidth = 1024;
      });

      it('is rendered if modify.breakpoint is passed', () => {
        const customBreakpoints = { xxl: 2000 };

        const { container } = render(
          <EuiProvider>
            <EuiThemeProvider modify={{ breakpoint: customBreakpoints }}>
              <PrintCurrentBreakpoint />
            </EuiThemeProvider>
          </EuiProvider>
        );

        expect(container.textContent).toEqual('xxl');
        expect(resizeListenerCount).toBeGreaterThanOrEqual(2); // Technically 3 due to EuiThemeProvider rerendering
      });

      it('is not rendered if modify.breakpoint is not passed', () => {
        const { container } = render(
          <EuiProvider>
            <EuiThemeProvider>
              <PrintCurrentBreakpoint />
            </EuiThemeProvider>
          </EuiProvider>
        );
        expect(container.textContent).toEqual('xl');
        expect(resizeListenerCount).toEqual(2);
      });
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
