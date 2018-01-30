import {
  isArray, isBoolean,
  isNumber, isString
} from '../../../../services/predicate';
import moment from 'moment/moment';

const defaultOptions = {
  ignoreCase: true
};

export const mustNot = (value, token, options = {}) => {
  options = { ...defaultOptions, ...options };
  if (isString(value)) {
    return !value.toLowerCase().includes(token.toLowerCase());
  }
  if (isNumber(value)) {
    token = Number(token);
    return value !== token;
  }
  if (isBoolean(value)) {
    return token !== value.toString();
  }
  if (moment.isDate(value) || moment.isMoment(value)) {
    return !moment(value).isSame(token);
  }
  if (isArray(value)) {
    return value.every(item => mustNot(item, token, options));
  }
  return false; // unknown value type
};
