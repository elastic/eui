import { colorPalette } from './color_palette';

describe('colorPalette', () => {
  it('should generate the expected palette', () => {
    const actualPalette = colorPalette(['#FFFF6D', '#1EA593']);
    expect(actualPalette).toEqual([
      '#ffff6d',
      '#e6f571',
      '#cdeb75',
      '#b4e17a',
      '#9bd77e',
      '#82cd82',
      '#69c386',
      '#50b98b',
      '#37af8f',
      '#1ea593',
    ]);
  });

  it('should generate a palette with the specified spread', () => {
    const actualPalette = colorPalette(['#FFFF6D', '#1EA593'], 6);
    expect(actualPalette).toEqual([
      '#ffff6d',
      '#d2ed75',
      '#a5db7c',
      '#78c984',
      '#4bb78b',
      '#1ea593',
    ]);
  });
});
