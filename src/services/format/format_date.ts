import { isNil, isFunction, isString } from '../predicate';
import moment, { CalendarSpec, MomentInput } from 'moment';

type CalendarOptions = CalendarSpec & {
  refTime?: MomentInput;
};

const calendar = (value: MomentInput, options: CalendarOptions = {}) => {
  const refTime = options.refTime;
  return moment(value).calendar(refTime, options);
};

export const dateFormatAliases = {
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
  calendarDateTime: (value: MomentInput, options: CalendarSpec) => {
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
  calendarDate: (value: MomentInput, options: CalendarSpec) => {
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

function isStringADateFormat(x: string): x is DateFormat {
  return dateFormatAliases.hasOwnProperty(x);
}

function instanceOfFormatDateConfig(x: any): x is Partial<FormatDateConfig> {
  return (
    typeof x === 'object' &&
    (x.hasOwnProperty('format') ||
      x.hasOwnProperty('nil') ||
      x.hasOwnProperty('options'))
  );
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

    const dateFormatStrOrFunc = isStringADateFormat(dateFormatKeyOrConfig)
      ? dateFormatAliases[dateFormatKeyOrConfig]
      : dateFormatKeyOrConfig;

    if (isFunction(dateFormatStrOrFunc)) {
      return dateFormatStrOrFunc(value, {});
    }

    if (isString(dateFormatStrOrFunc)) {
      return moment(value).format(dateFormatStrOrFunc);
    }
  }

  if (instanceOfFormatDateConfig(dateFormatKeyOrConfig)) {
    const { format = 'dateTime', nil = '', options } = dateFormatKeyOrConfig;

    const dateFormat = dateFormatAliases[format] || format;

    if (isNil(value)) {
      return nil;
    }

    if (isFunction(dateFormat)) {
      return dateFormat(value, options);
    }

    if (isString(dateFormat)) {
      return moment(value).format(dateFormat);
    }
  }
};
