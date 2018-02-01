import { isNil, isFunction, isString } from '../predicate';
import moment from 'moment';

const calendar = (value, options = {}) => {
  const refTime = options.refTime || null;
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
  calendarDateTime: (value, options) => {
    return calendar(value, {
      sameDay: '[Today at] H:mmA',
      nextDay: '[Tomorrow at] H:mmA',
      nextWeek: 'dddd [at] H:mmA',
      lastDay: '[Yesterday at] H:mmA',
      lastWeek: '[Last] dddd [at] H:mmA',
      sameElse: 'Do MMM YYYY [at] H:mmA',
      ...options
    });
  },
  calendarDate: (value, options) => {
    return calendar(value, {
      sameDay: '[Today]',
      nextDay: '[Tomorrow]',
      nextWeek: 'dddd',
      lastDay: '[Yesterday]',
      lastWeek: '[Last] dddd',
      sameElse: 'Do MMM YYYY',
      ...options
    });
  }
};

export const formatDate = (value, dateFormatKeyOrConfig = 'dateTime') => {
  if (isString(dateFormatKeyOrConfig)) {
    if (isNil(value)) {
      return '';
    }

    const dateFormat = dateFormatAliases[dateFormatKeyOrConfig] || dateFormatKeyOrConfig;

    return moment(value).format(dateFormat);
  }

  const {
    format = 'dateTime',
    nil = '',
    options,
  } = dateFormatKeyOrConfig;

  const dateFormat = dateFormatAliases[format] || format;

  if (isNil(value)) {
    return nil;
  }

  if (isFunction(dateFormat)) {
    return dateFormat(value, options);
  }

  return moment(value).format(dateFormat);
};
