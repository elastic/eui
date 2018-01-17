import { requiresLightText } from './color_utils';

describe('color utils', () => {
  describe('requiresLightText', () => {

    const DARK_COLORS = [
      [0, 104, 55],
      [165, 0, 38],
      [0, 0, 0],
      [219, 19, 116],
      [73, 0, 146],
      [70, 26, 10],
      [146, 0, 0]
    ];

    const LIGHT_COLORS = [
      [191, 161, 128],
      [249, 133, 16],
      [0, 179, 164],
      [212, 157, 170],
      [255, 255, 255],
      [254, 182, 219],
      [230, 194, 32]
    ];

    DARK_COLORS.forEach(color => {
      it(`should return true for dark color rgb(${color.join(', ')})`, () => {
        expect(requiresLightText(...color)).toBe(true);
      });
    });

    LIGHT_COLORS.forEach(color => {
      it(`should return false for light color rgb(${color.join(', ')})`, () => {
        expect(requiresLightText(...color)).toBe(false);
      });
    });

  });
});
