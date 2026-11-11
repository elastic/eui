/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import type { Locator } from '@playwright/test';

import { BaseObject, type ObjectScope } from '../../base_object';
import { EuiEmptyPromptSelectors } from '../../../components/empty_prompt/selectors';

/**
 * Playwright Component Object for {@link
 * https://eui.elastic.co/docs/components/display/empty-prompt/ EuiEmptyPrompt}.
 *
 * `testSubj` must be set on `EuiEmptyPrompt` itself, EUI spreads it onto the
 * panel.
 */
export class EuiEmptyPromptObject extends BaseObject {
  constructor(
    scope: ObjectScope,
    testSubj: string,
    componentSelector = EuiEmptyPromptSelectors.ROOT_SELECTOR
  ) {
    super(scope, testSubj, componentSelector);
  }

  /** The footer, absent without `footer`. */
  get footer(): Locator {
    return this.root.locator(EuiEmptyPromptSelectors.FOOTER_SELECTOR);
  }

  /** The action with exactly this accessible name, a button or a link. */
  action(name: string): Locator {
    const content = this.root.locator(EuiEmptyPromptSelectors.CONTENT_SELECTOR);
    return content
      .getByRole('button', { name, exact: true })
      .or(content.getByRole('link', { name, exact: true }));
  }

  /** The title text, or an empty string without `title`. */
  async getTitle(): Promise<string> {
    return this.textOf(this.root.locator(EuiEmptyPromptSelectors.TITLE_SELECTOR));
  }

  /** The body text, or an empty string without `body`. */
  async getBody(): Promise<string> {
    return this.textOf(this.root.locator(EuiEmptyPromptSelectors.BODY_SELECTOR));
  }

  /**
   * The labels of the actions, in order. A single action renders directly in
   * the content, an array inside the actions wrapper, so both are read from
   * the content children that are not the title, the body or a spacer.
   */
  async getActions(): Promise<string[]> {
    await this.root.waitFor({ state: 'attached' });
    return this.root
      .locator(EuiEmptyPromptSelectors.CONTENT_SELECTOR)
      .evaluate((content, selectors) => {
        const actions = Array.from(content.children).flatMap((child) => {
          if (child.matches(selectors.ACTIONS_SELECTOR)) {
            return Array.from(child.querySelectorAll('button, a'));
          }
          if (child.matches('.euiTitle, .euiText, .euiSpacer')) {
            return [];
          }
          return child.matches('button, a')
            ? [child]
            : Array.from(child.querySelectorAll('button, a'));
        });
        return actions.map((action) => (action.textContent ?? '').trim());
      }, EuiEmptyPromptSelectors);
  }

  /** Click the action with this name. What follows is up to the consumer. */
  async clickAction(name: string): Promise<void> {
    await this.action(name).click();
  }

  private async textOf(element: Locator): Promise<string> {
    await this.root.waitFor({ state: 'attached' });
    if ((await element.count()) === 0) {
      return '';
    }
    return (await element.innerText()).trim();
  }
}
