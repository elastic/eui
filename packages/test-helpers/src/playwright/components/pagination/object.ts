/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */
import { expect, type Locator } from '@playwright/test';

import { BaseObject, type ObjectScope } from '../../base_object';
import { EuiPaginationSelectors } from '../../../components/pagination/selectors';

/**
 * Playwright Component Object for {@link
 * https://eui.elastic.co/docs/components/navigation/pagination/ EuiPagination}.
 *
 * `testSubj` must be set on `EuiPagination` itself, EUI spreads it onto the
 * `<nav>`. Page indexes are 0-based, matching EUI's `activePage` and the
 * `pagination-button-<index>` test subjs. Covers the numbered and the
 * compressed variant.
 */
export class EuiPaginationObject extends BaseObject {
  constructor(scope: ObjectScope, testSubj: string) {
    super(scope, testSubj, EuiPaginationSelectors.ROOT_SELECTOR);
  }

  /** The 0-based index of the active page. */
  async getActivePage(): Promise<number> {
    if (await this.isCompressed()) {
      const text = await this.compressedNumbers().first().innerText();
      return Number(text) - 1;
    }
    const text = await this.root
      .locator(EuiPaginationSelectors.ACTIVE_PAGE_BUTTON_SELECTOR)
      .innerText();
    return Number(text) - 1;
  }

  /** The total number of pages. */
  async getPageCount(): Promise<number> {
    if (await this.isCompressed()) {
      return Number(await this.compressedNumbers().last().innerText());
    }
    // EUI always renders the last page's button, so its label is the count.
    return Number(
      await this.root
        .locator(EuiPaginationSelectors.PAGE_BUTTON_SELECTOR)
        .last()
        .innerText()
    );
  }

  /**
   * Go to the page at the 0-based `index` and wait for it to become active.
   * Clicks the page button when EUI renders it, otherwise steps through
   * next or previous until it does. A no-op if already active.
   */
  async goToPage(index: number): Promise<void> {
    const pageCount = await this.getPageCount();
    if (index < 0 || index >= pageCount) {
      throw new Error(
        `EuiPagination "${this.testSubj}" has ${pageCount} pages, page index ${index} is out of range.`
      );
    }

    for (let step = 0; step < pageCount; step++) {
      const active = await this.getActivePage();
      if (active === index) {
        return;
      }
      const button = this.pageButton(index);
      if ((await button.count()) > 0) {
        await button.click();
      } else if (index > active) {
        await this.arrow(EuiPaginationSelectors.NEXT_BUTTON_TEST_SUBJ).click();
      } else {
        await this.arrow(
          EuiPaginationSelectors.PREVIOUS_BUTTON_TEST_SUBJ
        ).click();
      }
      await expect.poll(() => this.getActivePage()).not.toBe(active);
    }
  }

  /** Click the next arrow and wait for the active page to advance. */
  async next(): Promise<void> {
    const active = await this.getActivePage();
    await this.arrow(EuiPaginationSelectors.NEXT_BUTTON_TEST_SUBJ).click();
    await expect.poll(() => this.getActivePage()).toBe(active + 1);
  }

  /** Click the previous arrow and wait for the active page to go back. */
  async previous(): Promise<void> {
    const active = await this.getActivePage();
    await this.arrow(EuiPaginationSelectors.PREVIOUS_BUTTON_TEST_SUBJ).click();
    await expect.poll(() => this.getActivePage()).toBe(active - 1);
  }

  private pageButton(index: number): Locator {
    return this.root.getByTestId(
      `${EuiPaginationSelectors.PAGE_BUTTON_TEST_SUBJ_PREFIX}${index}`
    );
  }

  private arrow(testSubj: string): Locator {
    return this.root.getByTestId(testSubj);
  }

  private async isCompressed(): Promise<boolean> {
    return (
      (await this.root
        .locator(EuiPaginationSelectors.COMPRESSED_TEXT_SELECTOR)
        .count()) > 0
    );
  }

  private compressedNumbers(): Locator {
    return this.root
      .locator(EuiPaginationSelectors.COMPRESSED_TEXT_SELECTOR)
      .locator('span');
  }
}
