import { rgbToHex } from './rgb_to_hex';

describe('rgbToHex ', () => {
  it('should handle rgb() without whitespace', () => {
    expect(rgbToHex('rgb(12,34,56)')).toEqual('#0c2238');
  });

  it('should handle rgb() with whitespace', () => {
    expect(rgbToHex('rgb ( 12 , 34 , 56 )')).toEqual('#0c2238');
  });

  it('should handle rgba() without whitespace', () => {
    expect(rgbToHex('rgba(12,34,56,0.4)')).toEqual('#0c2238');
  });

  it('should handle rgba() with whitespace', () => {
    expect(rgbToHex('rgba ( 12 , 34 , 56 , 0.4 )')).toEqual('#0c2238');
  });
});
