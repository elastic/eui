/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { dateFormatAliases } from '../../../services/format';
// ESLint doesn't realise that we can import Moment directly.
// eslint-disable-next-line import/named
import moment, { Moment, MomentInput } from 'moment';

const utc = moment.utc;

const GRANULARITY_KEY = '__eui_granularity';
const FORMAT_KEY = '__eui_format';

export interface EuiMoment extends Moment {
  __eui_granularity?: GranularityType;
  __eui_format?: string;
}

export interface GranularityType {
  es: 'd' | 'w' | 'M' | 'y';
  js: 'day' | 'week' | 'month' | 'year';
  isSame: (d1: Moment, d2: Moment) => boolean;
  start: (date: Moment) => Moment;
  startOfNext: (date: Moment) => Moment;
  iso8601: (date: Moment) => string;
}

interface GranularitiesType {
  DAY: GranularityType;
  WEEK: GranularityType;
  MONTH: GranularityType;
  YEAR: GranularityType;
}

export const Granularity: GranularitiesType = Object.freeze({
  DAY: {
    es: 'd',
    js: 'day',
    isSame: (d1, d2) => d1.isSame(d2, 'day'),
    start: (date) => date.startOf('day'),
    startOfNext: (date) => date.add(1, 'days').startOf('day'),
    iso8601: (date) => date.format('YYYY-MM-DD'),
  },
  WEEK: {
    es: 'w',
    js: 'week',
    isSame: (d1, d2) => d1.isSame(d2, 'week'),
    start: (date) => date.startOf('week'),
    startOfNext: (date) => date.add(1, 'weeks').startOf('week'),
    iso8601: (date) => date.format('YYYY-MM-DD'),
  },
  MONTH: {
    es: 'M',
    js: 'month',
    isSame: (d1, d2) => d1.isSame(d2, 'month'),
    start: (date) => date.startOf('month'),
    startOfNext: (date) => date.add(1, 'months').startOf('month'),
    iso8601: (date) => date.format('YYYY-MM'),
  },
  YEAR: {
    es: 'y',
    js: 'year',
    isSame: (d1, d2) => d1.isSame(d2, 'year'),
    start: (date) => date.startOf('year'),
    startOfNext: (date) => date.add(1, 'years').startOf('year'),
    iso8601: (date) => date.format('YYYY'),
  },
});

const parseTime = (value: string) => {
  const parsed: EuiMoment = utc(
    value,
    ['HH:mm', 'H:mm', 'H:mm', 'h:mm a', 'h:mm A', 'hh:mm a', 'hh:mm A'],
    true
  );
  if (parsed.isValid()) {
    parsed[FORMAT_KEY] = parsed.creationData().format as string;
    return parsed;
  }
};

const parseDay = (value: string) => {
  let parsed: EuiMoment;

  switch (value.toLowerCase()) {
    case 'today':
      parsed = utc().startOf('day');
      parsed[GRANULARITY_KEY] = Granularity.DAY;
      parsed[FORMAT_KEY] = value;
      return parsed;

    case 'yesterday':
      parsed = utc().subtract(1, 'days').startOf('day');
      parsed[GRANULARITY_KEY] = Granularity.DAY;
      parsed[FORMAT_KEY] = value;
      return parsed;

    case 'tomorrow':
      parsed = utc().add(1, 'days').startOf('day');
      parsed[GRANULARITY_KEY] = Granularity.DAY;
      parsed[FORMAT_KEY] = value;
      return parsed;

    default:
      parsed = utc(
        value,
        [
          'ddd',
          'dddd',
          'D MMM YY',
          'Do MMM YY',
          'D MMM YYYY',
          'Do MMM YYYY',
          'DD MMM YY',
          'DD MMM YYYY',
          'D MMMM YY',
          'Do MMMM YY',
          'D MMMM YYYY',
          'Do MMMM YYYY',
          'DD MMMM YY',
          'DD MMMM YYYY',
          'YYYY-MM-DD',
        ],
        true
      );
      if (parsed.isValid()) {
        try {
          parsed[GRANULARITY_KEY] = Granularity.DAY;
          parsed[FORMAT_KEY] = parsed.creationData().format as string;
          return parsed;
        } catch (e) {
          console.error(e);
        }
      }
  }
};

const parseWeek = (value: string) => {
  let parsed: EuiMoment;
  switch (value.toLowerCase()) {
    case 'this week':
      parsed = utc();
      break;
    case 'last week':
      parsed = utc().subtract(1, 'weeks');
      break;
    case 'next week':
      parsed = utc().add(1, 'weeks');
      break;
    default:
      const match = value.match(/week (\d+)/i);
      if (match) {
        const weekNr = Number(match[1]);
        parsed = utc().weeks(weekNr);
      } else {
        return;
      }
  }
  if (parsed != null && parsed.isValid()) {
    parsed = parsed.startOf('week');
    parsed[GRANULARITY_KEY] = Granularity.WEEK;
    parsed[FORMAT_KEY] = parsed.creationData().format as string;
    return parsed;
  }
};

const parseMonth = (value: string) => {
  let parsed: EuiMoment;
  switch (value.toLowerCase()) {
    case 'this month':
      parsed = utc();
      break;
    case 'next month':
      parsed = utc().endOf('month').add(2, 'days');
      break;
    case 'last month':
      parsed = utc().startOf('month').subtract(2, 'days');
      break;
    default:
      parsed = utc(value, ['MMM', 'MMMM'], true);
      if (parsed.isValid()) {
        const now = utc();
        parsed.year(now.year());
      } else {
        parsed = utc(
          value,
          [
            'MMM YY',
            'MMMM YY',
            'MMM YYYY',
            'MMMM YYYY',
            'YYYY MMM',
            'YYYY MMMM',
            'YYYY-MM',
          ],
          true
        );
      }
  }
  if (parsed.isValid()) {
    parsed.startOf('month');
    parsed[GRANULARITY_KEY] = Granularity.MONTH;
    parsed[FORMAT_KEY] = parsed.creationData().format as string;
    return parsed;
  }
};

