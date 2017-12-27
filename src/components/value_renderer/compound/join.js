import { isArray } from 'lodash';

export const join = (renderer, delim = ', ') => {
  return (value) => isArray(value) ? value.map(item => renderer(item)).join(delim) : renderer(value);
};
