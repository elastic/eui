import { SortDirection } from './sort_direction';
import { get } from '../objects';

export const Comparators = Object.freeze({

  default: (direction = SortDirection.ASC) => {
    return (v1, v2) => {
      if (v1 === v2) {
        return 0;
      }
      const result =  v1 > v2 ? 1 : -1;
      return SortDirection.isAsc(direction) ? result : -1 * result;
    };
  },

  reverse: (comparator) => {
    return (v1, v2) => comparator(v2, v1);
  },

  value(valueCallback, comparator = undefined) {
    if (!comparator) {
      comparator = this.default(SortDirection.ASC);
    }
    return (o1, o2) => {
      return comparator(valueCallback(o1), valueCallback(o2));
    };
  },

  property(prop, comparator = undefined) {
    return this.value(value => get(value, prop), comparator);
  },

});
