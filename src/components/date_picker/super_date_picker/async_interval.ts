/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

export class AsyncInterval {
  timeoutId: number | null = null;
  isStopped = false;
  __pendingFn: Function = () => {};

  constructor(fn: Function, refreshInterval: number) {
    this.setAsyncInterval(fn, refreshInterval);
  }

  setAsyncInterval = (fn: Function, milliseconds: number) => {
    if (!this.isStopped) {
      this.timeoutId = window.setTimeout(async () => {
        this.__pendingFn = await fn();
        this.setAsyncInterval(fn, milliseconds);
      }, milliseconds);
    }
  };

  stop = () => {
    this.isStopped = true;
    if (this.timeoutId !== null) {
      window.clearTimeout(this.timeoutId);
    }
  };
}
