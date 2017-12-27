import numeral from 'numeral';
import { isNil } from 'lodash';

const numberFormatAliases = {
  decimal1: '0,0.0',
  decimal2: '0,0.00',
  decimal3: '0,0.000',
  ordinal: '0o',
  integer: '0,0'
};

export const createNumberRenderer = (config = {}) => {
  if (!config.format) {
    return (value) => isNil(value) ? '' : value.toString();
  }
  const rounding = config.round ? Math.round : Math.floor;
  const format = numberFormatAliases[config.format] || config.format;
  return (value) => numeral(value).format(format, rounding);
};

export const number = createNumberRenderer();
number.with = (config) => createNumberRenderer(config);
