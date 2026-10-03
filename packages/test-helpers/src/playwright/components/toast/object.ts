/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { expect, type Locator } from '@playwright/test';

import { BaseObject, type ObjectScope } from '../../base_object';
import { EuiGlobalToastListSelectors } from '../../../components/toast/selectors';

/**
 * Playwright Component Object for {@link
 * https://eui.elastic.co/docs/components/display/toast/ EuiGlobalToastList}.
 *
 * `testSubj` must match the `data-test-subj` set by the consumer on the
 * `<EuiGlobalToastList>` (the `.euiGlobalToastList` element). Toasts rendered
 * outside the list (inline `EuiToast`) are not covered.
 */
export class EuiGlobalToastListObject extends BaseObject {
  constructor(scope: ObjectScope, testSubj: string) {
    super(scope, testSubj, EuiGlobalToastListSelectors.ROOT_SELECTOR);
  }

  /**
   * The toasts currently in the list. Exposed as a `Locator` so callers keep
   * Playwright auto-retry for count and content assertions
   * (e.g. `expect(toasts).toHaveCount(1)`).
   */
  public get toasts(): Locator {
    return this.root.locator(EuiGlobalToastListSelectors.TOAST_SELECTOR);
  }

  /**
   * Closes every toast in the list and waits until none remain. No-op when the
   * list is empty (dismissing "if present" is a common teardown need).
   */
  async closeAll(): Promise<void> {
    const closeButtons = await this.root
      .getByTestId(EuiGlobalToastListSelectors.CLOSE_BUTTON_TEST_SUBJ)
      .all();
    for (const closeButton of closeButtons) {
      // A toast may auto-dismiss while iterating; ignore clicks that miss.
      await closeButton.click({ timeout: 5_000 }).catch(() => {});
    }
    await expect(this.toasts).toHaveCount(0);
  }
}
