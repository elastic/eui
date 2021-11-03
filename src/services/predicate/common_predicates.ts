/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import moment from 'moment';

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

export const isMoment = (value: any) => {
  return moment.isMoment(value);
};

export const isDate = (value: any): value is Date => {
  return moment.isDate(value);
};

export const isDateLike = (value: any): value is moment.Moment | Date => {
  return isMoment(value) || isDate(value);
};
