import { parseTimeParts } from './quick_select_utils';

describe('parseTimeParts', () => {
  it('should parse now-2h', () => {
    const out = parseTimeParts('now-2h');
    expect(out).toEqual({
      timeValueDefault: 2,
      timeUnitsDefault: 'h',
      timeTenseDefault: 'last',
    });
  });

  it('should parse now+2h', () => {
    const out = parseTimeParts('now+2h');
    expect(out).toEqual({
      timeValueDefault: 2,
      timeUnitsDefault: 'h',
      timeTenseDefault: 'next',
    });
  });
});
