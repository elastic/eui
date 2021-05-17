import lightColors from '!!sass-vars-to-js-loader!../../../../src/global_styling/variables/_colors.scss';
import darkColors from '!!sass-vars-to-js-loader!../../../../src/themes/eui/eui_colors_dark.scss';
import lightAmsterdamColors from '!!sass-vars-to-js-loader!../../../../src/themes/eui-amsterdam/eui_amsterdam_colors_light.scss';
import darkAmsterdamColors from '!!sass-vars-to-js-loader!../../../../src/themes/eui-amsterdam/eui_amsterdam_colors_dark.scss';
import impervaColors from '!!sass-vars-to-js-loader!../../../../src/themes/imperva/imperva_colors.scss';

export const getSassVars = theme => {
  let palette;
  switch (theme) {
    case 'amsterdam-dark':
      palette = { ...darkColors, ...darkAmsterdamColors };
      break;
    case 'amsterdam-light':
      palette = { ...lightColors, ...lightAmsterdamColors };
      break;
    case 'dark':
      palette = darkColors;
      break;
    case 'light':
    case 'imperva':
    default:
      palette = { ...lightColors, ...impervaColors };
      break;
  }

  return palette;
};
