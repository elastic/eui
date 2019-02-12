import { hexToRgb } from './hex_to_rgb';

describe('hexToRgb ', () => {
  it('should handle 3 digit codes without a hash prefix', () => {
    expect(hexToRgb('0a8')).toEqual([0, 170, 136]);
  });

  it('should handle 3 digit codes with a hash prefix', () => {
    expect(hexToRgb('#0a8')).toEqual([0, 170, 136]);
  });

  it('should handle 6 digit codes without a hash prefix', () => {
    expect(hexToRgb('00aa88')).toEqual([0, 170, 136]);
  });

  it('should handle 6 digit codes with a hash prefix', () => {
    expect(hexToRgb('#00aa88')).toEqual([0, 170, 136]);
  });
});
