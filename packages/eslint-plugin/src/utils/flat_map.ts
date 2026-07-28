/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

// `Array.prototype.flatMap` requires ES2019 lib; this shim keeps rules that
// need it within the package's es5 lib setting without widening it for others.
export function flatMap<T, U>(arr: readonly T[], fn: (item: T) => U[]): U[] {
  return arr.reduce<U[]>((acc, item) => acc.concat(fn(item)), []);
}
