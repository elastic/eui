import { isNil, isFunction } from 'lodash';
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

const createDateRenderer = (config = {}) => {
  const pattern = config.format || dateFormatAliases.dateTime;
  const resolvedFormat = dateFormatAliases[pattern] || pattern;
  const nilValue = config.nil || '';
  return (value) => {
    if (isNil(value)) {
      return nilValue;
    }
    if (isFunction(resolvedFormat)) {
      return resolvedFormat(value, config.options);
    }
    return moment(value).format(resolvedFormat);
  };
};

export const date = createDateRenderer();
date.with = (config) => createDateRenderer(config);
