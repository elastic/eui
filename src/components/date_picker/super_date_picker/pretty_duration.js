
import dateMath from '@elastic/datemath';
import moment from 'moment';
import { timeUnits } from './time_units';
import { getDateMode, DATE_MODES } from './date_modes';
import { parseRelativeParts } from './relative_utils';

const ISO_FORMAT = 'YYYY-MM-DDTHH:mm:ss.sssZ';

function cantLookup(timeFrom, timeTo, dateFormat) {
  const displayFrom = formatTimeString(timeFrom, dateFormat);
  const displayTo = formatTimeString(timeTo, dateFormat, true);
  return `${displayFrom} to ${displayTo}`;
}

function isRelativeToNow(timeFrom, timeTo) {
  const fromDateMode = getDateMode(timeFrom);
  const toDateMode = getDateMode(timeTo);
  return fromDateMode === DATE_MODES.RELATIVE && toDateMode === DATE_MODES.NOW;
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

  if (isRelativeToNow(timeFrom, timeTo)) {
    const relativeParts = parseRelativeParts(timeFrom);
    let countTimeUnit = timeUnits[relativeParts.unit.substring(0, 1)];
    if (relativeParts.count > 1) {
      countTimeUnit += 's';
    }
    let text = `Last ${relativeParts.count} ${countTimeUnit}`;
    if (relativeParts.round) {
      const roundTimeUnit = timeUnits[relativeParts.roundUnit] ? timeUnits[relativeParts.roundUnit] : relativeParts.roundUnit;
      text += ` rounded to the ${roundTimeUnit}`;
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

  return isRelativeToNow(timeFrom, timeTo);
}
