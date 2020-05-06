import React from 'react';
// import { ThemeProvider as EmotionThemeProvider } from 'emotion-theming';
import { EUI_THEMES, EUI_THEME } from '../../../../src/themes';
import euiLightTheme from '../../../../src/theme_light';
import euiDarkTheme from '../../../../src/theme_dark';
import PropagateContext from '../../../../src/services/propagate/propagate_context';
// @ts-ignore
import { applyTheme } from '../../services';

const defaultState = {
  theme: EUI_THEMES[0].value,
  fullTheme: euiLightTheme(),
  changeTheme: (themeValue: EUI_THEME['value']) => {
    applyTheme(themeValue);
  },
  randomizeLightShade: () => {},
};

interface State {
  theme: EUI_THEME['value'];
  fullTheme: any;
  randomizeLightShade: () => void;
}

export const ThemeContext = React.createContext(defaultState);

export class ThemeProvider extends React.Component<object, State> {
  constructor(props: object) {
    super(props);

    const theme = localStorage.getItem('theme') || defaultState.theme;
    applyTheme(theme);
    const fullTheme =
      theme === 'light'
        ? defaultState.fullTheme
        : euiDarkTheme(defaultState.fullTheme);

    this.state = {
      theme,
      fullTheme,
      randomizeLightShade: () => {},
    };
  }

  changeTheme = (themeValue: EUI_THEME['value']) => {
    console.log(this.state.fullTheme);
    const fullTheme =
      themeValue === 'light'
        ? euiLightTheme(this.state.fullTheme)
        : euiDarkTheme(this.state.fullTheme);
    this.setState({ theme: themeValue, fullTheme }, () => {
      localStorage.setItem('theme', themeValue);
      applyTheme(themeValue);
    });
  };

  randomizeLightShade = () => {
    this.state.fullTheme.set('colors', {
      ...this.state.fullTheme.get('colors'),
      euiColorLightShade: `#${Math.floor(Math.random() * 16777215).toString(
        16
      )}`,
    });
    // this.state.fullTheme.set(
    //   'euiColorLightShade',
    //   `#${Math.floor(Math.random() * 16777215).toString(16)}`
    // );
    // euiBorderColor
  };

  render() {
    const { children } = this.props;
    const { theme, fullTheme } = this.state;
    return (
      <PropagateContext.Provider value={fullTheme}>
        {/*<EmotionThemeProvider theme={{ name: theme, ...fullTheme }}>*/}
        <ThemeContext.Provider
          value={{
            theme,
            fullTheme,
            changeTheme: this.changeTheme,
            randomizeLightShade: this.randomizeLightShade,
          }}>
          {children}
        </ThemeContext.Provider>
        {/*</EmotionThemeProvider>*/}
      </PropagateContext.Provider>
    );
  }
}
