
import dateMath from '@elastic/datemath';
import moment from 'moment';
import { timeUnits } from './time_units';
import { getDateMode, DATE_MODES } from './date_modes';

const ISO_FORMAT = 'YYYY-MM-DDTHH:mm:ss.sssZ';

function cantLookup(timeFrom, timeTo, dateFormat) {
  const displayFrom = formatTimeString(timeFrom, dateFormat);
  const displayTo = formatTimeString(timeTo, dateFormat, true);
  return `${displayFrom} to ${displayTo}`;
}

export function formatTimeString(timeString, dateFormat, roundUp = false) {
  const timeAsMoment = moment(timeString, ISO_FORMAT, true);
  if (timeAsMoment.isValid()) {
    return timeAsMoment.format(dateFormat);
  }

  if (timeString === 'now') {
    return 'now';
  }

  const tryParse = dateMath.parse(timeString, { roundUp: roundUp });
  if (moment.isMoment(tryParse)) {
    return `~ ${tryParse.fromNow()}`;
  }

  return timeString;
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

export function showPrettyDuration(timeFrom, timeTo, quickRanges = []) {
  const matchingQuickRange = quickRanges.find(({ from: quickFrom, to: quickTo }) => {
    return timeFrom === quickFrom && timeTo === quickTo;
  });
  if (matchingQuickRange) {
    return true;
  }

  const fromDateMode = getDateMode(timeFrom);
  const toDateMode = getDateMode(timeTo);
  return fromDateMode === DATE_MODES.RELATIVE && toDateMode === DATE_MODES.NOW;
}
