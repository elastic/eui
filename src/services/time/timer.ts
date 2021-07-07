/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

export class Timer {
  // In a browser this is a number, but in node it's a NodeJS.Time (a
  // class). We don't care about this difference.
  id: any;
  callback: undefined | (() => void);
  finishTime: number | undefined;
  timeRemaining: number | undefined;

  constructor(callback: () => void, timeMs: number) {
    this.id = setTimeout(this.finish, timeMs);
    this.callback = callback;
    this.finishTime = Date.now() + timeMs;
    this.timeRemaining = undefined;
  }

  pause = () => {
    clearTimeout(this.id);
    this.id = undefined;
    this.timeRemaining = (this.finishTime || 0) - Date.now();
  };

  resume = () => {
    this.id = setTimeout(this.finish, this.timeRemaining);
    this.finishTime = Date.now() + (this.timeRemaining || 0);
    this.timeRemaining = undefined;
  };

  clear = () => {
    clearTimeout(this.id);
    this.id = undefined;
    this.callback = undefined;
    this.finishTime = undefined;
    this.timeRemaining = undefined;
  };

  finish = () => {
    if (this.callback) {
      this.callback();
    }
    this.clear();
  };
}
