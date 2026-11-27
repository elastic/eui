/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import type { Moment } from 'moment';

export const always = (_value?: any) => true;

export const never = (_value?: any) => false;

export const isUndefined = (value: any): value is undefined => {
  return value === undefined;
};

export const isNull = (value: any): value is null => {
  return value === null;
};

export const isNil = (value: any): value is null | undefined => {
  return isUndefined(value) || isNull(value);
};

export const isMoment = (value: any): value is Moment => {
  return value != null && value._isAMomentObject != null;
};

export const isDate = (value: any): value is Date => {
  return (
    value instanceof Date ||
    Object.prototype.toString.call(value) === '[object Date]'
  );
};

export const isDateLike = (value: any): value is Moment | Date => {
  return isMoment(value) || isDate(value);
};
