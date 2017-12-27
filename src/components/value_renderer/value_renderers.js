import React from 'react';
import {
  isArray, isNil, isFunction,
  isNaN, isString, isDate,
  isBoolean, isNumber
} from 'lodash';
import dateFormat from 'date-fns/format';
import numeral from 'numeral';
import { EuiIcon } from '../../components/icon';
import { EuiLink } from '../../components/link';
import { EuiHealth } from '../../components/health';

const createTextRenderer = (config = {}) => {
  const nilValue = config.nil || '';
  return (value) => !value ? nilValue : value.toString();
};
const text = createTextRenderer();
text.with = (config) => createTextRenderer(config);

const dateFormatAliases = {
  date: 'D MMM YYYY',
  longDate: 'DD MMMM YYYY',
  shortDate: 'D MMM YY',
  shortDateTime: 'D MMM YY H:mm',
  dateTime: 'D MMM YYYY HH:mm',
  longDateTime: 'DD MMMM YYYY HH:mm:ss',
  iso8601: 'YYYY-MM-DDTHH:mm:ss.SSSZ'
};

const createDateRenderer = (config = {}) => {
  const pattern = config.format || dateFormatAliases.dateTime;
  const options = config.options || {};
  const resolvedFormat = dateFormatAliases[pattern] || pattern;
  return (value) => dateFormat(value, resolvedFormat, options);
};
const date = createDateRenderer();
date.with = (config) => createDateRenderer(config);

const numberFormatAliases = {
  decimal1: '0,0.0',
  decimal2: '0,0.00',
  decimal3: '0,0.000',
  order: '0o',
  int: '0,0'
};

export const createNumberRenderer = (config = {}) => {
  if (!config.format) {
    return (value) => isNil(value) ? '' : value.toString();
  }
  const format = numberFormatAliases[config.format] || config.format;
  return (value) => numeral(value).format(format);
};
const number = createNumberRenderer();
number.with = (config) => createNumberRenderer(config);

const createBooleanTextRenderer = (config = {}) => {
  const textConfig = { yes: 'Yes', no: 'No', ...config };
  return (value) => value ? textConfig.yes : textConfig.no;
};
const booleanText = createBooleanTextRenderer();
booleanText.with = (config) => createBooleanTextRenderer(config);

export const createBooleanIconRenderer = (config = {}) => {
  const iconConfig = { type: 'check', color: 'default', ...config };
  return (value) => value ? <EuiIcon type={iconConfig.type} color={iconConfig.color} size="m" /> : '';
};
const booleanIcon = createBooleanIconRenderer();
booleanIcon.with = (config) => createBooleanIconRenderer(config);

export const property = (prop, renderer) => {
  return (value) => renderer(value[prop]);
};

export const join = (renderer, delim = ', ') => {
  return (value) => isArray(value) ? value.map(item => renderer(item)).join(delim) : renderer(value);
};

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


export const link = (config = {}) => {
  if (!config.onClick) {
    throw Error(`linkRenderer requires a [onClick] setting. This needs to be configured as a function that will be 
      called whenever the rendered link is clicked. It accepts rendered value as argument - [(value) => void]`);
  }
  return (value, ctx = undefined) => {
    const content = config.content || defaultRenderer(value, ctx);
    const resolvedContent = isFunction(content) ? content(value, ctx) : content;
    const onClick = () => config.onClick(value, ctx);
    return <EuiLink type={config.type} color={config.color} onClick={onClick}>{resolvedContent}</EuiLink>;
  };
};

export const health = (config = {}) => {
  if (!config.color) {
    throw Error(`healthRenderer requires a [color] setting. This setting determines the health color that will be
      used based on the passed in value.`);
  }
  return (value, ctx = undefined) => {
    const content = config.content || defaultRenderer(value);
    const resolvedContent = isFunction(content) ? content(value) : content;
    const color = config.color(value, ctx);
    return <EuiHealth color={color}>{resolvedContent}</EuiHealth>;
  };
};

export const ValueRenderers = {
  default: defaultRenderer,
  text,
  date,
  number,
  booleanText,
  booleanIcon,
  link,
  health,
  property,
  join
};






