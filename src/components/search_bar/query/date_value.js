import { isDateLike, isNumber } from '../../../services/predicate';
import {
  dateFormat as defaultDateFormat,
  dateGranularity,
} from './date_format';
import moment from 'moment';

export const DATE_TYPE = 'date';

export const dateValuesEqual = (v1, v2) => {
  return (
    v1.raw === v2.raw &&
    v1.granularity === v2.granularity &&
    v1.text === v2.text
  );
};

export const isDateValue = value => {
  return (
    !!value &&
    value.type === DATE_TYPE &&
    !!value.raw &&
    !!value.text &&
    !!value.resolve
  );
};

export const dateValue = (raw, granularity, dateFormat = defaultDateFormat) => {
  if (!raw) {
    return undefined;
  }
  if (isDateLike(raw)) {
    return {
      type: DATE_TYPE,
      raw,
      granularity,
      text: dateFormat.print(raw),
      resolve: () => moment(raw),
    };
  }
  if (isNumber(raw)) {
    return {
      type: DATE_TYPE,
      raw,
      granularity,
      text: raw.toString(),
      resolve: () => moment(raw),
    };
  }
  const text = raw.toString();
  return {
    type: DATE_TYPE,
    raw,
    granularity,
    text,
    resolve: () => dateFormat.parse(text),
  };
};

export const dateValueParser = (format = defaultDateFormat) => {
  return text => {
    const parsed = format.parse(text);
    return dateValue(text, dateGranularity(parsed), format);
  };
};
