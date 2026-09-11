/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { BaseObject, type ObjectScope } from '../../base_object';
import { EuiToolTipSelectors } from '../../../components/tool_tip/selectors';

/**
 * Playwright Component Object for {@link
 * https://eui.elastic.co/docs/components/display/tooltip/ EuiToolTip}.
 *
 * `testSubj` must be set on `EuiToolTip` itself. EUI forwards it to the
 * tooltip popover, which renders in a portal and only while shown, so
 * `locator` resolves to zero elements until the trigger is hovered or
 * focused. See the package README for what this does not cover.
 */
export class EuiToolTipObject extends BaseObject {
  constructor(scope: ObjectScope, testSubj: string) {
    super(scope, testSubj, EuiToolTipSelectors.ROOT_SELECTOR);
  }
}
