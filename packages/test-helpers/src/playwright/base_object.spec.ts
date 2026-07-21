/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { test, expect } from '@playwright/test';

import { BaseObject, type ObjectScope } from './base_object';

// Concrete subclass that requires a component selector so the guard is active.
// `assertComponent` is protected, so expose it for the test.
class TestObject extends BaseObject {
  constructor(scope: ObjectScope, testSubj: string, componentSelector: string) {
    super(scope, testSubj, componentSelector);
  }

  verifyComponent(): Promise<void> {
    return this.assertComponent();
  }
}

test.describe('BaseObject component-type guard', () => {
  test('rejects an element that does not match the component selector', async ({
    page,
  }) => {
    await page.setContent('<div data-test-subj="target"></div>');

    const object = new TestObject(page, 'target', '.euiComboBox');

    await expect(object.verifyComponent()).rejects.toThrow(
      /Are you using the right Component Object/i
    );
  });

  test('resolves when the element matches the component selector', async ({
    page,
  }) => {
    await page.setContent(
      '<div class="euiComboBox" data-test-subj="target"></div>'
    );

    const object = new TestObject(page, 'target', '.euiComboBox');

    await expect(object.verifyComponent()).resolves.toBeUndefined();
  });
});
