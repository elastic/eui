import { hexToHsv } from './hex_to_hsv';

describe('hexToHsv ', () => {
  it('should handle 3 digit codes without a hash prefix', () => {
    expect(hexToHsv('0c8')).toEqual({ h: 160, s: 1, v: 0.8 });
  });

  it('should handle 3 digit codes with a hash prefix', () => {
    expect(hexToHsv('#0c8')).toEqual({ h: 160, s: 1, v: 0.8 });
  });

  it('should handle 6 digit codes without a hash prefix', () => {
    expect(hexToHsv('00cc88')).toEqual({ h: 160, s: 1, v: 0.8 });
  });

  it('should handle 6 digit codes with a hash prefix', () => {
    expect(hexToHsv('#00cc88')).toEqual({ h: 160, s: 1, v: 0.8 });
  });
});
