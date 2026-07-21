/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import type { Locator } from '@playwright/test';
import { expect } from '@playwright/test';

import { BaseObject, type ObjectScope } from '../../base_object';
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
  constructor(scope: ObjectScope, testSubj: string) {
    super(scope, testSubj, EuiComboBoxSelectors.ROOT_SELECTOR);
  }

  /**
   * Replace the current selection with `labels`. Set-semantics: order-
   * independent — already-selected labels are kept, missing ones are added,
   * extras are removed. No-op if the current selection already matches.
   *
   * Throws with a descriptive message if any label never appears in the
   * dropdown (catches test/data drift early).
   *
   * `timeout` bounds how long each option is awaited in the dropdown after
   * typing — raise it for slow / server-backed combos whose options load
   * asynchronously.
   */
  async setSelectedOptions(
    labels: string[],
    { timeout = 2_500 }: { timeout?: number } = {}
  ): Promise<void> {
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
      await this.addOption(label, timeout);
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
   * Set free-text values on an `onCreateOption` combo box by typing and
   * committing each with Enter, then verifying it was accepted. Unlike
   * {@link setSelectedOptions}, this creates values rather than picking
   * existing options.
   */
  async setCustomSelectedOptions(
    labels: string[],
    { timeout = 2_500 }: { timeout?: number } = {}
  ): Promise<void> {
    for (const label of labels) {
      await this.input.click();
      await this.searchInput.fill(label);
      await this.searchInput.press('Enter');
      await this.searchInput.blur();
    }
    // The typed value equals the resulting pill/input label, so membership is
    // an exact check.
    for (const label of labels) {
      await expect.poll(() => this.getSelectedOptions(), { timeout }).toContain(label);
    }
  }

  /**
   * Open the dropdown and return the labels of the currently visible options.
   * Virtualized lists mount only a subset, so this is the visible slice — not
   * guaranteed to be every option.
   */
  async getAllVisibleOptions(): Promise<string[]> {
    await this.input.click();
    const optionsList = this.root
      .page()
      .locator(EuiComboBoxSelectors.optionsListFor(this.testSubj));
    await optionsList.waitFor({ state: 'visible' });
    return optionsList.getByRole('option').allInnerTexts();
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
   * - `singleSelection={{ asPlainText: true }}` → the input value (EUI renders
   *   no pills in this mode).
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

  private async addOption(label: string, timeout = 2_500): Promise<void> {
    // Clicking the outer wrapper does not reliably open the dropdown; the
    // inner `comboBoxInput` element does.
    await this.input.click();

    // Type to filter, then match the option by accessible name. Substring match
    // (not exact): while filtering, EUI middle-truncates the option text, so the
    // accessible name isn't the literal label. The list renders in a portal
    // outside `this.root`, so locate it from page level; the poll waits out async
    // filtering.
    await this.searchInput.fill(label);
    const option = this.root
      .page()
      .locator(EuiComboBoxSelectors.optionsListFor(this.testSubj))
      .getByRole('option', { name: label });
    await expect.poll(() => option.count(), { timeout }).toBeGreaterThan(0);
    if ((await option.count()) === 1) {
      await option.click();
    } else {
      // Substring can match several (e.g. "Item 1" also matches "Item 10") —
      // keyboard-select the highlighted match.
      await this.searchInput.press('ArrowDown');
      await this.searchInput.press('Enter');
    }
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
    return this.root.locator(EuiComboBoxSelectors.PILL_SELECTOR);
  }

  private async isPlainText(): Promise<boolean> {
    return (
      (await this.root
        .locator(EuiComboBoxSelectors.PLAIN_TEXT_INPUT_WRAP_SELECTOR)
        .count()) > 0
    );
  }
}
