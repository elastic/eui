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
