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
