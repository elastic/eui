import {
  createContext,
  FunctionComponent,
  PropsWithChildren,
  useState,
} from 'react';
import useIsBrowser from '@docusaurus/useIsBrowser';
import { EUI_THEMES, EuiProvider, EuiThemeColorMode } from '@elastic/eui';

import { EuiThemeOverrides } from './theme_overrides';

const EUI_THEME_NAMES = EUI_THEMES.map(({ value }) => value);

const defaultState = {
  theme: EUI_THEME_NAMES[0] as string,
  colorMode: 'LIGHT' as EuiThemeColorMode,
  changeTheme: (themeValue: EuiThemeColorMode) => {},
  changeColorMode: (colorMode: EuiThemeColorMode) => {},
};

export const AppThemeContext = createContext(defaultState);

export const AppThemeProvider: FunctionComponent<PropsWithChildren> = ({
  children,
}) => {
  const isBrowser = useIsBrowser();

  const [theme, setTheme] = useState<string>(() => {
    if (isBrowser) {
      return (
        (localStorage.getItem('theme') as EuiThemeColorMode) ??
        defaultState.theme
      );
    }

    return defaultState.theme;
  });

  const [colorMode, setColorMode] = useState<EuiThemeColorMode>(() => {
    if (isBrowser) {
      return (
        (localStorage.getItem('colorMode') as EuiThemeColorMode) ??
        defaultState.colorMode
      );
    }

    return defaultState.colorMode;
  });

  return (
    <AppThemeContext.Provider
      value={{
        theme: theme,
        colorMode,
        changeTheme: setTheme,
        changeColorMode: setColorMode,
      }}
    >
      <EuiProvider
        globalStyles={false}
        modify={EuiThemeOverrides}
        colorMode={colorMode}
      >
        {children}
      </EuiProvider>
    </AppThemeContext.Provider>
  );
};
