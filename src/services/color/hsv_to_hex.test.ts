import { hsvToHex } from './hsv_to_hex';

describe('hsvToHex ', () => {
  test('hsvToHex accurately converts hsv to hex', () => {
    // white
    expect(hsvToHex({ h: 0, s: 0, v: 1 })).toEqual('#ffffff');
    // black
    expect(hsvToHex({ h: 0, s: 0, v: 0 })).toEqual('#000000');
    // red
    expect(hsvToHex({ h: 0, s: 1, v: 1 })).toEqual('#ff0000');
    // yellow
    expect(hsvToHex({ h: 60, s: 1, v: 1 })).toEqual('#ffff00');
    // green
    expect(hsvToHex({ h: 120, s: 1, v: 1 })).toEqual('#00ff00');
    // cyan
    expect(hsvToHex({ h: 180, s: 1, v: 1 })).toEqual('#00ffff');
    // blue
    expect(hsvToHex({ h: 240, s: 1, v: 1 })).toEqual('#0000ff');
    // magenta
    expect(hsvToHex({ h: 300, s: 1, v: 1 })).toEqual('#ff00ff');
    // misc.
    expect(hsvToHex({ h: 50, s: 0.4, v: 1 })).toEqual('#ffee99');
    expect(hsvToHex({ h: 50, s: 1, v: 0.4 })).toEqual('#665500');
    expect(hsvToHex({ h: 50, s: 0.25, v: 0.25 })).toEqual('#403d30');
  });
});
