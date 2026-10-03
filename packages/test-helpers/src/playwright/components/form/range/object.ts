/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import type { Locator } from '@playwright/test';

import { BaseObject, type ObjectScope } from '../../../base_object';
import { EuiRangeSelectors } from '../../../../components/form/range/selectors';

/**
 * Playwright Component Object for {@link
 * https://eui.elastic.co/docs/components/forms/range-controls/ EuiRange} and
 * `EuiDualRange`.
 *
 * `testSubj` must match the `data-test-subj` set by the consumer on the
 * `<EuiRange>`/`<EuiDualRange>`. See the package README for why `slider` and
 * `numberInput` disambiguate by class, and what this does not cover.
 */
export class EuiRangeObject extends BaseObject {
  constructor(scope: ObjectScope, testSubj: string) {
    super(scope, testSubj, EuiRangeSelectors.SLIDER_SELECTOR);
  }

  /**
   * The native range slider input. Resolves to exactly one element once
   * mounted. With `showInput="inputWithPopover"`, it lives inside the
   * popover panel and is not mounted until the popover opens.
   */
  public get slider(): Locator {
    return this.root.and(this.scope.locator(EuiRangeSelectors.SLIDER_SELECTOR));
  }

  /**
   * The visible number input, present only with `showInput`. Resolves to
   * zero elements otherwise.
   */
  public get numberInput(): Locator {
    return this.root.and(this.scope.locator(EuiRangeSelectors.NUMBER_INPUT_SELECTOR));
  }
}
