import { TimeUnitId, TimeUnitLabel, TimeUnitLabelPlural } from '../types';

export const timeUnits: { [id in TimeUnitId]: TimeUnitLabel } = {
  s: 'second',
  m: 'minute',
  h: 'hour',
  d: 'day',
  w: 'week',
  M: 'month',
  y: 'year',
};

export const timeUnitsPlural: { [id in TimeUnitId]: TimeUnitLabelPlural } = {
  s: 'seconds',
  m: 'minutes',
  h: 'hours',
  d: 'days',
  w: 'weeks',
  M: 'months',
  y: 'years',
};
