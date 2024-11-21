import React, { PropsWithChildren } from 'react';
import {
  EUI_THEMES,
  EUI_THEME,
  AMSTERDAM_NAME_KEY,
} from '../../../../src/themes';
import { EuiThemeColorModeStandard } from '../../../../src/services';
// @ts-ignore importing from a JS file
import { applyTheme, registerTheme } from '../../services';

// @ts-ignore Sass
import amsterdamThemeLight from '../../theme_light.scss';
// @ts-ignore Sass
import amsterdamThemeDark from '../../theme_dark.scss';
const THEME_CSS_MAP = {
  [AMSTERDAM_NAME_KEY]: {
    LIGHT: amsterdamThemeLight,
    DARK: amsterdamThemeDark,
  },
};
EUI_THEMES.forEach((theme) => {
  registerTheme(
    theme.value,
    THEME_CSS_MAP[theme.value as keyof typeof THEME_CSS_MAP]
  );
});
const THEME_NAMES = EUI_THEMES.map(({ value }) => value);

import { type ThemeLanguages } from './language_selector';

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

export class ThemeProvider extends React.Component<PropsWithChildren, State> {
  constructor(props: object) {
    super(props);

    const theme = localStorage.getItem('theme') || undefined;
    applyTheme(theme && THEME_NAMES.includes(theme) ? theme : THEME_NAMES[0]);

    const colorMode =
      (localStorage.getItem('colorMode') as EuiThemeColorModeStandard) ||
      undefined;

    const highContrastMode = localStorage.getItem('highContrastMode')
      ? localStorage.getItem('highContrastMode') === 'true'
      : undefined;

    const i18n = (localStorage.getItem('i18n') as any) || 'en';

    const themeLanguage = this.getThemeLanguage();

    this.state = {
      theme,
      colorMode,
      highContrastMode,
      i18n,
      themeLanguage,
    };
  }

  setContext = (state: Partial<State>) => {
    this.setState(state as State);
  };

  componentDidUpdate(_prevProps: never, prevState: State) {
    const stateToSetInLocalStorage = [
      'theme',
      'colorMode',
      'highContrastMode',
      'i18n',
      'themeLanguage',
    ] as const;

    stateToSetInLocalStorage.forEach((key) => {
      if (prevState[key] !== this.state[key]) {
        localStorage.setItem(key, String(this.state[key]));

        // Side effects
        if (key === 'theme') {
          applyTheme(this.state.theme);
        }
        if (key === 'themeLanguage') {
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
