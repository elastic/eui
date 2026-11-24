/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { type ObjectScope } from '../../../base_object';
import { EuiButtonBaseObject } from '../../../components/button/button_base';
import { EuiButtonIconSelectors } from '../../../../components/button/button_icon/selectors';

/**
 * Playwright Component Object for {@link
 * https://eui.elastic.co/docs/components/navigation/buttons/button/ EuiButtonIcon}.
 *
 * `testSubj` must be set on `EuiButtonIcon` itself, EUI spreads it onto the
 * `<button>` or `<a>`.
 */
export class EuiButtonIconObject extends EuiButtonBaseObject {
  constructor(
    scope: ObjectScope,
    testSubj: string,
    componentSelector = EuiButtonIconSelectors.ROOT_SELECTOR
  ) {
    super(scope, testSubj, componentSelector);
  }
}
