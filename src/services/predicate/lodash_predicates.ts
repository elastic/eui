/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import _isFunction from 'lodash/isFunction';
import _isArray from 'lodash/isArray';
import _isString from 'lodash/isString';
import _isBoolean from 'lodash/isBoolean';
import _isNumber from 'lodash/isNumber';
import _isNaN from 'lodash/isNaN';
import _isObject from 'lodash/isObject';

// wrap the lodash functions to avoid having lodash's TS type definition from being
// exported, which can conflict with the lodash namespace if other versions are used

export const isFunction = (value: any): value is (...args: any[]) => any =>
  _isFunction(value);
export const isArray = (value: any): value is any[] => _isArray(value);
export const isString = (value: any): value is string => _isString(value);
export const isBoolean = (value: any): value is boolean => _isBoolean(value);
export const isNumber = (value: any): value is number => _isNumber(value);
export const isNaN = (value: any) => _isNaN(value);
export const isObject = (value: any): value is object => _isObject(value);
