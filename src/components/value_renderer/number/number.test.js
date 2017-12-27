import { number } from '../number';

describe('Value Renderer', () => {
  describe('number', () => {

    const value = 1234.5678;

    test('no config', () => {
      expect(number(value)).toBe(value.toString());
    });

    test('with config - "decimal1" format', () => {
      expect(number.with({ format: 'decimal1' })(value)).toBe('1,234.5');
    });

    test('with config - "decimal1" format - rounded', () => {
      expect(number.with({ format: 'decimal1', round: true })(value)).toBe('1,234.6');
    });

    test('with config - "decimal2" format', () => {
      expect(number.with({ format: 'decimal2' })(value)).toBe('1,234.56');
    });

    test('with config - "decimal2" format - rounded', () => {
      expect(number.with({ format: 'decimal2', round: true })(value)).toBe('1,234.57');
    });

    test('with config - "decimal3" format', () => {
      expect(number.with({ format: 'decimal3' })(value)).toBe('1,234.567');
    });

    test('with config - "decimal3" format - rounded', () => {
      expect(number.with({ format: 'decimal3', round: true })(value)).toBe('1,234.568');
    });

    test('with config - "ordinal" format', () => {
      expect(number.with({ format: 'ordinal' })(1)).toBe('1st');
      expect(number.with({ format: 'ordinal' })(132)).toBe('132nd');
      expect(number.with({ format: 'ordinal' })(89)).toBe('89th');
      expect(number.with({ format: 'ordinal' })(23)).toBe('23rd');
    });

    test('with config - "integer" format', () => {
      expect(number.with({ format: 'integer' })(value)).toBe('1,234');
    });

  });
});
