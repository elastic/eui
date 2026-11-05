/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import type { Locator } from '@playwright/test';

import { BaseObject, type ObjectScope } from '../../base_object';
import { EuiCallOutSelectors } from '../../../components/call_out/selectors';

/**
 * Playwright Component Object for {@link
 * https://eui.elastic.co/docs/components/display/callout/ EuiCallOut}.
 *
 * `testSubj` must be set on `EuiCallOut` itself. EUI puts it on the panel
 * root and derives `<subj>__message`, `<subj>__content` and
 * `<subj>__actions` for the inner blocks, which the token based root lookup
 * does not confuse with the root.
 */
export class EuiCallOutObject extends BaseObject {
  constructor(scope: ObjectScope, testSubj: string) {
    super(scope, testSubj, EuiCallOutSelectors.ROOT_SELECTOR);
  }

  /** The call out element itself, see {@link panel}. */
  override get locator(): Locator {
    return this.panel;
  }

  /** The title text, or an empty string when the call out has no title. */
  async getTitle(): Promise<string> {
    return this.textOf(this.panel.locator(EuiCallOutSelectors.TITLE_SELECTOR));
  }

  /** The `text` block, or an empty string when the call out has none. */
  async getText(): Promise<string> {
    return this.textOf(this.panel.locator(EuiCallOutSelectors.TEXT_SELECTOR));
  }

  /** The color variant: `primary`, `success`, `warning` or `danger`. */
  async getColor(): Promise<string> {
    const className = (await this.panel.getAttribute('class')) ?? '';
    const match = className.match(
      new RegExp(`\\b${EuiCallOutSelectors.COLOR_CLASS_PREFIX}([a-z]+)`)
    );
    if (!match) {
      throw new Error(
        `EuiCallOut "${this.testSubj}" has no color class, is it an EuiCallOut?`
      );
    }
    return match[1];
  }

  /** The dismiss button. Resolves to zero elements without `onDismiss`. */
  get dismissButton(): Locator {
    return this.panel
      .locator(EuiCallOutSelectors.DISMISS_BUTTON_SELECTOR)
      .first();
  }

  /**
   * The root narrowed to the call out element. A multi token subj such as
   * `notice shared` also matches the derived `notice shared__message` block
   * by token, so the class keeps lookups on the panel itself.
   */
  private get panel(): Locator {
    return this.root.and(this.scope.locator(EuiCallOutSelectors.ROOT_SELECTOR));
  }

  /**
   * Click the dismiss button. What happens next is up to the consumer's
   * `onDismiss`, usually unmounting the call out, so nothing is asserted.
   */
  async dismiss(): Promise<void> {
    await this.dismissButton.click();
  }

  private async textOf(element: Locator): Promise<string> {
    if ((await element.count()) === 0) {
      return '';
    }
    return element.first().innerText();
  }
}
