/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { expect, type Locator } from '@playwright/test';

import { BaseObject, type ObjectScope } from '../../base_object';
import { EuiCardSelectors } from '../../../components/card/selectors';

/**
 * Playwright Component Object for {@link
 * https://eui.elastic.co/docs/components/display/card/ EuiCard}.
 *
 * `testSubj` must be set on `EuiCard` itself, EUI spreads it onto the panel.
 */
export class EuiCardObject extends BaseObject {
  constructor(
    scope: ObjectScope,
    testSubj: string,
    componentSelector = EuiCardSelectors.ROOT_SELECTOR
  ) {
    super(scope, testSubj, componentSelector);
  }

  /** The `selectable` toggle button, absent on plain cards. */
  get selectButton(): Locator {
    return this.root.locator(EuiCardSelectors.SELECT_BUTTON_SELECTOR);
  }

  /** The title text. */
  async getTitle(): Promise<string> {
    return (
      await this.root.locator(EuiCardSelectors.TITLE_SELECTOR).innerText()
    ).trim();
  }

  /** The description text, or `null` when the card has none. */
  async getDescription(): Promise<string | null> {
    const description = this.root.locator(
      EuiCardSelectors.DESCRIPTION_SELECTOR
    );
    if ((await description.count()) === 0) {
      return null;
    }
    return (await description.innerText()).trim();
  }

  /** Click the card, which follows `href` or fires `onClick`. */
  async click(): Promise<void> {
    await this.root.click();
  }

  /** Whether the `selectable` toggle is checked. */
  async isSelected(): Promise<boolean> {
    return (await this.selectButton.getAttribute('aria-checked')) === 'true';
  }

  /** Click the `selectable` toggle and wait for it to flip. */
  async toggleSelected(): Promise<void> {
    const selected = await this.isSelected();
    await this.selectButton.click();
    await expect(this.selectButton).toHaveAttribute(
      'aria-checked',
      String(!selected)
    );
  }
}
