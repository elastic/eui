/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { BaseObject, type ObjectScope } from '../../../base_object';
import { EuiNotificationBadgeSelectors } from '../../../../components/badge/notification_badge/selectors';

/**
 * Playwright Component Object for {@link
 * https://eui.elastic.co/docs/components/display/badge/ EuiNotificationBadge}.
 *
 * `testSubj` must be set on `EuiNotificationBadge` itself, EUI spreads it
 * onto the `<span>`.
 */
export class EuiNotificationBadgeObject extends BaseObject {
  constructor(
    scope: ObjectScope,
    testSubj: string,
    componentSelector = EuiNotificationBadgeSelectors.ROOT_SELECTOR
  ) {
    super(scope, testSubj, componentSelector);
  }

  /** The badge text. */
  async getText(): Promise<string> {
    return (await this.root.innerText()).trim();
  }

  /** The badge text as a number, `NaN` when it is empty or not a number. */
  async getCount(): Promise<number> {
    const text = await this.getText();
    return text === '' ? NaN : Number(text);
  }
}
