/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { BaseObject, type ObjectScope } from '../../base_object';
import { EuiPopoverSelectors } from '../../../components/popover/selectors';

/**
 * Playwright Component Object for {@link
 * https://eui.elastic.co/docs/components/containers/popover/ EuiPopover}.
 *
 * `testSubj` must be set on the toggle button, not the panel — see the
 * package README for the component-type guard and what this does not cover.
 */
export class EuiPopoverObject extends BaseObject {
  constructor(scope: ObjectScope, testSubj: string) {
    super(scope, testSubj, EuiPopoverSelectors.TOGGLE_SELECTOR);
  }

  /** Opens the popover. A no-op if it is already open. */
  async open(): Promise<void> {
    if ((await this.root.getAttribute('aria-expanded')) !== 'true') {
      await this.root.click();
    }
  }

  /** Closes the popover. A no-op if it is already closed. */
  async close(): Promise<void> {
    if ((await this.root.getAttribute('aria-expanded')) === 'true') {
      await this.root.click();
    }
  }
}
