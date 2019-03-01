export class AsyncInterval {
  timeoutId = null;
  isStopped = false;

  constructor(fn, refreshInterval) {
    this.setAsyncInterval(fn, refreshInterval);
  }

  setAsyncInterval = (fn, ms) => {
    if (!this.isStopped) {
      this.timeoutId = window.setTimeout(async () => {
        this.__pendingFn = await fn();
        this.setAsyncInterval(fn, ms);
      }, ms);
    }
  };

  stop = () => {
    this.isStopped = true;
    window.clearTimeout(this.timeoutId);
  };
}
