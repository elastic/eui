/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import type { Locator } from '@playwright/test';

import { BaseObject, type ObjectScope } from '../../base_object';
import { EuiTreeViewSelectors } from '../../../components/tree_view/selectors';

/**
 * Playwright Component Object for {@link
 * https://eui.elastic.co/docs/components/navigation/tree-view/ EuiTreeView}.
 *
 * `testSubj` must be set on `EuiTreeView` itself. See the package README for
 * what this does not cover.
 */
export class EuiTreeViewObject extends BaseObject {
  constructor(scope: ObjectScope, testSubj: string) {
    super(scope, testSubj, EuiTreeViewSelectors.ROOT_SELECTOR);
  }

  /**
   * The node buttons of this level, in order. A node with children carries
   * `aria-expanded`, a leaf does not.
   */
  public get items(): Locator {
    return this.root.locator(EuiTreeViewSelectors.ITEM_SELECTOR);
  }
}
