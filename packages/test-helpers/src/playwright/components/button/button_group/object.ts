/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { expect, type Locator } from '@playwright/test';

import { BaseObject, type ObjectScope } from '../../../base_object';
import { EuiButtonGroupSelectors } from '../../../../components/button/button_group/selectors';

/**
 * Playwright Component Object for {@link
 * https://eui.elastic.co/docs/components/navigation/buttons/group/ EuiButtonGroup}.
 * Buttons are addressed by their exact label, which is the accessible name
 * for icon-only buttons too. Selection is read from `aria-pressed`, which
 * both the `options` and the children API set.
 *
 * `testSubj` must be set on `EuiButtonGroup` itself, EUI spreads it onto the
 * group element.
 */
export class EuiButtonGroupObject extends BaseObject {
  constructor(
    scope: ObjectScope,
    testSubj: string,
    componentSelector = EuiButtonGroupSelectors.ROOT_SELECTOR
  ) {
    super(scope, testSubj, componentSelector);
  }

  /** All buttons, in order. */
  get buttons(): Locator {
    return this.root
      .locator(EuiButtonGroupSelectors.BUTTONS_SELECTOR)
      .getByRole('button');
  }

  /** The button with exactly this label. */
  button(label: string): Locator {
    return this.root
      .locator(EuiButtonGroupSelectors.BUTTONS_SELECTOR)
      .getByRole('button', { name: label, exact: true });
  }

  /** The accessible labels of all buttons, in order. Empty for an empty group. */
  async getOptions(): Promise<string[]> {
    await this.root.waitFor({ state: 'attached' });
    return labelsOf(this.buttons);
  }

  /** Click the button with this label unless it is already selected, then wait for it. */
  async select(label: string): Promise<void> {
    await this.setSelected(label, true);
  }

  /** Click the selected button with this label to deselect it, `multi` type only. */
  async deselect(label: string): Promise<void> {
    await this.setSelected(label, false);
  }

  /** The labels of the selected buttons, in order. One at most with `single` type. */
  async getSelected(): Promise<string[]> {
    await this.root.waitFor({ state: 'attached' });
    return labelsOf(
      this.root
        .locator(EuiButtonGroupSelectors.BUTTONS_SELECTOR)
        .getByRole('button', { pressed: true })
    );
  }

  /** A missing `aria-pressed` counts as unselected, `options` omits it for ids absent from `idToSelectedMap`. */
  private async setSelected(label: string, selected: boolean): Promise<void> {
    const button = this.button(label);
    const pressed = (await button.getAttribute('aria-pressed')) === 'true';
    if (pressed !== selected) {
      await button.click();
    }
    if (selected) {
      await expect(button).toHaveAttribute('aria-pressed', 'true');
      return;
    }
    await expect(button).not.toHaveAttribute('aria-pressed', 'true');
  }
}

/**
 * The accessible name of each button. `aria-labelledby` and `aria-label`
 * cover `EuiButtonIcon` children, `textContent` keeps the visually hidden
 * label of `isIconOnly` options that `innerText` drops.
 */
const labelsOf = (buttons: Locator): Promise<string[]> =>
  buttons.evaluateAll((elements) =>
    elements.map((element) => {
      const labelledBy = element.getAttribute('aria-labelledby');
      if (labelledBy) {
        return labelledBy
          .split(/\s+/)
          .map((id) => document.getElementById(id)?.textContent ?? '')
          .join(' ')
          .trim();
      }
      const label = element.getAttribute('aria-label')?.trim();
      return label || (element.textContent ?? '').trim();
    })
  );
