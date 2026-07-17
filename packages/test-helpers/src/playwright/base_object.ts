/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import type { Locator, Page } from '@playwright/test';

export type ObjectScope = Page | Locator | BaseObject;

/**
 * Base class for Playwright Component Objects — semantic wrappers around a
 * single root `Locator` resolved from a `data-test-subj` inside the given
 * scope. Subclasses compose: pass another Component Object as `scope` to
 * nest one inside the other's DOM subtree.
 *
 * Requires `testIdAttribute: 'data-test-subj'` in the Playwright config.
 */
export abstract class BaseObject {
  /**
   * Available to subclasses for queries outside `root`'s subtree but within
   * the original scope (e.g. siblings, related controls).
   */
  protected readonly scope: Page | Locator;

  protected readonly root: Locator;

  /**
   * Retained so subclasses can disambiguate portal-rendered content per
   * instance — e.g. EUI propagates this as `${testSubj}-optionsList` to a
   * combo box's options list, letting us scope queries to the right combo
   * when several exist on a page.
   */
  protected readonly testSubj: string;

  constructor(scope: ObjectScope, testSubj: string) {
    this.scope = scope instanceof BaseObject ? scope.locator : scope;
    this.root = this.scope.getByTestId(testSubj);
    this.testSubj = testSubj;
  }

  /**
   * Underlying `Locator` — escape hatch for assertions or scoping the
   * Component Object's API doesn't cover.
   */
  get locator(): Locator {
    return this.root;
  }
}
