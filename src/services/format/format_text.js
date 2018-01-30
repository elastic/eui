import { isNil } from 'lodash';

export const formatText = (value, { nil = '' } = {}) => {
  return isNil(value) ? nil : value.toString();
};
