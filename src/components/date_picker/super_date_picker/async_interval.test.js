import { AsyncInterval } from './async_interval';
import { times } from 'lodash';
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
  async function andvanceTimerAndAwaitFn(instance, ms) {
    const iterations = times(Math.floor(ms / 100));
    const remainder = ms % 100;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    for (const item of iterations) {
      await instance.__pendingFn;
      jest.advanceTimersByTime(100);
      await instance.__pendingFn;
    }
    jest.advanceTimersByTime(remainder);
    await instance.__pendingFn;
  }

  describe('when creating a 1000ms interval', async () => {
    let instance;
    let spy;
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
    let instance;
    let spy;
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
