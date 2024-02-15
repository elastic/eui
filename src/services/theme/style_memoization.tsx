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
 * Hook that memoizes the returned values of components style fns/generators
 * per-theme
 */
export const useEuiMemoizedStyles = <
  T extends (theme: UseEuiTheme) => StylesMaps
>(
  styleGenerator: T
): ReturnType<T> => {
  const memoizedStyles = useContext(EuiThemeMemoizedStylesContext);
  const euiThemeContext = useEuiTheme();

  const memoizedComponentStyles = useMemo(() => {
    if (!styleGenerator.name) {
      throw new Error(
        'Styles are memoized per function. Your style functions must be statically defined in order to not create a new map entry every rerender.'
      );
    }
    const existingStyles = memoizedStyles.get(styleGenerator);
    if (existingStyles) {
      return existingStyles;
    } else {
      const generatedStyles = styleGenerator(euiThemeContext);
      memoizedStyles.set(styleGenerator, generatedStyles);

      return generatedStyles;
    }
  }, [styleGenerator, memoizedStyles, euiThemeContext]);

  return memoizedComponentStyles as ReturnType<T>;
};
