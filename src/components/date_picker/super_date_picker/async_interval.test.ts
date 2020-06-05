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

import { AsyncInterval } from './async_interval';
import { sleep } from '../../../test';

describe('AsyncInterval', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  // Advances time and awaits any pending promises after every 100ms
  // This helper makes it easier to advance time without worrying
  // whether tasks are still lingering on the event loop
  async function andvanceTimerAndAwaitFn(
    instance: AsyncInterval,
    milliseconds: number
  ) {
    const iterations = [...Array(Math.floor(milliseconds / 100)).keys()];
    const remainder = milliseconds % 100;
    /* eslint-disable @typescript-eslint/no-unused-vars */
    // @ts-ignore
    for (const item of iterations) {
      /* eslint-enable @typescript-eslint/no-unused-vars */
      await instance.__pendingFn;
      jest.advanceTimersByTime(100);
      await instance.__pendingFn;
    }
    jest.advanceTimersByTime(remainder);
    await instance.__pendingFn;
  }

  describe('when creating a 1000ms interval', async () => {
    let instance: AsyncInterval;
    let spy: jest.Mock;
    beforeEach(() => {
      spy = jest.fn();
      instance = new AsyncInterval(spy, 1000);
    });

    it('should not call fn immediately', async () => {
      await andvanceTimerAndAwaitFn(instance, 0);
      expect(spy).toHaveBeenCalledTimes(0);
    });

    it('should have called fn once after 1000ms', async () => {
      await andvanceTimerAndAwaitFn(instance, 1000);
      expect(spy).toHaveBeenCalledTimes(1);
    });

    it('should have called fn twice after 2000ms', async () => {
      await andvanceTimerAndAwaitFn(instance, 2000);
      expect(spy).toHaveBeenCalledTimes(2);
    });

    it('should have called fn three times after 3000ms', async () => {
      await andvanceTimerAndAwaitFn(instance, 3000);
      expect(spy).toHaveBeenCalledTimes(3);
    });

    it('should not call fn after stop has been invoked', async () => {
      await andvanceTimerAndAwaitFn(instance, 1000);
      expect(spy).toHaveBeenCalledTimes(1);
      instance.stop();
      await andvanceTimerAndAwaitFn(instance, 1000);
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  describe('when creating a 1000ms interval that calls a fn that takes 2000ms to complete', async () => {
    let instance: AsyncInterval;
    let spy: jest.Mock;
    beforeEach(() => {
      spy = jest.fn(async () => await sleep(2000));
      instance = new AsyncInterval(spy, 1000);
    });

    it('should not call fn immediately', async () => {
      await andvanceTimerAndAwaitFn(instance, 0);
      expect(spy).toHaveBeenCalledTimes(0);
    });

    it('should have called fn once after 1000ms', async () => {
      await andvanceTimerAndAwaitFn(instance, 1000);
      expect(spy).toHaveBeenCalledTimes(1);
    });

    it('should have called fn twice after 4000ms', async () => {
      await andvanceTimerAndAwaitFn(instance, 4000);
      expect(spy).toHaveBeenCalledTimes(2);
    });

    it('should have called fn tree times after 7000ms', async () => {
      await andvanceTimerAndAwaitFn(instance, 7000);
      expect(spy).toHaveBeenCalledTimes(3);
    });
  });
});
