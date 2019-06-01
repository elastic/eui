import { isValidHex } from './is_valid_hex';

describe('isValidHex', () => {
  test('hex3', () => {
    expect(isValidHex('FFF')).toEqual(false);
    expect(isValidHex('#FFF')).toEqual(true);

    expect(isValidHex('#0c8')).toEqual(true);
    expect(isValidHex('#0C8')).toEqual(true);
    expect(isValidHex('0c8')).toEqual(false);

    expect(isValidHex('#MMM')).toEqual(false);
  });

  test('hex4', () => {
    expect(isValidHex('FFFF')).toEqual(false);
    expect(isValidHex('#FFFF')).toEqual(false);

    expect(isValidHex('#0c8f')).toEqual(false);
    expect(isValidHex('#0C8f')).toEqual(false);
    expect(isValidHex('0c8f')).toEqual(false);

    expect(isValidHex('#0000')).toEqual(false);
  });

  test('hex6', () => {
    expect(isValidHex('FFFFFF')).toEqual(false);
    expect(isValidHex('#FFFFFF')).toEqual(true);

    expect(isValidHex('#00cc88')).toEqual(true);
    expect(isValidHex('#00CC88')).toEqual(true);
    expect(isValidHex('00cc88')).toEqual(false);

    expect(isValidHex('#MMMMMM')).toEqual(false);
  });

  test('hex8', () => {
    expect(isValidHex('FFFFFFFF')).toEqual(false);
    expect(isValidHex('#FFFFFFFF')).toEqual(false);

    expect(isValidHex('#000000ff')).toEqual(false);
  });

  test('misc', () => {
    expect(isValidHex('test')).toEqual(false);
    expect(isValidHex('#test')).toEqual(false);

    expect(isValidHex('red')).toEqual(false);

    expect(isValidHex('whitesmoke')).toEqual(false);
  });
});
