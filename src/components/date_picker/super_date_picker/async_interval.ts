/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
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
