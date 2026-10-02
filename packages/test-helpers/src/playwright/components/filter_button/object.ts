/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import type { Locator } from '@playwright/test';

import { BaseObject, type ObjectScope } from '../../base_object';
import { EuiFilterButtonSelectors } from '../../../components/filter_button/selectors';

/**
 * Playwright Component Object for {@link
 * https://eui.elastic.co/docs/components/forms/filter-group/ EuiFilterButton}.
 *
 * `testSubj` must match the `data-test-subj` set by the consumer on the
 * `<EuiFilterButton>` (EUI spreads it onto the button itself). Deliberately
 * does not own opening/closing a popover triggered by the button — `EuiPopover`
 * already sets `aria-expanded`/`aria-controls` on its toggle synchronously
 * itself, so drive that from the test directly. It also does not own reading
 * or selecting options inside that popover — when the popover content is an
 * `EuiSelectable`, use {@link EuiSelectableObject} scoped to it instead.
 */
export class EuiFilterButtonObject extends BaseObject {
  constructor(scope: ObjectScope, testSubj: string) {
    super(scope, testSubj, EuiFilterButtonSelectors.ROOT_SELECTOR);
  }

  /**
   * The notification badge showing the available/active filter count, as a
   * `Locator` so callers keep Playwright auto-retry for its text
   * (e.g. `expect(filterButton.notificationBadge).toHaveText('2')`). Only
   * present when the consumer passes `numFilters` or `numActiveFilters` —
   * absent otherwise, so assert presence first if that is in question.
   *
   * For the button's own active/selected state, assert directly on
   * {@link BaseObject.locator} rather than through a dedicated method — both
   * are synchronous CSS classes EUI sets on the root
   * (`euiFilterButton-hasActiveFilters`, `euiFilterButton-isSelected`), e.g.
   * `expect(filterButton.locator).toHaveClass(/euiFilterButton-hasActiveFilters/)`.
   */
  public get notificationBadge(): Locator {
    return this.root.locator(EuiFilterButtonSelectors.NOTIFICATION_SELECTOR);
  }
}
