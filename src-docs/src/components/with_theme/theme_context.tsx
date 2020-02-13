import React from 'react';
import { EUI_THEMES, EUI_THEME } from '../../../../src/themes';
// @ts-ignore
import { applyTheme } from '../../services';

const defaultState = {
  theme: EUI_THEMES[0].value,
  themeIsLoading: false,
  changeTheme: (themeValue: EUI_THEME['value']) => {
    applyTheme(themeValue);
  },
};

interface State {
  theme: EUI_THEME['value'];
  themeIsLoading: boolean;
}

export const ThemeContext = React.createContext(defaultState);

export class ThemeProvider extends React.Component<object, State> {
  constructor(props: object) {
    super(props);

    const theme = localStorage.getItem('theme') || defaultState.theme;
    applyTheme(theme);

    this.state = {
      theme,
      themeIsLoading: false,
    };
  }

  changeTheme = (themeValue: EUI_THEME['value']) => {
    this.setState({ theme: themeValue, themeIsLoading: true }, () => {
      localStorage.setItem('theme', themeValue);
      applyTheme(themeValue);
    });
  };

  render() {
    const { children } = this.props;
    const { theme, themeIsLoading } = this.state;
    return (
      <ThemeContext.Provider
        value={{
          theme,
          themeIsLoading,
          changeTheme: this.changeTheme,
        }}>
        {children}
      </ThemeContext.Provider>
    );
  }
}
