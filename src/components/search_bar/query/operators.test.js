import moment from 'moment';
import { eq, gt, gte, lt, lte } from './operators';
import { dateValue } from './date_value';
import { Random } from '../../../services/random';
import { Granularity } from './date_format';

const random = new Random();

const laterMoment = (date, count, units) => {
  const later = moment(date);
  later.add(count, units);
  return later;
};

const earlierMoment = (date, count, units) => {
  const later = moment(date);
  later.subtract(count, units);
  return later;
};

describe('operators', () => {
  test('eq - string', () => {
    expect(eq('val', 'val')).toBe(true);
    expect(eq('val', 'Val', { ignoreCase: true })).toBe(true);
    expect(eq('val', 'Val', { ignoreCase: false })).toBe(false);
    expect(eq('foo', 'bar')).toBe(false);
    expect(eq('foo', null)).toBe(false);
    expect(eq('foo', undefined)).toBe(false);
    expect(eq(null, null)).toBe(true);
    expect(eq(undefined, undefined)).toBe(true);
  });

  test('eq - number', () => {
    const num = random.number({ min: -60, max: 60 });
    expect(eq(num, num)).toBe(true);
    expect(eq(num, num - 1)).toBe(false);
    expect(eq(num, null)).toBe(false);
    expect(eq(num, undefined)).toBe(false);
    expect(eq(null, null)).toBe(true);
    expect(eq(undefined, undefined)).toBe(true);
  });

  test('eq - boolean', () => {
    expect(eq(true, true)).toBe(true);
    expect(eq(false, false)).toBe(true);
    expect(eq(true, false)).toBe(false);
    expect(eq(false, true)).toBe(false);
    expect(eq(true, null)).toBe(false);
    expect(eq(false, null)).toBe(false);
    expect(eq(null, true)).toBe(false);
    expect(eq(null, false)).toBe(false);
    expect(eq(null, null)).toBe(true);
    expect(eq(undefined, undefined)).toBe(true);
  });

  test('eq - date', () => {
    const date = random.date();
    const momnt = moment(date);
    expect(eq(date, date)).toBe(true);
    expect(eq(date, momnt)).toBe(true);
    expect(eq(momnt, date)).toBe(true);
    expect(eq(momnt, momnt)).toBe(true);
    expect(eq(momnt, moment())).toBe(false);
    expect(eq(date, 'string')).toBe(false);
    expect(eq(momnt, 'string')).toBe(false);
    expect(eq(date, 2)).toBe(false);
    expect(eq(momnt, 3)).toBe(false);
    expect(eq(date, true)).toBe(false);
    expect(eq(momnt, false)).toBe(false);
    expect(eq(momnt, false)).toBe(false);
    expect(eq(null, null)).toBe(true);
    expect(eq(undefined, undefined)).toBe(true);
  });

  test('eq - date value', () => {
    const date = random.moment();
    const granularity = random.oneOf(Object.values(Granularity));
    const parse = jest.fn();
    const print = jest.fn();
    print.mockReturnValue(date.format());
    const format = { parse, print };
    const value = dateValue(date, granularity, format);
    expect(eq(date, value)).toBe(true);
    expect(eq(moment(date), value)).toBe(true);
    expect(eq(date.valueOf(), value)).toBe(true);
    expect(eq(date.format(), value)).toBe(true);
    expect(eq(null, null)).toBe(true);
    expect(eq(undefined, undefined)).toBe(true);
  });

  test('gt - number', () => {
    const num = random.number({ min: -60, max: 60 });
    expect(gt(num + 1, num)).toBe(true);
    expect(gt(num, num + 1)).toBe(false);
    expect(gt(num, num)).toBe(false);
    expect(gt(num, null)).toBe(false);
    expect(gt(num, undefined)).toBe(false);
    expect(gt(null, null)).toBe(false);
    expect(gt(undefined, undefined)).toBe(false);
  });

  test('gt - date', () => {
    const date = random.moment();
    const laterDate = laterMoment(date, 1, 'days');
    expect(gt(laterDate, date)).toBe(true);
    expect(gt(date, date)).toBe(false);
  });

  test('gt - date value - day granularity', () => {
    const date = random.moment();
    date.hours(12);

    const granularity = Granularity.DAY;

    const dayBefore = earlierMoment(date, 1, 'days');
    const dayBeforeValue = dateValue(dayBefore, granularity);

    const hourBefore = earlierMoment(date, 1, 'hours');
    const hourBeforeValue = dateValue(hourBefore, granularity);

    [date, date.valueOf(), date.format()].forEach(value => {
      expect(gt(value, hourBeforeValue)).toBe(false);
      expect(gt(value, dayBeforeValue)).toBe(true);
    });
  });

  test('gt - date value - week granularity', () => {
    const date = random.moment();
    date.hours(12); // noon
    date.date(15); // middle of the month
    date.day(3); // wed - middle of the week

    const granularity = Granularity.WEEK;

    const weekBefore = earlierMoment(date, 1, 'weeks');
    const weekBeforeValue = dateValue(weekBefore, granularity);

    const dayBefore = earlierMoment(date, 1, 'days');
    const dayBeforeValue = dateValue(dayBefore, granularity);

    const hourBefore = earlierMoment(date, 1, 'hours');
    const hourBeforeValue = dateValue(hourBefore, granularity);

    [date, date.valueOf(), date.format()].forEach(value => {
      expect(gt(value, hourBeforeValue)).toBe(false);
      expect(gt(value, dayBeforeValue)).toBe(false);
      expect(gt(value, weekBeforeValue)).toBe(true);
    });
  });

  test('gt - date value - month granularity', () => {
    const date = random.moment();
    date.hours(12); // noon
    date.date(15); // middle of the month
    date.day(3); // wed - middle of the week
    date.month(6); // july - middle of the year

    const granularity = Granularity.MONTH;

    const monthBefore = earlierMoment(date, 1, 'months');
    const monthBeforeValue = dateValue(monthBefore, granularity);

    const weekBefore = earlierMoment(date, 1, 'weeks');
    const weekBeforeValue = dateValue(weekBefore, granularity);

    const dayBefore = earlierMoment(date, 1, 'days');
    const dayBeforeValue = dateValue(dayBefore, granularity);

    const hourBefore = earlierMoment(date, 1, 'hours');
    const hourBeforeValue = dateValue(hourBefore, granularity);

    [date, date.valueOf(), date.format()].forEach(value => {
      expect(gt(value, hourBeforeValue)).toBe(false);
      expect(gt(value, dayBeforeValue)).toBe(false);
      expect(gt(value, weekBeforeValue)).toBe(false);
      expect(gt(value, monthBeforeValue)).toBe(true);
    });
  });

  test('gt - date value - year granularity', () => {
    const date = random.moment();
    date.hours(12); // noon
    date.date(15); // middle of the month
    date.day(3); // wed - middle of the week
    date.month(6); // july - middle of the year
    date.year(1980);

    const granularity = Granularity.YEAR;

    const yearBefore = earlierMoment(date, 1, 'years');
    const yearBeforeValue = dateValue(yearBefore, granularity);

    const monthBefore = earlierMoment(date, 1, 'months');
    const monthBeforeValue = dateValue(monthBefore, granularity);

    const weekBefore = earlierMoment(date, 1, 'weeks');
    const weekBeforeValue = dateValue(weekBefore, granularity);

    const dayBefore = earlierMoment(date, 1, 'days');
    const dayBeforeValue = dateValue(dayBefore, granularity);

    const hourBefore = earlierMoment(date, 1, 'hours');
    const hourBeforeValue = dateValue(hourBefore, granularity);

    [date, date.valueOf(), date.format()].forEach(value => {
      expect(gt(value, hourBeforeValue)).toBe(false);
      expect(gt(value, dayBeforeValue)).toBe(false);
      expect(gt(value, weekBeforeValue)).toBe(false);
      expect(gt(value, monthBeforeValue)).toBe(false);
      expect(gt(value, yearBeforeValue)).toBe(true);
    });
  });

  test('gte - number', () => {
    const num = random.number({ min: -60, max: 60 });
    expect(gte(num + 1, num)).toBe(true);
    expect(gte(num, num + 1)).toBe(false);
    expect(gte(num, num)).toBe(true);
    expect(gte(num, null)).toBe(false);
    expect(gte(num, undefined)).toBe(false);
    expect(gte(null, null)).toBe(true);
    expect(gte(undefined, undefined)).toBe(true);
  });

  test('gte - date and date value', () => {
    const date = random.moment();
    const laterDate = laterMoment(date, 1, 'days');
    expect(gte(laterDate, date)).toBe(true);
    expect(gte(date, date)).toBe(true);
  });

  test('gte - date value - day granularity', () => {
    const date = random.moment();
    date.hours(12);

    const granularity = Granularity.DAY;

    const dayBefore = earlierMoment(date, 1, 'days');
    const dayBeforeValue = dateValue(dayBefore, granularity);

    const hourBefore = earlierMoment(date, 1, 'hours');
    const hourBeforeValue = dateValue(hourBefore, granularity);

    [date, date.valueOf(), date.format()].forEach(value => {
      expect(gte(value, hourBeforeValue)).toBe(true);
      expect(gte(value, dayBeforeValue)).toBe(true);
    });
  });

  test('gte - date value - week granularity', () => {
    const date = random.moment();
    date.hours(12); // noon
    date.date(15); // middle of the month
    date.day(3); // wed - middle of the week

    const granularity = Granularity.WEEK;

    const weekBefore = earlierMoment(date, 1, 'weeks');
    const weekBeforeValue = dateValue(weekBefore, granularity);

    const dayBefore = earlierMoment(date, 1, 'days');
    const dayBeforeValue = dateValue(dayBefore, granularity);

    const hourBefore = earlierMoment(date, 1, 'hours');
    const hourBeforeValue = dateValue(hourBefore, granularity);

    [date, date.valueOf(), date.format()].forEach(value => {
      expect(gte(value, hourBeforeValue)).toBe(true);
      expect(gte(value, dayBeforeValue)).toBe(true);
      expect(gte(value, weekBeforeValue)).toBe(true);
    });
  });

  test('gte - date value - month granularity', () => {
    const date = random.moment();
    date.hours(12); // noon
    date.date(15); // middle of the month
    date.day(3); // wed - middle of the week
    date.month(6);

    const granularity = Granularity.MONTH;

    const monthBefore = earlierMoment(date, 1, 'months');
    const monthBeforeValue = dateValue(monthBefore, granularity);

    const weekBefore = earlierMoment(date, 1, 'weeks');
    const weekBeforeValue = dateValue(weekBefore, granularity);

    const dayBefore = earlierMoment(date, 1, 'days');
    const dayBeforeValue = dateValue(dayBefore, granularity);

    const hourBefore = earlierMoment(date, 1, 'hours');
    const hourBeforeValue = dateValue(hourBefore, granularity);

    [date, date.valueOf(), date.format()].forEach(value => {
      expect(gte(value, hourBeforeValue)).toBe(true);
      expect(gte(value, dayBeforeValue)).toBe(true);
      expect(gte(value, weekBeforeValue)).toBe(true);
      expect(gte(value, monthBeforeValue)).toBe(true);
    });
  });

  test('gte - date value - year granularity', () => {
    const date = random.moment();
    date.hours(12); // noon
    date.date(15); // middle of the month
    date.day(3); // wed - middle of the week
    date.month(6);
    date.year(1980);

    const granularity = Granularity.YEAR;

    const yearBefore = earlierMoment(date, 1, 'years');
    const yearBeforeValue = dateValue(yearBefore, granularity);

    const monthBefore = earlierMoment(date, 1, 'months');
    const monthBeforeValue = dateValue(monthBefore, granularity);

    const weekBefore = earlierMoment(date, 1, 'weeks');
    const weekBeforeValue = dateValue(weekBefore, granularity);

    const dayBefore = earlierMoment(date, 1, 'days');
    const dayBeforeValue = dateValue(dayBefore, granularity);

    const hourBefore = earlierMoment(date, 1, 'hours');
    const hourBeforeValue = dateValue(hourBefore, granularity);

    [date, date.valueOf(), date.format()].forEach(value => {
      expect(gte(value, hourBeforeValue)).toBe(true);
      expect(gte(value, dayBeforeValue)).toBe(true);
      expect(gte(value, weekBeforeValue)).toBe(true);
      expect(gte(value, monthBeforeValue)).toBe(true);
      expect(gte(value, yearBeforeValue)).toBe(true);
    });
  });

  test('lt - number', () => {
    const num = random.number({ min: -60, max: 60 });
    expect(lt(num, num + 1)).toBe(true);
    expect(lt(num + 1, num)).toBe(false);
    expect(lt(num, num)).toBe(false);
    expect(lt(num, null)).toBe(false);
    expect(lt(num, undefined)).toBe(false);
    expect(lt(null, null)).toBe(false);
    expect(lt(undefined, undefined)).toBe(false);
  });

  test('lt - date', () => {
    const date = random.moment();
    const laterDate = laterMoment(date, 1, 'days');
    expect(lt(date, laterDate)).toBe(true);
    expect(lt(date, date)).toBe(false);
  });

  test('lt - date value - day granularity', () => {
    const date = random.moment();
    date.hours(12);

    const granularity = Granularity.DAY;

    const dayLater = laterMoment(date, 1, 'days');
    const dayLaterValue = dateValue(dayLater, granularity);

    const hourLater = laterMoment(date, 1, 'hours');
    const hourLaterValue = dateValue(hourLater, granularity);

    [date, date.valueOf(), date.format()].forEach(value => {
      expect(lt(value, hourLaterValue)).toBe(false);
      expect(lt(value, dayLaterValue)).toBe(true);
    });
  });

  test('lt - date value - week granularity', () => {
    const date = random.moment();
    date.hours(12); // noon
    date.date(15); // middle of the month
    date.day(3); // wed - middle of the week

    const granularity = Granularity.WEEK;

    const weekLater = laterMoment(date, 1, 'weeks');
    const weekLaterValue = dateValue(weekLater, granularity);

    const dayLater = laterMoment(date, 1, 'days');
    const dayLaterValue = dateValue(dayLater, granularity);

    const hourLater = laterMoment(date, 1, 'hours');
    const hourLaterValue = dateValue(hourLater, granularity);

    [date, date.valueOf(), date.format()].forEach(value => {
      expect(lt(value, hourLaterValue)).toBe(false);
      expect(lt(value, dayLaterValue)).toBe(false);
      expect(lt(value, weekLaterValue)).toBe(true);
    });
  });

  test('lt - date value - month granularity', () => {
    const date = random.moment();
    date.hours(12); // noon
    date.date(15); // middle of the month
    date.day(3); // wed - middle of the week
    date.month(6);

    const granularity = Granularity.MONTH;

    const monthLater = laterMoment(date, 1, 'months');
    const monthLaterValue = dateValue(monthLater, granularity);

    const weekLater = laterMoment(date, 1, 'weeks');
    const weekLaterValue = dateValue(weekLater, granularity);

    const dayLater = laterMoment(date, 1, 'days');
    const dayLaterValue = dateValue(dayLater, granularity);

    const hourLater = laterMoment(date, 1, 'hours');
    const hourLaterValue = dateValue(hourLater, granularity);

    [date, date.valueOf(), date.format()].forEach(value => {
      expect(lt(value, hourLaterValue)).toBe(false);
      expect(lt(value, dayLaterValue)).toBe(false);
      expect(lt(value, weekLaterValue)).toBe(false);
      expect(lt(value, monthLaterValue)).toBe(true);
    });
  });

  test('lt - date value - year granularity', () => {
    const date = random.moment();
    date.hours(12); // noon
    date.date(15); // middle of the month
    date.day(3); // wed - middle of the week
    date.month(6);
    date.year(1980);

    const granularity = Granularity.YEAR;

    const yearLater = laterMoment(date, 1, 'years');
    const yearLaterValue = dateValue(yearLater, granularity);

    const monthLater = laterMoment(date, 1, 'months');
    const monthLaterValue = dateValue(monthLater, granularity);

    const weekLater = laterMoment(date, 1, 'weeks');
    const weekLaterValue = dateValue(weekLater, granularity);

    const dayLater = laterMoment(date, 1, 'days');
    const dayLaterValue = dateValue(dayLater, granularity);

    const hourLater = laterMoment(date, 1, 'hours');
    const hourLaterValue = dateValue(hourLater, granularity);

    [date, date.valueOf(), date.format()].forEach(value => {
      expect(lt(value, hourLaterValue)).toBe(false);
      expect(lt(value, dayLaterValue)).toBe(false);
      expect(lt(value, weekLaterValue)).toBe(false);
      expect(lt(value, monthLaterValue)).toBe(false);
      expect(lt(value, yearLaterValue)).toBe(true);
    });
  });

  test('lte - number', () => {
    const num = random.number({ min: -60, max: 60 });
    expect(lte(num, num + 1)).toBe(true);
    expect(lte(num + 1, num)).toBe(false);
    expect(lte(num, num)).toBe(true);
    expect(lte(num, null)).toBe(false);
    expect(lte(num, undefined)).toBe(false);
    expect(lte(null, null)).toBe(true);
    expect(lte(undefined, undefined)).toBe(true);
  });

  test('lte - date', () => {
    const date = random.moment();
    const laterDate = laterMoment(date, 1, 'days');
    expect(lte(date, laterDate)).toBe(true);
    expect(lte(date, date)).toBe(true);
  });

  test('lte - date value - day granularity', () => {
    const date = random.moment();
    date.hours(12);

    const granularity = Granularity.DAY;

    const dayLater = laterMoment(date, 1, 'days');
    const dayLaterValue = dateValue(dayLater, granularity);

    const hourLater = laterMoment(date, 1, 'hours');
    const hourLaterValue = dateValue(hourLater, granularity);

    [date, date.valueOf(), date.format()].forEach(value => {
      expect(lte(value, hourLaterValue)).toBe(true);
      expect(lte(value, dayLaterValue)).toBe(true);
    });
  });

  test('lte - date value - week granularity', () => {
    const date = random.moment();
    date.hours(12); // noon
    date.date(15); // middle of the month
    date.day(3); // wed - middle of the week

    const granularity = Granularity.WEEK;

    const weekLater = laterMoment(date, 1, 'weeks');
    const weekLaterValue = dateValue(weekLater, granularity);

    const dayLater = laterMoment(date, 1, 'days');
    const dayLaterValue = dateValue(dayLater, granularity);

    const hourLater = laterMoment(date, 1, 'hours');
    const hourLaterValue = dateValue(hourLater, granularity);

    [date, date.valueOf(), date.format()].forEach(value => {
      expect(lte(value, hourLaterValue)).toBe(true);
      expect(lte(value, dayLaterValue)).toBe(true);
      expect(lte(value, weekLaterValue)).toBe(true);
    });
  });

  test('lte - date value - month granularity', () => {
    const date = random.moment();
    date.hours(12); // noon
    date.date(15); // middle of the month
    date.day(3); // wed - middle of the week
    date.month(6);

    const granularity = Granularity.MONTH;

    const monthLater = laterMoment(date, 1, 'months');
    const monthLaterValue = dateValue(monthLater, granularity);

    const weekLater = laterMoment(date, 1, 'weeks');
    const weekLaterValue = dateValue(weekLater, granularity);

    const dayLater = laterMoment(date, 1, 'days');
    const dayLaterValue = dateValue(dayLater, granularity);

    const hourLater = laterMoment(date, 1, 'hours');
    const hourLaterValue = dateValue(hourLater, granularity);

    [date, date.valueOf(), date.format()].forEach(value => {
      expect(lte(value, hourLaterValue)).toBe(true);
      expect(lte(value, dayLaterValue)).toBe(true);
      expect(lte(value, weekLaterValue)).toBe(true);
      expect(lte(value, monthLaterValue)).toBe(true);
    });
  });

  test('lte - date value - year granularity', () => {
    const date = random.moment();
    date.hours(12); // noon
    date.date(15); // middle of the month
    date.day(3); // wed - middle of the week
    date.month(6);
    date.year(1980);

    const granularity = Granularity.YEAR;

    const yearLater = laterMoment(date, 1, 'years');
    const yearLaterValue = dateValue(yearLater, granularity);

    const monthLater = laterMoment(date, 1, 'months');
    const monthLaterValue = dateValue(monthLater, granularity);

    const weekLater = laterMoment(date, 1, 'weeks');
    const weekLaterValue = dateValue(weekLater, granularity);

    const dayLater = laterMoment(date, 1, 'days');
    const dayLaterValue = dateValue(dayLater, granularity);

    const hourLater = laterMoment(date, 1, 'hours');
    const hourLaterValue = dateValue(hourLater, granularity);

    [date, date.valueOf(), date.format()].forEach(value => {
      expect(lte(value, hourLaterValue)).toBe(true);
      expect(lte(value, dayLaterValue)).toBe(true);
      expect(lte(value, weekLaterValue)).toBe(true);
      expect(lte(value, monthLaterValue)).toBe(true);
      expect(lte(value, yearLaterValue)).toBe(true);
    });
  });
});
