import moment from 'moment';

export const always = () => true;

export const never = () => false;

export const isUndefined = (value) => {
  return value === undefined;
};

export const isNull = (value) => {
  return value === null;
};

export const isNil = (value) => {
  return isUndefined(value) || isNull(value);
};

export const isMoment = (value) => {
  return moment.isMoment(value);
};

export const isDate = (value) => {
  return moment.isDate(value);
};

export const isDateLike = (value) => {
  return isMoment(value) || isDate(value);
};
