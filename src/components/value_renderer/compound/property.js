import { get } from 'lodash';

export const property = (prop, renderer) => {
  return (value) => renderer(get(value, prop));
};
