import React from 'react';
import { EUI_THEMES, EUI_THEME } from '../../../../src/themes';
// @ts-ignore importing from a JS file
import { applyTheme } from '../../services';
import { EuiThemeProvider } from '../../../../src/services';
import { EuiThemeAmsterdam } from '../../../../src/themes/eui-amsterdam/theme';
import { EuiThemeDefault } from '../../../../src/themes/eui/theme';

export const STYLE_STORAGE_KEY = 'js_vs_sass_preference';

export type THEME_LANGUAGES = {
  id: 'language--js' | 'language--sass';
  label: string;
  title: string;
};

export const theme_languages: THEME_LANGUAGES[] = [
  {
    id: 'language--js',
    label: 'CSS-in-JS',
    title: 'Language selector: CSS-in-JS',
  },
  {
    id: 'language--sass',
    label: 'Sass',
    title: 'Language selector: Sass',
  },
];

const THEME_NAMES = EUI_THEMES.map(({ value }) => value);
const THEME_LANGS = theme_languages.map(({ id }) => id);

const defaultState = {
  themeLanguage: THEME_LANGS[0],
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  changeThemeLanguage: (language: THEME_LANGUAGES['id']) => {},
  theme: THEME_NAMES[0],
  changeTheme: (themeValue: EUI_THEME['value']) => {
    applyTheme(themeValue);
  },
};

interface State {
  theme: EUI_THEME['value'];
  themeLanguage: THEME_LANGUAGES['id'];
}

export const ThemeContext = React.createContext(defaultState);

export class ThemeProvider extends React.Component<object, State> {
  constructor(props: object) {
    super(props);

    let themeLanguage = localStorage.getItem(
      STYLE_STORAGE_KEY
    ) as THEME_LANGUAGES['id'];
    if (!themeLanguage || !THEME_LANGS.includes(themeLanguage))
      themeLanguage = defaultState.themeLanguage;

    let theme = localStorage.getItem('theme');
    if (!theme || !THEME_NAMES.includes(theme)) theme = defaultState.theme;
    applyTheme(theme);

    this.state = {
      theme,
      themeLanguage,
    };
  }

  changeTheme = (themeValue: EUI_THEME['value']) => {
    this.setState({ theme: themeValue }, () => {
      localStorage.setItem('theme', themeValue);
      applyTheme(themeValue);
    });
  };

  changeThemeLanguage = (language: THEME_LANGUAGES['id']) => {
    this.setState({ themeLanguage: language }, () => {
      localStorage.setItem(STYLE_STORAGE_KEY, language);
    });
  };

  render() {
    const { children } = this.props;
    const { theme, themeLanguage } = this.state;
    return (
      <ThemeContext.Provider
        value={{
          theme,
          themeLanguage,
          changeTheme: this.changeTheme,
          changeThemeLanguage: this.changeThemeLanguage,
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
