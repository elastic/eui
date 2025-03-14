import {
  createContext,
  FunctionComponent,
  PropsWithChildren,
  useState,
} from 'react';
import useIsBrowser from '@docusaurus/useIsBrowser';
import {
  EUI_THEME,
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

const defaultState: {
  colorMode: EuiThemeColorMode;
  highContrastMode: boolean | undefined;
  theme: EUI_THEME;
  changeColorMode: (colorMode: EuiThemeColorMode) => void;
  changeHighContrastMode: (highContrastMode: boolean) => void;
  changeTheme: (themeValue: string) => void;
} = {
  colorMode: EUI_COLOR_MODES[0] as EuiThemeColorMode,
  highContrastMode: undefined,
  theme: AVAILABLE_THEMES[0]!,
  changeColorMode: (colorMode: EuiThemeColorMode) => {},
  changeHighContrastMode: (highContrastMode: boolean) => {},
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
        (localStorage.getItem('colorMode') as EuiThemeColorMode) ??
        defaultState.colorMode
      );
    }

    return defaultState.colorMode;
  });

  const [highContrastMode, setHighContrastMode] = useState<boolean | undefined>(
    () => {
      if (isBrowser) {
        return localStorage.getItem('highContrastMode')
          ? localStorage.getItem('highContrastMode') === 'true'
          : defaultState.highContrastMode;
      }

      return defaultState.highContrastMode;
    }
  );

  const [theme, setTheme] = useState(defaultState.theme);

  const handleChangeTheme = (themeValue: string) => {
    const themeObj = AVAILABLE_THEMES.find((t) => t.value === themeValue);

    setTheme((currentTheme) => themeObj ?? currentTheme);
  };

  const handleChangeHighContrastMode = (highContrastMode: boolean) => {
    localStorage.setItem('highContrastMode', highContrastMode.toString());
    setHighContrastMode(highContrastMode);
  };

  return (
    <AppThemeContext.Provider
      value={{
        colorMode,
        highContrastMode,
        theme,
        changeColorMode: setColorMode,
        changeHighContrastMode: handleChangeHighContrastMode,
        changeTheme: handleChangeTheme,
      }}
    >
      <EuiProvider
        globalStyles={false}
        modify={EuiThemeOverrides}
        colorMode={colorMode}
        theme={theme.provider}
        highContrastMode={highContrastMode}
      >
        {children}
      </EuiProvider>
    </AppThemeContext.Provider>
  );
};
