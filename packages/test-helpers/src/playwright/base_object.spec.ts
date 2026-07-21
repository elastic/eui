/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { test, expect } from '@playwright/test';

import { BaseObject, type ObjectScope } from './base_object';

// `asyncMethod` deliberately does NOT call the guard itself, so its behavior
// proves the Proxy applies it. `syncMethod` proves sync methods pass through
// unguarded (and keep their sync return type).
class TestObject extends BaseObject {
  constructor(scope: ObjectScope, testSubj: string, componentSelector: string) {
    super(scope, testSubj, componentSelector);
  }

  async asyncMethod(): Promise<string> {
    return 'ran';
  }

  syncMethod(): string {
    return 'sync';
  }
}

test.describe('BaseObject component-type guard', () => {
  test('the Proxy guards async methods that do not call the guard themselves', async ({
    page,
  }) => {
    await page.setContent('<div data-test-subj="target"></div>');

    const object = new TestObject(page, 'target', '.euiComboBox');

    await expect(object.asyncMethod()).rejects.toThrow(
      /Are you using the right Component Object/i
    );
  });

  test('async methods run once the element matches', async ({ page }) => {
    await page.setContent(
      '<div class="euiComboBox" data-test-subj="target"></div>'
    );

    const object = new TestObject(page, 'target', '.euiComboBox');

    await expect(object.asyncMethod()).resolves.toBe('ran');
  });

  test('sync methods pass through unguarded (keep their sync return)', async ({
    page,
  }) => {
    await page.setContent('<div data-test-subj="target"></div>');

    const object = new TestObject(page, 'target', '.euiComboBox');

    // No await, no reject — returns synchronously despite the wrong element.
    expect(object.syncMethod()).toBe('sync');
  });
});
