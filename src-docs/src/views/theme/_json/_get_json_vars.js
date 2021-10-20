import { useContext } from 'react';

import lightColors from './eui_theme_light.json';
import darkColors from './eui_theme_dark.json';
import lightAmsterdamColors from './eui_theme_amsterdam_light.json';
import darkAmsterdamColors from './eui_theme_amsterdam_dark.json';
import { ThemeContext } from '../../../components';

export const useJsonVars = () => {
  const themeContext = useContext(ThemeContext);

  let palette;
  switch (themeContext.theme) {
    case 'light':
      palette = lightColors;
      break;
    case 'dark':
      palette = darkColors;
      break;
    case 'amsterdam-dark':
      palette = darkAmsterdamColors;
      break;
    default:
      palette = lightAmsterdamColors;
      break;
  }

  return palette;
};
