/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import CustomEnvironment from '@storybook/test-runner/playwright/custom-environment.js';

/**
 * Playwright does not abort `page.evaluate` / locator screenshot of a Promise
 * that never settles (Storybook `__test` play/render, `document.fonts.ready`,
 * unstable locator). Instance patches are skipped by Playwright's API layer;
 * wrap the prototypes once per worker instead.
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

const resetHungPage = async () => {
  const reset = globalThis.jestPlaywright?.resetPage;
  if (!reset) return;
  await Promise.race([
    reset(),
    new Promise((resolve) => setTimeout(resolve, 5_000)),
  ]).catch(() => undefined);
};

const wrapProtoMethod = (proto, method, label) => {
  const original = proto[method];
  if (typeof original !== 'function' || original.__euiHangWrapped) return;

  const wrapped = async function (...args) {
    try {
      return await raceHang(original.apply(this, args), label);
    } catch (err) {
      if (String(err).includes('hung after')) {
        await resetHungPage();
      }
      throw err;
    }
  };
  wrapped.__euiHangWrapped = true;
  proto[method] = wrapped;
};

const installHangGuard = (page) => {
  if (!page || page.__euiHangGuardInstalled) return;
  page.__euiHangGuardInstalled = true;

  const pageProto = Object.getPrototypeOf(page);
  if (!pageProto.__euiHangGuardInstalled) {
    pageProto.__euiHangGuardInstalled = true;
    wrapProtoMethod(pageProto, 'evaluate', 'page.evaluate');
    wrapProtoMethod(pageProto, 'waitForFunction', 'page.waitForFunction');
    wrapProtoMethod(pageProto, 'screenshot', 'page.screenshot');
  }

  const locator = page.locator('body');
  const locatorProto = Object.getPrototypeOf(locator);
  if (!locatorProto.__euiHangGuardInstalled) {
    locatorProto.__euiHangGuardInstalled = true;
    wrapProtoMethod(locatorProto, 'screenshot', 'locator.screenshot');
  }

  // Visible in CI logs so we can tell the guard actually loaded.
  // eslint-disable-next-line no-console
  console.log('[eui-vrt] hang guard installed on Page/Locator prototypes');
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
    installHangGuard(this.global.page);
  }
}

export default VrtEnvironment;
