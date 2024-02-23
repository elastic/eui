/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, {
  FunctionComponent,
  PropsWithChildren,
  createContext,
  useContext,
  useState,
  useMemo,
  useCallback,
  forwardRef,
} from 'react';
import type { SerializedStyles, CSSObject } from '@emotion/react';

import { useUpdateEffect } from '../hooks';
import { useEuiTheme, UseEuiTheme } from './hooks';

type Styles = SerializedStyles | CSSObject | string | null;
type StylesMaps = Record<string, Styles | Record<string, Styles>>;
// NOTE: We're specifically using a WeakMap instead of a Map in order to allow
// unmounted components to have their styles garbage-collected by the browser
// @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakMap
type MemoizedStylesMap = WeakMap<Function, StylesMaps>;

export const EuiThemeMemoizedStylesContext = createContext<MemoizedStylesMap>(
  new WeakMap()
);

export const EuiThemeMemoizedStylesProvider: FunctionComponent<
  PropsWithChildren
> = ({ children }) => {
  // Note: we *should not* use `useMemo` instead of `useState` here, as useMemo is not guaranteed
  // and its cache can get thrown away by React (https://react.dev/reference/react/useMemo#caveats)
  const [componentStyles, rerenderStyles] = useState<MemoizedStylesMap>(
    new WeakMap()
  );

  // On theme update, wipe the map, which causes the below hook to recompute all styles
  const { euiTheme } = useEuiTheme();
  useUpdateEffect(() => {
    rerenderStyles(new WeakMap());
  }, [euiTheme]);

  return (
    <EuiThemeMemoizedStylesContext.Provider value={componentStyles}>
      {children}
    </EuiThemeMemoizedStylesContext.Provider>
  );
};

/**
 * Internal util primarily responsible for getting the memoized styles (if they exist)
 * and if not, generating and setting the styles. DRYed out to facilitate usage
 * between both hook/function components and HOC/class components
 */
const getMemoizedStyles = (
  stylesGenerator: Function,
  stylesMap: MemoizedStylesMap,
  euiThemeContext: UseEuiTheme
) => {
  if (!stylesGenerator.name) {
    throw new Error(
      'Styles are memoized per function. Your style functions must be statically defined in order to not create a new map entry every rerender.'
    );
  }
  const existingStyles = stylesMap.get(stylesGenerator);
  if (existingStyles) {
    return existingStyles;
  } else {
    const generatedStyles = stylesGenerator(euiThemeContext);
    stylesMap.set(stylesGenerator, generatedStyles);

    return generatedStyles;
  }
};

/**
 * Hook that memoizes the returned values of components style fns/generators
 * per-theme
 */
export const useEuiMemoizedStyles = <
  T extends (theme: UseEuiTheme) => StylesMaps
>(
  stylesGenerator: T
): ReturnType<T> => {
  const memoizedStyles = useContext(EuiThemeMemoizedStylesContext);
  const euiThemeContext = useEuiTheme();

  const memoizedComponentStyles = useMemo(
    () => getMemoizedStyles(stylesGenerator, memoizedStyles, euiThemeContext),
    [stylesGenerator, memoizedStyles, euiThemeContext]
  );

  return memoizedComponentStyles as ReturnType<T>;
};

/**
 * HOC for class components
 * Syntax is mostly copied from withEuiTheme HOC
 */
export interface WithEuiStylesMemoizerProps {
  stylesMemoizer: typeof useEuiMemoizedStyles; // Type shortcut, we don't actually pass down the hook itself
}
export const withEuiStylesMemoizer = <T extends {} = {}>(
  Component: React.ComponentType<T & WithEuiStylesMemoizerProps>
) => {
  const componentName =
    Component.displayName || Component.name || 'ComponentWithStylesMemoizer';

  const Render = (
    props: Omit<T, keyof WithEuiStylesMemoizerProps>,
    ref: React.Ref<Omit<T, keyof WithEuiStylesMemoizerProps>>
  ) => {
    const memoizedStyles = useContext(EuiThemeMemoizedStylesContext);
    const euiThemeContext = useEuiTheme();
    const stylesMemoizer = useCallback(
      (stylesGenerator: Function) =>
        getMemoizedStyles(stylesGenerator, memoizedStyles, euiThemeContext),
      [memoizedStyles, euiThemeContext]
    );
    return (
      <Component stylesMemoizer={stylesMemoizer} ref={ref} {...(props as T)} />
    );
  };

  const WithEuiStylesMemoizer = forwardRef(Render);

  WithEuiStylesMemoizer.displayName = componentName;

  return WithEuiStylesMemoizer;
};
