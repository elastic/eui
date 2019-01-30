import { isWithinRange } from './number';

describe('numbers', () => {

  test('isWithinRange', () => {
    expect(isWithinRange(0, 100, 50)).toBe(true);
    expect(isWithinRange('0', 100, 50)).toBe(true);
    expect(isWithinRange(0, '100', 50)).toBe(true);
    expect(isWithinRange(0, 100, '50')).toBe(true);
    expect(isWithinRange(0, 100, 0)).toBe(true);
    expect(isWithinRange(0, 100, 100)).toBe(true);

    expect(isWithinRange(0, 100, 101)).toBe(false);
    expect(isWithinRange(10, 100, 0)).toBe(false);
    expect(isWithinRange(0, 100, '')).toBe(false);
    expect(isWithinRange(0, 100, null)).toBe(false);
    expect(isWithinRange(0, 100)).toBe(false);
  });
});
