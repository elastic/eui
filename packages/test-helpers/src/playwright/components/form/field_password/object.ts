/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { expect, type Locator } from '@playwright/test';

import { BaseObject, type ObjectScope } from '../../../base_object';
import { EuiFieldPasswordSelectors } from '../../../../components/form/field_password/selectors';

/**
 * Playwright Component Object for {@link
 * https://eui.elastic.co/docs/components/forms/text/password/ EuiFieldPassword}.
 *
 * `testSubj` must be set on `EuiFieldPassword` itself, EUI spreads it onto
 * the native `<input>`. See the README for the visibility toggle.
 */
export class EuiFieldPasswordObject extends BaseObject {
  constructor(
    scope: ObjectScope,
    testSubj: string,
    componentSelector = EuiFieldPasswordSelectors.ROOT_SELECTOR
  ) {
    super(scope, testSubj, componentSelector);
  }

  /**
   * Replace the text and wait for the input to hold exactly it. Fails if the
   * app transforms the value, for example by trimming it.
   */
  async fill(text: string): Promise<void> {
    await this.root.fill(text);
    await expect(this.root).toHaveValue(text);
  }

  /** The current text of the input, readable even while masked. */
  async getValue(): Promise<string> {
    return this.root.inputValue();
  }

  /** Empty the input. */
  async clear(): Promise<void> {
    await this.fill('');
  }

  /** Whether the text is hidden, read from the input `type`. */
  async isMasked(): Promise<boolean> {
    return (await this.root.getAttribute('type')) === 'password';
  }

  /**
   * Click the eye button of a `type="dual"` field and wait for the input
   * `type` to flip. Fails when the field has no toggle.
   */
  async toggleVisibility(): Promise<void> {
    const masked = await this.isMasked();
    await this.visibilityToggle.click();
    await expect(this.root).toHaveAttribute(
      'type',
      masked ? 'text' : 'password'
    );
  }

  /** EUI appends the toggle after any consumer `append` nodes, so it is the last button of the slot. */
  private get visibilityToggle(): Locator {
    return this.scope
      .locator(EuiFieldPasswordSelectors.LAYOUT_SELECTOR, { has: this.root })
      .locator(EuiFieldPasswordSelectors.APPEND_SELECTOR)
      .getByRole('button')
      .last();
  }
}
