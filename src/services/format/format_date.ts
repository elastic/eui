import { isNil, isFunction, isString } from '../predicate';
import moment, { CalendarSpec, MomentInput } from 'moment';

type CalendarOptions = CalendarSpec & {
  refTime?: MomentInput;
};

const calendar = (value: Date, options: CalendarOptions = {}) => {
  const refTime = options.refTime;
  return moment(value).calendar(refTime, options);
};

export const dateFormatAliases: { [alias: string]: any } = {
  date: 'D MMM YYYY',
  longDate: 'DD MMMM YYYY',
  shortDate: 'D MMM YY',
  dateTime: 'D MMM YYYY HH:mm',
  longDateTime: 'DD MMMM YYYY HH:mm:ss',
  shortDateTime: 'D MMM YY HH:mm',
  dobShort: 'Do MMM YY',
  dobLong: 'Do MMMM YYYY',
  iso8601: 'YYYY-MM-DDTHH:mm:ss.SSSZ',
  calendar,
  calendarDateTime: (value: Date, options: CalendarSpec) => {
    return calendar(value, {
      sameDay: '[Today at] H:mmA',
      nextDay: '[Tomorrow at] H:mmA',
      nextWeek: 'dddd [at] H:mmA',
      lastDay: '[Yesterday at] H:mmA',
      lastWeek: '[Last] dddd [at] H:mmA',
      sameElse: 'Do MMM YYYY [at] H:mmA',
      ...options,
    });
  },
  calendarDate: (value: Date, options: CalendarSpec) => {
    return calendar(value, {
      sameDay: '[Today]',
      nextDay: '[Tomorrow]',
      nextWeek: 'dddd',
      lastDay: '[Yesterday]',
      lastWeek: '[Last] dddd',
      sameElse: 'Do MMM YYYY',
      ...options,
    });
  },
};

type DateFormat = keyof typeof dateFormatAliases;

interface FormatDateConfig {
  format: DateFormat;
  nil: string;
  options: any;
}

export const formatDate = (
  value?: MomentInput,
  dateFormatKeyOrConfig:
    | DateFormat
    | string
    | Partial<FormatDateConfig> = 'dateTime'
) => {
  if (isString(dateFormatKeyOrConfig)) {
    if (isNil(value)) {
      return '';
    }

    const dateFormatStr =
      dateFormatAliases[dateFormatKeyOrConfig] || dateFormatKeyOrConfig;

    return moment(value).format(dateFormatStr);
  }

  const {
    format = 'dateTime',
    nil = '',
    options,
  } = dateFormatKeyOrConfig as FormatDateConfig;

  const dateFormat = dateFormatAliases[format] || format;

  if (isNil(value)) {
    return nil;
  }

  if (isFunction(dateFormat)) {
    return dateFormat(value, options);
  }

  return moment(value).format(dateFormat);
};
