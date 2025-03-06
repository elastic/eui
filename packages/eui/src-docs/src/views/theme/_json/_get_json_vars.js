import { useContext } from 'react';

import { EUI_THEME_BOREALIS_KEY } from '@elastic/eui-theme-borealis';
import borealisLightColors from '@elastic/eui-theme-borealis/lib/eui_theme_borealis_light.json';
import borealisDarkColors from '@elastic/eui-theme-borealis/lib/eui_theme_borealis_dark.json';

import { ThemeContext } from '../../../components';
import lightColors from './eui_theme_amsterdam_light.json';
import darkColors from './eui_theme_amsterdam_dark.json';

export const useJsonVars = () => {
  const themeContext = useContext(ThemeContext);
  const isNewTheme =
    themeContext.theme?.includes(EUI_THEME_BOREALIS_KEY) ?? false;

  const darkTokens = isNewTheme ? borealisDarkColors : darkColors;
  const lightTokens = isNewTheme ? borealisLightColors : lightColors;

  let palette;
  switch (themeContext.colorMode) {
    case 'DARK':
      palette = darkTokens;
      break;
    default:
      palette = lightTokens;
      break;
  }

  return palette;
};
