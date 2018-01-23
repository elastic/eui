import { date } from '../date';
import moment from 'moment';

describe('Value Renderer', () => {
  describe('date', () => {

    // 1st January 1999 02:03:04.005
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

    test('with config - "calendarDate" format', () => {
      const options = {
        refTime: value, // 1st January 1999 02:03:04.005 (Friday)
      };
      const oneMonthFromNow = moment(options.refTime).add(1, 'month').toDate();
      expect(date.with({ format: 'calendarDate', options })(oneMonthFromNow)).toBe(`1st Feb 1999`);
      const twoDaysFromNow = moment(options.refTime).add(2, 'day').toDate();
      expect(date.with({ format: 'calendarDate', options })(twoDaysFromNow)).toBe(`Sunday`);
      const oneDayFromNow = moment(options.refTime).add(1, 'day').toDate();
      expect(date.with({ format: 'calendarDate', options })(oneDayFromNow)).toBe(`Tomorrow`);
      const anMinuteAgo = moment(options.refTime).subtract(1, 'minute').toDate();
      expect(date.with({ format: 'calendarDate', options })(anMinuteAgo)).toBe(`Today`);
      const oneDayAgo = moment(options.refTime).subtract(1, 'day').toDate();
      expect(date.with({ format: 'calendarDate', options })(oneDayAgo)).toBe(`Yesterday`);
      const twoDaysWeekAgo = moment(options.refTime).subtract(2, 'day').toDate();
      expect(date.with({ format: 'calendarDate', options })(twoDaysWeekAgo)).toBe(`Last Wednesday`);
      const oneMonthAgo = moment(options.refTime).subtract(1, 'month').toDate();
      expect(date.with({ format: 'calendarDate', options })(oneMonthAgo)).toBe(`1st Dec 1998`);
    });

    test('with config - "calendarDateTime" format', () => {
      const options = {
        refTime: value, // 1st January 1999 02:03:04.005
      };
      const oneMonthFromNow = moment(options.refTime).add(1, 'month').toDate();
      expect(date.with({ format: 'calendarDateTime', options })(oneMonthFromNow)).toBe(`1st Feb 1999 at 2:03AM`);
      const twoDaysFromNow = moment(options.refTime).add(2, 'day').toDate();
      expect(date.with({ format: 'calendarDateTime', options })(twoDaysFromNow)).toBe(`Sunday at 2:03AM`);
      const oneDayFromNow = moment(options.refTime).add(1, 'day').toDate();
      expect(date.with({ format: 'calendarDateTime', options })(oneDayFromNow)).toBe(`Tomorrow at 2:03AM`);
      const anMinuteAgo = moment(options.refTime).subtract(1, 'minute').toDate();
      expect(date.with({ format: 'calendarDateTime', options })(anMinuteAgo)).toBe(`Today at 2:02AM`);
      const oneDayAgo = moment(options.refTime).subtract(1, 'day').toDate();
      expect(date.with({ format: 'calendarDateTime', options })(oneDayAgo)).toBe(`Yesterday at 2:03AM`);
      const twoDaysWeekAgo = moment(options.refTime).subtract(2, 'day').toDate();
      expect(date.with({ format: 'calendarDateTime', options })(twoDaysWeekAgo)).toBe(`Last Wednesday at 2:03AM`);
      const oneMonthAgo = moment(options.refTime).subtract(1, 'month').toDate();
      expect(date.with({ format: 'calendarDateTime', options })(oneMonthAgo)).toBe(`1st Dec 1998 at 2:03AM`);
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
    hrs = `0${hrs}`;
  }
  let mins = offset - hrs * 60;
  if (mins < 9) {
    mins = `0${mins}`;
  }
  return `${sign}${hrs}:${mins}`;
}
