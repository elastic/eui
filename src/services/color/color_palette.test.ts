import { colorPalette} from './color_palette';

describe('colorPalette', () => {
  it('should generate the expected palette', () => {
    const actualPalette = colorPalette('#FFFF6D', '#1EA593');
    expect(actualPalette).toEqual([
      '#FFFF6D',
      '#E6F571',
      '#CDEB75',
      '#B4E17A',
      '#9BD77E',
      '#82CD82',
      '#69C386',
      '#50B98B',
      '#37AF8F',
      '#1EA593',
    ]);
  });

  it('should generate a palette with the specified spread', () => {
    const actualPalette = colorPalette('#FFFF6D', '#1EA593', 6);
    expect(actualPalette).toEqual([
      '#FFFF6D',
      '#D2ED75',
      '#A5DB7C',
      '#78C984',
      '#4BB78B',
      '#1EA593',
    ]);
  });
});
