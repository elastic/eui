/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

export {
  always,
  never,
  isNil,
  isUndefined,
  isNull,
  isDate,
  isDateLike,
} from './common_predicates';
export {
  isFunction,
  isArray,
  isString,
  isBoolean,
  isNumber,
  isNaN,
  isObject,
} from './lodash_predicates';
