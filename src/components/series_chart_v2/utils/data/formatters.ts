import moment, { Duration } from 'moment';

type Formatter = (value: any) => string;

export function timeFormatter(format: string): Formatter {
  return (value: any): string => {
    return moment.utc(value).format(format);
  };
}

export function niceTimeFormatter(domain: [number, number]): Formatter {
  const minDate = moment.utc(domain[0]);
  const maxDate = moment.utc(domain[1]);
  const duration = moment.duration(maxDate.diff(minDate));
  const format = niceTimeFormat(duration);
  return (value: any): string => {
    return moment.utc(value).format(format);
  };
}

function niceTimeFormat(duration: Duration) {
  const days = duration.get('days');
  if (days > 30) {
    return 'YYYY-MM-DD';
  }
  if (days > 7 && days <= 30) {
    return 'MMM-DD';
  }
  if (days > 1 && days <= 7) {
    return 'MMM-DD HH:mm';
  }
  return 'HH:mm:ss';
}
