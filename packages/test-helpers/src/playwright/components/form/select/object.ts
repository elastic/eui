/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { expect } from '@playwright/test';

import { BaseObject, type ObjectScope } from '../../../base_object';
import { EuiSelectSelectors } from '../../../../components/form/select/selectors';

/**
 * Playwright Component Object for {@link
 * https://eui.elastic.co/docs/components/forms/selection/select/ EuiSelect}.
 *
 * `testSubj` must be set on `EuiSelect` itself, EUI spreads it onto the
 * native `<select>`. For `EuiSuperSelect` see `EuiSuperSelectObject`.
 */
export class EuiSelectObject extends BaseObject {
  constructor(
    scope: ObjectScope,
    testSubj: string,
    componentSelector = EuiSelectSelectors.ROOT_SELECTOR
  ) {
    super(scope, testSubj, componentSelector);
  }

  /** Select the option with this `value` and wait for it to be the selection. */
  async selectOptionByValue(value: string): Promise<void> {
    await this.root.selectOption({ value });
    await expect(this.root).toHaveValue(value);
  }

  /**
   * Select the option with this visible label, its `label` attribute if set,
   * otherwise its text.
   */
  async selectOptionByLabel(label: string): Promise<void> {
    const [value] = await this.root.selectOption({ label });
    await expect(this.root).toHaveValue(value);
  }

  /** The `value` of the selected option. */
  async getSelectedValue(): Promise<string> {
    return this.root.inputValue();
  }

  /** The visible label of the selected option, its `label` or else its `text`. */
  async getSelectedLabel(): Promise<string> {
    return this.root.evaluate(
      (select) =>
        (select as HTMLSelectElement).selectedOptions[0]?.label.trim() ?? ''
    );
  }
}
