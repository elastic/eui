/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { expect, type Locator } from '@playwright/test';

import { BaseObject, type ObjectScope } from '../../base_object';
import { EuiTabsSelectors } from '../../../components/tabs/selectors';

/**
 * Playwright Component Object for {@link
 * https://eui.elastic.co/docs/components/navigation/tabs/ EuiTabs}, and for
 * `EuiTabbedContent`, which renders an `EuiTabs` as the first child of the
 * element carrying the consumer's `data-test-subj`. Tabs are addressed by
 * their exact label.
 */
export class EuiTabsObject extends BaseObject {
  constructor(scope: ObjectScope, testSubj: string) {
    super(scope, testSubj, EuiTabsSelectors.ROOT_SELECTOR);
  }

  /** All tabs, in order. */
  get tabs(): Locator {
    return this.list.locator(EuiTabsSelectors.TAB_SELECTOR);
  }

  /** The labels of all tabs, in order. */
  async getTabs(): Promise<string[]> {
    return this.list
      .locator(EuiTabsSelectors.TAB_CONTENT_SELECTOR)
      .allInnerTexts();
  }

  /**
   * The tab with exactly this label. Matches the label span, so `prepend`
   * and `append` content does not interfere, then climbs to the tab.
   */
  tab(label: string): Locator {
    return this.list
      .locator(EuiTabsSelectors.TAB_CONTENT_SELECTOR)
      .filter({ hasText: new RegExp(`^${escapeRegExp(label)}$`) })
      .locator('..');
  }

  /** Click the tab with this label and wait for it to become selected. */
  async select(label: string): Promise<void> {
    const tab = this.tab(label);
    await tab.click();
    await expect(tab).toHaveAttribute('aria-selected', 'true');
  }

  /** The label of the selected tab, or null when none is selected. */
  async getSelected(): Promise<string | null> {
    const selected = this.list
      .locator(EuiTabsSelectors.SELECTED_TAB_SELECTOR)
      .locator(EuiTabsSelectors.TAB_CONTENT_SELECTOR);
    if ((await selected.count()) === 0) {
      return null;
    }
    return selected.first().innerText();
  }

  /**
   * The owning tab list: the root itself for `EuiTabs`, or the wrapper's
   * direct `.euiTabs` child for `EuiTabbedContent`. Queries never reach into
   * the tabbed content panel, which may hold its own tabs.
   */
  private get list(): Locator {
    return this.root
      .and(this.scope.locator(EuiTabsSelectors.LIST_SELECTOR))
      .or(this.root.locator(`> ${EuiTabsSelectors.LIST_SELECTOR}`));
  }
}

const escapeRegExp = (text: string): string =>
  text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
