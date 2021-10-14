import { useContext } from 'react';

import lightColors from './eui_theme_light.json';
import darkColors from './eui_theme_dark.json';
import lightLegacyColors from './eui_legacy_light.json';
import darkLegacyColors from './eui_legacy_dark.json';
import { ThemeContext } from '../../../components';
import { LEGACY_NAME_KEY } from '../../../../../src/themes/legacy/theme';

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
    case `${LEGACY_NAME_KEY}-dark`:
      palette = darkLegacyColors;
      break;
    default:
      palette = lightLegacyColors;
      break;
  }

  return palette;
};
