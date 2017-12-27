import { property } from './property';

describe('Value Renderer', () => {
  describe('property', () => {

    const render = (value) => value.toUpperCase();

    test('simple object - one level prop', () => {
      const obj = { key: 'value' };
      expect(property('key', render)(obj)).toBe('VALUE');
    });

    test('simple object - multi level prop', () => {
      const obj = { key1: { key2: { key3: 'value' } } };
      expect(property('key1.key2.key3', render)(obj)).toBe('VALUE');
    });

  });
});
