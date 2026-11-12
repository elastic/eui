/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { BaseObject, type ObjectScope } from '../../../base_object';
import { EuiCheckboxSelectors } from '../../../../components/form/checkbox/selectors';

/**
 * Playwright Component Object for {@link
 * https://eui.elastic.co/docs/components/forms/selection/checkboxes-and-radios/ EuiCheckbox}.
 *
 * `testSubj` must be set on `EuiCheckbox` itself, EUI spreads it onto the
 * native `<input type="checkbox">`.
 */
export class EuiCheckboxObject extends BaseObject {
  constructor(
    scope: ObjectScope,
    testSubj: string,
    componentSelector = EuiCheckboxSelectors.ROOT_SELECTOR
  ) {
    super(scope, testSubj, componentSelector);
  }

  /** Whether the checkbox is checked. `indeterminate` is a separate state, read it through `locator`. */
  async isChecked(): Promise<boolean> {
    return this.root.isChecked();
  }

  /** Check the box, a no-op when it already is. */
  async check(): Promise<void> {
    await this.root.check();
  }

  /** Uncheck the box, a no-op when it already is. */
  async uncheck(): Promise<void> {
    await this.root.uncheck();
  }

  /** Flip the checked state. */
  async toggle(): Promise<void> {
    await this.root.setChecked(!(await this.isChecked()));
  }
}
