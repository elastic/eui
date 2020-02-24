import { isDateLike, isNumber } from '../../../services/predicate';
import {
  dateFormat as defaultDateFormat,
  dateGranularity,
  GranularityType,
} from './date_format';
// ESLint doesn't realise that we can import Moment directly.
// eslint-disable-next-line import/named
import moment, { MomentInput } from 'moment';

export const DATE_TYPE = 'date';

export interface DateValue {
  type: 'date';
  raw: MomentInput;
  granularity: GranularityType | undefined;
  text: string;
  resolve: () => moment.Moment;
}

export const dateValuesEqual = (v1: DateValue, v2: DateValue) => {
  return (
    v1.raw === v2.raw &&
    v1.granularity === v2.granularity &&
    v1.text === v2.text
  );
};

export const isDateValue = (value: any): value is DateValue => {
  return (
    !!value &&
    value.type === DATE_TYPE &&
    !!value.raw &&
    !!value.text &&
    !!value.resolve
  );
};

export const dateValue: (
  raw: MomentInput,
  granularity?: GranularityType,
  dateFormat?: any
) => DateValue | undefined = (
  raw,
  granularity,
  dateFormat = defaultDateFormat
) => {
  if (!raw) {
    return undefined;
  }

  if (isDateLike(raw)) {
    const dateValue: DateValue = {
      type: DATE_TYPE,
      raw,
      granularity,
      text: dateFormat.print(raw),
      resolve: () => moment(raw),
    };
    return dateValue;
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
  return (text: string) => {
    const parsed = format.parse(text);
    return dateValue(text, dateGranularity(parsed), format);
  };
};
