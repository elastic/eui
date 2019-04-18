import {
  isNil,
  isArray,
  isBoolean,
  isDate,
  isNaN,
  isNumber,
  isString,
} from '../predicate';
import { formatBoolean } from './format_boolean';
import { formatDate } from './format_date';
import { formatNumber } from './format_number';
import { formatText } from './format_text';

export const formatAuto = (value: any): string => {
  if (isNil(value) || isNaN(value)) {
    return '';
  }

  if (isString(value)) {
    return formatText(value);
  }

  if (isDate(value)) {
    return formatDate(value);
  }

  if (isBoolean(value)) {
    return formatBoolean(value);
  }

  if (isNumber(value)) {
    return formatNumber(value);
  }

  if (isArray(value)) {
    return Array.isArray(value)
      ? value.map(item => formatAuto(item)).join(', ')
      : formatAuto(value);
  }

  // TODO not sure if we want that.. the (+) is that we show something, the (-) is that it's very technical
  return JSON.stringify(value);
};
