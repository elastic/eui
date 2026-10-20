/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { expect } from '@playwright/test';

import { BaseObject, type ObjectScope } from '../../../base_object';
import { EuiFieldSearchSelectors } from '../../../../components/form/field_search/selectors';

/**
 * Playwright Component Object for {@link
 * https://eui.elastic.co/docs/components/forms/search-and-filter/search/ EuiFieldSearch}.
 *
 * `testSubj` must be set on `EuiFieldSearch` itself, EUI spreads it onto
 * the `<input>`. `EuiSearchBar` renders this input for its box, see
 * `EuiSearchBarObject`.
 */
export class EuiFieldSearchObject extends BaseObject {
  constructor(
    scope: ObjectScope,
    testSubj: string,
    componentSelector = EuiFieldSearchSelectors.ROOT_SELECTOR
  ) {
    super(scope, testSubj, componentSelector);
  }

  /**
   * Replace the text and submit it with Enter, which triggers `onSearch` for
   * both the incremental and the plain variant.
   */
  async setQuery(text: string): Promise<void> {
    await this.root.fill(text);
    await expect(this.root).toHaveValue(text);
    await this.root.press('Enter');
  }

  /** The current text of the input. */
  async getQuery(): Promise<string> {
    return this.root.inputValue();
  }

  /** Empty the input and submit, so `onSearch` receives an empty query. */
  async clear(): Promise<void> {
    await this.setQuery('');
  }
}
