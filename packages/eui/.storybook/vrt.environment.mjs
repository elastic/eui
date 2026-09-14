/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { createRequire } from 'node:module';
import {
  setTimeout as rawSetTimeout,
  clearTimeout as rawClearTimeout,
} from 'node:timers';
import CustomEnvironment from '@storybook/test-runner/playwright/custom-environment.js';

/**
 * Playwright does not abort `page.evaluate` when the returned Promise never
 * settles (Storybook `__test` play/render). Jest's testTimeout also does not
 * kill that CDP wait, so the leftover is a 30min job timeout.
 *
 * Guard in three places (Playwright skips some of these depending on how the
 * Page is referenced):
 * 1. playwright-core Frame/Page/Locator prototypes
 * 2. Proxy on `global.page` (resetPage assigns a raw Page)
 * 3. circus `test_fn_start` watchdog — close page/context if anything else wedges
 *
 * Use `node:timers` so Jest fake timers cannot disable the cap.
 */
const HANG_MS = 20_000;
const require = createRequire(import.meta.url);

const raceHang = (promise, label) =>
  new Promise((resolve, reject) => {
    const timer = rawSetTimeout(() => {
      reject(new Error(`${label} hung after ${HANG_MS}ms`));
    }, HANG_MS);
    promise.then(
      (value) => {
        rawClearTimeout(timer);
        resolve(value);
      },
      (err) => {
        rawClearTimeout(timer);
        reject(err);
      }
    );
  });

const closeSoon = (closeFn) => {
  if (typeof closeFn !== 'function') return Promise.resolve();
  return Promise.race([
    Promise.resolve().then(() => closeFn({ runBeforeUnload: false })),
    new Promise((resolve) => rawSetTimeout(resolve, 1_000)),
  ]).catch(() => undefined);
};

const abortPlaywright = (page) => {
  const context = page?.context?.();
  const browser = context?.browser?.() ?? globalThis.browser;
  closeSoon(page?.close?.bind(page)).then(() =>
    closeSoon(context?.close?.bind(context)).then(() =>
      closeSoon(browser?.close?.bind(browser))
    )
  );
};

const withHangTimeout = async (start, label, page) => {
  try {
    return await raceHang(Promise.resolve().then(start), label);
  } catch (err) {
    if (String(err).includes('hung after')) {
      // eslint-disable-next-line no-console
      console.error(`[eui-vrt] ${err.message}`);
      abortPlaywright(page);
    }
    throw err;
  }
};

const patchProto = (ctor, methods, labelPrefix) => {
  if (!ctor?.prototype) return;
  for (const method of methods) {
    const orig = ctor.prototype[method];
    if (typeof orig !== 'function' || orig.__euiPatched) continue;
    const patched = function (...args) {
      const page =
        typeof this.close === 'function' && typeof this.evaluate === 'function'
          ? this
          : this.page?.() ?? this._page ?? globalThis.page;
      return withHangTimeout(
        () => orig.apply(this, args),
        `${labelPrefix}.${method}`,
        page
      );
    };
    patched.__euiPatched = true;
    ctor.prototype[method] = patched;
  }
};

try {
  const { Frame } = require('playwright-core/lib/client/frame.js');
  const { Page } = require('playwright-core/lib/client/page.js');
  const { Locator } = require('playwright-core/lib/client/locator.js');
  patchProto(
    Page,
    [
      'evaluate',
      'waitForFunction',
      'waitForLoadState',
      'goto',
      'screenshot',
      'reload',
      'addScriptTag',
    ],
    'page'
  );
  patchProto(
    Frame,
    ['evaluate', 'waitForFunction', 'waitForSelector', 'goto', 'waitForLoadState'],
    'frame'
  );
  patchProto(Locator, ['screenshot', 'click', 'hover', 'waitFor'], 'locator');
} catch (err) {
  // eslint-disable-next-line no-console
  console.error('[eui-vrt] failed to patch Playwright prototypes', err);
}

const wrapLocator = (locator) => {
  if (!locator || locator.__euiProxied) return locator;
  return new Proxy(locator, {
    get(target, prop, receiver) {
      if (prop === '__euiProxied') return true;
      if (prop === 'screenshot' || prop === 'click' || prop === 'hover' || prop === 'waitFor') {
        return (...args) =>
          withHangTimeout(
            () => target[prop](...args),
            `locator.${String(prop)}`,
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

const PAGE_HANG_METHODS = [
  'evaluate',
  'waitForFunction',
  'waitForLoadState',
  'goto',
  'screenshot',
  'reload',
  'addScriptTag',
];

const wrapPage = (page) => {
  if (!page || page.__euiProxied) return page;
  return new Proxy(page, {
    get(target, prop, receiver) {
      if (prop === '__euiProxied') return true;
      if (PAGE_HANG_METHODS.includes(prop)) {
        return (...args) =>
          withHangTimeout(
            () => target[prop](...args),
            `page.${String(prop)}`,
            target
          );
      }
      if (prop === 'locator' || prop === 'getByRole' || prop === 'getByText' || prop === 'getByTestId' || prop === 'getByLabel') {
        return (...args) => wrapLocator(target[prop](...args));
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

    // Always re-wrap on read/write. `resetPage` assigns a raw Page onto
    // `global.page`; a one-shot replacement is overwritten. Jest tests look
    // up `page` from this global at call time.
    let pageRef = wrapPage(this.global.page);
    Object.defineProperty(this.global, 'page', {
      configurable: true,
      enumerable: true,
      get: () => pageRef,
      set: (next) => {
        pageRef = wrapPage(next);
      },
    });

    // eslint-disable-next-line no-console
    console.log('[eui-vrt] hang guard proxy installed on global.page');
  }

  async handleTestEvent(event) {
    if (typeof super.handleTestEvent === 'function') {
      await super.handleTestEvent(event);
    }

    if (event.name === 'test_fn_start') {
      const name = `${event.test?.parent?.name ?? ''} ${event.test?.name ?? ''}`.trim();
      this._euiHangTimer = rawSetTimeout(() => {
        // eslint-disable-next-line no-console
        console.error(`[eui-vrt] test_fn hung after ${HANG_MS}ms: ${name}`);
        abortPlaywright(this.global.page);
      }, HANG_MS);
    }

    if (
      event.name === 'test_fn_success' ||
      event.name === 'test_fn_failure' ||
      event.name === 'test_done'
    ) {
      if (this._euiHangTimer) {
        rawClearTimeout(this._euiHangTimer);
        this._euiHangTimer = undefined;
      }
    }
  }
}

export default VrtEnvironment;
