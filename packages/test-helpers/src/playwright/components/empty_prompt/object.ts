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

  /**
   * The action with exactly this accessible name, a button or a link. Only
   * the actions are searched, a link inside the body is not an action.
   */
  action(name: string): Locator {
    const blocks = this.actionBlocks;
    const button = this.root.getByRole('button', { name, exact: true });
    const link = this.root.getByRole('link', { name, exact: true });
    return blocks
      .and(button)
      .or(blocks.and(link))
      .or(blocks.getByRole('button', { name, exact: true }))
      .or(blocks.getByRole('link', { name, exact: true }));
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
   * The labels of the actions, in order, for a single action and for an
   * array. A label is the accessible name as far as attributes go, the
   * `aria-labelledby` text, then `aria-label`, then the text.
   */
  async getActions(): Promise<string[]> {
    await this.root.waitFor({ state: 'attached' });
    return this.actions.evaluateAll((actions) =>
      actions.map((action) => {
        const labelledBy = action.getAttribute('aria-labelledby');
        const label = labelledBy
          ? labelledBy
              .split(/\s+/)
              .map((id) => action.ownerDocument.getElementById(id)?.textContent ?? '')
              .join(' ')
          : action.getAttribute('aria-label') ?? action.textContent ?? '';
        return label.trim();
      })
    );
  }

  /** Click the action with this name. What follows is up to the consumer. */
  async clickAction(name: string): Promise<void> {
    await this.action(name).click();
  }

  /**
   * The content children that hold the actions: a single action itself, the
   * actions wrapper, or the elements of a fragment. EUI puts a large spacer
   * before them when there is a title or a body, otherwise they are all the
   * children but the title and the body. A link in the body is never one.
   */
  private get actionBlocks(): Locator {
    return this.root
      .locator(EuiEmptyPromptSelectors.CONTENT_SELECTOR)
      .locator(
        ':scope > .euiSpacer--l ~ *, ' +
          ':scope:not(:has(> .euiSpacer--l)) > :not(.euiTitle):not(.euiText)'
      );
  }

  /** The buttons and links in the action block, in DOM order. */
  private get actions(): Locator {
    const blocks = this.actionBlocks;
    return blocks.and(this.root.locator('button, a')).or(blocks.locator('button, a'));
  }

  private async textOf(element: Locator): Promise<string> {
    await this.root.waitFor({ state: 'attached' });
    if ((await element.count()) === 0) {
      return '';
    }
    return (await element.innerText()).trim();
  }
}
