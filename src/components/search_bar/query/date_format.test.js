import { dateFormat, dateGranularity, Granularity } from './date_format';
import { Random } from '../../../services/random';
import moment from 'moment';

const random = new Random();
const originalMomentNow = moment.now;

const now = random.moment().utc();

beforeEach(() => {
  moment.now = () => +now;
});

afterEach(() => {
  moment.now = originalMomentNow;
});

describe('date format', () => {
  test.skip('parse - explicit date', () => {
    const parsed = dateFormat.parse('2018-01-02T22:33:44.555Z');
    expect(parsed.utcOffset()).toBe(0);
    expect(parsed.year()).toBe(2018);
    expect(parsed.month()).toBe(0);
    expect(parsed.date()).toBe(2);
    expect(parsed.hours()).toBe(22);
    expect(parsed.minutes()).toBe(33);
    expect(parsed.seconds()).toBe(44);
    expect(parsed.milliseconds()).toBe(555);
    expect(dateGranularity(parsed)).toBeUndefined();
  });

  test.skip('parse - explicit date 2', () => {
    [
      '12 January 2018 22:33:44',
      '12 January 18 22:33:44',
      '12 Jan 18 22:33:44',
      '12 Jan 2018 22:33:44',
    ].forEach(time => {
      const parsed = dateFormat.parse(time);
      expect(parsed.utcOffset()).toBe(0);
      expect(parsed.year()).toBe(2018);
      expect(parsed.month()).toBe(0);
      expect(parsed.date()).toBe(12);
      expect(parsed.hours()).toBe(22);
      expect(parsed.minutes()).toBe(33);
      expect(parsed.seconds()).toBe(44);
      expect(dateGranularity(parsed)).toBeUndefined();
    });
  });

  test.skip('parse - explicit date 3', () => {
    [
      '12 January 2018 22:33',
      '12 January 18 22:33',
      '12 Jan 18 22:33',
      '12 Jan 2018 22:33',
    ].forEach(time => {
      const parsed = dateFormat.parse(time);
      expect(parsed.utcOffset()).toBe(0);
      expect(parsed.year()).toBe(2018);
      expect(parsed.month()).toBe(0);
      expect(parsed.date()).toBe(12);
      expect(parsed.hours()).toBe(22);
      expect(parsed.minutes()).toBe(33);
      expect(parsed.seconds()).toBe(0);
      expect(dateGranularity(parsed)).toBeUndefined();
    });
  });

  test.skip('parse - time', () => {
    ['22:33', '10:33 PM', '10:33 pm'].forEach(time => {
      const parsed = dateFormat.parse(time);
      expect(parsed.utcOffset()).toBe(0);
      expect(parsed.year()).toBe(now.year());
      expect(parsed.month()).toBe(now.month());
      expect(parsed.date()).toBe(now.date());
      expect(parsed.hours()).toBe(22);
      expect(parsed.minutes()).toBe(33);
      expect(parsed.seconds()).toBe(0);
      expect(dateGranularity(parsed)).toBeUndefined();
    });

    ['04:33', '4:33', '4:33 AM', '4:33 am'].forEach(time => {
      const parsed = dateFormat.parse(time);
      expect(parsed.utcOffset()).toBe(0);
      expect(parsed.year()).toBe(now.year());
      expect(parsed.month()).toBe(now.month());
      expect(parsed.date()).toBe(now.date());
      expect(parsed.hours()).toBe(4);
      expect(parsed.minutes()).toBe(33);
      expect(parsed.seconds()).toBe(0);
      expect(dateGranularity(parsed)).toBeUndefined();
    });
  });

  test.skip('parse - day granularity', () => {
    [
      '2 Jan 18',
      '2nd Jan 18',
      '2 Jan 2018',
      '2nd Jan 2018',
      '02 Jan 18',
      '02 jan 2018',
      '2 January 18',
      '2nd January 18',
      '2 January 2018',
      '2nd January 2018',
      '02 January 18',
      '02 January 2018',
    ].forEach(time => {
      const parsed = dateFormat.parse(time);
      expect(parsed.utcOffset()).toBe(0);
      expect(parsed.year()).toBe(2018);
      expect(parsed.month()).toBe(0);
      expect(parsed.date()).toBe(2);
      expect(parsed.hours()).toBe(0);
      expect(parsed.minutes()).toBe(0);
      expect(parsed.seconds()).toBe(0);
      expect(dateGranularity(parsed)).toBe(Granularity.DAY);
    });

    const sunday = moment(now).subtract(now.day(), 'days');
    ['Sun', 'Sunday'].forEach(time => {
      const parsed = dateFormat.parse(time);
      expect(parsed.utcOffset()).toBe(0);
      expect(parsed.year()).toBe(sunday.year());
      expect(parsed.month()).toBe(sunday.month());
      expect(parsed.date()).toBe(sunday.date());
      expect(parsed.hours()).toBe(0);
      expect(parsed.minutes()).toBe(0);
      expect(parsed.seconds()).toBe(0);
      expect(dateGranularity(parsed)).toBe(Granularity.DAY);
    });

    const today = now;
    let parsed = dateFormat.parse('today');
    expect(parsed.utcOffset()).toBe(0);
    expect(parsed.year()).toBe(today.year());
    expect(parsed.month()).toBe(today.month());
    expect(parsed.date()).toBe(today.date());
    expect(parsed.hours()).toBe(0);
    expect(parsed.minutes()).toBe(0);
    expect(parsed.seconds()).toBe(0);
    expect(dateGranularity(parsed)).toBe(Granularity.DAY);

    const tomorrow = moment(today).add(1, 'days');
    parsed = dateFormat.parse('tomorrow');
    expect(parsed.utcOffset()).toBe(0);
    expect(parsed.year()).toBe(tomorrow.year());
    expect(parsed.month()).toBe(tomorrow.month());
    expect(parsed.date()).toBe(tomorrow.date());
    expect(parsed.hours()).toBe(0);
    expect(parsed.minutes()).toBe(0);
    expect(parsed.seconds()).toBe(0);
    expect(dateGranularity(parsed)).toBe(Granularity.DAY);

    const yesterday = moment(today).subtract(1, 'days');
    parsed = dateFormat.parse('yesterday');
    expect(parsed.utcOffset()).toBe(0);
    expect(parsed.year()).toBe(yesterday.year());
    expect(parsed.month()).toBe(yesterday.month());
    expect(parsed.date()).toBe(yesterday.date());
    expect(parsed.hours()).toBe(0);
    expect(parsed.minutes()).toBe(0);
    expect(parsed.seconds()).toBe(0);
    expect(dateGranularity(parsed)).toBe(Granularity.DAY);
  });

  test.skip('parse - week granularity', () => {
    const weekNumber = random.integer({ min: 0, max: 50 });
    const week = moment(now)
      .week(weekNumber)
      .startOf('week');
    let parsed = dateFormat.parse(`Week ${weekNumber}`);
    expect(parsed.utcOffset()).toBe(0);
    expect(parsed.year()).toBe(week.year());
    expect(parsed.month()).toBe(week.month());
    expect(parsed.date()).toBe(week.date());
    expect(parsed.hours()).toBe(0);
    expect(parsed.minutes()).toBe(0);
    expect(parsed.seconds()).toBe(0);
    expect(dateGranularity(parsed)).toBe(Granularity.WEEK);

    const thisWeek = moment(now).startOf('week');
    parsed = dateFormat.parse('this week');
    expect(parsed.utcOffset()).toBe(0);
    expect(parsed.year()).toBe(thisWeek.year());
    expect(parsed.month()).toBe(thisWeek.month());
    expect(parsed.date()).toBe(thisWeek.date());
    expect(parsed.hours()).toBe(0);
    expect(parsed.minutes()).toBe(0);
    expect(parsed.seconds()).toBe(0);
    expect(dateGranularity(parsed)).toBe(Granularity.WEEK);

    const nextWeek = moment(now)
      .add(1, 'week')
      .startOf('week');
    parsed = dateFormat.parse('next week');
    expect(parsed.utcOffset()).toBe(0);
    expect(parsed.year()).toBe(nextWeek.year());
    expect(parsed.month()).toBe(nextWeek.month());
    expect(parsed.date()).toBe(nextWeek.date());
    expect(parsed.hours()).toBe(0);
    expect(parsed.minutes()).toBe(0);
    expect(parsed.seconds()).toBe(0);
    expect(dateGranularity(parsed)).toBe(Granularity.WEEK);

    const lastWeek = moment(now)
      .subtract(1, 'week')
      .startOf('week');
    parsed = dateFormat.parse('last week');
    expect(parsed.utcOffset()).toBe(0);
    expect(parsed.year()).toBe(lastWeek.year());
    expect(parsed.month()).toBe(lastWeek.month());
    expect(parsed.date()).toBe(lastWeek.date());
    expect(parsed.hours()).toBe(0);
    expect(parsed.minutes()).toBe(0);
    expect(parsed.seconds()).toBe(0);
    expect(dateGranularity(parsed)).toBe(Granularity.WEEK);
  });

  test.skip('parse - month granularity', () => {
    ['Feb', 'February'].forEach(date => {
      const parsed = dateFormat.parse(date);
      expect(parsed.utcOffset()).toBe(0);
      expect(parsed.year()).toBe(now.year());
      expect(parsed.month()).toBe(1);
      expect(parsed.date()).toBe(1);
      expect(parsed.hours()).toBe(0);
      expect(parsed.minutes()).toBe(0);
      expect(parsed.seconds()).toBe(0);
      expect(dateGranularity(parsed)).toBe(Granularity.MONTH);
    });

    ['Feb 17', 'February 17', 'Feb 2017', 'February 2017'].forEach(date => {
      const parsed = dateFormat.parse(date);
      expect(parsed.utcOffset()).toBe(0);
      expect(parsed.year()).toBe(2017);
      expect(parsed.month()).toBe(1);
      expect(parsed.date()).toBe(1);
      expect(parsed.hours()).toBe(0);
      expect(parsed.minutes()).toBe(0);
      expect(parsed.seconds()).toBe(0);
      expect(dateGranularity(parsed)).toBe(Granularity.MONTH);
    });

    const january = moment(now).subtract(now.month(), 'month');
    ['Jan', 'January'].forEach(time => {
      const parsed = dateFormat.parse(time);
      expect(parsed.utcOffset()).toBe(0);
      expect(parsed.year()).toBe(january.year());
      expect(parsed.month()).toBe(january.month());
      expect(parsed.date()).toBe(1);
      expect(parsed.hours()).toBe(0);
      expect(parsed.minutes()).toBe(0);
      expect(parsed.seconds()).toBe(0);
      expect(dateGranularity(parsed)).toBe(Granularity.MONTH);
    });

    const thisMonth = now.startOf('month');
    let parsed = dateFormat.parse('this month');
    expect(parsed.utcOffset()).toBe(0);
    expect(parsed.year()).toBe(thisMonth.year());
    expect(parsed.month()).toBe(thisMonth.month());
    expect(parsed.date()).toBe(1);
    expect(parsed.hours()).toBe(0);
    expect(parsed.minutes()).toBe(0);
    expect(parsed.seconds()).toBe(0);
    expect(dateGranularity(parsed)).toBe(Granularity.MONTH);

    const nextMonth = moment(thisMonth).add(1, 'months');
    parsed = dateFormat.parse('next month');
    expect(parsed.utcOffset()).toBe(0);
    expect(parsed.year()).toBe(nextMonth.year());
    expect(parsed.month()).toBe(nextMonth.month());
    expect(parsed.date()).toBe(1);
    expect(parsed.hours()).toBe(0);
    expect(parsed.minutes()).toBe(0);
    expect(parsed.seconds()).toBe(0);
    expect(dateGranularity(parsed)).toBe(Granularity.MONTH);

    const lastMonth = moment(thisMonth).subtract(1, 'month');
    parsed = dateFormat.parse('last month');
    expect(parsed.utcOffset()).toBe(0);
    expect(parsed.year()).toBe(lastMonth.year());
    expect(parsed.month()).toBe(lastMonth.month());
    expect(parsed.date()).toBe(1);
    expect(parsed.hours()).toBe(0);
    expect(parsed.minutes()).toBe(0);
    expect(parsed.seconds()).toBe(0);
    expect(dateGranularity(parsed)).toBe(Granularity.MONTH);
  });

  test.skip('parse - year granularity', () => {
    const year = random.integer({ min: 1970, max: new Date().getFullYear() });
    [
      year.toString(),
      year % 100 < 10 ? `0${year % 100}` : (year % 100).toString(), // YY format (padding with 0s)
    ].forEach(date => {
      const parsed = dateFormat.parse(date);
      expect(parsed.utcOffset()).toBe(0);
      expect(parsed.year()).toBe(year);
      expect(parsed.month()).toBe(0);
      expect(parsed.date()).toBe(1);
      expect(parsed.hours()).toBe(0);
      expect(parsed.minutes()).toBe(0);
      expect(parsed.seconds()).toBe(0);
      expect(dateGranularity(parsed)).toBe(Granularity.YEAR);
    });

    const thisYear = now.startOf('year');
    let parsed = dateFormat.parse('this year');
    expect(parsed.utcOffset()).toBe(0);
    expect(parsed.year()).toBe(thisYear.year());
    expect(parsed.month()).toBe(0);
    expect(parsed.date()).toBe(1);
    expect(parsed.hours()).toBe(0);
    expect(parsed.minutes()).toBe(0);
    expect(parsed.seconds()).toBe(0);
    expect(dateGranularity(parsed)).toBe(Granularity.YEAR);

    const nextYear = moment(thisYear).add(1, 'years');
    parsed = dateFormat.parse('next year');
    expect(parsed.utcOffset()).toBe(0);
    expect(parsed.year()).toBe(nextYear.year());
    expect(parsed.month()).toBe(0);
    expect(parsed.date()).toBe(1);
    expect(parsed.hours()).toBe(0);
    expect(parsed.minutes()).toBe(0);
    expect(parsed.seconds()).toBe(0);
    expect(dateGranularity(parsed)).toBe(Granularity.YEAR);

    const lastYear = moment(thisYear).subtract(1, 'years');
    parsed = dateFormat.parse('last year');
    expect(parsed.utcOffset()).toBe(0);
    expect(parsed.year()).toBe(lastYear.year());
    expect(parsed.month()).toBe(0);
    expect(parsed.date()).toBe(1);
    expect(parsed.hours()).toBe(0);
    expect(parsed.minutes()).toBe(0);
    expect(parsed.seconds()).toBe(0);
    expect(dateGranularity(parsed)).toBe(Granularity.YEAR);
  });
});
