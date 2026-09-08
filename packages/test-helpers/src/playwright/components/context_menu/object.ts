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
 * https://eui.elastic.co/docs/components/navigation/context-menu/ EuiContextMenu},
 * or a standalone `EuiContextMenuPanel`.
 *
 * `testSubj` must be set on the `<EuiContextMenu>` or `<EuiContextMenuPanel>`
 * itself. See the package README for what this does not cover.
 */
export class EuiContextMenuObject extends BaseObject {
  constructor(scope: ObjectScope, testSubj: string) {
    super(scope, testSubj, EuiContextMenuSelectors.ROOT_SELECTOR);
  }

  /**
   * The items in the current panel, as a `Locator`. Resolves to the root
   * itself when that is a standalone panel, otherwise to the last panel in
   * the DOM, which is the current one when two exist during a transition.
   */
  public get items(): Locator {
    const panel = this.scope.locator(EuiContextMenuSelectors.PANEL_SELECTOR);
    return this.root
      .locator(EuiContextMenuSelectors.PANEL_SELECTOR)
      .last()
      .or(this.root.and(panel))
      .locator(EuiContextMenuSelectors.ITEM_SELECTOR);
  }
}
