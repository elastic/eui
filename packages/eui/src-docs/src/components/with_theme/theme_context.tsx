import React, { PropsWithChildren } from 'react';
import { EuiThemeBorealis } from '@elastic/eui-theme-borealis';

import {
  EUI_THEMES,
  EUI_THEME,
  isExperimentalThemeEnabled,
} from '../../../../src/themes';
// @ts-ignore importing from a JS file
import { applyTheme } from '../../services';

const STYLE_STORAGE_KEY = 'js_vs_sass_preference';
const URL_PARAM_KEY = 'themeLanguage';

const EXPERIMENTAL_THEMES: EUI_THEME[] = isExperimentalThemeEnabled()
  ? [
      {
        text: 'Borealis (Light)',
        value: `${EuiThemeBorealis.key}_LIGHT`,
        provider: EuiThemeBorealis,
      },
      {
        text: 'Borealis (Dark)',
        value: `${EuiThemeBorealis.key}_DARK`,
        provider: EuiThemeBorealis,
      },
    ]
  : [];

export const AVAILABLE_THEMES = [...EUI_THEMES, ...EXPERIMENTAL_THEMES];

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

const THEME_NAMES = AVAILABLE_THEMES.map(({ value }) => value);
const THEME_LANGS = theme_languages.map(({ id }) => id);

type ThemeContextType = {
  theme?: EUI_THEME['value'];
  changeTheme: (themeValue: EUI_THEME['value']) => void;
  themeLanguage: THEME_LANGUAGES['id'];
  changeThemeLanguage: (language: THEME_LANGUAGES['id']) => void;
};
export const ThemeContext = React.createContext<ThemeContextType>({
  theme: undefined,
  changeTheme: () => {},
  themeLanguage: THEME_LANGS[0],
  changeThemeLanguage: () => {},
});

type State = Pick<ThemeContextType, 'theme' | 'themeLanguage'>;

export class ThemeProvider extends React.Component<PropsWithChildren, State> {
  constructor(props: object) {
    super(props);

    const theme = localStorage.getItem('theme') || undefined;
    applyTheme(theme && THEME_NAMES.includes(theme) ? theme : THEME_NAMES[0]);

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

    let themeLanguage = (
      fromUrlParam ? `language--${fromUrlParam}` : fromLocalStorage
    ) as THEME_LANGUAGES['id'];

    // If not set by either param or storage, or an invalid value, use the default
    if (!themeLanguage || !THEME_LANGS.includes(themeLanguage))
      themeLanguage = THEME_LANGS[0];

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
