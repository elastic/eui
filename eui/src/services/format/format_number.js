import numeral from 'numeral';
import { isNil, isString } from '../predicate';

const numberFormatAliases = {
  decimal1: '0,0.0',
  decimal2: '0,0.00',
  decimal3: '0,0.000',
  ordinal: '0o',
  integer: '0,0'
};

export const formatNumber = (value, numberFormatOrConfig = {}) => {
  let format;
  let nil = '';
  let round;

  if (isString(numberFormatOrConfig)) {
    format = numberFormatOrConfig;
  } else {
    format = numberFormatOrConfig.format;
    nil = numberFormatOrConfig.nil || '';
    round = numberFormatOrConfig.round;
  }

  if (!format) {
    return isNil(value) ? nil : value.toString();
  }

  const roundingFunc = round ? Math.round : Math.floor;
  const numberFormat = numberFormatAliases[format] || format;
  return isNil(value) ? nil : numeral(value).format(numberFormat, roundingFunc);
};
