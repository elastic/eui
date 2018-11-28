import { Datum } from '../series/specs';

export type AccessorFn = (datum: Datum) => any;
export type AccessorString = string | number;
export type Accessor = AccessorString;

/**
 * Return an accessor function using the accessor passed as argument
 * @param accessor the spec accessor
 */
export function getAccessorFn(accessor: Accessor): AccessorFn {
  if (typeof accessor === 'string' || typeof accessor === 'number') {
    return (datum: Datum) => {
      return datum[accessor];
    };
  }
  if (typeof accessor === 'function') {
    return accessor;
  }
  throw new Error('Accessor must be a string or a function');
}
