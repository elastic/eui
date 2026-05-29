/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import type { Locator } from '@playwright/test';
import { expect } from '@playwright/test';

import { BaseObject } from '../../base_object';
import { EuiComboBoxSelectors } from '../../../components/combo_box/selectors';

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
    // `[...arr].sort()` (not `arr.sort()`) — sort mutates in place; the copy
    // avoids mutating either the consumer's input or our internal state.
    const sortedTarget = [...targetLabels].sort();

    const sortedCurrent = [...(await this.getSelectedOptions())].sort();

    // Set-equality short-circuit (any order).
    if (
      sortedCurrent.length === sortedTarget.length &&
      sortedCurrent.every((label, i) => label === sortedTarget[i])
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
      // Blur the input to close the dropdown. Using blur() rather than a
      // keyboard event avoids bubbling Escape to page-level handlers
      // (modal/flyout close listeners) on the consumer page.
      await this.searchInput.blur();
    }

    expect([...(await this.getSelectedOptions())].sort()).toEqual(sortedTarget);
  }

  /**
   * Clear all selected options. No-op if nothing is selected.
   *
   * Auto-detects the combo box configuration and uses the appropriate strategy:
   * - Pills present → {@link clickPillClearButtons}
   * - `asPlainText` with a confirmed input selection → {@link deleteSearchInput}
   * - Otherwise → {@link deselectAllFromDropdown}
   *
   * Use the explicit methods directly when you need full control over the
   * clearing strategy (e.g. `onCreateOption` with selections not in the
   * options list).
   */
  async clear(): Promise<void> {
    if ((await this.getSelectedOptions()).length === 0) {
      return;
    }

    if (await this.hasPills()) {
      await this.clickPillClearButtons();
      return;
    }

    if (await this.hasConfirmedInputSelection()) {
      await this.deleteSearchInput();
      return;
    }

    await this.deselectAllFromDropdown();
  }

  /**
   * Currently selected option labels.
   *
   * - Multi-select / `singleSelection=true` → pill texts.
   * - `singleSelection={{ asPlainText: true }}` → the input value. EUI
   *   renders no pills in this mode; the input IS the selection display.
   *   Works correctly with both `isClearable=true` (default) and
   *   `isClearable=false`.
   * - Nothing selected → `[]`.
   */
  async getSelectedOptions(): Promise<string[]> {
    if (await this.hasPills()) {
      return this.pills.allInnerTexts();
    }
    if (await this.hasConfirmedInputSelection()) {
      return [await this.searchInput.inputValue()];
    }
    return [];
  }

  private async hasPills(): Promise<boolean> {
    return (await this.pills.count()) > 0;
  }

  /**
   * Clicks the `×` button on each selected pill individually.
   * Works regardless of `isClearable` — pill close buttons are always present.
   * No-op if no pills are rendered.
   */
  private async clickPillClearButtons(): Promise<void> {
    while (await this.hasPills()) {
      const countBefore = await this.pills.count();
      await this.pills.first().locator('button').click();
      await expect(this.pills).not.toHaveCount(countBefore);
    }
  }

  /**
   * Opens the dropdown and clicks each `aria-selected="true"` option to
   * deselect it. Works for all `isClearable` and `singleSelection`
   * configurations when the selected options are present in the options list.
   *
   * Does not work when the selection was created via `onCreateOption` and the
   * created option was not added back to the `options` array — use
   * {@link clickPillClearButtons} instead.
   */
  private async deselectAllFromDropdown(): Promise<void> {
    await this.input.click();

    const selected = this.root
      .page()
      .locator(EuiComboBoxSelectors.selectedOptionFor(this.testSubj));

    while ((await selected.count()) > 0) {
      const countBefore = await selected.count();
      await selected.first().click();
      await expect(selected).not.toHaveCount(countBefore);
    }

    await this.searchInput.blur();
  }

  private async addOption(label: string): Promise<void> {
    // Clicking the outer wrapper does not reliably open the dropdown; the
    // inner `comboBoxInput` element does.
    await this.input.click();
    // fill() atomically clears and sets the value — avoids issues with
    // React re-renders resetting cursor position mid-typing (e.g. in
    // asPlainText mode where the input already shows a selected label).
    await this.searchInput.fill(label);

    // Options list is rendered in a portal outside `this.root`, so locate
    // from page level. Use .and(getByTitle) rather than embedding the label
    // in the CSS string — CSS attribute selectors break on labels containing
    // quotes, brackets, or backslashes. getByTitle alone would search
    // descendants; .and() intersects so it matches the option element itself.
    const option = this.root
      .page()
      .locator(EuiComboBoxSelectors.optionFor(this.testSubj))
      .and(this.root.page().getByTitle(label, { exact: true }));
    await option.waitFor({ state: 'visible' });
    await option.click();
  }

  /**
   * Focuses the search input and presses Backspace to clear the selection.
   * Only valid in `singleSelection={{ asPlainText: true }}` mode where
   * {@link hasConfirmedInputSelection} is true — EUI's `onKeyDown` handler
   * fires `onRemoveOption` when Backspace is pressed with an empty `searchValue`.
   */
  private async deleteSearchInput(): Promise<void> {
    await this.searchInput.press('Backspace');
    // Backspace triggers onRemoveOption (removes the selection) but the
    // browser also fires a native input event that sets searchValue to a
    // partial label string. fill('') cleans that up without restoring the
    // selection (selectedOptions is already empty at this point).
    await this.searchInput.fill('');
    await expect(this.searchInput).toHaveValue('');
  }

  /**
   * Returns true when the combo is in `asPlainText` mode and the input
   * contains a *confirmed* selection (not unconfirmed typed text).
   *
   * In `asPlainText` mode the input IS the selection display: EUI renders
   * the selected option's label directly in the input (no pills). An empty
   * input means nothing is selected.
   *
   * When the user types text that matches no option and blurs (without
   * `onCreateOption`), EUI marks the combo box invalid by adding
   * `euiComboBox-isInvalid` to the root element. An invalid combo with a
   * non-empty input has unconfirmed text, not a confirmed selection.
   */
  private async hasConfirmedInputSelection(): Promise<boolean> {
    if (!(await this.isPlainText())) return false;
    if (!(await this.searchInput.inputValue())) return false;
    return !(await this.isMarkedInvalid());
  }

  private async isMarkedInvalid(): Promise<boolean> {
    const classes = await this.root.getAttribute('class');
    return classes?.includes('euiComboBox-isInvalid') ?? false;
  }

  private get input(): Locator {
    return this.root.getByTestId(EuiComboBoxSelectors.INPUT_WRAPPER_TEST_SUBJ);
  }

  private get searchInput(): Locator {
    return this.root.getByTestId(EuiComboBoxSelectors.SEARCH_INPUT_TEST_SUBJ);
  }

  private get pills(): Locator {
    return this.root.getByTestId(EuiComboBoxSelectors.PILL_TEST_SUBJ);
  }

  private async isPlainText(): Promise<boolean> {
    return (
      (await this.root
        .locator(EuiComboBoxSelectors.PLAIN_TEXT_INPUT_WRAP_SELECTOR)
        .count()) > 0
    );
  }
}
