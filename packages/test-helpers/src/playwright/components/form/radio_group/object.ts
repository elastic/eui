/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { expect, type Locator } from '@playwright/test';

import { BaseObject, type ObjectScope } from '../../../base_object';
import { EuiRadioGroupSelectors } from '../../../../components/form/radio_group/selectors';

/**
 * Playwright Component Object for {@link
 * https://eui.elastic.co/docs/components/forms/selection/radio-and-radio-group/ EuiRadioGroup}.
 *
 * `testSubj` must be set on `EuiRadioGroup` itself, EUI spreads it onto the
 * group wrapper.
 */
export class EuiRadioGroupObject extends BaseObject {
  constructor(
    scope: ObjectScope,
    testSubj: string,
    componentSelector = EuiRadioGroupSelectors.ROOT_SELECTOR
  ) {
    super(scope, testSubj, componentSelector);
  }

  /** The radio inputs of the group, in DOM order. */
  get inputs(): Locator {
    return this.root
      .locator(EuiRadioGroupSelectors.ITEM_SELECTOR)
      .locator(EuiRadioGroupSelectors.INPUT_SELECTOR);
  }

  /** The radio input with exactly this label. */
  input(label: string): Locator {
    return this.root.getByRole('radio', { name: label, exact: true });
  }

  /** Select the radio with this label and wait for it to be checked. */
  async select(label: string): Promise<void> {
    await this.input(label).check();
    await expect(this.input(label)).toBeChecked();
  }

  /** The label of the checked radio, `null` when none is. */
  async getSelected(): Promise<string | null> {
    await this.root.waitFor({ state: 'attached' });
    const checkedItem = this.root
      .locator(EuiRadioGroupSelectors.ITEM_SELECTOR)
      .filter({
        has: this.scope.locator(`${EuiRadioGroupSelectors.INPUT_SELECTOR}:checked`),
      });
    if ((await checkedItem.count()) === 0) return null;
    const label = await checkedItem
      .locator(EuiRadioGroupSelectors.LABEL_SELECTOR)
      .textContent();
    return label?.trim() ?? '';
  }

  /** The labels of all radios, in DOM order. */
  async getOptions(): Promise<string[]> {
    await this.root.waitFor({ state: 'attached' });
    const labels = await this.root
      .locator(EuiRadioGroupSelectors.ITEM_SELECTOR)
      .locator(EuiRadioGroupSelectors.LABEL_SELECTOR)
      .allTextContents();
    return labels.map((label) => label.trim());
  }
}
