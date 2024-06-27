import {
  createContext,
  FunctionComponent,
  PropsWithChildren,
  useState,
} from 'react';
import useIsBrowser from '@docusaurus/useIsBrowser';
import { EUI_THEMES, EuiProvider, EuiThemeColorMode } from '@elastic/eui';

import { EuiThemeOverrides } from './theme_overrides';

const EUI_THEME_NAMES = EUI_THEMES.map(
  ({ value }) => value
) as EuiThemeColorMode[];

const defaultState = {
  theme: EUI_THEME_NAMES[0] as EuiThemeColorMode,
  changeTheme: (themeValue: EuiThemeColorMode) => {},
};

export const AppThemeContext = createContext(defaultState);

export const AppThemeProvider: FunctionComponent<PropsWithChildren> = ({
  children,
}) => {
  const isBrowser = useIsBrowser();
  const [theme, setTheme] = useState<EuiThemeColorMode>(() => {
    if (isBrowser) {
      return localStorage.getItem('theme') as EuiThemeColorMode ?? defaultState.theme;
    }

    return defaultState.theme;
  });

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
