
import dateMath from '@elastic/datemath';
import moment from 'moment';
import { timeUnits } from './time_units';

const ISO_FORMAT = 'YYYY-MM-DDTHH:mm:ss.sssZ';

function cantLookup(timeFrom, timeTo, dateFormat) {
  const displayFrom = formatTimeString(timeFrom, dateFormat);
  const displayTo = formatTimeString(timeTo, dateFormat, true);
  return `${displayFrom} to ${displayTo}`;
}

function getRangeKey(from, to) {
  return `${from} to ${to}`;
}

export function formatTimeString(timeString, dateFormat, roundUp = false) {
  const timeAsMoment = moment(timeString, ISO_FORMAT, true);
  if (timeAsMoment.isValid()) {
    console.log('ISO_FORMAT', timeAsMoment.format(ISO_FORMAT));
    return timeAsMoment.format(dateFormat);
  }

  if (timeString === 'now') {
    return 'now';
  }

  const tryParse = dateMath.parse(timeString, { roundUp: roundUp });
  return moment.isMoment(tryParse) ? '~ ' + tryParse.fromNow() : timeString;
}

export function prettyDuration(timeFrom, timeTo, quickRanges = [], dateFormat) {
  const matchingQuickRange = quickRanges.find(({ from: quickFrom, to: quickTo }) => {
    return timeFrom === quickFrom && timeTo === quickTo;
  });
  if (matchingQuickRange) {
    return matchingQuickRange.label;
  }

  const fromParts = timeFrom.split('-');
  if (timeTo === 'now' && fromParts[0] === 'now' && fromParts[1]) {
    const rounded = fromParts[1].split('/');
    let text = `Last ${rounded[0]}`;
    if (rounded[1]) {
      const timeUnit = timeUnits[rounded[1]] ? timeUnits[rounded[1]] : rounded[1];
      text = `${text} rounded to the ${timeUnit}`;
    }
    return text;
  }

  return cantLookup(timeFrom, timeTo, dateFormat);
}
