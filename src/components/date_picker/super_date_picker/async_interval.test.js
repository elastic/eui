import { AsyncInterval } from './async_interval';

jest.useFakeTimers();

async function waitFor(instance, ms) {
  jest.advanceTimersByTime(ms);
  await instance.__pendingFn;
}

describe('AsyncInterval',  () => {
  test('should call fn 3 times', async () => {
    const spy = jest.fn();
    const instance = new AsyncInterval(spy, 1000);
    await waitFor(instance, 2000);
    await waitFor(instance, 2000);
    await waitFor(instance, 2000);

    expect(spy).toHaveBeenCalledTimes(3);
  });

  test('should not call fn after stop has been called', async () => {
    const spy = jest.fn();
    const instance = new AsyncInterval(spy, 1000);
    await waitFor(instance, 2000);
    instance.stop();
    await waitFor(instance, 2000);
    await waitFor(instance, 2000);

    expect(spy).toHaveBeenCalledTimes(1);
  });
});
