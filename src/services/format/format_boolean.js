import { isNil } from 'lodash';

export const formatBoolean = (value, { yes = 'Yes', no = 'No', nil = '' } = {}) => {
  if (isNil(value)) {
    return nil;
  }

  return value ? yes : no;
};
