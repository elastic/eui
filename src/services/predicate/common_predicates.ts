import moment from 'moment';

export const always = (value?: any) => true;

export const never = (value?: any) => false;

export const isUndefined = (value: any) => {
  return value === undefined;
};

export const isNull = (value: any) => {
  return value === null;
};

export const isNil = (value: any) => {
  return isUndefined(value) || isNull(value);
};

export const isMoment = (value: any) => {
  return moment.isMoment(value);
};

export const isDate = (value: any) => {
  return moment.isDate(value);
};

export const isDateLike = (value: any) => {
  return isMoment(value) || isDate(value);
};
