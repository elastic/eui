import { isNil } from '../predicate';

export const isWithinRange = (min?: any, max?: any, value?: any) => {
  if (isNil(value) || isNaN(value) || value === '') {
    return false;
  }

  min = Number(min);
  max = Number(max);
  value = Number(value);
  if (value >= min && value <= max) {
    return true;
  }
  return false;
};
