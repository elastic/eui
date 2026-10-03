/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { expect, type Locator } from '@playwright/test';

import { BaseObject, type ObjectScope } from '../../base_object';
import { EuiPopoverSelectors } from '../../../components/popover/selectors';

/**
 * Playwright Component Object for {@link
 * https://eui.elastic.co/docs/components/containers/popover/ EuiPopover}.
 *
 * `testSubj` must be set on the toggle button, not the panel. See the
 * package README for the component-type guard and what this does not cover.
 */
export class EuiPopoverObject extends BaseObject {
  constructor(scope: ObjectScope, testSubj: string) {
    super(scope, testSubj, EuiPopoverSelectors.TOGGLE_SELECTOR);
  }

  /**
   * Opens the popover and waits for the panel to be open. A no-op if it is
   * already open.
   */
  async open(): Promise<void> {
    if ((await this.root.getAttribute('aria-expanded')) === 'true') {
      return;
    }
    await this.root.click();
    const panel = await this.panel();
    await panel.waitFor({ state: 'visible' });
    await expect(panel).toHaveAttribute('data-popover-open', 'true');
  }

  /**
   * Closes the popover and waits for the panel to be removed. A no-op if it
   * is already closed.
   */
  async close(): Promise<void> {
    if ((await this.root.getAttribute('aria-expanded')) !== 'true') {
      return;
    }
    // `aria-controls` is removed on close, so resolve the panel first.
    const panel = await this.panel();
    await this.root.click();
    await panel.waitFor({ state: 'detached' });
  }

  /**
   * The panel the toggle's `aria-controls` points at. EUI sets that attribute
   * synchronously with the open state, before the panel's own transition.
   */
  private async panel(): Promise<Locator> {
    await expect(this.root).toHaveAttribute('aria-controls', /.+/);
    const id = (await this.root.getAttribute('aria-controls')) as string;
    return this.root.page().locator(EuiPopoverSelectors.panelFor(id));
  }
}
