import { SortDirection } from './sort_direction';
import { get } from '../objects';

export type Primitive = string | boolean | number | null | undefined;

type Comparator<T = Primitive> = (a: T, b: T) => number;

export const Comparators = Object.freeze({

  default: (direction: 'asc' | 'desc' = SortDirection.ASC) => {
    return (v1: Primitive, v2: Primitive) => {
      // JavaScript's comparison of null/undefined (and some others not handled here) values always returns `false`
      // (https://www.ecma-international.org/ecma-262/#sec-abstract-relational-comparison)
      // resulting in cases where v1 < v2 and v1 > v2 are both false.
      // This leads to unpredictable sorting results in multiple JS engine sorting algorithms
      // which causes unpredictable user experiences.
      // Instead:
      // * 1. push undefined/null values to the end of the sorted list, _regardless of sort direction_
      //    (non-sortable values always appear at the end, and sortable values are sorted at the top)
      // * 2. report undefined/null values as equal
      // * 3. when both values are comparable they are sorted normally

      const v1IsComparable = v1 != null;
      const v2IsComparable = v2 != null;

      // * 1.
      if (v1IsComparable && !v2IsComparable) {
        return -1;
      }
      if (!v1IsComparable && v2IsComparable) {
        return 1;
      }

      // * 2.
      if (!v1IsComparable && !v2IsComparable) {
        return 0;
      }

      // * 3.
      if (v1 === v2) {
        return 0;
      }
      const result =  v1! > v2! ? 1 : -1;
      return SortDirection.isAsc(direction) ? result : -1 * result;
    };
  },

  reverse: <T>(comparator: Comparator<T>): Comparator<T> => {
    return (v1, v2) => comparator(v2, v1);
  },

  value<T>(valueCallback: (value: T) => Primitive, comparator?: Comparator): Comparator<T> {
    if (!comparator) {
      comparator = this.default(SortDirection.ASC);
    }
    return (o1: T, o2: T) => {
      return comparator!(valueCallback(o1), valueCallback(o2));
    };
  },

  property<T>(prop: string, comparator?: Comparator): Comparator<T> {
    return this.value(value => get(value, prop), comparator);
  },

});
