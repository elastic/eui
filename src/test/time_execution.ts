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
