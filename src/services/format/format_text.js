import { isNil } from '../predicate';

export const formatText = (value, { nil = '' } = {}) => {
  return isNil(value) ? nil : value.toString();
};
