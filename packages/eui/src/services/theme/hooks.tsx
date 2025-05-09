/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { forwardRef, useContext, useMemo } from 'react';
import {
  type EuiThemeColorModeStandard,
  type EuiThemeHighContrastMode,
  type EuiThemeModifications,
  type EuiThemeComputed,
  COLOR_MODES_STANDARD,
} from '@elastic/eui-theme-common';

import {
  EuiThemeContext,
  EuiModificationsContext,
  EuiColorModeContext,
  EuiHighContrastModeContext,
  defaultComputedTheme,
  EuiNestedThemeContext,
} from './context';
import { emitEuiProviderWarning } from './warning';

const providerMessage = `\`EuiProvider\` is missing which can result in negative effects.
Wrap your component in \`EuiProvider\`: https://ela.st/euiprovider.`;

/**
 * Hook for function components
 */

export interface UseEuiTheme<T extends {} = {}> {
  euiTheme: EuiThemeComputed<T>;
  colorMode: EuiThemeColorModeStandard;
  highContrastMode: EuiThemeHighContrastMode;
  modifications: EuiThemeModifications<T>;
}

export const useEuiTheme = <T extends {} = {}>(): UseEuiTheme<T> => {
  const theme = useContext(EuiThemeContext);
  const colorMode = useContext(EuiColorModeContext);
  const highContrastMode = useContext(EuiHighContrastModeContext);
  const modifications = useContext(EuiModificationsContext);

  const isFallback = theme === defaultComputedTheme;
  if (isFallback) {
    emitEuiProviderWarning(providerMessage);
  }

  const assembledTheme = useMemo(
    () => ({
      euiTheme: theme as EuiThemeComputed<T>,
      colorMode,
      highContrastMode,
      modifications: modifications as EuiThemeModifications<T>,
    }),
    [theme, colorMode, highContrastMode, modifications]
  );

  return assembledTheme;
};

/**
 * HOC for class components
 */
export interface WithEuiThemeProps<P extends {} = {}> {
  theme: UseEuiTheme<P>;
}
// Provide the component props interface as the generic to allow the docs props table to populate.
// e.g., `const EuiComponent = withEuiTheme<EuiComponentProps>(_EuiComponent)`
export const withEuiTheme = <T extends {} = {}, U extends {} = {}>(
  Component: React.ComponentType<T & WithEuiThemeProps<U>>
) => {
  const componentName =
    Component.displayName || Component.name || 'ComponentWithTheme';
  const Render = (
    props: Omit<T, keyof WithEuiThemeProps<U>>,
    ref: React.Ref<Omit<T, keyof WithEuiThemeProps<U>>>
  ) => {
    const theme = useEuiTheme<U>();
    return <Component theme={theme} ref={ref} {...(props as T)} />;
  };

  const WithEuiTheme = forwardRef(Render);

  WithEuiTheme.displayName = componentName;

  return WithEuiTheme;
};

/**
 * Render prop alternative for complex class components
 * Most useful for scenarios where a HOC may interfere with typing
 */
export const RenderWithEuiTheme = <T extends {} = {}>({
  children,
}: {
  children: (theme: UseEuiTheme) => React.ReactElement;
}) => {
  const theme = useEuiTheme<T>();
  return children(theme);
};

/**
 * Minor syntactical sugar hook for theme CSS variables.
 * Primarily meant for internal EUI usage.
 */
export const useEuiThemeCSSVariables = () => {
  const {
    setGlobalCSSVariables,
    globalCSSVariables,
    setNearestThemeCSSVariables,
    themeCSSVariables,
  } = useContext(EuiNestedThemeContext);

  return {
    setGlobalCSSVariables,
    globalCSSVariables,
    setNearestThemeCSSVariables,
    themeCSSVariables,
  };
};

/**
 * Checks whether the current active `colorMode` is set to `DARK`;
 * In case of nested providers this returns the value of the nearest provider context.
 */
export const useIsDarkMode = () => {
  const { colorMode } = useEuiTheme();

  return colorMode === COLOR_MODES_STANDARD.dark;
};
