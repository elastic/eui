/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { forwardRef, useContext } from 'react';

import {
  EuiThemeContext,
  EuiModificationsContext,
  EuiColorModeContext,
} from './context';
import {
  EuiThemeColorMode,
  EuiThemeModifications,
  EuiThemeComputed,
} from './types';

export const useEuiTheme = <T extends {} = {}>(): {
  euiTheme: EuiThemeComputed<T>;
  colorMode: EuiThemeColorMode;
  modifications: EuiThemeModifications<T>;
} => {
  const theme = useContext(EuiThemeContext);
  const colorMode = useContext(EuiColorModeContext);
  const modifications = useContext(EuiModificationsContext);

  return {
    euiTheme: theme as EuiThemeComputed<T>,
    colorMode,
    modifications: modifications as EuiThemeModifications<T>,
  };
};

export interface WithEuiThemeProps<P = {}> {
  theme: {
    euiTheme: EuiThemeComputed<P>;
    colorMode: EuiThemeColorMode;
  };
}
export const withEuiTheme = <T extends {} = {}, U extends {} = {}>(
  Component: React.ComponentType<T & WithEuiThemeProps<U>>
) => {
  const componentName = Component.displayName || Component.name || 'Component';
  const Render = (
    props: Omit<T, keyof WithEuiThemeProps<U>>,
    ref: React.Ref<Omit<T, keyof WithEuiThemeProps<U>>>
  ) => {
    const { euiTheme, colorMode } = useEuiTheme<U>();
    return (
      <Component
        theme={{
          euiTheme,
          colorMode,
        }}
        ref={ref}
        {...(props as T)}
      />
    );
  };

  const WithEuiTheme = forwardRef(Render);

  WithEuiTheme.displayName = `WithEuiTheme(${componentName})`;

  return WithEuiTheme;
};
