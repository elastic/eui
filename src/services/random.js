import { isNil } from './predicate';
import { times } from './utils';

const defaultRand = Math.random;

export class Random {

  constructor(rand = defaultRand) {
    this._rand = rand;
  }

  boolean() {
    return this._rand() > 0.5;
  }

  number(options = {}) {
    const min = isNil(options.min) ? Number.MIN_VALUE : options.min;
    const max = isNil(options.max) ? Number.MAX_VALUE : options.max;
    const delta = this._rand() * (max - min);
    return min + delta;
  }

  integer(options = {}) {
    const min = Math.ceil(isNil(options.min) ? Number.MIN_VALUE : options.min);
    const max = Math.floor(isNil(options.max) ? Number.MAX_VALUE : options.max);
    const delta = Math.floor(this._rand() * (max - min + 1));
    return min + delta;
  }

  oneOf(...values) {
    return values[Math.floor(this._rand() * values.length)];
  }

  setOf(values, options) {
    const count = this.integer({ min: 0, max: values.length, ...options });
    const copy = [...values];
    return times(count, () => {
      const value = this.oneOf(...copy);
      copy.splice(copy.indexOf(value), 1);
      return value;
    });
  }

  date(options = {}) {
    const min = isNil(options.min) ? new Date(0) : options.min;
    const max = isNil(options.max) ? Date.now() : options.max;
    const minMls = min.getTime();
    const maxMls = max.getTime();
    const time = this.integer({ min: minMls, max: maxMls });
    return new Date(time);
  }

}
