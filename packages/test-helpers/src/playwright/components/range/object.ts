/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import type { Locator } from '@playwright/test';

import { BaseObject, type ObjectScope } from '../../base_object';
import { EuiRangeSelectors } from '../../../components/range/selectors';

/**
 * Playwright Component Object for {@link
 * https://eui.elastic.co/docs/components/forms/range-controls/ EuiRange} and
 * `EuiDualRange`.
 *
 * `testSubj` must match the `data-test-subj` set by the consumer on the
 * `<EuiRange>`/`<EuiDualRange>`. EUI always spreads it onto the native
 * `<input type="range">` slider — but for a plain `EuiRange` rendered with
 * `showInput`, EUI spreads the *same* `data-test-subj` onto the visible
 * number input too, so a plain `getByTestId` resolves to two elements and
 * throws in Playwright's strict mode. {@link slider} and {@link numberInput}
 * disambiguate by class so each resolves to exactly one.
 *
 * Does not cover `EuiDualRange`'s min/max number inputs — those need their
 * own separate `data-test-subj` via `minInputProps`/`maxInputProps`, which is
 * the consumer's own test-subj to target directly, not this component's
 * concern.
 */
export class EuiRangeObject extends BaseObject {
  constructor(scope: ObjectScope, testSubj: string) {
    super(scope, testSubj, EuiRangeSelectors.SLIDER_SELECTOR);
  }

  /**
   * The native range slider input carrying the raw value. Always resolves to
   * exactly one element, even when {@link numberInput} also matches
   * `testSubj`.
   */
  public get slider(): Locator {
    return this.root.and(this.scope.locator(EuiRangeSelectors.SLIDER_SELECTOR));
  }

  /**
   * The visible number input, present only on a plain `EuiRange` rendered
   * with `showInput`. Resolves to zero elements otherwise — assert presence
   * first if that is in question.
   */
  public get numberInput(): Locator {
    return this.root.and(this.scope.locator(EuiRangeSelectors.NUMBER_INPUT_SELECTOR));
  }
}
