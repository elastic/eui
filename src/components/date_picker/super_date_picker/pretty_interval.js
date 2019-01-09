
const MS_IN_SECOND = 1000;
const MS_IN_MINUTE = 60 * MS_IN_SECOND;
const MS_IN_HOUR = 60 * MS_IN_MINUTE;
const MS_IN_DAY = 24 * MS_IN_HOUR;

export function prettyInterval(isPaused, intervalInMs) {
  if (isPaused || intervalInMs === 0) {
    return 'Off';
  } else if (intervalInMs < MS_IN_MINUTE) {
    const intervalInSeconds = Math.round(intervalInMs / MS_IN_SECOND);
    const units = intervalInSeconds > 1 ? 'seconds' : 'second';
    return `${intervalInSeconds} ${units}`;
  } else if (intervalInMs < MS_IN_HOUR) {
    const intervalInMinutes = Math.round(intervalInMs / MS_IN_MINUTE);
    const units = intervalInMinutes > 1 ? 'minutes' : 'minute';
    return `${intervalInMinutes} ${units}`;
  } else if (intervalInMs < MS_IN_DAY) {
    const intervalInHours = Math.round(intervalInMs / MS_IN_HOUR);
    const units = intervalInHours > 1 ? 'hours' : 'hour';
    return `${intervalInHours} ${units}`;
  }

  const intervalInDays = Math.round(intervalInMs / MS_IN_DAY);
  const units = intervalInDays > 1 ? 'days' : 'day';
  return `${intervalInDays} ${units}`;
}
