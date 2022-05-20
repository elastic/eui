import React from 'react';
import { EUI_THEMES, EUI_THEME } from '../../../../src/themes';
// @ts-ignore importing from a JS file
import { applyTheme } from '../../services';

const STYLE_STORAGE_KEY = 'js_vs_sass_preference';
const URL_PARAM_KEY = 'themeLanguage';

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

    let theme = localStorage.getItem('theme');
    if (!theme || !THEME_NAMES.includes(theme)) theme = defaultState.theme;
    applyTheme(theme);

    const themeLanguage = this.getThemeLanguage();

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

  getThemeLanguage = () => {
    // Allow theme language to be set by URL param, so we can link people
    // to specific docs, e.g. ?themeLanguage=js, ?themeLanguage=sass
    // Note that because of our hash router, this logic only works on page load/full reload
    const urlParams = window?.location?.href?.split('?')[1]; // Note: we can't use location.search because of our hash router
    const fromUrlParam = new URLSearchParams(urlParams).get(URL_PARAM_KEY);
    // Otherwise, obtain it from localStorage
    const fromLocalStorage = localStorage.getItem(STYLE_STORAGE_KEY);

    let themeLanguage = (fromUrlParam
      ? `language--${fromUrlParam}`
      : fromLocalStorage) as THEME_LANGUAGES['id'];

    // If not set by either param or storage, or an invalid value, use the default
    if (!themeLanguage || !THEME_LANGS.includes(themeLanguage))
      themeLanguage = defaultState.themeLanguage;

    return themeLanguage;
  };

  setThemeLanguageParam = (languageKey: THEME_LANGUAGES['id']) => {
    const languageValue = languageKey.replace('language--', ''); // Make our params more succinct
    const hash = window?.location?.hash?.split('?'); // Note: we can't use location.search because of our hash router

    const queryParams = hash[1];
    const params = new URLSearchParams(queryParams);
    params.set(URL_PARAM_KEY, languageValue);

    window.location.hash = `${hash[0]}?${params.toString()}`;
  };

  changeThemeLanguage = (language: THEME_LANGUAGES['id']) => {
    this.setState({ themeLanguage: language }, () => {
      localStorage.setItem(STYLE_STORAGE_KEY, language);
      this.setThemeLanguageParam(language);
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
        {children}
      </ThemeContext.Provider>
    );
  }
}
