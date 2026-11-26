/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import type { Locator } from '@playwright/test';

import { BaseObject, type ObjectScope } from '../../base_object';
import { EuiBadgeSelectors } from '../../../components/badge/selectors';

/**
 * Playwright Component Object for {@link
 * https://eui.elastic.co/docs/components/display/badge/ EuiBadge}.
 *
 * `testSubj` must be set on `EuiBadge` itself. EUI spreads it onto the badge
 * element, or onto the inner button when `iconOnClick` is combined with
 * `onClick` or `href`. See the README.
 */
export class EuiBadgeObject extends BaseObject {
  constructor(
    scope: ObjectScope,
    testSubj: string,
    componentSelector = `${EuiBadgeSelectors.ROOT_SELECTOR}, ${EuiBadgeSelectors.CHILD_BUTTON_SELECTOR}`
  ) {
    super(scope, testSubj, componentSelector);
  }

  /** The icon button, present only with `iconOnClick`. */
  get iconButton(): Locator {
    return this.badge.locator(EuiBadgeSelectors.ICON_BUTTON_SELECTOR);
  }

  /** The badge text without the icon. */
  async getText(): Promise<string> {
    return (await this.root.innerText()).trim();
  }

  /** Click the badge. Fails on a badge without `onClick` or `href`, which is not interactive. */
  async click(): Promise<void> {
    await this.root.and(this.scope.locator('button, a')).click();
  }

  /** Click the icon button of an `iconOnClick` badge. */
  async clickIcon(): Promise<void> {
    await this.iconButton.click();
  }

  /** The `.euiBadge` element, the root itself or its ancestor for the inner button case. */
  private get badge(): Locator {
    return this.root.locator(
      'xpath=ancestor-or-self::*[contains(concat(" ", normalize-space(@class), " "), " euiBadge ")][1]'
    );
  }
}
