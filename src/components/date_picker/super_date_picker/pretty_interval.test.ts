import { prettyInterval } from './pretty_interval';

const IS_NOT_PAUSED = false;
const IS_PAUSED = true;

test('Off', () => {
  expect(prettyInterval(IS_NOT_PAUSED, 0)).toBe('Off');
  expect(prettyInterval(IS_PAUSED, 1000)).toBe('Off');
});

test('seconds', () => {
  expect(prettyInterval(IS_NOT_PAUSED, 1000)).toBe('1 second');
  expect(prettyInterval(IS_NOT_PAUSED, 15000)).toBe('15 seconds');
});

test('minutes', () => {
  expect(prettyInterval(IS_NOT_PAUSED, 60000)).toBe('1 minute');
  expect(prettyInterval(IS_NOT_PAUSED, 1800000)).toBe('30 minutes');
});

test('hours', () => {
  expect(prettyInterval(IS_NOT_PAUSED, 3600000)).toBe('1 hour');
  expect(prettyInterval(IS_NOT_PAUSED, 43200000)).toBe('12 hours');
});

test('days', () => {
  expect(prettyInterval(IS_NOT_PAUSED, 86400000)).toBe('1 day');
  expect(prettyInterval(IS_NOT_PAUSED, 86400000 * 2)).toBe('2 days');
});