const parseYear = (value: string) => {
  let parsed: EuiMoment;
  switch (value.toLowerCase()) {
    case 'this year':
      parsed = utc().startOf('year');
      parsed[GRANULARITY_KEY] = Granularity.YEAR;
      parsed[FORMAT_KEY] = value;
      return parsed;
    case 'next year':
      parsed = utc().endOf('year').add(2, 'months').startOf('year');
      parsed[GRANULARITY_KEY] = Granularity.YEAR;
      parsed[FORMAT_KEY] = value;
      return parsed;
    case 'last year':
      parsed = utc().startOf('year').subtract(2, 'months').startOf('year');
      parsed[GRANULARITY_KEY] = Granularity.YEAR;
      parsed[FORMAT_KEY] = value;
      return parsed;
    default:
      parsed = utc(value, ['YY', 'YYYY'], true);
      if (parsed.isValid()) {
        parsed[GRANULARITY_KEY] = Granularity.YEAR;
        parsed[FORMAT_KEY] = parsed.creationData().format as string;
        return parsed;
      }
  }
};

const parseDefault = (value: string) => {
  let parsed: EuiMoment = utc(
    value,
    [
      moment.ISO_8601,
      moment.RFC_2822,
      'DD MMM YY HH:mm',
      'DD MMM YY HH:mm:ss',
      'DD MMM YYYY HH:mm',
      'DD MMM YYYY HH:mm:ss',
      'DD MMMM YYYY HH:mm',
      'DD MMMM YYYY HH:mm:ss',
    ],
    true
  );
  if (!parsed.isValid()) {
    const time = Date.parse(value);
    const offset = moment(time).utcOffset();
    parsed = utc(time);
    parsed.add(offset, 'minutes');
  }
  if (parsed.isValid()) {
    parsed[FORMAT_KEY] = parsed.creationData().format as string;
  }
  return parsed;
};

const printDay = (now: Moment, date: Moment, format: string) => {
  if (format.match(/yesterday|tomorrow|today/i)) {
    if (now.isSame(date, 'day')) {
      return 'today';
    }
    if (now.subtract(1, 'day').isSame(date, 'day')) {
      return 'yesterday';
    }
    if (now.add(1, 'day').isSame(date, 'day')) {
      return 'tomorrow';
    }
    if (now.isSame(date, 'week')) {
      return date.format('dddd');
    }
  }
  return date.format(format);
};

const printWeek = (now: Moment, date: Moment, format: string) => {
  if (format.match(/(?:this|next|last) week/i)) {
    if (now.isSame(date, 'week')) {
      return 'This Week';
    }
    if (now.startOf('week').subtract(2, 'days').isSame(date, 'week')) {
      return 'Last Week';
    }
    if (now.endOf('week').add(2, 'days').isSame(date, 'week')) {
      return 'Next Week';
    }
  }
  return date.format(format);
};

const printMonth = (now: Moment, date: Moment, format: string) => {
  if (format.match(/(?:this|next|last) month/i)) {
    if (now.isSame(date, 'month')) {
      return 'This Month';
    }
    if (now.startOf('month').subtract(2, 'days').isSame(date, 'month')) {
      return 'Last Month';
    }
    if (now.endOf('month').add(2, 'days').isSame(date, 'month')) {
      return 'Next Month';
    }
  }
  return date.format(format);
};

const printYear = (now: Moment, date: Moment, format: string) => {
  if (format.match(/(?:this|next|last) year/i)) {
    if (now.isSame(date, 'year')) {
      return 'This Year';
    }
    if (now.startOf('year').subtract(2, 'months').isSame(date, 'year')) {
      return 'Last Year';
    }
    if (now.endOf('year').add(2, 'months').isSame(date, 'year')) {
      return 'Next Year';
    }
  }
  return date.format(format);
};

export const printIso8601 = (value: MomentInput) => {
  return utc(value).format(moment.defaultFormatUtc);
};

export const dateGranularity = (parsedDate: EuiMoment) => {
  return parsedDate[GRANULARITY_KEY]!;
};

export const dateFormat = Object.freeze({
  parse(value: string) {
    const parsed =
      parseDay(value) ||
      parseMonth(value) ||
      parseYear(value) ||
      parseWeek(value) ||
      parseTime(value) ||
      parseDefault(value);
    if (!parsed) {
      throw new Error(`could not parse [${value}] as date`);
    }
    return parsed;
  },

  print(date: EuiMoment | MomentInput, defaultGranularity = undefined) {
    date = moment.isMoment(date) ? date : utc(date);
    const euiDate: EuiMoment = date as EuiMoment;
    const now = utc();
    const format = euiDate[FORMAT_KEY];
    if (!format) {
      return date.format(dateFormatAliases.iso8601);
    }
    const granularity = euiDate[GRANULARITY_KEY] || defaultGranularity;
    switch (granularity) {
      case Granularity.DAY:
        return printDay(now, date, format);
      case Granularity.WEEK:
        return printWeek(now, date, format);
      case Granularity.MONTH:
        return printMonth(now, date, format);
      case Granularity.YEAR:
        return printYear(now, date, format);
      default:
        return date.format(format);
    }
  },
});
