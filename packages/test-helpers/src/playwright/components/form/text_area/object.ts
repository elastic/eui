/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { expect } from '@playwright/test';

import { BaseObject, type ObjectScope } from '../../../base_object';
import { EuiTextAreaSelectors } from '../../../../components/form/text_area/selectors';

/**
 * Playwright Component Object for {@link
 * https://eui.elastic.co/docs/components/forms/text/ EuiTextArea}.
 *
 * `testSubj` must be set on `EuiTextArea` itself, EUI spreads it onto the
 * native `<textarea>`.
 */
export class EuiTextAreaObject extends BaseObject {
  constructor(
    scope: ObjectScope,
    testSubj: string,
    componentSelector = EuiTextAreaSelectors.ROOT_SELECTOR
  ) {
    super(scope, testSubj, componentSelector);
  }

  /**
   * Replace the text and wait for the textarea to hold exactly it. Fails if
   * the app transforms the value, for example by trimming it. Browsers store
   * `\r\n` as `\n`, so Windows line endings are normalized first.
   */
  async fill(text: string): Promise<void> {
    const normalized = text.replace(/\r\n/g, '\n');
    await this.root.fill(normalized);
    await expect(this.root).toHaveValue(normalized);
  }

  /** The current text of the textarea. */
  async getValue(): Promise<string> {
    return this.root.inputValue();
  }

  /** Empty the textarea. */
  async clear(): Promise<void> {
    await this.fill('');
  }
}
