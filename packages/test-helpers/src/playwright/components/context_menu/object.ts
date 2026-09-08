/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import type { Locator } from '@playwright/test';

import { BaseObject, type ObjectScope } from '../../base_object';
import { EuiContextMenuSelectors } from '../../../components/context_menu/selectors';

/**
 * Playwright Component Object for {@link
 * https://eui.elastic.co/docs/components/navigation/context-menu/ EuiContextMenu}.
 *
 * `testSubj` must be set on the `<EuiContextMenu>` itself. See the package
 * README for what this does not cover.
 */
export class EuiContextMenuObject extends BaseObject {
  constructor(scope: ObjectScope, testSubj: string) {
    super(scope, testSubj, EuiContextMenuSelectors.ROOT_SELECTOR);
  }

  /**
   * The items in the current panel, as a `Locator`. During a panel
   * transition two panels briefly exist at once, so this always resolves
   * to the last one in the DOM, which is the current one.
   */
  public get items(): Locator {
    return this.root
      .locator(EuiContextMenuSelectors.PANEL_SELECTOR)
      .last()
      .locator(EuiContextMenuSelectors.ITEM_SELECTOR);
  }
}
