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

import {
  useEuiMemoizedStyles,
  withEuiStylesMemoizer,
  WithEuiStylesMemoizerProps,
} from './style_memoization';

describe('useEuiMemoizedStyles', () => {
  beforeEach(jest.clearAllMocks);

  const componentStyles = jest.fn(({ euiTheme }: UseEuiTheme) => ({
    someComponent: css`
      color: ${euiTheme.colors.primaryText};
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
    expect(getByRole('button')).toHaveStyleRule('color', '#006bb8');

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
    expect(getByRole('button')).toHaveStyleRule('color', '#006bb8');

    rerender(
      <EuiThemeProvider colorMode="dark">
        <Component />
      </EuiThemeProvider>
    );
    expect(componentStyles).toHaveBeenCalledTimes(2);
    expect(getByRole('button')).toHaveStyleRule('color', '#36a2ef');

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
      expect(() =>
        renderHook(() => useEuiMemoizedStyles(() => ({})))
      ).toThrowError(
        'Styles are memoized per function. Your style functions must be statically defined in order to not create a new map entry every rerender.'
      );
    }
  );
});

describe('withEuiStylesMemoizer', () => {
  beforeEach(jest.clearAllMocks);

  const componentStyles = jest.fn(({ euiTheme }: UseEuiTheme) => ({
    someComponent: css`
      color: ${euiTheme.colors.dangerText};
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
    expect(getByRole('button')).toHaveStyleRule('color', '#bd271e');

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
    expect(getByRole('button')).toHaveStyleRule('color', '#bd271e');

    rerender(
      <EuiThemeProvider colorMode="dark">
        <Component />
      </EuiThemeProvider>
    );
    expect(componentStyles).toHaveBeenCalledTimes(2);
    expect(getByRole('button')).toHaveStyleRule('color', '#f86b63');

    // Should not recompute styles if no theme changes
    rerender(
      <EuiThemeProvider colorMode="dark">
        <Component />
      </EuiThemeProvider>
    );
    expect(componentStyles).toHaveBeenCalledTimes(2);
  });
});
