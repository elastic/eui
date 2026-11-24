/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { type ObjectScope } from '../../base_object';
import { EuiButtonBaseObject } from '../button/button_base';
import { EuiLinkSelectors } from '../../../components/link/selectors';

/**
 * Playwright Component Object for {@link
 * https://eui.elastic.co/docs/components/navigation/link/ EuiLink}.
 *
 * `testSubj` must be set on `EuiLink` itself, EUI spreads it onto the `<a>`,
 * or onto the `<button>` it renders without `href`.
 */
export class EuiLinkObject extends EuiButtonBaseObject {
  constructor(
    scope: ObjectScope,
    testSubj: string,
    componentSelector = EuiLinkSelectors.ROOT_SELECTOR
  ) {
    super(scope, testSubj, componentSelector);
  }

  /** The `href`, or an empty string when the link renders as a button. */
  async getHref(): Promise<string> {
    return (await this.root.getAttribute('href')) ?? '';
  }
}
