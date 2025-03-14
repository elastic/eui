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
import { type ThemeLanguages } from './language_selector';

// @ts-ignore Sass
import amsterdamThemeLight from '../../theme_amsterdam_light.scss';
// @ts-ignore Sass
import amsterdamThemeDark from '../../theme_amsterdam_dark.scss';

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

export type ThemeContextType = {
  theme?: EUI_THEME['value'];
  colorMode?: EuiThemeColorModeStandard;
  highContrastMode?: boolean;
  i18n?: 'en' | 'en-xa';
  themeLanguage: ThemeLanguages['id']; // TODO: Can likely be deleted once Sass is fully deprecated
  setContext: (context: Partial<State>) => void;
};
export const ThemeContext = React.createContext<ThemeContextType>({
  theme: undefined,
  colorMode: undefined,
  highContrastMode: undefined,
  themeLanguage: 'language--js',
  i18n: 'en',
  setContext: () => {},
});

type State = Pick<
  ThemeContextType,
  'theme' | 'colorMode' | 'highContrastMode' | 'themeLanguage' | 'i18n'
>;

const localStorageKeyToStateMap = {
  themeName: 'theme',
  colorMode: 'colorMode',
  highContrastMode: 'highContrastMode',
  i18n: 'i18n',
  themeLanguage: 'themeLanguage',
} as const;

type LocalStorageKey = keyof typeof localStorageKeyToStateMap;

export class ThemeProvider extends React.Component<PropsWithChildren, State> {
  constructor(props: object) {
    super(props);

    const theme = localStorage.getItem('themeName') || THEME_NAMES[0];
    const colorMode =
      (localStorage.getItem('colorMode') as EuiThemeColorModeStandard) ||
      undefined;

    const highContrastMode = localStorage.getItem('highContrastMode')
      ? localStorage.getItem('highContrastMode') === 'true'
      : undefined;

    const i18n = (localStorage.getItem('i18n') as any) || 'en';

    applyTheme(
      theme && THEME_NAMES.includes(theme) ? theme : THEME_NAMES[0],
      colorMode
    );

    const themeLanguage = this.getThemeLanguage();

    this.state = {
      theme,
      colorMode,
      highContrastMode,
      i18n,
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
    if (state[localStorageKeyToStateMap[key]] !== undefined) {
      localStorage.setItem(key, String(state[localStorageKeyToStateMap[key]]));
    }
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
    const fromUrlParam = new URLSearchParams(urlParams).get('themeLanguage');
    // Otherwise, obtain it from localStorage
    const fromLocalStorage = localStorage.getItem('themeLanguage');

    const themeLanguage = (
      fromUrlParam ? `language--${fromUrlParam}` : fromLocalStorage
    ) as ThemeLanguages['id'];

    // If not set by either param or storage, or an invalid value, use the default
    return themeLanguage || 'language--js';
  };

  setThemeLanguageParam = (languageKey: ThemeLanguages['id']) => {
    const languageValue = languageKey.replace('language--', ''); // Make our params more succinct
    const hash = window?.location?.hash?.split('?'); // Note: we can't use location.search because of our hash router

    const queryParams = hash[1];
    const params = new URLSearchParams(queryParams);
    params.set('themeLanguage', languageValue);

    window.location.hash = `${hash[0]}?${params.toString()}`;
  };

  render() {
    const { children } = this.props;
    const { theme, colorMode, highContrastMode, i18n, themeLanguage } =
      this.state;
    return (
      <ThemeContext.Provider
        value={{
          theme,
          colorMode,
          highContrastMode,
          i18n,
          themeLanguage,
          setContext: this.setContext,
        }}
      >
        {children}
      </ThemeContext.Provider>
    );
  }
}
