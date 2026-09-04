/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import type { Locator } from '@playwright/test';

import { BaseObject, type ObjectScope } from '../../base_object';
import { EuiModalSelectors } from '../../../components/modal/selectors';

/**
 * Playwright Component Object for {@link
 * https://eui.elastic.co/docs/components/containers/modal/ EuiModal} and
 * `EuiConfirmModal`, which renders `EuiModal` underneath.
 *
 * `testSubj` must be set on the `<EuiModal>`/`<EuiConfirmModal>` itself. See
 * the package README for what this does not cover.
 */
export class EuiModalObject extends BaseObject {
  constructor(scope: ObjectScope, testSubj: string) {
    super(scope, testSubj, EuiModalSelectors.ROOT_SELECTOR);
  }

  /** This modal's own close button, scoped to this instance. */
  public get closeButton(): Locator {
    return this.root.locator(EuiModalSelectors.CLOSE_BUTTON_SELECTOR);
  }
}
