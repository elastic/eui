import { useContext } from 'react';

import lightColors from './eui_theme_light.json';
import darkColors from './eui_theme_dark.json';
import { ThemeContext } from '../../../components';

export const useJsonVars = () => {
  const themeContext = useContext(ThemeContext);

  let palette;
  switch (themeContext.theme) {
    case 'dark':
      palette = darkColors;
      break;
    default:
      palette = lightColors;
      break;
  }

  return palette;
};
