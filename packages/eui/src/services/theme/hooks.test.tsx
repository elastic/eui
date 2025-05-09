/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { FunctionComponent, PropsWithChildren } from 'react';
import { render } from '@testing-library/react';
import { renderHook, renderHookAct } from '../../test/rtl';

import { EuiProvider } from '../../components/provider';

import { setEuiDevProviderWarning } from './warning';
import {
  useEuiTheme,
  UseEuiTheme,
  withEuiTheme,
  RenderWithEuiTheme,
  useEuiThemeCSSVariables,
  useIsDarkMode,
} from './hooks';
import { EuiThemeProvider } from './provider';
import {
  COLOR_MODES_STANDARD,
  EuiThemeColorModeStandard,
} from '@elastic/eui-theme-common';

describe('useEuiTheme', () => {
  it('returns a context with theme variables, color mode, and modifications', () => {
    const { result } = renderHook(useEuiTheme);
    expect(result.current).toEqual({
      euiTheme: expect.any(Object),
      colorMode: 'LIGHT',
      highContrastMode: false,
      modifications: {},
    });
  });

  it('logs, warns, or errors if a provider warning level has been set', () => {
    const warnSpy = jest.spyOn(console, 'warn').mockImplementation();
    setEuiDevProviderWarning('warn');

    renderHook(useEuiTheme);
    expect(warnSpy).toHaveBeenCalledWith(
      expect.stringContaining('`EuiProvider` is missing')
    );

    setEuiDevProviderWarning(undefined);
    warnSpy.mockRestore();
  });

  it('consecutive calls return a stable object', () => {
    const { result, rerender } = renderHook(useEuiTheme);
    const firstResult = result.current;

    rerender({});
    const secondResult = result.current;

    expect(firstResult).toBe(secondResult);
  });
});

describe('withEuiTheme', () => {
  class ClassComponent extends React.Component<{ theme: UseEuiTheme }> {
    render() {
      const { theme } = this.props;
      // output
      return Object.keys(theme).join();
    }
  }
  const Component = withEuiTheme(ClassComponent);

  it('provides underlying class components with a `theme` prop', () => {
    const { container } = render(<Component />);
    expect(container.firstChild!.textContent).toEqual(
      'euiTheme,colorMode,highContrastMode,modifications'
    );
  });
});

describe('RenderWithEuiTheme', () => {
  it('passes the `theme` arg to children as a render prop', () => {
    const { container } = render(
      <RenderWithEuiTheme>
        {(theme) => <>{Object.keys(theme).join()}</>}
      </RenderWithEuiTheme>
    );
    expect(container.firstChild!.textContent).toEqual(
      'euiTheme,colorMode,highContrastMode,modifications'
    );
  });
});

describe('useEuiThemeCSSVariables', () => {
  it('returns CSS variable related state setters/getters', () => {
    const { result } = renderHook(useEuiThemeCSSVariables, {
      wrapper: EuiProvider,
    });
    expect(result.current.globalCSSVariables).toBeUndefined();
    expect(result.current.themeCSSVariables).toBeUndefined();

    renderHookAct(() => {
      result.current.setNearestThemeCSSVariables({ '--hello': 'world' });
    });

    // In this case, the nearest theme is the global one, so it should set both
    expect(result.current.globalCSSVariables).toEqual({ '--hello': 'world' });
    expect(result.current.themeCSSVariables).toEqual({ '--hello': 'world' });
  });
});

describe('useIsDarkMode', () => {
  const Wrapper: FunctionComponent<
    PropsWithChildren & { colorMode: EuiThemeColorModeStandard }
  > = ({ children, colorMode }) => (
    <EuiProvider colorMode={colorMode}>{children}</EuiProvider>
  );

  it('returns `true` for DARK `colorMode`', () => {
    const { result } = renderHook(useIsDarkMode, {
      wrapper: (props: PropsWithChildren) => (
        <Wrapper {...props} colorMode="DARK" />
      ),
    });
    expect(result.current).toBe(true);
  });

  it('returns `false` for LIGHT `colorMode`', () => {
    const { result } = renderHook(useIsDarkMode, {
      wrapper: (props: PropsWithChildren) => (
        <Wrapper {...props} colorMode="LIGHT" />
      ),
    });
    expect(result.current).toBe(false);
  });

  describe('nested providers', () => {
    const NestedWrapper: FunctionComponent<
      PropsWithChildren & { colorMode: EuiThemeColorModeStandard }
    > = ({ children, colorMode }) => {
      return (
        <EuiProvider
          colorMode={
            colorMode === COLOR_MODES_STANDARD.light
              ? COLOR_MODES_STANDARD.dark
              : COLOR_MODES_STANDARD.light
          }
        >
          <EuiThemeProvider colorMode={colorMode}>{children}</EuiThemeProvider>
        </EuiProvider>
      );
    };

    it('returns `false` for a nested LIGHT `colorMode`', () => {
      const { result } = renderHook(useIsDarkMode, {
        wrapper: (props: PropsWithChildren) => (
          <NestedWrapper {...props} colorMode="LIGHT" />
        ),
      });

      expect(result.current).toBe(false);
    });

    it('returns `true` for a nested DARK `colorMode`', () => {
      const { result } = renderHook(useIsDarkMode, {
        wrapper: (props: PropsWithChildren) => (
          <NestedWrapper {...props} colorMode="DARK" />
        ),
      });

      expect(result.current).toBe(true);
    });
  });
});
