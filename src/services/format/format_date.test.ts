import { formatDate } from './format_date';
import moment from 'moment';

describe('formatDate', () => {
  // 1st January 1999 02:03:04.005
  const value = new Date(1999, 0, 1, 2, 3, 4, 5);

  test('no config - date value', () => {
    expect(formatDate(value)).toBe('1 Jan 1999 02:03');
  });

  test('no config - number value', () => {
    expect(formatDate(value.getTime())).toBe('1 Jan 1999 02:03');
  });

  test('no config - string value', () => {
    expect(formatDate(value.toISOString())).toBe('1 Jan 1999 02:03');
  });

  test('no config - no value', () => {
    expect(formatDate()).toBe('');
  });

  test('with config - no value', () => {
    expect(formatDate(undefined, { nil: '-' })).toBe('-');
  });

  test('with config - "date" format', () => {
    expect(formatDate(value, 'date')).toBe('1 Jan 1999');
  });

  test('with config - "longDate" format', () => {
    expect(formatDate(value, 'longDate')).toBe('01 January 1999');
  });

  test('with config - "shortDate" format', () => {
    expect(formatDate(value, 'shortDate')).toBe('1 Jan 99');
  });

  test('with config - "dateTime" format', () => {
    expect(formatDate(value, 'dateTime')).toBe('1 Jan 1999 02:03');
  });

  test('with config - "longDateTime" format', () => {
    expect(formatDate(value, 'longDateTime')).toBe('01 January 1999 02:03:04');
  });

  test('with config - "shortDateTime" format', () => {
    expect(formatDate(value, 'shortDateTime')).toBe('1 Jan 99 02:03');
  });

  test('with config - "iso8601" format', () => {
    expect(formatDate(value, 'iso8601')).toBe(
      `1999-01-01T02:03:04.005${formatTimezoneOffset(value.getTimezoneOffset())}`);
  });

  test('with config - "calendarDate" format', () => {
    const options = {
      refTime: value, // 1st January 1999 02:03:04.005 (Friday)
    };

    const oneMonthFromNow = moment(options.refTime).add(1, 'month').toDate();
    expect(formatDate(oneMonthFromNow, { format: 'calendarDate', options })).toBe('1st Feb 1999');

    const twoDaysFromNow = moment(options.refTime).add(2, 'day').toDate();
    expect(formatDate(twoDaysFromNow, { format: 'calendarDate', options })).toBe('Sunday');

    const oneDayFromNow = moment(options.refTime).add(1, 'day').toDate();
    expect(formatDate(oneDayFromNow, { format: 'calendarDate', options })).toBe('Tomorrow');

    const anMinuteAgo = moment(options.refTime).subtract(1, 'minute').toDate();
    expect(formatDate(anMinuteAgo, { format: 'calendarDate', options })).toBe('Today');

    const oneDayAgo = moment(options.refTime).subtract(1, 'day').toDate();
    expect(formatDate(oneDayAgo, { format: 'calendarDate', options })).toBe('Yesterday');

    const twoDaysWeekAgo = moment(options.refTime).subtract(2, 'day').toDate();
    expect(formatDate(twoDaysWeekAgo, { format: 'calendarDate', options })).toBe('Last Wednesday');

    const oneMonthAgo = moment(options.refTime).subtract(1, 'month').toDate();
    expect(formatDate(oneMonthAgo, { format: 'calendarDate', options })).toBe('1st Dec 1998');
  });

  test('with config - "calendarDateTime" format', () => {
    const options = {
      refTime: value, // 1st January 1999 02:03:04.005
    };

    const oneMonthFromNow = moment(options.refTime).add(1, 'month').toDate();
    expect(formatDate(oneMonthFromNow, { format: 'calendarDateTime', options })).toBe('1st Feb 1999 at 2:03AM');

    const twoDaysFromNow = moment(options.refTime).add(2, 'day').toDate();
    expect(formatDate(twoDaysFromNow, { format: 'calendarDateTime', options })).toBe('Sunday at 2:03AM');

    const oneDayFromNow = moment(options.refTime).add(1, 'day').toDate();
    expect(formatDate(oneDayFromNow, { format: 'calendarDateTime', options })).toBe('Tomorrow at 2:03AM');

    const anMinuteAgo = moment(options.refTime).subtract(1, 'minute').toDate();
    expect(formatDate(anMinuteAgo, { format: 'calendarDateTime', options })).toBe('Today at 2:02AM');

    const oneDayAgo = moment(options.refTime).subtract(1, 'day').toDate();
    expect(formatDate(oneDayAgo, { format: 'calendarDateTime', options })).toBe('Yesterday at 2:03AM');

    const twoDaysWeekAgo = moment(options.refTime).subtract(2, 'day').toDate();
    expect(formatDate(twoDaysWeekAgo, { format: 'calendarDateTime', options })).toBe('Last Wednesday at 2:03AM');

    const oneMonthAgo = moment(options.refTime).subtract(1, 'month').toDate();
    expect(formatDate(oneMonthAgo, { format: 'calendarDateTime', options })).toBe('1st Dec 1998 at 2:03AM');
  });

  test('with config - custom format', () => {
    expect(formatDate(value, 'YYYY-MM-DD')).toBe('1999-01-01');
  });
});

function formatTimezoneOffset(offset: number) {
  if (offset === 0) {
    return '+00:00';
  }
  const sign = offset > 0 ? '-' : '+';
  offset = Math.abs(offset);
  const hrs = Math.floor(offset / 60);
  const mins = offset - hrs * 60;
  return `${sign}${hrs < 9 ? '0' : ''}${hrs}:${mins < 9 ? '0' : ''}${mins}`;
}
