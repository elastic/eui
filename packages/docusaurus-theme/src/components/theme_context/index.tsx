import {
  createContext,
  FunctionComponent,
  PropsWithChildren,
  useState,
} from 'react';
import useIsBrowser from '@docusaurus/useIsBrowser';
import {
  EuiProvider,
  EuiThemeAmsterdam,
  EuiThemeColorMode,
} from '@elastic/eui';
import { EuiThemeBorealis } from '@elastic/eui-theme-borealis';

import { EuiThemeOverrides } from './theme_overrides';

export const AVAILABLE_THEMES = [
  {
    text: 'Borealis',
    value: EuiThemeBorealis.key,
    provider: EuiThemeBorealis,
  },
  {
    text: 'Amsterdam',
    value: EuiThemeAmsterdam.key,
    provider: EuiThemeAmsterdam,
  },
];

const EUI_COLOR_MODES = ['light', 'dark'] as EuiThemeColorMode[];

const defaultState = {
  colorMode: EUI_COLOR_MODES[0] as EuiThemeColorMode,
  changeColorMode: (colorMode: EuiThemeColorMode) => {},
  theme: AVAILABLE_THEMES[0]!,
  changeTheme: (themeValue: string) => {},
};

export const AppThemeContext = createContext(defaultState);

export const AppThemeProvider: FunctionComponent<PropsWithChildren> = ({
  children,
}) => {
  const isBrowser = useIsBrowser();
  const [colorMode, setColorMode] = useState<EuiThemeColorMode>(() => {
    if (isBrowser) {
      return (
        (localStorage.getItem('theme') as EuiThemeColorMode) ??
        defaultState.colorMode
      );
    }

    return defaultState.colorMode;
  });

  const [theme, setTheme] = useState(defaultState.theme);

  const handleChangeTheme = (themeValue: string) => {
    const themeObj = AVAILABLE_THEMES.find((t) => t.value === themeValue);

    setTheme((currentTheme) => themeObj ?? currentTheme);
  };

  return (
    <AppThemeContext.Provider
      value={{
        colorMode,
        theme,
        changeColorMode: setColorMode,
        changeTheme: handleChangeTheme,
      }}
    >
      <EuiProvider
        globalStyles={false}
        modify={EuiThemeOverrides}
        colorMode={colorMode}
        theme={theme.provider}
      >
        {children}
      </EuiProvider>
    </AppThemeContext.Provider>
  );
};
