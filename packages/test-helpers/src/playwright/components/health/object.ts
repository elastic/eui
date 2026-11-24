/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { BaseObject, type ObjectScope } from '../../base_object';
import { EuiHealthSelectors } from '../../../components/health/selectors';

/**
 * Playwright Component Object for {@link
 * https://eui.elastic.co/docs/components/display/health/ EuiHealth}.
 *
 * `testSubj` must be set on `EuiHealth` itself, EUI spreads it onto the
 * wrapper `<div>`.
 */
export class EuiHealthObject extends BaseObject {
  constructor(
    scope: ObjectScope,
    testSubj: string,
    componentSelector = EuiHealthSelectors.ROOT_SELECTOR
  ) {
    super(scope, testSubj, componentSelector);
  }

  /** The status text next to the dot. */
  async getText(): Promise<string> {
    return (await this.root.innerText()).trim();
  }
}
