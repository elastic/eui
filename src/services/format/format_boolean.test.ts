import { formatBoolean } from './format_boolean';

describe('formatBoolean', () => {
  test('no config', () => {
    expect(formatBoolean(true)).toBe('Yes');
    expect(formatBoolean(false)).toBe('No');
  });

  test('with config', () => {
    const config = { yes: 'Aye', no: 'Nay' };
    expect(formatBoolean(true, config)).toBe('Aye');
    expect(formatBoolean(false, config)).toBe('Nay');
  });
});
