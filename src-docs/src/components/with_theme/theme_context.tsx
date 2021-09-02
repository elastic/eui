import React from 'react';
import { EUI_THEMES, EUI_THEME } from '../../../../src/themes';
// @ts-ignore importing from a JS file
import { applyTheme } from '../../services';
import { EuiThemeProvider } from '../../../../src/services';
import { EuiThemeAmsterdam } from '../../../../src/themes/eui-amsterdam/theme';
import { EuiThemeDefault } from '../../../../src/themes/eui/theme';

const THEME_NAMES = EUI_THEMES.map(({ value }) => value);

const defaultState = {
  theme: THEME_NAMES[2],
  changeTheme: (themeValue: EUI_THEME['value']) => {
    applyTheme(themeValue);
  },
};

interface State {
  theme: EUI_THEME['value'];
}

export const ThemeContext = React.createContext(defaultState);

export class ThemeProvider extends React.Component<object, State> {
  constructor(props: object) {
    super(props);

    let theme = localStorage.getItem('theme');
    if (!theme || !THEME_NAMES.includes(theme)) theme = defaultState.theme;
    applyTheme(theme);

    this.state = {
      theme,
    };
  }

  changeTheme = (themeValue: EUI_THEME['value']) => {
    this.setState({ theme: themeValue }, () => {
      localStorage.setItem('theme', themeValue);
      applyTheme(themeValue);
    });
  };

  render() {
    const { children } = this.props;
    const { theme } = this.state;
    return (
      <ThemeContext.Provider
        value={{
          theme,
          changeTheme: this.changeTheme,
        }}
      >
        <EuiThemeProvider
          theme={
            theme.includes('amsterdam') ? EuiThemeAmsterdam : EuiThemeDefault
          }
          colorMode={theme.includes('light') ? 'light' : 'dark'}
        >
          {children}
        </EuiThemeProvider>
      </ThemeContext.Provider>
    );
  }
}
