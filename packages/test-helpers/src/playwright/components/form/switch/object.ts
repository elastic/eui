/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { expect } from '@playwright/test';

import { BaseObject, type ObjectScope } from '../../../base_object';
import { EuiSwitchSelectors } from '../../../../components/form/switch/selectors';

/**
 * Playwright Component Object for {@link
 * https://eui.elastic.co/docs/components/forms/selection/switch/ EuiSwitch}.
 *
 * `testSubj` must be set on `EuiSwitch` itself, EUI spreads it onto the
 * `<button role="switch">`.
 */
export class EuiSwitchObject extends BaseObject {
  constructor(
    scope: ObjectScope,
    testSubj: string,
    componentSelector = EuiSwitchSelectors.ROOT_SELECTOR
  ) {
    super(scope, testSubj, componentSelector);
  }

  /** Whether the switch is on, read from `aria-checked`. */
  async isChecked(): Promise<boolean> {
    return (await this.root.getAttribute('aria-checked')) === 'true';
  }

  /** Turn the switch on, a no-op when it already is. */
  async check(): Promise<void> {
    await this.setChecked(true);
  }

  /** Turn the switch off, a no-op when it already is. */
  async uncheck(): Promise<void> {
    await this.setChecked(false);
  }

  /** Flip the switch and wait for `aria-checked` to follow. */
  async toggle(): Promise<void> {
    await this.setChecked(!(await this.isChecked()));
  }

  private async setChecked(checked: boolean): Promise<void> {
    if ((await this.isChecked()) !== checked) {
      await this.root.click();
    }
    await expect(this.root).toHaveAttribute('aria-checked', String(checked));
  }
}
