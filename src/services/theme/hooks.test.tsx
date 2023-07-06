/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { renderHook } from '@testing-library/react-hooks';
import { render } from '@testing-library/react';

import { setEuiDevProviderWarning } from './warning';
import {
  useEuiTheme,
  UseEuiTheme,
  withEuiTheme,
  RenderWithEuiTheme,
} from './hooks';

describe('useEuiTheme', () => {
  it('returns a context with theme variables, color mode, and modifications', () => {
    const { result } = renderHook(useEuiTheme);
    expect(result.current).toEqual({
      euiTheme: expect.any(Object),
      colorMode: 'LIGHT',
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
    expect(result.all.length).toEqual(1);
    rerender({});
    expect(result.all.length).toEqual(2);

    expect(result.all[0]).toBe(result.all[1]);
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
      'euiTheme,colorMode,modifications'
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
      'euiTheme,colorMode,modifications'
    );
  });
});
