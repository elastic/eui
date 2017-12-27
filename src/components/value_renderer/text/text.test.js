import { text } from './text';

describe('Value Renderer', () => {
  describe('text', () => {

    test('no config - not nil value', () => {
      expect(text('abc')).toBe('abc');
      expect(text(1)).toBe('1');
      const now = Date.now();
      expect(text(new Date(now))).toBe(new Date(now).toString());
      expect(text({ /* simple object */})).toBe('[object Object]');
    });

    test('no config - nil value', () => {
      expect(text()).toBe('');
      expect(text(null)).toBe('');
    });

    test('with config - nil value', () => {
      expect(text.with({ nil: '-' })()).toBe('-');
      expect(text.with({ nil: '-' })(null)).toBe('-');
    });
  });
});
