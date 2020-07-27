import React from 'react';
import { EUI_THEMES, EUI_THEME } from '../../../../src/themes';
import euiLightTheme from '../../../../src/theme_light';
import euiDarkTheme from '../../../../src/theme_dark';
import amsterdamLightTheme from '../../../../src/theme_amsterdam_light';
import amsterdamDarkTheme from '../../../../src/theme_amsterdam_dark';
import PropagateContext from '../../../../src/services/propagate/propagate_context';
// @ts-ignore importing from a JS file
import { applyTheme } from '../../services';

const THEME_NAMES = EUI_THEMES.map(({ value }) => value);

const defaultState = {
  theme: EUI_THEMES[0].value,
  fullTheme: euiLightTheme(),
  changeTheme: (themeValue: EUI_THEME['value']) => {
    applyTheme(themeValue);
  },
  randomizeLightShade: () => {},
  randomizeHighlight: () => {},
};

interface State {
  theme: EUI_THEME['value'];
  fullTheme: any;
  randomizeLightShade: () => void;
  randomizeHighlight: () => void;
}

export const ThemeContext = React.createContext(defaultState);

export class ThemeProvider extends React.Component<object, State> {
  constructor(props: object) {
    super(props);

    let theme = localStorage.getItem('theme');
    if (!theme || !THEME_NAMES.includes(theme)) theme = defaultState.theme;
    applyTheme(theme);
    const fullTheme = this.setTheme(theme, defaultState.fullTheme);

    this.state = {
      theme,
      fullTheme,
      randomizeLightShade: () => {},
      randomizeHighlight: () => {},
    };
  }

  setTheme = (
    themeValue: EUI_THEME['value'],
    currentTheme: State['fullTheme']
  ): State['fullTheme'] => {
    switch (themeValue) {
      case 'light':
        return euiLightTheme(currentTheme);
      case 'dark':
        return euiDarkTheme(currentTheme);
      case 'amsterdam-light':
        return amsterdamLightTheme(currentTheme);
      case 'amsterdam-dark':
        return amsterdamDarkTheme(currentTheme);
      default:
        return currentTheme;
    }
  };

  changeTheme = (themeValue: EUI_THEME['value']) => {
    // console.log(this.state.fullTheme);
    const fullTheme = this.setTheme(themeValue, this.state.fullTheme);
    this.setState({ theme: themeValue, fullTheme }, () => {
      localStorage.setItem('theme', themeValue);
      applyTheme(themeValue);
    });
  };

  randomizeColor = (variable: string) => {
    this.state.fullTheme.set('colors', {
      ...this.state.fullTheme.get('colors'),
      [variable]: `#${Math.floor(Math.random() * 16777215).toString(16)}`,
    });
  };

  randomizeLightShade = () => {
    this.randomizeColor('euiColorLightShade');
  };

  randomizeHighlight = () => {
    this.randomizeColor('euiColorHighlight');
  };

  render() {
    const { children } = this.props;
    const { theme, fullTheme } = this.state;
    return (
      <PropagateContext.Provider value={fullTheme}>
        <ThemeContext.Provider
          value={{
            theme,
            fullTheme,
            changeTheme: this.changeTheme,
            randomizeLightShade: this.randomizeLightShade,
            randomizeHighlight: this.randomizeHighlight,
          }}>
          {children}
        </ThemeContext.Provider>
      </PropagateContext.Provider>
    );
  }
}
