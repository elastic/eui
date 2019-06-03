import { rgbToHsv } from './rgb_to_hsv';

describe('rgbToHsv', () => {
  test('rgbToHsv accurately converts rgb to hsv', () => {
    // white
    expect(rgbToHsv({ r: 255, g: 255, b: 255 })).toMatchObject({
      h: 0,
      s: 0,
      v: 1,
    });
    // black
    expect(rgbToHsv({ r: 0, g: 0, b: 0 })).toMatchObject({
      h: 0,
      s: 0,
      v: 0,
    });
    // Pure red
    expect(rgbToHsv({ r: 255, g: 0, b: 0 })).toMatchObject({
      h: 0,
      s: 1,
      v: 1,
    });
    // yellow
    expect(rgbToHsv({ r: 255, g: 255, b: 0 })).toMatchObject({
      h: 60,
      s: 1,
      v: 1,
    });
    // green
    expect(rgbToHsv({ r: 0, g: 255, b: 0 })).toMatchObject({
      h: 120,
      s: 1,
      v: 1,
    });
    // cyan
    expect(rgbToHsv({ r: 0, g: 255, b: 255 })).toMatchObject({
      h: 180,
      s: 1,
      v: 1,
    });
    // blue
    expect(rgbToHsv({ r: 0, g: 0, b: 255 })).toMatchObject({
      h: 240,
      s: 1,
      v: 1,
    });
    // magenta
    expect(rgbToHsv({ r: 255, g: 0, b: 255 })).toMatchObject({
      h: 300,
      s: 1,
      v: 1,
    });
  });
});
