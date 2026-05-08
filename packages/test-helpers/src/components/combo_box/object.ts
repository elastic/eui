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
   * Replace the current selection with `labels`. Set-semantics: order-
   * independent — already-selected labels are kept, missing ones are added,
   * extras are removed. No-op if the current selection already matches.
   *
   * Throws with a descriptive message if any label never appears in the
   * dropdown (catches test/data drift early).
   */
  async setSelectedOptions(labels: string[]): Promise<void> {
    // Dedupe while preserving order.
    const targetLabels = [...new Set(labels)];
    const current = await this.getSelectedOptions();

    // Set-equality short-circuit (any order).
    if (
      current.length === targetLabels.length &&
      targetLabels.every((l) => current.includes(l))
    ) {
      return;
    }

    // Naive replace — clear, then add each. A diff-based approach would do
    // less DOM work but require a per-pill remove primitive we don't ship yet.
    await this.clear();

    for (const label of targetLabels) {
      await this.addOption(label);
    }

    if (targetLabels.length > 0) {
      // Close the dropdown so subsequent interactions start clean.
      await this.root.page().keyboard.press('Escape');
    }

    await expect
      .poll(
        async () => {
          const selected = await this.getSelectedOptions();
          return [...selected].sort();
        },
        {
          message: `EuiComboBox: selection did not match after setSelectedOptions(${JSON.stringify(labels)})`,
        }
      )
      .toEqual([...targetLabels].sort());
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

  private async addOption(label: string): Promise<void> {
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
