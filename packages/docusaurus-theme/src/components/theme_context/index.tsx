/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import {
  createContext,
  FunctionComponent,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from 'react';
import useIsBrowser from '@docusaurus/useIsBrowser';
import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
import { EuiProvider, EuiThemeColorMode } from '@elastic/eui';
import { EuiThemeBorealis } from '@elastic/eui-theme-borealis';
import { type EUI_THEME } from '@elastic/eui-theme-common';

import { EuiThemeOverrides } from './theme_overrides';

export const AVAILABLE_THEMES: EUI_THEME[] = [
  {
    text: 'Borealis',
    value: EuiThemeBorealis.key,
    provider: EuiThemeBorealis,
  },
];

const EUI_COLOR_MODES = ['light', 'dark'] as const;

/**
 * Get the initial color mode: localStorage | light
 */
const getInitialColorMode = (): EuiThemeColorMode => {
  const storedColorMode = localStorage.getItem('colorMode');

  if (storedColorMode === 'light' || storedColorMode === 'dark') {
    return storedColorMode;
  } else {
    return defaultState.colorMode;
  }
};

export interface AppThemeContextData {
  colorMode: EuiThemeColorMode;
  highContrastMode: boolean | undefined;
  theme: EUI_THEME;
  changeColorMode: (colorMode: EuiThemeColorMode) => void;
  changeHighContrastMode: (highContrastMode: boolean) => void;
  changeTheme: (themeValue: string) => void;
}

const defaultState: AppThemeContextData = {
  colorMode: EUI_COLOR_MODES[0],
  highContrastMode: undefined,
  theme: AVAILABLE_THEMES[0] as EUI_THEME,
  changeColorMode: () => {},
  changeHighContrastMode: () => {},
  changeTheme: () => {},
};

/**
 * Creating a cache and passing it to EuiProvider ensures that injected
 * Emotion style tags dev mode are in an expected order (global css before component css).
 * This only applies for @emotion/react css styles, @emotion/css styles are separate.
 */
const cssCache = createCache({
  key: 'website-css',
  prepend: false,
});

export const cssGlobalCache = createCache({
  key: 'website-css',
  prepend: true,
});

export const AppThemeContext = createContext<AppThemeContextData>(defaultState);

export const useAppTheme: () => AppThemeContextData = () => {
  return useContext(AppThemeContext);
};

export const AppThemeProvider: FunctionComponent<PropsWithChildren> = ({
  children,
}) => {
  const isBrowser = useIsBrowser();

  const [colorMode, setColorMode] = useState<EuiThemeColorMode>(() => {
    if (isBrowser) return getInitialColorMode();
    return defaultState.colorMode;
  });

  const [highContrastMode, setHighContrastMode] = useState<boolean | undefined>(
    false
  );

  const getHighContrastModeSetting = () => {
    return localStorage?.getItem('highContrastMode')
      ? localStorage?.getItem('highContrastMode') === 'true'
      : defaultState.highContrastMode;
  };

  useEffect(() => {
    if (isBrowser) {
      setHighContrastMode(getHighContrastModeSetting());
    }
  }, [isBrowser]);

  const [theme, setTheme] = useState<EUI_THEME>(defaultState.theme);

  const handleChangeTheme = (themeValue: string) => {
    const matchedTheme = AVAILABLE_THEMES.find((t) => t.value === themeValue);
    setTheme((currentTheme) => matchedTheme ?? currentTheme);
  };

  const handleChangeHighContrastMode = (highContrastMode: boolean) => {
    localStorage.setItem('highContrastMode', highContrastMode.toString());
    setHighContrastMode(highContrastMode);
  };

  const handleColorMode = (colorMode: EuiThemeColorMode) => {
    localStorage.setItem('colorMode', colorMode);
    setColorMode(colorMode);
  };

  return (
    <AppThemeContext.Provider
      value={{
        colorMode,
        highContrastMode,
        theme,
        changeColorMode: handleColorMode,
        changeHighContrastMode: handleChangeHighContrastMode,
        changeTheme: handleChangeTheme,
      }}
    >
      <EuiProvider
        modify={EuiThemeOverrides}
        colorMode={colorMode}
        theme={theme.provider}
        highContrastMode={highContrastMode}
        cache={{
          default: cssCache,
          global: cssGlobalCache,
        }}
      >
        <CacheProvider value={cssCache}>{children}</CacheProvider>
      </EuiProvider>
    </AppThemeContext.Provider>
  );
};
