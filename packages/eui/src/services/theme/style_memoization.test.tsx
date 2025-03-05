/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { useState } from 'react';
import { css } from '@emotion/react';
import { fireEvent } from '@testing-library/react';
import { render, renderHook } from '../../test/rtl';
import { testOnReactVersion } from '../../test/internal';

import type { UseEuiTheme } from './hooks';
import { EuiThemeProvider } from './provider';
import { setEuiDevProviderWarning } from './warning';

import {
  useEuiMemoizedStyles,
  withEuiStylesMemoizer,
  WithEuiStylesMemoizerProps,
  RenderWithEuiStylesMemoizer,
} from './style_memoization';

describe('useEuiMemoizedStyles', () => {
  beforeEach(jest.clearAllMocks);

  const componentStyles = jest.fn(({ euiTheme }: UseEuiTheme) => ({
    someComponent: css`
      color: ${euiTheme.colors.textPrimary};
    `,
  }));
  const Component = () => {
    const [rerender, setRerender] = useState(false);
    const styles = useEuiMemoizedStyles(componentStyles);
    return (
      <button
        css={styles.someComponent}
        onClick={() => setRerender(!rerender)}
      />
    );
  };

  it('memoizes the passed fn, only computing the styles once regardless of other rerenders', () => {
    const { getByRole } = render(<Component />);

    expect(componentStyles).toHaveBeenCalledTimes(1);
    expect(getByRole('button')).toHaveStyleRule('color', '#1750BA');

    fireEvent.click(getByRole('button'));
    expect(componentStyles).toHaveBeenCalledTimes(1);
  });

  it('recomputes styles if the upstream theme changes', () => {
    const { rerender, getByRole } = render(
      <EuiThemeProvider colorMode="light">
        <Component />
      </EuiThemeProvider>
    );
    expect(componentStyles).toHaveBeenCalledTimes(1);
    expect(getByRole('button')).toHaveStyleRule('color', '#1750BA');

    rerender(
      <EuiThemeProvider colorMode="dark">
        <Component />
      </EuiThemeProvider>
    );
    expect(componentStyles).toHaveBeenCalledTimes(2);
    expect(getByRole('button')).toHaveStyleRule('color', '#61A2FF');

    // Should not recompute styles if no theme changes
    rerender(
      <EuiThemeProvider colorMode="dark">
        <Component />
      </EuiThemeProvider>
    );
    expect(componentStyles).toHaveBeenCalledTimes(2);
  });

  testOnReactVersion(['18'])(
    'throws an error if passed anonymous functions',
    () => {
      setEuiDevProviderWarning('error');
      expect(() =>
        renderHook(() => useEuiMemoizedStyles(() => ({})), {
          wrapper: EuiThemeProvider,
        })
      ).toThrowError(
        'Styles are memoized per function. Your style functions must be statically defined in order to not create a new map entry every rerender.'
      );
      setEuiDevProviderWarning(undefined);
    }
  );
});

describe('withEuiStylesMemoizer', () => {
  beforeEach(jest.clearAllMocks);

  const componentStyles = jest.fn(({ euiTheme }: UseEuiTheme) => ({
    someComponent: css`
      color: ${euiTheme.colors.textDanger};
    `,
  }));

  class ComponentClass extends React.Component<WithEuiStylesMemoizerProps> {
    state = {
      rerender: false,
    };

    rerender = () => {
      this.setState({ rerender: !this.state.rerender });
    };

    render() {
      const styles = this.props.stylesMemoizer(componentStyles);
      return <button css={styles.someComponent} onClick={this.rerender} />;
    }
  }
  const Component = withEuiStylesMemoizer(ComponentClass);

  it('memoizes the passed fn, only computing the styles once regardless of other rerenders', () => {
    const { getByRole } = render(<Component />);

    expect(componentStyles).toHaveBeenCalledTimes(1);
    expect(getByRole('button')).toHaveStyleRule('color', '#A71627');

    fireEvent.click(getByRole('button'));
    expect(componentStyles).toHaveBeenCalledTimes(1);
  });

  it('recomputes styles if the upstream theme changes', () => {
    const { rerender, getByRole } = render(
      <EuiThemeProvider colorMode="light">
        <Component />
      </EuiThemeProvider>
    );
    expect(componentStyles).toHaveBeenCalledTimes(1);
    expect(getByRole('button')).toHaveStyleRule('color', '#A71627');

    rerender(
      <EuiThemeProvider colorMode="dark">
        <Component />
      </EuiThemeProvider>
    );
    expect(componentStyles).toHaveBeenCalledTimes(2);
    expect(getByRole('button')).toHaveStyleRule('color', '#F6726A');

    // Should not recompute styles if no theme changes
    rerender(
      <EuiThemeProvider colorMode="dark">
        <Component />
      </EuiThemeProvider>
    );
    expect(componentStyles).toHaveBeenCalledTimes(2);
  });
});

describe('RenderWithEuiStylesMemoizer', () => {
  beforeEach(jest.clearAllMocks);

  const componentStyles = jest.fn(({ euiTheme }: UseEuiTheme) => ({
    someComponent: css`
      color: ${euiTheme.colors.textSuccess};
    `,
  }));

  class Component<T extends object> extends React.Component<{ someProp?: T }> {
    state = {
      rerender: false,
    };

    rerender = () => {
      this.setState({ rerender: !this.state.rerender });
    };

    render() {
      return (
        <RenderWithEuiStylesMemoizer>
          {(stylesMemoizer) => {
            const styles = stylesMemoizer(componentStyles);
            return (
              <button css={styles.someComponent} onClick={this.rerender} />
            );
          }}
        </RenderWithEuiStylesMemoizer>
      );
    }
  }

  it('memoizes the passed fn, only computing the styles once regardless of other rerenders', () => {
    const { getByRole } = render(<Component<{ type: string }> />);

    expect(componentStyles).toHaveBeenCalledTimes(1);
    expect(getByRole('button')).toHaveStyleRule('color', '#09724D');

    fireEvent.click(getByRole('button'));
    expect(componentStyles).toHaveBeenCalledTimes(1);
  });

  it('recomputes styles if the upstream theme changes', () => {
    const { rerender, getByRole } = render(
      <EuiThemeProvider colorMode="light">
        <Component />
      </EuiThemeProvider>
    );
    expect(componentStyles).toHaveBeenCalledTimes(1);
    expect(getByRole('button')).toHaveStyleRule('color', '#09724D');

    rerender(
      <EuiThemeProvider colorMode="dark">
        <Component />
      </EuiThemeProvider>
    );
    expect(componentStyles).toHaveBeenCalledTimes(2);
    expect(getByRole('button')).toHaveStyleRule('color', '#24C292');

    // Should not recompute styles if no theme changes
    rerender(
      <EuiThemeProvider colorMode="dark">
        <Component />
      </EuiThemeProvider>
    );
    expect(componentStyles).toHaveBeenCalledTimes(2);
  });
});
