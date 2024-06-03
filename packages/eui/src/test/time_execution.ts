/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

export function timeExecution(fn: () => void) {
  const start = process.hrtime();
  fn();
  const [seconds, nanoseconds] = process.hrtime(start);
  const milliseconds = seconds * 1000 + nanoseconds / 1000000;
  return milliseconds;
}

export function benchmarkFunction(
  fn: () => void,
  warmupRuns = 3,
  benchmarkRuns = 3
) {
  // warmup v8 optimizations, cache, etc
  for (let i = 0; i < warmupRuns; i++) {
    fn();
  }

  const runTimes = [];
  for (let i = 0; i < benchmarkRuns; i++) {
    runTimes.push(timeExecution(fn));
  }

  return Math.min.apply(null, runTimes);
}
