/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import CustomEnvironment from '@storybook/test-runner/playwright/custom-environment.js';

/**
 * Playwright does not abort `page.evaluate` / locator screenshot when the
 * returned Promise never settles (Storybook `__test` play, `fonts.ready`,
 * unstable locator). Jest's testTimeout also does not kill that CDP wait,
 * so the worker leftover is a 30min job timeout.
 *
 * Wrap `global.page` in a Proxy (Playwright skips instance/prototype patches)
 * and fail the story from Node after HANG_MS.
 */
const HANG_MS = 20_000;

const raceHang = (promise, label) =>
  new Promise((resolve, reject) => {
    const timer = setTimeout(() => {
      reject(new Error(`${label} hung after ${HANG_MS}ms`));
    }, HANG_MS);
    promise.then(
      (value) => {
        clearTimeout(timer);
        resolve(value);
      },
      (err) => {
        clearTimeout(timer);
        reject(err);
      }
    );
  });

const closePageSoon = (page) => {
  if (!page || typeof page.close !== 'function') return;
  Promise.race([
    page.close({ runBeforeUnload: false }),
    new Promise((resolve) => setTimeout(resolve, 1_000)),
  ]).catch(() => undefined);
};

const withHangTimeout = async (start, label, page) => {
  try {
    return await raceHang(Promise.resolve().then(start), label);
  } catch (err) {
    if (String(err).includes('hung after')) {
      // eslint-disable-next-line no-console
      console.error(`[eui-vrt] ${err.message}`);
      closePageSoon(page);
    }
    throw err;
  }
};

const wrapLocator = (locator) => {
  if (!locator || locator.__euiProxied) return locator;
  return new Proxy(locator, {
    get(target, prop, receiver) {
      if (prop === '__euiProxied') return true;
      if (prop === 'screenshot') {
        return (...args) =>
          withHangTimeout(
            () => target.screenshot(...args),
            'locator.screenshot',
            target.page?.() ?? globalThis.page
          );
      }
      if (prop === 'first' || prop === 'last') {
        return (...args) => wrapLocator(target[prop](...args));
      }
      if (prop === 'nth') {
        return (...args) => wrapLocator(target.nth(...args));
      }
      const value = Reflect.get(target, prop, receiver);
      return typeof value === 'function' ? value.bind(target) : value;
    },
  });
};

const wrapPage = (page) => {
  if (!page || page.__euiProxied) return page;
  return new Proxy(page, {
    get(target, prop, receiver) {
      if (prop === '__euiProxied') return true;
      if (prop === 'evaluate') {
        return (...args) =>
          withHangTimeout(
            () => target.evaluate(...args),
            'page.evaluate',
            target
          );
      }
      if (prop === 'waitForFunction') {
        return (...args) =>
          withHangTimeout(
            () => target.waitForFunction(...args),
            'page.waitForFunction',
            target
          );
      }
      if (prop === 'screenshot') {
        return (...args) =>
          withHangTimeout(
            () => target.screenshot(...args),
            'page.screenshot',
            target
          );
      }
      if (prop === 'locator') {
        return (...args) => wrapLocator(target.locator(...args));
      }
      const value = Reflect.get(target, prop, receiver);
      return typeof value === 'function' ? value.bind(target) : value;
    },
  });
};

/**
 * Restores the VRT snapshot retries that `jest.retryTimes(2)` configured
 * before @storybook/test-runner v0.20 - the `jest` object is no longer
 * reachable from `test-runner.ts`, so set the jest-circus retry globals
 * (registered symbols read by the test framework) on the test realm directly.
 */
class VrtEnvironment extends CustomEnvironment {
  async setup() {
    await super.setup();
    this.global[Symbol.for('RETRY_TIMES')] = 2;
    this.global[Symbol.for('LOG_ERRORS_BEFORE_RETRY')] = true;

    this.global.page = wrapPage(this.global.page);

    const jestPlaywright = this.global.jestPlaywright;
    if (jestPlaywright?.resetPage && !jestPlaywright.__euiHangWrapped) {
      const resetPage = jestPlaywright.resetPage.bind(jestPlaywright);
      jestPlaywright.resetPage = async () => {
        await resetPage();
        this.global.page = wrapPage(this.global.page);
      };
      jestPlaywright.__euiHangWrapped = true;
    }

    // eslint-disable-next-line no-console
    console.log('[eui-vrt] hang guard proxy installed on global.page');
  }
}

export default VrtEnvironment;
