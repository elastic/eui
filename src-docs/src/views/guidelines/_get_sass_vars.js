import lightColors from '!!sass-vars-to-js-loader!../../../../src/themes/legacy/_colors_light.scss';
import darkColors from '!!sass-vars-to-js-loader!../../../../src/themes/legacy/_colors_dark.scss';
import lightAmsterdamColors from '!!sass-vars-to-js-loader!../../../../src/themes/amsterdam/_colors_light.scss';
import darkAmsterdamColors from '!!sass-vars-to-js-loader!../../../../src/themes/amsterdam/_colors_dark.scss';
import visColors from '!!sass-vars-to-js-loader!../../../../src/global_styling/variables/_colors_vis.scss';
import { useContext } from 'react';
import { ThemeContext } from '../../components';
import { LEGACY_NAME_KEY } from '../../../../src/themes';

export const useSassVars = () => {
  const themeContext = useContext(ThemeContext);
  let palette;
  switch (themeContext.theme) {
    case `${LEGACY_NAME_KEY}_light`:
      palette = { ...lightColors, ...visColors };
      break;
    case `${LEGACY_NAME_KEY}_dark`:
      palette = { ...darkColors, ...visColors };
      break;
    case 'dark':
      palette = { ...darkAmsterdamColors, ...visColors };
      break;
    default:
      palette = { ...lightAmsterdamColors, ...visColors };
      break;
  }

  return palette;
};
