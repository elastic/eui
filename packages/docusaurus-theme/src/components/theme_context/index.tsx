import {
  createContext,
  FunctionComponent,
  PropsWithChildren,
  useState,
} from 'react';
import { EUI_THEMES, EuiProvider, EuiThemeColorMode } from '@elastic/eui';

import { EuiThemeOverrides } from './theme_overrides';

const EUI_THEME_NAMES = EUI_THEMES.map(
  ({ value }) => value
) as EuiThemeColorMode[];

const defaultState = {
  theme: EUI_THEME_NAMES[0],
  changeTheme: (themeValue: EuiThemeColorMode) => {},
};

export const AppThemeContext = createContext(defaultState);

export const AppThemeProvider: FunctionComponent<PropsWithChildren> = ({
  children,
}) => {
  const savedTheme: EuiThemeColorMode | undefined =
    (localStorage.getItem('theme') as EuiThemeColorMode) ?? defaultState.theme;
  const [theme, setTheme] = useState<EuiThemeColorMode>(savedTheme);

  return (
    <AppThemeContext.Provider
      value={{
        theme,
        changeTheme: setTheme,
      }}
    >
      <EuiProvider
        globalStyles={false}
        modify={EuiThemeOverrides}
        colorMode={theme}
      >
        {children}
      </EuiProvider>
    </AppThemeContext.Provider>
  );
};
