import {
  isArray, isBoolean,
  isNumber, isString
} from '../predicate';
import moment from 'moment/moment';

const defaultOptions = {
  ignoreCase: true
};

export const must = (value, token, options = {}) => {
  options = { ...defaultOptions, ...options };
  if (isString(value)) {
    return options.ignoreCase ?
      value.toLowerCase().includes(token.toLowerCase()) :
      value.includes(token);
  }
  if (isNumber(value)) {
    token = Number(token);
    return value === token;
  }
  if (isBoolean(value)) {
    return token === value.toString();
  }
  if (moment.isDate(value) || moment.isMoment(value)) {
    return moment(value).isSame(token);
  }
  if (isArray(value)) {
    return value.some(item => must(item, token, options));
  }
  return false; // unknown value type
};
