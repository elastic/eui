import { booleanText } from './boolean_text';

describe('Value Renderer', () => {
  describe('booleanText', () => {

    test('no config', () => {
      expect(booleanText(true)).toBe('Yes');
      expect(booleanText(false)).toBe('No');
    });

    test('with config', () => {
      expect(booleanText.with({ yes: 'Aye', no: 'Nay' })(true)).toBe('Aye');
      expect(booleanText.with({ yes: 'Aye', no: 'Nay' })(false)).toBe('Nay');
    });

  });
});
