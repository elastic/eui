/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { Worker } from 'node:worker_threads';
import CustomEnvironment from '@storybook/test-runner/playwright/custom-environment.js';

/**
 * Playwright does not abort `page.evaluate` of a Promise that never settles
 * (Storybook `__test` play/render). Jest testTimeout also does not kill that
 * CDP wait, so a leftover file becomes a 30min job timeout.
 *
 * Circus does not await async `handleTestEvent`, so the test can hang in
 * evaluate before a post-`await super` arm runs. Arm synchronously first.
 * The timer lives on a worker_threads event loop; on fire it SIGKILLs the
 * Chromium pid (parent `on('message')` may never run if Node is wedged).
 */
const HANG_MS = 20_000;

const HANG_WORKER_SRC = `
const { parentPort } = require('node:worker_threads');
let timer;
let killTimer;
parentPort.on('message', (msg) => {
  if (timer) {
    clearTimeout(timer);
    timer = undefined;
  }
  if (killTimer) {
    clearTimeout(killTimer);
    killTimer = undefined;
  }
  if (!msg || msg.type !== 'arm') return;
  timer = setTimeout(() => {
    parentPort.postMessage({ type: 'hung', label: msg.label });
    if (msg.browserPid) {
      try { process.kill(msg.browserPid, 'SIGKILL'); } catch {}
    }
    killTimer = setTimeout(() => {
      if (msg.jestPid) {
        try { process.kill(msg.jestPid, 'SIGKILL'); } catch {}
      }
    }, 3000);
  }, msg.ms);
});
`;

const closeSoon = (closeFn) => {
  if (typeof closeFn !== 'function') return Promise.resolve();
  return Promise.race([
    Promise.resolve().then(() => closeFn({ runBeforeUnload: false })),
    new Promise((resolve) => setTimeout(resolve, 1_000)),
  ]).catch(() => undefined);
};

const abortPlaywright = (page, browser) => {
  const context = page?.context?.() ?? globalThis.context;
  const browserRef = browser ?? context?.browser?.() ?? globalThis.browser;
  closeSoon(page?.close?.bind(page))
    .then(() => closeSoon(context?.close?.bind(context)))
    .then(() => closeSoon(browserRef?.close?.bind(browserRef)));
};

const browserPidOf = (browser) => {
  try {
    return browser?.process?.()?.pid;
  } catch {
    return undefined;
  }
};

const wrapLocator = (locator) => {
  if (!locator || locator.__euiProxied) return locator;
  return new Proxy(locator, {
    get(target, prop, receiver) {
      if (prop === '__euiProxied') return true;
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
  try {
    page.setDefaultTimeout?.(HANG_MS);
    page.setDefaultNavigationTimeout?.(HANG_MS);
  } catch {
    // ignore
  }
  return new Proxy(page, {
    get(target, prop, receiver) {
      if (prop === '__euiProxied') return true;
      if (
        prop === 'locator' ||
        prop === 'getByRole' ||
        prop === 'getByText' ||
        prop === 'getByTestId' ||
        prop === 'getByLabel'
      ) {
        return (...args) => wrapLocator(target[prop](...args));
      }
      const value = Reflect.get(target, prop, receiver);
      return typeof value === 'function' ? value.bind(target) : value;
    },
  });
};

class VrtEnvironment extends CustomEnvironment {
  _startHangClock() {
    if (this._hangWorker) return;
    this._hangWorker = new Worker(HANG_WORKER_SRC, { eval: true });
    this._hangWorker.unref();
    this._hangWorker.on('message', (msg) => {
      if (!msg || msg.type !== 'hung') return;
      // eslint-disable-next-line no-console
      console.error(`[eui-vrt] ${msg.label} hung after ${HANG_MS}ms`);
      abortPlaywright(this.global?.page, this.global?.browser);
    });
    this._hangWorker.on('error', (err) => {
      // eslint-disable-next-line no-console
      console.error('[eui-vrt] hang clock worker error', err);
    });
  }

  _armHangClock(label) {
    this._startHangClock();
    this._hangWorker.postMessage({
      type: 'arm',
      ms: HANG_MS,
      label,
      browserPid: browserPidOf(this.global?.browser),
      jestPid: process.pid,
    });
  }

  _disarmHangClock() {
    this._hangWorker?.postMessage({ type: 'disarm' });
  }

  async setup() {
    this._startHangClock();
    this._armHangClock('environment.setup');
    try {
      await super.setup();
      this.global[Symbol.for('RETRY_TIMES')] = 2;
      this.global[Symbol.for('LOG_ERRORS_BEFORE_RETRY')] = true;

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
      console.log('[eui-vrt] hang guard installed');
    } finally {
      this._disarmHangClock();
    }
  }

  async handleTestEvent(event) {
    // Arm before any await. Circus does not wait for this handler, so a hung
    // `page.evaluate` can otherwise start first and starve the arm.
    if (event.name === 'test_start' || event.name === 'test_fn_start') {
      const name = `${event.test?.parent?.name ?? ''} ${event.test?.name ?? ''}`.trim();
      this._armHangClock(`${event.name} ${name}`.trim());
    }

    if (typeof super.handleTestEvent === 'function') {
      await super.handleTestEvent(event);
    }

    if (!this._loggedHandleTestEvent) {
      this._loggedHandleTestEvent = true;
      // eslint-disable-next-line no-console
      console.log('[eui-vrt] handleTestEvent hooked');
    }

    if (
      event.name === 'test_fn_success' ||
      event.name === 'test_fn_failure' ||
      event.name === 'test_done'
    ) {
      this._disarmHangClock();
    }
  }

  async teardown() {
    this._disarmHangClock();
    try {
      await super.teardown();
    } finally {
      await this._hangWorker?.terminate();
      this._hangWorker = undefined;
    }
  }
}

export default VrtEnvironment;
