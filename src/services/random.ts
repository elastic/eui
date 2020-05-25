/*
 * Licensed to Elasticsearch B.V. under one or more contributor
 * license agreements. See the NOTICE file distributed with
 * this work for additional information regarding copyright
 * ownership. Elasticsearch B.V. licenses this file to you under
 * the Apache License, Version 2.0 (the "License"); you may
 * not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

import moment from 'moment';
import { isNil } from './predicate';
import { times } from './utils';

const defaultRand = Math.random;

export class Random {
  private readonly rand: () => number;

  constructor(rand = defaultRand) {
    this.rand = rand;
  }

  boolean = () => {
    return this.rand() > 0.5;
  };

  number = (options: { min?: number; max?: number } = {}) => {
    const min = isNil(options.min) ? Number.MIN_VALUE : options.min!;
    const max = isNil(options.max) ? Number.MAX_VALUE : options.max!;
    const delta = this.rand() * (max - min);
    return min + delta;
  };

  integer = (options: { min?: number; max?: number } = {}) => {
    const min = Math.ceil(isNil(options.min) ? Number.MIN_VALUE : options.min!);
    const max = Math.floor(
      isNil(options.max) ? Number.MAX_VALUE : options.max!
    );
    const delta = Math.floor(this.rand() * (max - min + 1));
    return min + delta;
  };

  oneOf = <T>(values: T[]): T => {
    return values[Math.floor(this.rand() * values.length)];
  };

  oneToOne = <T>(values: T[], index: number): T => {
    return values[index];
  };

  setOf = <T>(
    values: T[],
    options: { min?: number; max?: number } = {}
  ): T[] => {
    const count = this.integer({ min: 0, max: values.length, ...options });
    const copy = [...values];
    return times(count, () => {
      const value = this.oneOf(copy);
      copy.splice(copy.indexOf(value), 1);
      return value;
    });
  };

  date = (options: { min?: Date; max?: Date } = {}) => {
    const min = isNil(options.min) ? new Date(0) : options.min!;
    const max = isNil(options.max) ? new Date(Date.now()) : options.max!;
    const minMls = min.getTime();
    const maxMls = max.getTime();
    const time = this.integer({ min: minMls, max: maxMls });
    return new Date(time);
  };

  moment = (options: { min?: moment.Moment; max?: moment.Moment } = {}) => {
    const min = isNil(options.min) ? moment(0) : options.min!;
    const max = isNil(options.max) ? moment() : options.max!;
    const minMls = +min;
    const maxMls = +max;
    const time = this.integer({ min: minMls, max: maxMls });
    return moment(time);
  };
}
