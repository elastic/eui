import moment from 'moment';

export const always = (value?: any) => true;

export const never = (value?: any) => false;

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

export const isDateLike = (value: any) => {
  return isMoment(value) || isDate(value);
};
