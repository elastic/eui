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
