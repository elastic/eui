import lightColors from '!!sass-vars-to-js-loader!../../../../src/global_styling/variables/_colors.scss';
import darkColors from '!!sass-vars-to-js-loader!../../../../src/themes/legacy/_colors_dark.scss';
import lightAmsterdamColors from '!!sass-vars-to-js-loader!../../../../src/themes/amsterdam/_colors_light.scss';
import darkAmsterdamColors from '!!sass-vars-to-js-loader!../../../../src/themes/amsterdam/_colors_dark.scss';
import { useContext } from 'react';
import { ThemeContext } from '../../components';
import { LEGACY_NAME_KEY } from '../../../../src/themes';

export const useSassVars = () => {
  const themeContext = useContext(ThemeContext);
  let palette;
  switch (themeContext.theme) {
    case `${LEGACY_NAME_KEY}_light`:
      palette = lightColors;
      break;
    case `${LEGACY_NAME_KEY}_dark`:
      palette = { ...lightColors, ...darkColors };
      break;
    case 'dark':
      palette = { ...lightColors, ...darkColors, ...darkAmsterdamColors };
      break;
    default:
      palette = { ...lightColors, ...lightAmsterdamColors };
      break;
  }

  return palette;
};
