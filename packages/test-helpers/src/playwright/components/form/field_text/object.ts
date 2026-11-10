/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { expect } from '@playwright/test';

import { BaseObject, type ObjectScope } from '../../../base_object';
import { EuiFieldTextSelectors } from '../../../../components/form/field_text/selectors';

/**
 * Playwright Component Object for {@link
 * https://eui.elastic.co/docs/components/forms/text/ EuiFieldText}.
 *
 * `testSubj` must be set on `EuiFieldText` itself, EUI spreads it onto the
 * native `<input type="text">`.
 */
export class EuiFieldTextObject extends BaseObject {
  constructor(
    scope: ObjectScope,
    testSubj: string,
    componentSelector = EuiFieldTextSelectors.ROOT_SELECTOR
  ) {
    super(scope, testSubj, componentSelector);
  }

  /** Replace the text and wait for the input to hold it. */
  async fill(text: string): Promise<void> {
    await this.root.fill(text);
    await expect(this.root).toHaveValue(text);
  }

  /** The current text of the input. */
  async getValue(): Promise<string> {
    return this.root.inputValue();
  }

  /** Empty the input. */
  async clear(): Promise<void> {
    await this.fill('');
  }
}
