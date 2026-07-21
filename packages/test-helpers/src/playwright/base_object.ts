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

  /**
   * CSS selector the root must match to be this component (e.g. `.euiComboBox`).
   * When set, {@link assertComponent} enforces it.
   */
  protected readonly componentSelector?: string;

  private componentVerified = false;

  constructor(scope: ObjectScope, testSubj: string, componentSelector?: string) {
    this.scope = scope instanceof BaseObject ? scope.locator : scope;
    this.root = this.scope.getByTestId(testSubj);
    this.testSubj = testSubj;
    this.componentSelector = componentSelector;
  }

  /**
   * Underlying `Locator` — escape hatch for assertions or scoping the
   * Component Object's API doesn't cover.
   */
  get locator(): Locator {
    return this.root;
  }

  /**
   * Throw if the element at `testSubj` isn't this component (a `data-test-subj`
   * isn't unique to a component type). Call at the top of public methods.
   * Memoized and lazy — runs once per instance, not in the constructor, so it
   * doesn't race initial render. No-op without a `componentSelector`.
   */
  protected async assertComponent(): Promise<void> {
    if (this.componentVerified || !this.componentSelector) {
      return;
    }
    // Wait for the element before checking its type, so the guard doesn't
    // false-fail when a caller acts before render.
    await this.root.first().waitFor({ state: 'attached' });
    const matches = await this.root
      .and(this.scope.locator(this.componentSelector))
      .count();
    if (matches === 0) {
      throw new Error(
        `Expected the element with data-test-subj "${this.testSubj}" to match "${this.componentSelector}", ` +
          `but it does not. Are you using the right Component Object for this element?`
      );
    }
    this.componentVerified = true;
  }
}
