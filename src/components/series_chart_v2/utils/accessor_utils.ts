import { Accessor } from '../commons/domain';

export function getAccessorFn(accessor: Accessor | string) {
  if (typeof accessor === 'string') {
    return (datum: any) => datum[accessor];
  }
  return accessor;
}
