/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import type { Locator } from '@playwright/test';

import { BaseObject, type ObjectScope } from '../../base_object';
import { EuiAccordionSelectors } from '../../../components/accordion/selectors';

/**
 * Playwright Component Object for {@link
 * https://eui.elastic.co/docs/components/containers/accordion/ EuiAccordion}.
 *
 * `testSubj` must be set on the `<EuiAccordion>` itself. See the package
 * README for what this does not cover.
 */
export class EuiAccordionObject extends BaseObject {
  constructor(scope: ObjectScope, testSubj: string) {
    super(scope, testSubj, EuiAccordionSelectors.ROOT_SELECTOR);
  }

  /** The trigger button. Assert `aria-expanded` on it for open state, e.g. `toHaveAttribute('aria-expanded', 'true')`. */
  public get trigger(): Locator {
    return this.root.locator(EuiAccordionSelectors.TRIGGER_SELECTOR);
  }

  /** The children wrapper, scoped to this instance. */
  public get content(): Locator {
    return this.root.locator(EuiAccordionSelectors.CONTENT_SELECTOR);
  }
}
