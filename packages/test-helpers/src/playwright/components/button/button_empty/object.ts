/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { type ObjectScope } from '../../../base_object';
import { EuiButtonBaseObject } from '../../../components/button/button_base';
import { EuiButtonEmptySelectors } from '../../../../components/button/button_empty/selectors';

/**
 * Playwright Component Object for {@link
 * https://eui.elastic.co/docs/components/navigation/buttons/button/ EuiButtonEmpty}.
 *
 * `testSubj` must be set on `EuiButtonEmpty` itself, EUI spreads it onto the
 * `<button>` or `<a>`.
 */
export class EuiButtonEmptyObject extends EuiButtonBaseObject {
  constructor(
    scope: ObjectScope,
    testSubj: string,
    componentSelector = EuiButtonEmptySelectors.ROOT_SELECTOR
  ) {
    super(scope, testSubj, componentSelector);
  }

  /** Whether the loading spinner replaces the icon. */
  async isLoading(): Promise<boolean> {
    await this.root.waitFor({ state: 'attached' });
    return (await this.root.getByRole('progressbar').count()) > 0;
  }
}
