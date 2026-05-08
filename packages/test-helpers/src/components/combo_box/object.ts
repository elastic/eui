/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import type { Locator } from '@playwright/test';
import { expect } from '@playwright/test';

import { BaseObject } from '../base_object';
import { EuiComboBoxSelectors } from './selectors';

/**
 * Playwright Component Object for {@link
 * https://eui.elastic.co/docs/components/forms/selection/combo-box/ EuiComboBox}.
 *
 * `testSubj` must match the `data-test-subj` set by the consumer on the
 * `<EuiComboBox>` element (the outer `.euiComboBox` wrapper, not the inner
 * `comboBoxInput`).
 */
export class EuiComboBoxObject extends BaseObject {
  /**
   * Select an option by its visible label. No-op if already selected. Throws
   * with a descriptive message if the matching option never appears in the
   * dropdown.
   */
  async selectOption(label: string): Promise<void> {
    if ((await this.getSelectedOptions()).includes(label)) {
      return;
    }

    // Clicking the outer wrapper does not reliably open the dropdown; the
    // inner `comboBoxInput` element does.
    await this.input.click();
    await this.searchInput.pressSequentially(label, { delay: 50 });

    // Options list is rendered in a portal outside `this.root`, so locate
    // from page level.
    const option = this.root
      .page()
      .locator(EuiComboBoxSelectors.optionFor(this.testSubj, label));
    await option.waitFor({ state: 'visible' });
    await option.click();

    await expect
      .poll(() => this.getSelectedOptions(), {
        message: `EuiComboBox: option "${label}" did not appear as selected after click`,
      })
      .toContain(label);

    // Close the dropdown so subsequent interactions start clean.
    await this.root.page().keyboard.press('Escape');
  }

  /**
   * Clear all selected options. No-op if nothing is selected.
   */
  async clear(): Promise<void> {
    if ((await this.getSelectedOptions()).length === 0) {
      return;
    }
    await this.clearButton.click();
    await expect
      .poll(() => this.getSelectedOptions(), {
        message: 'EuiComboBox: clear button was clicked but selected options remain',
      })
      .toEqual([]);
  }

  /**
   * Currently selected option labels — pill texts in multi-select, the input
   * value wrapped in an array in single-select, `[]` if nothing is selected.
   */
  async getSelectedOptions(): Promise<string[]> {
    const pillCount = await this.pills.count();
    if (pillCount > 0) {
      return this.pills.allInnerTexts();
    }
    const inputValue = await this.searchInput.inputValue();
    return inputValue ? [inputValue] : [];
  }

  private get input(): Locator {
    return this.root.getByTestId(EuiComboBoxSelectors.TEST_SUBJ);
  }

  private get searchInput(): Locator {
    return this.root.getByTestId(EuiComboBoxSelectors.SEARCH_INPUT_TEST_SUBJ);
  }

  private get clearButton(): Locator {
    return this.root.getByTestId(EuiComboBoxSelectors.CLEAR_BUTTON_TEST_SUBJ);
  }

  private get pills(): Locator {
    return this.root.getByTestId(EuiComboBoxSelectors.SELECTED_OPTIONS_TEST_SUBJ);
  }
}
