
import moment from 'moment-timezone';
import { prettyDuration } from './pretty_duration';

moment.tz.setDefault('UTC');
const dateFormat = 'MMMM Do YYYY, HH:mm:ss.SSS';
const quickRanges = [
  {
    from: 'now-15m',
    to: 'now',
    label: 'quick range 15 minutes custom display',
  }
];

test('quick range', () => {
  const timeFrom = 'now-15m';
  const timeTo = 'now';
  expect(prettyDuration(timeFrom, timeTo, quickRanges, dateFormat)).toBe('quick range 15 minutes custom display');
});

test('last', () => {
  const timeFrom = 'now-1M';
  const timeTo = 'now';
  expect(prettyDuration(timeFrom, timeTo, quickRanges, dateFormat)).toBe('Last 1M');
});

test('last that is rounded', () => {
  const timeFrom = 'now-1M/w';
  const timeTo = 'now';
  expect(prettyDuration(timeFrom, timeTo, quickRanges, dateFormat)).toBe('Last 1M rounded to the week');
});

test('from is in past', () => {
  const timeFrom = 'now-17m';
  const timeTo = 'now-15m';
  expect(prettyDuration(timeFrom, timeTo, quickRanges, dateFormat)).toBe('~ 17 minutes ago to ~ 15 minutes ago');
});

// TODO figure out timezone to get this working
//test('absolute dates', () => {
//  const timeFrom = '2018-01-17T18:57:57.149Z';
//  const timeTo = '2018-01-17T20:00:00.000Z';
//  expect(prettyDuration(timeFrom, timeTo, quickRanges, dateFormat)).toBe('January 17th 2018, 18:57:57.149 to January 17th 2018, 20:00:00.000');
//});
