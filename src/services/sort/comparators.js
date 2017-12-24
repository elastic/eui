import { SortDirection } from './sort_direction';

export const Comparators = Object.freeze({

  default: (direction = SortDirection.ASC) => {
    return (v1, v2) => {
      if (v1 === v2) {
        return 0;
      }
      const result =  v1 < v2 ? 1 : -1;
      return SortDirection.isAsc(direction) ? result : -1 * result;
    };
  },

  property(prop, direction = SortDirection.ASC, comparator = this.default) {
    return (o1, o2) => {
      return comparator(direction)(o1[prop], o2[prop]);
    };
  }

});
