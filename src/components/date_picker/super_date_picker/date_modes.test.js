import { getDateMode, toAbsoluteString, toRelativeString } from './date_modes';

jest.mock('@elastic/datemath', () => ({
  parse: () => ({ toISOString: () => 'gsoc' }),
}));

jest.mock('./relative_utils', () => ({
  parseRelativeParts: () => 'in eui',
  toRelativeStringFromParts: () => 'now',
}));

describe('dateMode', () => {
  test('date mode', () => {
    expect(getDateMode('now')).toBe('now');
    expect(getDateMode('acknowledge')).toBe('relative');
    expect(getDateMode('eui')).toBe('absolute');
  });

  test('absolute string', () => {
    expect(toAbsoluteString('now&1d', true)).toBe('gsoc');
    expect(toAbsoluteString('now/0.5y', false)).toBe('gsoc');
    expect(toAbsoluteString('now-1w/w')).toBe('gsoc');
  });

  test('relative string', () => {
    expect(toRelativeString('now&1d')).toBe('now');
    expect(toRelativeString('now/0.5y')).toBe('now');
    expect(toRelativeString('now-1w/w')).toBe('now');
  });
});
