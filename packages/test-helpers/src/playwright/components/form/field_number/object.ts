/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { expect } from '@playwright/test';

import { BaseObject, type ObjectScope } from '../../../base_object';
import { EuiFieldNumberSelectors } from '../../../../components/form/field_number/selectors';

/**
 * Playwright Component Object for {@link
 * https://eui.elastic.co/docs/components/forms/numeric/ EuiFieldNumber}.
 *
 * `testSubj` must be set on `EuiFieldNumber` itself, EUI spreads it onto the
 * native `<input type="number">`.
 */
export class EuiFieldNumberObject extends BaseObject {
  constructor(
    scope: ObjectScope,
    testSubj: string,
    componentSelector = EuiFieldNumberSelectors.ROOT_SELECTOR
  ) {
    super(scope, testSubj, componentSelector);
  }

  /**
   * Replace the value and wait for the input to hold exactly it. Fails if the
   * app transforms the value, for example by clamping it to `min` or `max`.
   */
  async fill(value: number | string): Promise<void> {
    const text = String(value);
    await this.root.fill(text);
    await expect(this.root).toHaveValue(text);
  }

  /** The current value as the input holds it, an empty string when blank. */
  async getValue(): Promise<string> {
    return this.root.inputValue();
  }

  /** Empty the input. */
  async clear(): Promise<void> {
    await this.fill('');
  }
}
