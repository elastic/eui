import React, { PropsWithChildren } from 'react';
import {
  EUI_THEME_BOREALIS_KEY,
  EuiThemeBorealis,
} from '@elastic/eui-theme-borealis';

import {
  EUI_THEME,
  AMSTERDAM_NAME_KEY,
  EuiThemeAmsterdam,
} from '../../../../src/themes';
import { EuiThemeColorModeStandard } from '../../../../src/services';
// @ts-ignore importing from a JS file
import { applyTheme, registerTheme } from '../../services';

// @ts-ignore Sass
import amsterdamThemeLight from '../../theme_light.scss';
// @ts-ignore Sass
import amsterdamThemeDark from '../../theme_dark.scss';

// @ts-ignore Sass
import borealisThemeLight from '../../theme_borealis_light.scss';
// @ts-ignore Sass
import borealisThemeDark from '../../theme_borealis_dark.scss';

const THEME_CSS_MAP = {
  [AMSTERDAM_NAME_KEY]: {
    LIGHT: amsterdamThemeLight,
    DARK: amsterdamThemeDark,
  },
  [EUI_THEME_BOREALIS_KEY]: {
    LIGHT: borealisThemeLight,
    DARK: borealisThemeDark,
  },
};

export const AVAILABLE_THEMES = [
  {
    text: 'Borealis',
    value: EuiThemeBorealis.key,
    provider: EuiThemeBorealis,
  },
  {
    text: 'Amsterdam',
    value: AMSTERDAM_NAME_KEY,
    provider: EuiThemeAmsterdam,
  },
];
const THEME_NAMES = AVAILABLE_THEMES.map(({ value }) => value);

AVAILABLE_THEMES.forEach((theme) => {
  registerTheme(
    theme.value,
    THEME_CSS_MAP[theme.value as keyof typeof THEME_CSS_MAP]
  );
});

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
const THEME_LANGS = theme_languages.map(({ id }) => id);

export type ThemeContextType = {
  theme: EUI_THEME['value'];
  colorMode: EuiThemeColorModeStandard;
  themeLanguage: THEME_LANGUAGES['id'];
  setContext: (context: Partial<State>) => void;
};
export const ThemeContext = React.createContext<ThemeContextType>({
  theme: THEME_NAMES[0],
  colorMode: 'LIGHT',
  themeLanguage: THEME_LANGS[0],
  setContext: () => {},
});

type State = Pick<ThemeContextType, 'theme' | 'colorMode' | 'themeLanguage'>;

const localStorageKeyToStateMap = {
  themeName: 'theme',
  colorMode: 'colorMode',
  themeLanguage: 'themeLanguage',
} as const;

type LocalStorageKey = keyof typeof localStorageKeyToStateMap;

export class ThemeProvider extends React.Component<PropsWithChildren, State> {
  constructor(props: object) {
    super(props);

    const theme = localStorage.getItem('themeName') || THEME_NAMES[0];
    const colorMode =
      (localStorage.getItem('colorMode') as EuiThemeColorModeStandard) ||
      'LIGHT';

    applyTheme(
      theme && THEME_NAMES.includes(theme) ? theme : THEME_NAMES[0],
      colorMode
    );

    const themeLanguage = this.getThemeLanguage();

    this.state = {
      theme,
      colorMode,
      themeLanguage,
    };

    Object.keys(localStorageKeyToStateMap).forEach((key) =>
      this.updateLocalStorage(key as LocalStorageKey, this.state)
    );
  }

  setContext = (state: Partial<State>) => {
    this.setState((prevState) => {
      return { ...prevState, ...state };
    });
  };

  updateLocalStorage = (key: LocalStorageKey, state: State) => {
    localStorage.setItem(key, String(state[localStorageKeyToStateMap[key]]));
  };

  componentDidUpdate(_prevProps: never, prevState: State) {
    Object.keys(localStorageKeyToStateMap).forEach((key) => {
      const _key = key as LocalStorageKey;
      const stateKey = localStorageKeyToStateMap[_key];

      if (
        prevState[stateKey] !== this.state[stateKey] ||
        localStorage.getItem(_key) === null
      ) {
        this.updateLocalStorage(_key, this.state);

        // Side effects
        if (_key === 'themeName' || _key === 'colorMode') {
          applyTheme(this.state.theme, this.state.colorMode);
        }
        if (_key === 'themeLanguage') {
          this.setThemeLanguageParam(this.state.themeLanguage!);
        }
      }
    });
  }

  getThemeLanguage = () => {
    // Allow theme language to be set by URL param, so we can link people
    // to specific docs, e.g. ?themeLanguage=js, ?themeLanguage=sass
    // Note that because of our hash router, this logic only works on page load/full reload
    const urlParams = window?.location?.href?.split('?')[1]; // Note: we can't use location.search because of our hash router
    const fromUrlParam = new URLSearchParams(urlParams).get(URL_PARAM_KEY);
    // Otherwise, obtain it from localStorage
    const fromLocalStorage = localStorage.getItem(URL_PARAM_KEY);

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

  render() {
    const { children } = this.props;
    const { theme, colorMode, themeLanguage } = this.state;
    return (
      <ThemeContext.Provider
        value={{
          theme,
          colorMode,
          themeLanguage,
          setContext: this.setContext,
        }}
      >
        {children}
      </ThemeContext.Provider>
    );
  }
}
