import { dateFormat, dateGranularity } from './date_format';
import { isDateValue } from './date_value';
import {
  isArray, isBoolean,
  isNumber, isString,
  isDateLike, isNil
} from '../../../services/predicate';
import moment from 'moment';
const utc = moment.utc;

const resolveValueAsDate = (value) => {
  if (moment.isMoment(value)) {
    return value;
  }
  if (moment.isDate(value) || isNumber(value)) {
    return moment(value);
  }
  return dateFormat.parse(value.toString());
};

const defaultEqOptions = {
  ignoreCase: true
};

export const eq = (fieldValue, clauseValue, options = {}) => {
  options = { ...defaultEqOptions, ...options };

  if (isNil(fieldValue) || isNil(clauseValue)) {
    return fieldValue === clauseValue;
  }

  if (isDateValue(clauseValue)) {
    const dateFieldValue = resolveValueAsDate(fieldValue);
    if (clauseValue.granularity) {
      return clauseValue.granularity.isSame(dateFieldValue, clauseValue.resolve());
    }
    return dateFieldValue.isSame(clauseValue.resolve());
  }

  if (isString(fieldValue)) {
    return options.ignoreCase ?
      fieldValue.toLowerCase().includes(clauseValue.toString().toLowerCase()) :
      fieldValue.includes(clauseValue.toString());
  }

  if (isNumber(fieldValue)) {
    clauseValue = Number(clauseValue);
    return fieldValue === clauseValue;
  }

  if (isBoolean(fieldValue)) {
    return clauseValue === fieldValue;
  }

  if (isDateLike(fieldValue)) {
    const date = resolveValueAsDate(clauseValue);
    if (!date.isValid()) {
      return false;
    }
    const granularity = dateGranularity(date);
    if (!granularity) {
      return utc(fieldValue).isSame(date);
    }
    return granularity.isSame(fieldValue, date);
  }

  if (isArray(fieldValue)) {
    return fieldValue.some(item => eq(item, clauseValue, options));
  }

  return false; // unknown value type
};

const greaterThen = (fieldValue, clauseValue, inclusive = false) => {
  if (isDateValue(clauseValue)) {
    const clauseDateValue = clauseValue.resolve();
    if (!clauseValue.granularity) {
      return inclusive ? utc(fieldValue).isSameOrAfter(clauseDateValue) : utc(fieldValue).isAfter(clauseDateValue);
    }
    if (inclusive) {
      return utc(fieldValue).isSameOrAfter(clauseValue.granularity.start(clauseDateValue));
    }
    return utc(fieldValue).isSameOrAfter(clauseValue.granularity.startOfNext(clauseDateValue));
  }

  if (isString(fieldValue)) {
    const str = clauseValue.toString();
    return inclusive ? fieldValue >= str : fieldValue > str;
  }

  if (isNumber(fieldValue)) {
    const number = Number(clauseValue);
    return inclusive ? fieldValue >= number : fieldValue > number;
  }

  if (isDateLike(fieldValue)) {
    const date = resolveValueAsDate(clauseValue);
    const granularity = dateGranularity(date);
    if (!granularity) {
      return inclusive ? utc(fieldValue).isSameOrAfter(date) : utc(fieldValue).isAfter(date);
    }
    if (inclusive) {
      return utc(fieldValue).isSameOrAfter(granularity.start(date));
    }
    return utc(fieldValue).isSameOrAfter(granularity.startOfNext(date));
  }

  if (isArray(fieldValue)) {
    return fieldValue.all(item => greaterThen(item, clauseValue, inclusive));
  }

  return false; // unsupported value type
};

export const gt = (fieldValue, clauseValue) => {
  if (isNil(fieldValue) || isNil(clauseValue)) {
    return false;
  }
  return greaterThen(fieldValue, clauseValue);
};

export const gte = (fieldValue, clauseValue) => {
  if (isNil(fieldValue) || isNil(clauseValue)) {
    return fieldValue === clauseValue;
  }
  return greaterThen(fieldValue, clauseValue, true);
};

export const lt = (fieldValue, clauseValue) => {
  if (isNil(fieldValue) || isNil(clauseValue)) {
    return false;
  }
  return !greaterThen(fieldValue, clauseValue, true);
};

export const lte = (fieldValue, clauseValue) => {
  if (isNil(fieldValue) || isNil(clauseValue)) {
    return fieldValue === clauseValue;
  }
  return !greaterThen(fieldValue, clauseValue);
};
