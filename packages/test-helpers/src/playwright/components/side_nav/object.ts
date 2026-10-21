/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { expect, type Locator } from '@playwright/test';

import { BaseObject, type ObjectScope } from '../../base_object';
import { EuiSideNavSelectors } from '../../../components/side_nav/selectors';

/**
 * Playwright Component Object for {@link
 * https://eui.elastic.co/docs/components/navigation/side-nav/ EuiSideNav}.
 *
 * `testSubj` must be set on `EuiSideNav` itself, EUI spreads it onto the
 * `<nav>`. Items are addressed by their exact label. Closed branches are
 * not in the DOM, expand their parent first.
 */
export class EuiSideNavObject extends BaseObject {
  constructor(scope: ObjectScope, testSubj: string) {
    super(scope, testSubj, EuiSideNavSelectors.ROOT_SELECTOR);
  }

  /** The labels of every rendered item, in document order. */
  async getItems(): Promise<string[]> {
    return this.root
      .locator(EuiSideNavSelectors.ITEM_LABEL_SELECTOR)
      .allInnerTexts();
  }

  /** The clickable element of the item with exactly this label. */
  item(label: string): Locator {
    return this.root
      .locator(EuiSideNavSelectors.ITEM_BUTTON_SELECTOR)
      .filter({ has: this.label(label) });
  }

  /**
   * Click the item with this label. Selection is owned by the consumer
   * (usually a route change), so nothing is asserted afterwards.
   */
  async select(label: string): Promise<void> {
    await this.item(label).click();
  }

  /** The label of the selected item, or null when none is selected. */
  async getSelected(): Promise<string | null> {
    const selected = this.root
      .locator(EuiSideNavSelectors.SELECTED_ITEM_BUTTON_SELECTOR)
      .locator(EuiSideNavSelectors.ITEM_LABEL_SELECTOR);
    if ((await selected.count()) === 0) {
      return null;
    }
    return selected.first().innerText();
  }

  /**
   * Expand an accordion item (one with children and no link or click
   * handler) and wait for its children to render. A no-op if already open.
   */
  async expand(label: string): Promise<void> {
    const button = this.item(label);
    if (await this.isOpen(button)) {
      return;
    }
    await button.click();
    await expect.poll(() => this.isOpen(button)).toBe(true);
  }

  private label(label: string): Locator {
    return this.root
      .page()
      .locator(EuiSideNavSelectors.ITEM_LABEL_SELECTOR)
      .filter({ hasText: new RegExp(`^${escapeRegExp(label)}$`) });
  }

  private isOpen(button: Locator): Promise<boolean> {
    return button.evaluate(
      (el, openClass) => el.matches(openClass),
      EuiSideNavSelectors.OPEN_ITEM_BUTTON_SELECTOR
    );
  }
}

const escapeRegExp = (text: string): string =>
  text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
