/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import type { Locator } from '@playwright/test';

import { BaseObject, type ObjectScope } from '../../base_object';
import { EuiFlyoutSelectors } from '../../../components/flyout/selectors';

/**
 * Playwright Component Object for {@link
 * https://eui.elastic.co/docs/components/containers/flyout/ EuiFlyout}.
 *
 * `testSubj` must be set on the `<EuiFlyout>` itself. See the package README
 * for what this does not cover.
 */
export class EuiFlyoutObject extends BaseObject {
  constructor(scope: ObjectScope, testSubj: string) {
    super(scope, testSubj, EuiFlyoutSelectors.ROOT_SELECTOR);
  }

  /**
   * This flyout's own close button, scoped to this instance. Absent with
   * `hideCloseButton` or a rendered flyout menu.
   */
  public get closeButton(): Locator {
    return this.root.getByTestId(EuiFlyoutSelectors.CLOSE_BUTTON_TEST_SUBJ);
  }
}
