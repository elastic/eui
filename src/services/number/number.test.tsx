import { isEvenlyDivisibleBy, isWithinRange } from './number';

describe('numbers', () => {
  test('isWithinRange', () => {
    // True
    expect(isWithinRange(0, 100, 50)).toBe(true);
    expect(isWithinRange('0', 100, 50)).toBe(true);
    expect(isWithinRange(0, '100', 50)).toBe(true);
    expect(isWithinRange(0, 100, '50')).toBe(true);
    expect(isWithinRange(0, 100, 0)).toBe(true);
    expect(isWithinRange(0, 100, 100)).toBe(true);
    expect(isWithinRange(-10, 10, 5)).toBe(true);
    expect(isWithinRange(-10, 10, -5)).toBe(true);
    expect(isWithinRange('-10', 10, '-5')).toBe(true);
    // False
    expect(isWithinRange(0, 100, 101)).toBe(false);
    expect(isWithinRange(10, 100, 0)).toBe(false);
    expect(isWithinRange(0, 100, -10)).toBe(false);
    expect(isWithinRange(0, 100, '')).toBe(false);
  });

  describe('isEvenlyDivisibleBy', () => {
    it('correctly computes for integers', () => {
      expect(isEvenlyDivisibleBy(10, 1)).toBe(true);
      expect(isEvenlyDivisibleBy(10, 2)).toBe(true);
      expect(isEvenlyDivisibleBy(10, 10)).toBe(true);

      expect(isEvenlyDivisibleBy(10, 3)).toBe(false);
      expect(isEvenlyDivisibleBy(1, 3)).toBe(false);
    });

    it('correctly computes for decimals', () => {
      expect(isEvenlyDivisibleBy(1, 0.1)).toBe(true);
      expect(isEvenlyDivisibleBy(1, 0.2)).toBe(true);
      expect(isEvenlyDivisibleBy(1, 0.25)).toBe(true);
      expect(isEvenlyDivisibleBy(1, 0.5)).toBe(true);
      expect(isEvenlyDivisibleBy(1, 0.3)).toBe(false);
      expect(isEvenlyDivisibleBy(1, 0.51)).toBe(false);
      expect(isEvenlyDivisibleBy(1, 0.9)).toBe(false);
      expect(isEvenlyDivisibleBy(1000000, 0.00001)).toBe(true);
      expect(isEvenlyDivisibleBy(1000000, 0.00002)).toBe(true);
      expect(isEvenlyDivisibleBy(1000000, 0.00005)).toBe(true);
      expect(isEvenlyDivisibleBy(15000000, 0.000075)).toBe(true);

      expect(isEvenlyDivisibleBy(3, 0.5)).toBe(true);
      expect(isEvenlyDivisibleBy(3, 1.5)).toBe(true);
      expect(isEvenlyDivisibleBy(3, 0.61)).toBe(false);
      expect(isEvenlyDivisibleBy(3, 2.9)).toBe(false);

      expect(isEvenlyDivisibleBy(2.75, 0.25)).toBe(true);
      expect(isEvenlyDivisibleBy(2.75, 0.55)).toBe(true);
      expect(isEvenlyDivisibleBy(2.75, 1.375)).toBe(true);
      expect(isEvenlyDivisibleBy(2.75, 0.1)).toBe(false);
      expect(isEvenlyDivisibleBy(2.75, 0.5)).toBe(false);
      expect(isEvenlyDivisibleBy(2.75, 1.374)).toBe(false);
      expect(isEvenlyDivisibleBy(2.75, 1.376)).toBe(false);
    });

    it('returns false when factor is 0', () => {
      expect(isEvenlyDivisibleBy(1, 0)).toBe(false);
      expect(isEvenlyDivisibleBy(100, 0)).toBe(false);
      expect(isEvenlyDivisibleBy(-100, 0)).toBe(false);
      expect(isEvenlyDivisibleBy(1.5, 0)).toBe(false);
    });

    it('handles known floating point error cases', () => {
      expect(isEvenlyDivisibleBy(1, 0.05)).toBe(true);
    });
  });
});
