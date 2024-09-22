/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

/* TODO: duplicated types from /eui/src/components/common - extract to shared location */

/**
 * Like `keyof typeof`, but for getting values instead of keys
 * ValueOf<typeof {key1: 'value1', key2: 'value2'}>
 * Results in `'value1' | 'value2'`
 */
export type ValueOf<T> = T[keyof T];

/**
 * Replaces all properties on any type as optional, includes nested types
 *
 * @example
 * ```ts
 * interface Person {
 *  name: string;
 *  age?: number;
 *  spouse: Person;
 *  children: Person[];
 * }
 * type PartialPerson = RecursivePartial<Person>;
 * // results in
 * interface PartialPerson {
 *  name?: string;
 *  age?: number;
 *  spouse?: RecursivePartial<Person>;
 *  children?: RecursivePartial<Person>[]
 * }
 * ```
 */
export type RecursivePartial<T> = {
  [P in keyof T]?: T[P] extends NonAny[] // checks for nested any[]
    ? T[P]
    : T[P] extends readonly NonAny[] // checks for nested ReadonlyArray<any>
    ? T[P]
    : T[P] extends Array<infer U>
    ? Array<RecursivePartial<U>>
    : T[P] extends ReadonlyArray<infer U>
    ? ReadonlyArray<RecursivePartial<U>>
    : T[P] extends Set<infer V> // checks for Sets
    ? Set<RecursivePartial<V>>
    : T[P] extends Map<infer K, infer V> // checks for Maps
    ? Map<K, RecursivePartial<V>>
    : T[P] extends NonAny // checks for primitive values
    ? T[P]
    : RecursivePartial<T[P]>; // recurse for all non-array and non-primitive values
};
type NonAny = number | boolean | string | symbol | null;
