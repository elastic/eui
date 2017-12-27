import { isArray, isBoolean, isDate, isNaN, isNil, isNumber, isString } from 'lodash';
import { date } from '../date';
import { join } from '../compound';
import { number } from '../number';
import { text } from '../text';
import { booleanText } from '../boolean';

export const defaultRenderer = (value) => {
  if (isNil(value) || isNaN(value)) {
    return '';
  }
  if (isString(value)) {
    return text(value);
  }
  if (isDate(value)) {
    return date(value);
  }
  if (isBoolean(value)) {
    return booleanText(value);
  }
  if (isNumber(value)) {
    return number(value);
  }
  if (isArray(value)) {
    return join(defaultRenderer)(value);
  }
  // TODO not sure if we want that.. the (+) is that we show something, the (-) is that it's very technical
  return JSON.stringify(value);
};
