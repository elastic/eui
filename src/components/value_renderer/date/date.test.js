import { date } from '../date';

describe('Value Renderer', () => {
  describe('date', () => {

    const value = new Date(1999, 0, 1, 2, 3, 4, 5);

    test('no config - date value', () => {
      expect(date(value)).toBe('1 Jan 1999 02:03');
    });

    test('no config - number value', () => {
      expect(date(value.getTime())).toBe('1 Jan 1999 02:03');
    });

    test('no config - string value', () => {
      expect(date(value.toISOString())).toBe('1 Jan 1999 02:03');
    });

    test('no config - no value', () => {
      expect(date()).toBe('');
    });

    test('with config - no value', () => {
      expect(date.with({ nil: '-' })()).toBe('-');
    });

    test('with config - "date" format', () => {
      expect(date.with({ format: 'date' })(value)).toBe('1 Jan 1999');
    });

    test('with config - "longDate" format', () => {
      expect(date.with({ format: 'longDate' })(value)).toBe('01 January 1999');
    });

    test('with config - "shortDate" format', () => {
      expect(date.with({ format: 'shortDate' })(value)).toBe('1 Jan 99');
    });

    test('with config - "dateTime" format', () => {
      expect(date.with({ format: 'dateTime' })(value)).toBe('1 Jan 1999 02:03');
    });

    test('with config - "longDateTime" format', () => {
      expect(date.with({ format: 'longDateTime' })(value)).toBe('01 January 1999 02:03:04');
    });

    test('with config - "shortDateTime" format', () => {
      expect(date.with({ format: 'shortDateTime' })(value)).toBe('1 Jan 99 02:03');
    });

    test('with config - "iso8601" format', () => {
      expect(date.with({ format: 'iso8601' })(value)).toBe(`1999-01-01T02:03:04.005${formatTimezoneOffset(value.getTimezoneOffset())}`);
    });

    test('with config - custom format', () => {
      expect(date.with({ format: 'YYYY-MM-DD' })(value)).toBe(`1999-01-01`);
    });
  });
});

function formatTimezoneOffset(offset) {
  if (offset === 0) {
    return '+00:00';
  }
  const sign = offset > 0 ? '-' : '+';
  offset = Math.abs(offset);
  let hrs = Math.floor(offset / 60);
  if (hrs < 9) {
    hrs = hrs === 0 ? '00' : `0${hrs}`;
  }
  let mins = offset - hrs * 60;
  if (mins < 9) {
    mins = mins === 0 ? '00' : `0${mins}`;
  }
  return `${sign}${hrs}:${mins}`;
}
