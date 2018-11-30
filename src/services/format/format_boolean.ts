import { isNil } from '../predicate';

export const formatBoolean = (value: boolean, { yes = 'Yes', no = 'No', nil = '' } = {}) => {
  if (isNil(value)) {
    return nil;
  }

  return value ? yes : no;
};
