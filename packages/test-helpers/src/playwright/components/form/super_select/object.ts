/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import type { Locator } from '@playwright/test';

import { BaseObject, type ObjectScope } from '../../../base_object';
import { EuiSuperSelectSelectors } from '../../../../components/form/super_select/selectors';

/**
 * Playwright Component Object for {@link
 * https://eui.elastic.co/docs/components/forms/selection/super-select/ EuiSuperSelect}.
 *
 * `testSubj` must match the `data-test-subj` set by the consumer on the
 * `<EuiSuperSelect>` — EUI spreads it onto the control `<button>`
 * (`.euiSuperSelectControl`).
 */
export class EuiSuperSelectObject extends BaseObject {
  constructor(scope: ObjectScope, testSubj: string) {
    super(scope, testSubj, EuiSuperSelectSelectors.ROOT_SELECTOR);
  }

  /**
   * Selects an option by its `value`. EUI renders every option with
   * `id={String(value)}`, so this works for any EuiSuperSelect without extra
   * test hooks and is the preferred method when the value is a stable code
   * constant.
   */
  async selectOptionByValue(value: string): Promise<void> {
    await this.open();
    await this.listbox
      .locator(EuiSuperSelectSelectors.optionByValue(value))
      .click();
    await this.listbox.waitFor({ state: 'detached' });
  }

  /**
   * Selects an option by its visible label. Use for dynamic, data-driven
   * option content where the value is not known to the test. Note the dropdown
   * shows `dropdownDisplay` when the consumer provides it, which can differ
   * from the committed `inputDisplay` text.
   */
  async selectOptionByLabel(label: string): Promise<void> {
    await this.open();
    await this.listbox.getByRole('option', { name: label }).click();
    await this.listbox.waitFor({ state: 'detached' });
  }

  /**
   * The committed selection's `value`, read from the hidden form input EUI
   * renders next to the control (the visible button text shows the label, not
   * the value).
   */
  async getSelectedValue(): Promise<string> {
    return this.hiddenInput.inputValue();
  }

  /** Opens the dropdown if it is not already open. */
  private async open(): Promise<void> {
    if (await this.listbox.isVisible()) {
      return;
    }
    await this.root.click();
    await this.listbox.waitFor({ state: 'visible' });
  }

  private get listbox(): Locator {
    return this.root.page().locator(EuiSuperSelectSelectors.LISTBOX_SELECTOR);
  }

  /**
   * The hidden input is a sibling of the control button; reach it through the
   * `.euiSuperSelect` popover wrapper that contains this instance's button.
   */
  private get hiddenInput(): Locator {
    return this.scope
      .locator(EuiSuperSelectSelectors.WRAPPER_SELECTOR)
      .filter({ has: this.root })
      .locator(EuiSuperSelectSelectors.HIDDEN_INPUT_SELECTOR);
  }
}
