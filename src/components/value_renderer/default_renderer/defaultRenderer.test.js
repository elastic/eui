import { defaultRenderer } from './defaultRenderer';
import { booleanText } from '../boolean';
import { number } from '../number';
import { text } from '../text';
import { date } from '../date';
import { join } from '../compound';

describe('Value Renderer', () => {
  describe('defaultRenderer', () => {

    test('boolean value', () => {
      expect(defaultRenderer(true)).toBe(booleanText(true));
      expect(defaultRenderer(false)).toBe(booleanText(false));
    });

    test('numeric value', () => {
      expect(defaultRenderer(1234.567)).toBe(number(1234.567));
    });

    test('string value', () => {
      expect(defaultRenderer('value')).toBe(text('value'));
    });

    test('date value', () => {
      const value = new Date(1999, 0, 1, 2, 3, 4, 5);
      expect(defaultRenderer(value)).toBe(date(value));
    });

    test('array of dates', () => {
      const dates = [ new Date(1999, 0, 1, 2, 3, 4, 5) ];
      expect(defaultRenderer(dates)).toBe(join(date)(dates));
    });

    test('object value', () => {
      const obj = { key: 'value' };
      expect(defaultRenderer(obj)).toBe(JSON.stringify(obj));
    });

  });
});
